/**
 * JH KHAD BHANDAR — Enquiry form → Google Sheet
 *
 * Paste this whole file into Extensions → Apps Script of your Google Sheet,
 * then Deploy → New deployment → Web app (see README.md for full steps).
 */

const SHEET_NAME = 'Enquiries';
const NOTIFY_EMAIL = 'jh749910@gmail.com'; // set to '' to turn off email alerts

const HEADERS = ['Date & Time', 'Name', 'Mobile', 'Village', 'Product', 'Quantity', 'Message', 'Language'];

function doPost(e) {
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

// Lets you open the Web app URL in a browser to check it is working.
function doGet() {
  return json_({ result: 'ok', message: 'JH KHAD BHANDAR enquiry script is running.' });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
