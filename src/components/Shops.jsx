import { SHOPS } from '../config'
import { ClockIcon, MapPinIcon, PhoneSolidIcon } from './Icons'
import Section, { LazyImg } from './Section'

export default function Shops({ t, lang }) {
  return (
    <Section id="shops" title={t.shopsTitle} subtitle={t.shopsText} className="bg-brand-50">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SHOPS.map((shop) => (
          <ShopCard key={shop.id} shop={shop} t={t} lang={lang} />
        ))}
      </div>
    </Section>
  )
}

function ShopCard({ shop, t, lang }) {
  const name = shop.name[lang] || shop.name.en
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(shop.mapQuery)}`

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
      <div className="relative">
        <LazyImg src={shop.image} alt={name} className="aspect-[16/9] w-full" />
        {shop.main && (
          <span className="absolute left-2 top-2 rounded-full bg-gold-400 px-2.5 py-0.5 text-xs font-extrabold text-brand-950 shadow">
            {t.mainShop}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold text-brand-900">{name}</h3>
        <ul className="mt-2 space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
            {shop.address[lang] || shop.address.en}
          </li>
          <li className="flex gap-2">
            <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
            {shop.hours[lang] || shop.hours.en}
          </li>
          <li className="flex gap-2">
            <PhoneSolidIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
            {shop.phoneDisplay}
          </li>
        </ul>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-700 py-2.5 text-sm font-bold text-white hover:bg-brand-800"
          >
            <MapPinIcon className="h-4 w-4" /> {t.directions}
          </a>
          <a
            href={`tel:${shop.phone}`}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-50 py-2.5 text-sm font-bold text-brand-900 ring-1 ring-brand-100 hover:bg-brand-100"
          >
            <PhoneSolidIcon className="h-4 w-4" /> {t.call}
          </a>
        </div>
      </div>
    </article>
  )
}
