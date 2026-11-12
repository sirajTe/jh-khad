import { useEffect, useState } from 'react'
import { SHOP } from '../config'
import { categoryName, useCategories, useProducts } from '../products'
import { formatRupees, offerPrice, telLink, whatsappLink } from '../utils'
import { AddButton, ProductCard } from './Products'
import { PhoneIcon, WhatsAppIcon } from './Icons'
import { LazyImg } from './Section'

export default function ProductPage({ t, lang, productId, cart }) {
  const products = useProducts()
  const categories = useCategories()
  const product = products.find((p) => p.id === productId)

  useEffect(() => {
    if (!product) {
      document.title = `${t.productNotFound} – ${SHOP.name}`
      return
    }
    const name = product.name.en
    document.title = `${name} – ${SHOP.name}`
  }, [product, t.productNotFound])

  if (!product) {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <a href="/#products" className="text-sm font-bold text-brand-700 hover:underline">
            ← {t.backHome}
          </a>
          <h1 className="mt-6 text-3xl font-extrabold text-brand-900">{t.productNotFound}</h1>
          <a href="/#products" className="mt-8 inline-block rounded-xl bg-brand-700 px-6 py-3 font-extrabold text-white hover:bg-brand-800">
            {t.cart.browse}
          </a>
        </div>
      </main>
    )
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <main className="bg-white">
      <ProductDetail t={t} lang={lang} p={product} cart={cart} categories={categories} />
      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-brand-50/60 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-6 text-2xl font-extrabold text-brand-900">{t.relatedProducts}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  t={t}
                  lang={lang}
                  cart={cart}
                  category={categoryName(categories, p.category, lang)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

function ProductDetail({ t, lang, p, cart, categories }) {
  const name = p.name[lang] || p.name.en
  const use = p.use[lang] || p.use.en
  const category = categoryName(categories, p.category, lang)
  const [picked, setPackIdx] = useState(0)
  const packIdx = picked < p.packs.length ? picked : 0
  const mrp = p.prices?.[packIdx]
  const hasPrice = mrp != null
  const offer = hasPrice ? p.offer || 0 : 0
  const price = hasPrice ? offerPrice(mrp, offer) : 0
  const pack = p.packs[packIdx]
  const inCart = cart.items.find((i) => i.id === p.id && i.pack === pack)?.qty || 0
  const save = hasPrice && offer > 0 ? mrp - price : 0

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <nav className="text-sm font-semibold text-gray-500" aria-label="Breadcrumb">
        <a href="/" className="hover:text-brand-700">{t.backHome}</a>
        <span className="mx-2">/</span>
        <a href="/#products" className="hover:text-brand-700">{t.productsTitle}</a>
        <span className="mx-2">/</span>
        <span className="text-brand-900">{name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="relative overflow-hidden rounded-2xl bg-brand-50 ring-1 ring-gray-200">
          <LazyImg src={p.image} alt={name} className="aspect-[4/3] w-full sm:aspect-square" />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand-800">
            {category}
          </span>
          {offer > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold text-white">
              {offer}% {t.off}
            </span>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-extrabold leading-tight text-brand-900 sm:text-4xl">{name}</h1>
          {use && <p className="mt-3 text-lg text-gray-600">{use}</p>}

          <div className="mt-6" role="radiogroup" aria-label={t.packSizes}>
            <p className="mb-2 text-sm font-bold text-gray-700">{t.packSizes}</p>
            <div className="flex flex-wrap gap-2">
              {p.packs.map((pk, i) => (
                <button
                  key={pk}
                  type="button"
                  role="radio"
                  aria-checked={i === packIdx}
                  onClick={() => setPackIdx(i)}
                  className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                    i === packIdx
                      ? 'bg-brand-800 text-white'
                      : 'bg-brand-50 text-brand-900 ring-1 ring-brand-100 hover:bg-brand-100'
                  }`}
                >
                  {pk}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            {hasPrice ? (
              <div className="leading-tight">
                <span className="block text-3xl font-extrabold text-brand-900">{formatRupees(price)}</span>
                {offer > 0 && (
                  <p className="mt-1 text-sm">
                    <span className="text-gray-400 line-through">{formatRupees(mrp)}</span>
                    {save > 0 && (
                      <span className="ml-2 font-bold text-brand-700">
                        {t.youSave} {formatRupees(save)}
                      </span>
                    )}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-lg font-bold text-gold-600">{t.priceOnRequest}</p>
            )}
            <AddButton t={t} qty={inCart} label={name} onChange={(q) => (inCart ? cart.setQty(p.id, pack, q) : cart.add(p.id, pack, q))} />
          </div>

          {p.packs.length > 1 && p.prices?.length === p.packs.length && (
            <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-gray-200">
              <table className="w-full text-left text-sm">
                <caption className="bg-brand-50 px-4 py-2 text-left text-sm font-bold text-brand-900">
                  {t.otherPacks}
                </caption>
                <thead className="sr-only">
                  <tr>
                    <th>{t.packSizes}</th>
                    <th>{t.total}</th>
                  </tr>
                </thead>
                <tbody>
                  {p.packs.map((pk, i) => {
                    const packMrp = p.prices[i]
                    const packPrice = offerPrice(packMrp, p.offer || 0)
                    return (
                      <tr key={pk} className={i === packIdx ? 'bg-brand-50' : 'bg-white'}>
                        <td className="px-4 py-2.5 font-semibold text-brand-900">{pk}</td>
                        <td className="px-4 py-2.5 text-right font-extrabold text-brand-900">
                          {formatRupees(packPrice)}
                          {p.offer > 0 && (
                            <span className="ml-2 text-xs font-semibold text-gray-400 line-through">{formatRupees(packMrp)}</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={whatsappLink(p.name.en, pack)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-wa px-4 py-3 font-extrabold text-white hover:bg-wa-dark"
            >
              <WhatsAppIcon />
              {t.askOnWhatsapp}
            </a>
            <a
              href={telLink}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-700 px-4 py-3 font-extrabold text-brand-800 hover:bg-brand-50"
            >
              <PhoneIcon />
              {t.callNow}
            </a>
          </div>

          {p.category === 'pesticide' && (
            <p className="mt-6 rounded-xl bg-gold-300/30 p-4 text-sm leading-relaxed text-brand-900">{t.pesticideNote}</p>
          )}
        </div>
      </div>
    </div>
  )
}
