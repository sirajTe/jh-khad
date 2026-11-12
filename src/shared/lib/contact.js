import { SHOP } from '@/config'

export const telLink = `tel:${SHOP.phone}`

export function whatsappLink(productName, quantity) {
  const text = productName
    ? `Hello ${SHOP.name}, I want to know about ${productName}${quantity ? ` (${quantity})` : ''}.`
    : `Hello ${SHOP.name}, I want to know about your products.`
  return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`
}

export const whatsappTextLink = (text) => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`

// Checks name / mobile / village; returns { field: message } for each problem
export function contactErrors(data, f) {
  const er = {}
  if (!data.name.trim()) er.name = f.errName
  if (!/^[6-9]\d{9}$/.test(data.mobile)) er.mobile = f.errMobile
  if (!data.village.trim()) er.village = f.errVillage
  return er
}
