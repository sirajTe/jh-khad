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
const CATEGORIES_SHEET_NAME = 'Categories'; // tab the website reads categories from
const NOTIFY_EMAIL = 'jh749910@gmail.com'; // set to '' to turn off email alerts

// Admin panel login. Checked here on Google's side, so the password is never
// in the website code. Change them here and deploy a New version.
const ADMIN_EMAIL = 'jh749910@gmail.com';
const ADMIN_PASSWORD = 'jh@1234';
const PRODUCT_COLUMNS = ['id', 'category', 'name_en', 'name_hi', 'use_en', 'use_hi', 'packs', 'prices', 'offer', 'image', 'active'];
const CATEGORY_COLUMNS = ['id', 'name_en', 'name_hi', 'desc_en', 'desc_hi', 'image', 'active'];
// Filled into a new Categories tab so the website keeps its categories
const DEFAULT_CATEGORIES = [
  ['fertilizer', 'Fertilizers', 'खाद / उर्वरक', 'Urea, DAP, NPK, zinc, boron & more', 'यूरिया, डीएपी, एनपीके, जिंक, बोरॉन आदि', '', 'yes'],
  ['micronutrient', 'Micronutrients', 'सूक्ष्म पोषक तत्व', 'Zinc, boron, sulphur & other trace nutrients', 'जिंक, बोरॉन, सल्फर और अन्य सूक्ष्म पोषक तत्व', '', 'yes'],
  ['pesticide', 'Pesticides', 'कीटनाशक', 'Protect crops from insects, disease & weeds', 'कीट, रोग और खरपतवार से फसल की रक्षा', '', 'yes'],
  ['seed', 'Seeds', 'बीज', 'High-yield maize, paddy & vegetable seeds', 'अधिक उपज वाले मक्का, धान और सब्जी बीज', '', 'yes'],
];

const HEADERS = ['Date & Time', 'Name', 'Mobile', 'Village', 'Product', 'Quantity', 'Message', 'Language'];
const ORDER_STATUSES = ['Pending', 'Picked up', 'In Transit', 'Delivered', 'Return', 'Cancelled'];

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

// ?action=products → the products and categories from the "Products" and
// "Categories" tabs (read by the website).
// Without it, opening the Web app URL in a browser just checks it is working.
function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'products') {
    try {
      return json_({ result: 'ok', products: getProducts_(), categories: getCategories_() });
    } catch (err) {
      return json_({ result: 'error', error: String(err) });
    }
  }
  return json_({ result: 'ok', admin: true, message: 'JH AGRO AGENCY enquiry script is running.' });
}

function getProducts_() {
  return readTab_(SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(PRODUCTS_SHEET_NAME), 'products');
}

function getCategories_() {
  return readTab_(categoriesSheet_(), 'categories');
}

// Each row of a tab as { column header: cell text }.
// Cached for 60 seconds so many visitors don't slow the sheet down —
// a change in the sheet shows on the website within about a minute.
function readTab_(sheet, cacheKey) {
  const cache = CacheService.getScriptCache();
  const cached = cache.get(cacheKey);
  if (cached) return JSON.parse(cached);

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
  const list = rows
    .filter(function (row) { return row.some(function (cell) { return cell; }); })
    .map(function (row) {
      const obj = {};
      headers.forEach(function (h, i) { if (h) obj[h] = row[i]; });
      return obj;
    });

  try {
    cache.put(cacheKey, JSON.stringify(list), 60);
  } catch (err) {
    // list too big for the cache — just read the sheet every time
  }
  return list;
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
      return { result: 'ok', products: adminRows_(productsSheet_()) };
    case 'save_product':
      return { result: 'ok', row: saveRow_(productsSheet_(), PRODUCT_COLUMNS, 'products', Number(p.row) || 0, JSON.parse(p.product || '{}')) };
    case 'admin_categories':
      return { result: 'ok', categories: adminRows_(categoriesSheet_()) };
    case 'save_category':
      return { result: 'ok', row: saveCategory_(Number(p.row) || 0, JSON.parse(p.category || '{}')) };
    case 'orders':
      return { result: 'ok', orders: orders_() };
    case 'set_status':
      return { result: 'ok', status: setOrderStatus_(Number(p.row) || 0, String(p.status || '')) };
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

// A new Categories tab starts with the shop's current categories
function categoriesSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(CATEGORIES_SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(CATEGORIES_SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, DEFAULT_CATEGORIES.length + 1, CATEGORY_COLUMNS.length)
      .setValues([CATEGORY_COLUMNS].concat(DEFAULT_CATEGORIES));
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Header names as used by the website (lower case, spaces → _)
function headerKeys_(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0]
    .map(function (h) { return h.trim().toLowerCase().replace(/\s+/g, '_'); });
}

// All rows of a tab, hidden ones too, each with its sheet row number
function adminRows_(sheet) {
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
function saveRow_(sheet, columns, cacheKey, row, item) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    let keys = headerKeys_(sheet);
    columns.forEach(function (col) {
      if (keys.indexOf(col) === -1) {
        sheet.getRange(1, keys.length + 1).setValue(col);
        keys.push(col);
      }
    });
    if (!(row > 1 && row <= sheet.getLastRow())) row = sheet.getLastRow() + 1;
    const current = sheet.getRange(row, 1, 1, keys.length).getValues()[0];
    const next = keys.map(function (k, i) {
      return columns.indexOf(k) !== -1 && k in item ? clean_(item[k]) : current[i];
    });
    // No setNumberFormat here: the tabs can be tables with typed
    // columns, and Sheets refuses to change their format.
    sheet.getRange(row, 1, 1, keys.length).setValues([next]);
    SpreadsheetApp.flush(); // so a sheet error comes back as JSON, not a Google error page
    CacheService.getScriptCache().remove(cacheKey); // website sees the change at once
    return row;
  } finally {
    lock.releaseLock();
  }
}

// A new category can't reuse an id — products would land in both
function saveCategory_(row, category) {
  const sheet = categoriesSheet_();
  const id = String(category.id || '').trim().toLowerCase();
  if (!id) throw new Error('Category ID is missing');
  const taken = adminRows_(sheet).some(function (c) {
    return c.row !== row && String(c.id || '').trim().toLowerCase() === id;
  });
  if (taken) throw new Error('A category with ID "' + id + '" already exists');
  return saveRow_(sheet, CATEGORY_COLUMNS, 'categories', row, category);
}

// Rows of the JH tab (orders + enquiries), newest first, each with its sheet row number
function orders_() {
  const sheet = getSheet_();
  const rows = sheet.getDataRange().getDisplayValues();
  const headers = rows.shift() || [];
  const list = [];
  rows.forEach(function (row, r) {
    if (!row.some(function (c) { return String(c).trim(); })) return;
    const obj = { row: r + 2 };
    headers.forEach(function (h, i) { if (h) obj[h] = row[i]; });
    list.push(obj);
  });
  return list.reverse();
}

// Writes the order's status into a "Status" column (added if missing)
function setOrderStatus_(row, status) {
  if (ORDER_STATUSES.indexOf(status) === -1) throw new Error('Unknown status');
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    if (!(row > 1 && row <= sheet.getLastRow())) throw new Error('Order not found');
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
    let col = headers.indexOf('Status') + 1;
    if (!col) {
      col = headers.length + 1;
      sheet.getRange(1, col).setValue('Status').setFontWeight('bold').setBackground('#dcfce7');
    }
    sheet.getRange(row, col).setValue(status);
    SpreadsheetApp.flush();
    return status;
  } finally {
    lock.releaseLock();
  }
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
