import { useSyncExternalStore } from 'react'
import { GOOGLE_SCRIPT_URL, IMAGES, PRODUCTS } from './config'

// Products come from the "Products" tab of the Google Sheet, so the shop can
// change prices without touching code. Until the sheet answers (or if it
// can't be reached) the site shows the last list it got, or PRODUCTS from
// config.js on a first visit — so the page is never empty.

const CACHE_KEY = 'products-v1'
const CATEGORIES = ['fertilizer', 'pesticide', 'seed']

let products = loadCached() || PRODUCTS
const listeners = new Set()

function loadCached() {
  try {
    const saved = JSON.parse(localStorage.getItem(CACHE_KEY))
    return Array.isArray(saved) && saved.length ? saved : null
  } catch {
    return null
  }
}

function setProducts(list) {
  products = list
  listeners.forEach((fn) => fn())
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(list))
  } catch {
    // storage blocked — the sheet is just fetched again next visit
  }
}

async function fetchFromSheet() {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'GOOGLE_SCRIPT_URL') return
  try {
    const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=products`)
    const data = await res.json()
    if (data.result !== 'ok' || !Array.isArray(data.products)) return
    const list = data.products.map(fromRow).filter(Boolean)
    // An empty tab is more likely a mistake than "sell nothing"
    if (list.length) setProducts(list)
  } catch (err) {
    console.warn('Could not load products from the Google Sheet; showing saved list.', err)
  }
}

if (typeof window !== 'undefined') fetchFromSheet()

export function useProducts() {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn)
      return () => listeners.delete(fn)
    },
    () => products,
  )
}

const text = (v) => String(v ?? '').trim()
const splitList = (v) => text(v).split(',').map((s) => s.trim()).filter(Boolean)

// One sheet row → one product, or null if the row can't be used.
// Mistakes in a row only affect that row, never the whole page.
function fromRow(r) {
  const nameEn = text(r.name_en)
  const category = text(r.category).toLowerCase()
  const packs = splitList(r.packs)
  if (/^(no|n|false|0|hide)$/i.test(text(r.active))) return null
  if (!nameEn || !CATEGORIES.includes(category) || !packs.length) {
    console.warn('Skipping product row (needs name_en, category and packs):', r)
    return null
  }

  // Prices must match the packs one-to-one; otherwise show "Price on Request"
  // rather than risk a wrong price.
  let prices = splitList(r.prices).map((s) => Number(s.replace(/[₹,\s]/g, '')))
  if (prices.length !== packs.length || prices.some((n) => !(n > 0))) {
    if (prices.length) console.warn(`"${nameEn}": prices don't match packs — showing Price on Request.`)
    prices = undefined
  }

  const offer = Number(text(r.offer).replace('%', ''))
  return {
    id: text(r.id) || slug(nameEn),
    category,
    name: { en: nameEn, hi: text(r.name_hi) || nameEn },
    use: { en: text(r.use_en), hi: text(r.use_hi) || text(r.use_en) },
    packs,
    prices,
    offer: offer > 0 && offer < 100 ? offer : 0,
    image: imageUrl(text(r.image)) || IMAGES.categories[category],
  }
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// Google Drive share links don't work in <img>; turn them into thumbnail links.
// The photo must be shared as "Anyone with the link".
function imageUrl(url) {
  const id = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?.*id=)([\w-]+)/)?.[1]
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w800` : url
}
