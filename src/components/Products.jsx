import { useState } from 'react'
import { useProducts } from '../products'
import { formatRupees, offerPrice } from '../utils'
import { CATEGORY_IDS } from './Categories'
import Section, { LazyImg } from './Section'

export default function Products({ t, lang, filter, setFilter, cart }) {
  const products = useProducts()
  const list = filter === 'all' ? products : products.filter((p) => p.category === filter)
  const filters = ['all', ...CATEGORY_IDS]

  return (
    <Section id="products" title={t.productsTitle}>
      <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:justify-center" role="tablist">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
              filter === f ? 'bg-brand-800 text-white' : 'bg-brand-50 text-brand-900 ring-1 ring-brand-100 hover:bg-brand-100'
            }`}
          >
            {f === 'all' ? t.all : t.categories[f]}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="text-center text-gray-500">{t.noProducts}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} t={t} lang={lang} cart={cart} />
          ))}
        </div>
      )}
    </Section>
  )
}

function ProductCard({ p, t, lang, cart }) {
  const name = p.name[lang] || p.name.en
  const use = p.use[lang] || p.use.en
  const [picked, setPackIdx] = useState(0)
  const packIdx = picked < p.packs.length ? picked : 0 // packs can shrink when the sheet loads

  const mrp = p.prices?.[packIdx]
  const hasPrice = mrp != null
  const offer = hasPrice ? p.offer || 0 : 0
  const price = hasPrice ? offerPrice(mrp, offer) : 0
  const pack = p.packs[packIdx]
  const inCart = cart.items.find((i) => i.id === p.id && i.pack === pack)?.qty || 0

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
      <div className="relative">
        <LazyImg src={p.image} alt={name} className="aspect-[4/3] w-full" />
        <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-bold text-brand-800">
          {t.categories[p.category]}
        </span>
        {offer > 0 && (
          <span className="absolute right-2 top-2 rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-extrabold text-white shadow">
            {offer}% {t.off}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold leading-snug text-brand-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-600">{use}</p>

        <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={t.packSizes}>
          {p.packs.map((pk, i) => (
            <button
              key={pk}
              type="button"
              role="radio"
              aria-checked={i === packIdx}
              onClick={() => setPackIdx(i)}
              className={`rounded-lg px-3 py-1.5 text-sm font-bold transition ${
                i === packIdx
                  ? 'bg-brand-800 text-white'
                  : 'bg-brand-50 text-brand-900 ring-1 ring-brand-100 hover:bg-brand-100'
              }`}
            >
              {pk}
            </button>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          {hasPrice ? (
            <div className="leading-tight">
              <span className="block text-xl font-extrabold text-brand-900">{formatRupees(price)}</span>
              {offer > 0 && <span className="text-sm text-gray-400 line-through">{formatRupees(mrp)}</span>}
            </div>
          ) : (
            <p className="text-sm font-bold text-gold-600">{t.priceOnRequest}</p>
          )}
          <AddButton t={t} qty={inCart} label={name} onChange={(q) => (inCart ? cart.setQty(p.id, pack, q) : cart.add(p.id, pack, q))} />
        </div>
      </div>
    </article>
  )
}

// Quick-commerce style button: "ADD", then a − qty + counter once in the cart
export function AddButton({ t, qty, label, onChange, small = false }) {
  const size = small ? 'h-8 min-w-[5.5rem] text-sm' : 'h-10 min-w-[6.5rem] text-base'
  if (!qty) {
    return (
      <button
        type="button"
        onClick={() => onChange(1)}
        aria-label={`${t.add} ${label}`}
        className={`${size} shrink-0 rounded-lg border-2 border-brand-700 bg-brand-50 px-4 font-extrabold text-brand-700 hover:bg-brand-100`}
      >
        {t.add}
      </button>
    )
  }
  return (
    <div className={`${size} flex shrink-0 items-center justify-between rounded-lg bg-brand-700 font-extrabold text-white`}>
      <button type="button" onClick={() => onChange(qty - 1)} aria-label={`${t.remove} ${label}`} className="h-full w-8 rounded-l-lg hover:bg-brand-800">
        −
      </button>
      <span aria-live="polite" aria-label={`${t.qty} ${qty}`}>{qty}</span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        disabled={qty >= 99}
        aria-label={`${t.add} ${label}`}
        className="h-full w-8 rounded-r-lg hover:bg-brand-800 disabled:opacity-50"
      >
        +
      </button>
    </div>
  )
}
