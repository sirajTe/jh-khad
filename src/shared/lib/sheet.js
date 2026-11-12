import { GOOGLE_SCRIPT_URL } from '@/config'

// Posts an enquiry or order to the Google Sheet. Resolves to 'done' or
// 'setup' (sheet not connected yet); throws if the network fails.
export async function sendToSheet(fields) {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'GOOGLE_SCRIPT_URL') {
    console.warn('Set GOOGLE_SCRIPT_URL in src/config.js to receive enquiries in Google Sheets.')
    return 'setup'
  }
  // Apps Script does not send CORS headers, so we post "no-cors" as a
  // simple form. The data still reaches the sheet.
  await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(fields) })
  return 'done'
}
