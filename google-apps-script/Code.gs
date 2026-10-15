/**
 * JH AGRO AGENCY — Enquiry form → Google Sheet
 *
 * Paste this whole file into Extensions → Apps Script of your Google Sheet,
 * then Deploy → New deployment → Web app (see README.md for full steps).
 */

// "JH" spreadsheet: https://docs.google.com/spreadsheets/d/1ZRbLBVXGWYTAsCBd2No4DEbjVYKq4bIWxt_MswE0Mrc/edit
const SPREADSHEET_ID = '1ZRbLBVXGWYTAsCBd2No4DEbjVYKq4bIWxt_MswE0Mrc';
const SHEET_NAME = 'JH'; // tab name
const PRODUCTS_SHEET_NAME = 'Products'; // tab the website reads products from
const NOTIFY_EMAIL = 'jh749910@gmail.com'; // set to '' to turn off email alerts

// Admin panel login. Checked here on Google's side, so the password is never
// in the website code. Change them here and deploy a New version.
const ADMIN_EMAIL = 'jh749910@gmail.com';
const ADMIN_PASSWORD = 'jh@1234';
const PRODUCT_COLUMNS = ['id', 'category', 'name_en', 'name_hi', 'use_en', 'use_hi', 'packs', 'prices', 'offer', 'image', 'active'];

const HEADERS = ['Date & Time', 'Name', 'Mobile', 'Village', 'Product', 'Quantity', 'Message', 'Language'];

function doPost(e) {
  // Admin panel requests (they send an "action"); enquiries and orders don't.
  if (e && e.parameter && e.parameter.action) {
    try {
      return json_(admin_(e.parameter));
    } catch (err) {
      return json_({ result: 'error', error: String(err) });
    }
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const p = (e && e.parameter) || {};
    const sheet = getSheet_();

    const row = [
      new Date(),
      clean_(p.name),
      "'" + clean_(p.mobile), // leading ' keeps the number as text
      clean_(p.village),
      clean_(p.product),
      clean_(p.quantity),
      clean_(p.message),
      clean_(p.language),
    ];
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(
        NOTIFY_EMAIL,
        'New enquiry: ' + (row[4] || 'General') + ' — ' + row[1],
        HEADERS.slice(1).map(function (h, i) { return h + ': ' + row[i + 1]; }).join('\n')
      );
    }

    return json_({ result: 'success' });
  } catch (err) {
    return json_({ result: 'error', error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// ?action=products → the product list from the "Products" tab (read by the website).
// Without it, opening the Web app URL in a browser just checks it is working.
function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'products') {
    try {
      return json_({ result: 'ok', products: getProducts_() });
    } catch (err) {
      return json_({ result: 'error', error: String(err) });
    }
  }
  return json_({ result: 'ok', admin: true, message: 'JH AGRO AGENCY enquiry script is running.' });
}

// Each row of the Products tab as { column header: cell text }.
// Cached for 60 seconds so many visitors don't slow the sheet down —
// a change in the sheet shows on the website within about a minute.
function getProducts_() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('products');
  if (cached) return JSON.parse(cached);

  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(PRODUCTS_SHEET_NAME);
  if (!sheet) return [];
  const range = sheet.getDataRange();
  const values = range.getValues();
  const shown = range.getDisplayValues();
  // A number cell like 1350 can display as "1,350", which would look like two
  // prices — so numbers are sent as plain digits, everything else as shown.
  const rows = shown.map(function (row, r) {
    return row.map(function (cell, c) {
      return typeof values[r][c] === 'number' ? String(values[r][c]) : cell.trim();
    });
  });
  const headers = rows.shift().map(function (h) { return h.toLowerCase().replace(/\s+/g, '_'); });
  const products = rows
    .filter(function (row) { return row.some(function (cell) { return cell; }); })
    .map(function (row) {
      const obj = {};
      headers.forEach(function (h, i) { if (h) obj[h] = row[i]; });
      return obj;
    });

  try {
    cache.put('products', JSON.stringify(products), 60);
  } catch (err) {
    // list too big for the cache — just read the sheet every time
  }
  return products;
}

// ---------- Admin panel ----------
// Every admin request carries the email + password; wrong ones get nothing.
function admin_(p) {
  const email = String(p.email || '').trim().toLowerCase();
  if (email !== ADMIN_EMAIL.toLowerCase() || String(p.password || '') !== ADMIN_PASSWORD) {
    return { result: 'denied' };
  }
  switch (p.action) {
    case 'login':
      return { result: 'ok' };
    case 'admin_products':
      return { result: 'ok', products: adminProducts_() };
    case 'save_product':
      return { result: 'ok', row: saveProduct_(Number(p.row) || 0, JSON.parse(p.product || '{}')) };
    case 'orders':
      return { result: 'ok', orders: orders_() };
    default:
      return { result: 'error', error: 'Unknown action' };
  }
}

function productsSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(PRODUCTS_SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(PRODUCTS_SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(PRODUCT_COLUMNS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Header names as used by the website (lower case, spaces → _)
function headerKeys_(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0]
    .map(function (h) { return h.trim().toLowerCase().replace(/\s+/g, '_'); });
}

// All product rows, hidden ones too, each with its sheet row number
function adminProducts_() {
  const sheet = productsSheet_();
  const keys = headerKeys_(sheet);
  if (sheet.getLastRow() < 2) return [];
  const range = sheet.getRange(2, 1, sheet.getLastRow() - 1, keys.length);
  const values = range.getValues();
  const shown = range.getDisplayValues();
  const list = [];
  shown.forEach(function (row, r) {
    if (!row.some(function (c) { return String(c).trim(); })) return;
    const obj = { row: r + 2 };
    keys.forEach(function (k, c) {
      if (k) obj[k] = typeof values[r][c] === 'number' ? String(values[r][c]) : row[c].trim();
    });
    list.push(obj);
  });
  return list;
}

// row > 1 → update that row; otherwise add a new row at the bottom.
// Missing columns are added to the header so nothing is lost.
function saveProduct_(row, product) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = productsSheet_();
    let keys = headerKeys_(sheet);
    PRODUCT_COLUMNS.forEach(function (col) {
      if (keys.indexOf(col) === -1) {
        sheet.getRange(1, keys.length + 1).setValue(col);
        keys.push(col);
      }
    });
    if (!(row > 1 && row <= sheet.getLastRow())) row = sheet.getLastRow() + 1;
    const current = sheet.getRange(row, 1, 1, keys.length).getValues()[0];
    const next = keys.map(function (k, i) {
      return PRODUCT_COLUMNS.indexOf(k) !== -1 && k in product ? clean_(product[k]) : current[i];
    });
    const range = sheet.getRange(row, 1, 1, keys.length);
    range.setNumberFormat('@'); // keep "350, 1300" and "10" as plain text
    range.setValues([next]);
    CacheService.getScriptCache().remove('products'); // website sees the change at once
    return row;
  } finally {
    lock.releaseLock();
  }
}

// Rows of the JH tab (orders + enquiries), newest first
function orders_() {
  const sheet = getSheet_();
  const rows = sheet.getDataRange().getDisplayValues();
  const headers = rows.shift() || [];
  return rows
    .filter(function (row) { return row.some(function (c) { return String(c).trim(); }); })
    .map(function (row) {
      const obj = {};
      headers.forEach(function (h, i) { if (h) obj[h] = row[i]; });
      return obj;
    })
    .reverse();
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#dcfce7');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Trim, limit length, and stop text being treated as a spreadsheet formula.
function clean_(value) {
  let s = String(value || '').trim().slice(0, 1000);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
