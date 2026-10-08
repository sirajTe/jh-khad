import { useState } from 'react'
import { PRODUCTS } from '../config'
import { formatRupees, offerPrice } from '../utils'
import { CATEGORY_IDS } from './Categories'
import { CartIcon } from './Icons'
import Section, { LazyImg } from './Section'

export default function Products({ t, lang, filter, setFilter, onBook }) {
  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)
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
            <ProductCard key={p.id} p={p} t={t} lang={lang} onBook={onBook} />
          ))}
        </div>
      )}
    </Section>
  )
}

function ProductCard({ p, t, lang, onBook }) {
  const name = p.name[lang] || p.name.en
  const use = p.use[lang] || p.use.en
  const [packIdx, setPackIdx] = useState(0)
  const [qty, setQty] = useState(1)

  const mrp = p.prices?.[packIdx]
  const hasPrice = mrp != null
  const offer = hasPrice ? p.offer || 0 : 0
  const price = hasPrice ? offerPrice(mrp, offer) : 0
  const pack = p.packs[packIdx]
  const order = hasPrice ? `${qty} × ${pack}` : ''

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

        {hasPrice ? (
          <>
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

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-brand-900">{formatRupees(price)}</span>
              {offer > 0 && <span className="text-sm text-gray-400 line-through">{formatRupees(mrp)}</span>}
            </div>
            {offer > 0 && (
              <p className="text-sm font-bold text-brand-600">
                {t.youSave} {formatRupees((mrp - price) * qty)}
              </p>
            )}

            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="flex items-center rounded-lg ring-1 ring-gray-200">
                <button
                  type="button"
                  aria-label="−"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty === 1}
                  className="h-9 w-9 text-lg font-bold text-brand-900 disabled:text-gray-300"
                >
                  −
                </button>
                <span className="w-8 text-center font-bold" aria-label={t.qty}>{qty}</span>
                <button
                  type="button"
                  aria-label="+"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  className="h-9 w-9 text-lg font-bold text-brand-900"
                >
                  +
                </button>
              </div>
              <p className="text-right text-sm">
                <span className="text-gray-600">{t.total}: </span>
                <span className="font-extrabold text-brand-900">{formatRupees(price * qty)}</span>
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="mt-3 text-sm">
              <span className="font-semibold text-gray-700">{t.packSizes}: </span>
              {p.packs.join(' · ')}
            </p>
            <p className="mt-2 font-bold text-gold-600">{t.priceOnRequest}</p>
          </>
        )}

        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={() => onBook(p.name.en, order)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-400 py-3 text-base font-extrabold text-brand-950 hover:bg-gold-300"
          >
            <CartIcon /> {t.orderNow}
          </button>
        </div>
      </div>
    </article>
  )
}
