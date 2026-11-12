// Writes the products in src/config.ts to integrations/google-apps-script/products.csv,
// ready to import into the "Products" tab of the Google Sheet.
//   npm run products:csv
import { writeFileSync } from 'node:fs'
import { PRODUCTS } from '../src/config'

const HEADERS = [
  'id',
  'category',
  'name_en',
  'name_hi',
  'use_en',
  'use_hi',
  'packs',
  'prices',
  'offer',
  'image',
  'active',
]

const cell = (v: string): string => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v)

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

const out = new URL('../integrations/google-apps-script/products.csv', import.meta.url)
writeFileSync(out, [HEADERS, ...rows].map((r) => r.map(cell).join(',')).join('\n') + '\n')
console.log(`Wrote ${rows.length} products to integrations/google-apps-script/products.csv`)
