import { SHOP } from './config'

export const telLink = `tel:${SHOP.phone}`

export function whatsappLink(productName) {
  const text = productName
    ? `Hello ${SHOP.name}, I want to know about ${productName}.`
    : `Hello ${SHOP.name}, I want to know about your products.`
  return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`
}
