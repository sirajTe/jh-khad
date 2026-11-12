import { SHOP } from '@/config'

export const telLink = `tel:${SHOP.phone}`

export function whatsappLink(productName?: string, quantity?: string): string {
  const text = productName
    ? `Hello ${SHOP.name}, I want to know about ${productName}${quantity ? ` (${quantity})` : ''}.`
    : `Hello ${SHOP.name}, I want to know about your products.`
  return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`
}

export const whatsappTextLink = (text: string): string =>
  `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`

export interface ContactData {
  name: string
  mobile: string
  village: string
}

export interface ContactErrorMessages {
  errName: string
  errMobile: string
  errVillage: string
}

// Checks name / mobile / village; returns { field: message } for each problem
export function contactErrors(
  data: ContactData,
  f: ContactErrorMessages,
): Record<string, string> {
  const er: Record<string, string> = {}
  if (!data.name.trim()) er.name = f.errName
  if (!/^[6-9]\d{9}$/.test(data.mobile)) er.mobile = f.errMobile
  if (!data.village.trim()) er.village = f.errVillage
  return er
}
