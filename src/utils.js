import { SHOP } from './config'

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
