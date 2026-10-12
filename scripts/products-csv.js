// Writes the products in src/config.js to google-apps-script/products.csv,
// ready to import into the "Products" tab of the Google Sheet.
//   npm run products:csv
import { writeFileSync } from 'node:fs'
import { PRODUCTS } from '../src/config.js'

const HEADERS = ['id', 'category', 'name_en', 'name_hi', 'use_en', 'use_hi', 'packs', 'prices', 'offer', 'image', 'active']

const cell = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v)

const rows = PRODUCTS.map((p) => [
  p.id,
  p.category,
  p.name.en,
  p.name.hi,
  p.use.en,
  p.use.hi,
  p.packs.join(', '),
  (p.prices || []).join(', '),
  String(p.offer || 0),
  p.image,
  'yes',
])

const out = new URL('../google-apps-script/products.csv', import.meta.url)
writeFileSync(out, [HEADERS, ...rows].map((r) => r.map(cell).join(',')).join('\n') + '\n')
console.log(`Wrote ${rows.length} products to google-apps-script/products.csv`)
