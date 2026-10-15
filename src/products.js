import { useSyncExternalStore } from 'react'
import { CATEGORIES, GOOGLE_SCRIPT_URL, IMAGES, PRODUCTS } from './config'

// Products and categories come from the "Products" and "Categories" tabs of
// the Google Sheet, so the shop can change them without touching code. Until
// the sheet answers (or if it can't be reached) the site shows the last lists
// it got, or PRODUCTS / CATEGORIES from config.js on a first visit — so the
// page is never empty.

const CACHE_KEY = 'products-v1'
const CATEGORIES_CACHE_KEY = 'categories-v1'

let store = {
  products: loadCached(CACHE_KEY) || PRODUCTS,
  categories: loadCached(CATEGORIES_CACHE_KEY) || CATEGORIES,
}
const listeners = new Set()

function loadCached(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key))
    return Array.isArray(saved) && saved.length ? saved : null
  } catch {
    return null
  }
}

function save(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list))
  } catch {
    // storage blocked — the sheet is just fetched again next visit
  }
}

function setStore(next) {
  store = next
  listeners.forEach((fn) => fn())
  save(CACHE_KEY, next.products)
  save(CATEGORIES_CACHE_KEY, next.categories)
}

async function fetchFromSheet() {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'GOOGLE_SCRIPT_URL') return
  try {
    const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=products`)
    const data = await res.json()
    if (data.result !== 'ok' || !Array.isArray(data.products)) return
    // An older script sends no categories — keep the ones from config.js
    let categories = (data.categories || []).map(categoryFromRow).filter(Boolean)
    if (!categories.length) categories = CATEGORIES
    const list = data.products.map((r) => fromRow(r, categories)).filter(Boolean)
    // An empty tab is more likely a mistake than "sell nothing"
    if (list.length) setStore({ products: list, categories })
  } catch (err) {
    console.warn('Could not load products from the Google Sheet; showing saved list.', err)
  }
}

if (typeof window !== 'undefined') fetchFromSheet()

function useStore() {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn)
      return () => listeners.delete(fn)
    },
    () => store,
  )
}

export const useProducts = () => useStore().products
export const useCategories = () => useStore().categories

// The category's name in the given language (its id if it's unknown)
export function categoryName(categories, id, lang) {
  const c = categories.find((c) => c.id === id)
  return c ? c.name[lang] || c.name.en : id
}

const isHidden = (v) => /^(no|n|false|0|hide)$/i.test(text(v))

const text = (v) => String(v ?? '').trim()
const splitList = (v) => text(v).split(',').map((s) => s.trim()).filter(Boolean)

// One sheet row → one product, or null if the row can't be used.
// Mistakes in a row only affect that row, never the whole page.
function fromRow(r, categories) {
  const nameEn = text(r.name_en)
  const category = text(r.category).toLowerCase()
  const packs = splitList(r.packs)
  if (isHidden(r.active)) return null
  const cat = categories.find((c) => c.id === category)
  if (!nameEn || !cat || !packs.length) {
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
    image: imageUrl(text(r.image)) || cat.image,
  }
}

// One row of the Categories tab → one category, or null if it can't be used
function categoryFromRow(r) {
  const nameEn = text(r.name_en)
  const id = text(r.id).toLowerCase() || slug(nameEn)
  if (isHidden(r.active) || !nameEn || !id) return null
  return {
    id,
    name: { en: nameEn, hi: text(r.name_hi) || nameEn },
    desc: { en: text(r.desc_en), hi: text(r.desc_hi) || text(r.desc_en) },
    image: imageUrl(text(r.image)) || IMAGES.categories[id] || IMAGES.categories.default,
  }
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// Google Drive share links don't work in <img>; turn them into thumbnail links.
// The photo must be shared as "Anyone with the link".
function imageUrl(url) {
  const id = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?.*id=)([\w-]+)/)?.[1]
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w800` : url
}
