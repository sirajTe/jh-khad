export type Language = 'en' | 'hi'

export interface LocalizedString {
  en: string
  hi: string
}

export interface Category {
  id: string
  name: LocalizedString
  desc: LocalizedString
  image: string
}

export interface Product {
  id: string
  category: string
  name: LocalizedString
  use: LocalizedString
  packs: string[]
  prices?: number[]
  offer?: number
  image: string
}

export interface ShopHours {
  en: string
  hi: string
}

export interface ShopAddress {
  en: string
  hi: string
}

export interface Shop {
  id: string
  main?: boolean
  name: LocalizedString
  address: ShopAddress
  mapQuery: string
  phone: string
  phoneDisplay: string
  hours: ShopHours
  image: string
}

export interface PolicySection {
  h?: string
  p?: string[]
  list?: string[]
}

export interface Policy {
  path: string
  title: LocalizedString
  sections: PolicySection[]
}

export interface CartItem {
  id: string
  pack: string
  qty: number
}

export interface CartLineItem extends CartItem {
  product: Product
  price: number | null
  lineTotal: number | null
}

export interface CartTotals {
  pay: number
  save: number
  onRequest: boolean
}

export interface CartStore {
  items: CartItem[]
  add: (id: string, pack: string, qty: number) => void
  setQty: (id: string, pack: string, qty: number) => void
  clear: () => void
}

export interface PlacedOrder {
  id: string
  summary: string
  pay: number
  onRequest: boolean
  upi: boolean
}

export interface BookingRequest {
  name?: string
  quantity?: string
  at: number
}

export interface EnquiryFormData {
  name: string
  mobile: string
  village: string
  pincode: string
  product: string
  quantity: string
  message: string
}

export interface CheckoutFormData {
  name: string
  mobile: string
  village: string
  message: string
  payment: 'cod' | 'upi'
}

export type SheetSubmissionResult = 'done' | 'setup'

export type FormStatus = 'idle' | 'sending' | 'done' | 'error' | 'setup'
