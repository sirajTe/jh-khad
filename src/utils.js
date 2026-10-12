import { GOOGLE_SCRIPT_URL, SHOP } from './config'

export const telLink = `tel:${SHOP.phone}`

export function whatsappLink(productName, quantity) {
  const text = productName
    ? `Hello ${SHOP.name}, I want to know about ${productName}${quantity ? ` (${quantity})` : ''}.`
    : `Hello ${SHOP.name}, I want to know about your products.`
  return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`
}

export const formatRupees = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

// Price after the product's % offer, rounded to the nearest rupee
export const offerPrice = (mrp, offer) => Math.round(mrp * (1 - (offer || 0) / 100))

export const whatsappTextLink = (text) => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`

// Checks name / mobile / village; returns { field: message } for each problem
export function contactErrors(data, f) {
  const er = {}
  if (!data.name.trim()) er.name = f.errName
  if (!/^[6-9]\d{9}$/.test(data.mobile)) er.mobile = f.errMobile
  if (!data.village.trim()) er.village = f.errVillage
  return er
}

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
