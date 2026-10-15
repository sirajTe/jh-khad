import { useCategories } from '../products'
import Section, { LazyImg } from './Section'

export default function Categories({ t, lang, onSelect }) {
  const categories = useCategories()
  return (
    <Section id="categories" title={t.categoriesTitle} className="bg-brand-50">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c.id)}
            className="group overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-brand-100 transition hover:shadow-md"
          >
            <LazyImg src={c.image} alt={c.name[lang]} className="h-44 w-full transition group-hover:scale-105" />
            <div className="p-4">
              <h3 className="text-lg font-bold text-brand-900">{c.name[lang]}</h3>
              <p className="mt-1 text-sm text-gray-600">{c.desc[lang]}</p>
              <span className="mt-3 inline-block font-bold text-gold-600">{t.viewProducts} →</span>
            </div>
          </button>
        ))}
      </div>
    </Section>
  )
}
