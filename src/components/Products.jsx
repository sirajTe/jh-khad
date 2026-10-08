import { PRODUCTS } from '../config'
import { telLink, whatsappLink } from '../utils'
import { CATEGORY_IDS } from './Categories'
import { PhoneIcon, WhatsAppIcon } from './Icons'
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
      <div className="relative">
        <LazyImg src={p.image} alt={name} className="aspect-[4/3] w-full" />
        <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-bold text-brand-800">
          {t.categories[p.category]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold leading-snug text-brand-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-600">{use}</p>
        <p className="mt-3 text-sm">
          <span className="font-semibold text-gray-700">{t.packSizes}: </span>
          {p.packs.join(' · ')}
        </p>
        <p className="mt-2 font-bold text-gold-600">{t.priceOnRequest}</p>

        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={() => onBook(p.name.en)}
            className="w-full rounded-xl bg-gold-400 py-3 text-base font-extrabold text-brand-950 hover:bg-gold-300"
          >
            {t.bookNow}
          </button>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <a
              href={telLink}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-700 py-3 text-sm font-bold text-white hover:bg-brand-800"
            >
              <PhoneIcon className="h-4 w-4" /> {t.call}
            </a>
            <a
              href={whatsappLink(p.name.en)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-wa py-3 text-sm font-bold text-white hover:bg-wa-dark"
            >
              <WhatsAppIcon className="h-4 w-4" /> {t.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
