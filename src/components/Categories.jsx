import { IMAGES } from '../config'
import Section, { LazyImg } from './Section'

export const CATEGORY_IDS = ['fertilizer', 'pesticide', 'seed']

export default function Categories({ t, onSelect }) {
  return (
    <Section id="categories" title={t.categoriesTitle} className="bg-brand-50">
      <div className="grid gap-5 sm:grid-cols-3">
        {CATEGORY_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className="group overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-brand-100 transition hover:shadow-md"
          >
            <LazyImg src={IMAGES.categories[id]} alt={t.categories[id]} className="h-44 w-full transition group-hover:scale-105" />
            <div className="p-4">
              <h3 className="text-lg font-bold text-brand-900">{t.categories[id]}</h3>
              <p className="mt-1 text-sm text-gray-600">{t.categoryDesc[id]}</p>
              <span className="mt-3 inline-block font-bold text-gold-600">{t.viewProducts} →</span>
            </div>
          </button>
        ))}
      </div>
    </Section>
  )
}
