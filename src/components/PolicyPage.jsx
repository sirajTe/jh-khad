import { useEffect } from 'react'
import { SHOP } from '../config'
import { CONTACT_LINES, LAST_UPDATED, POLICIES } from '../policies'

export default function PolicyPage({ t, lang, policy }) {
  const title = policy.title[lang] || policy.title.en

  useEffect(() => {
    document.title = `${policy.title.en} – ${SHOP.name}`
  }, [policy])

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <a href="/" className="text-sm font-bold text-brand-700 hover:underline">← {t.backHome}</a>
        <h1 className="mt-4 text-3xl font-extrabold text-brand-900 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-gray-500">{t.lastUpdated}: {LAST_UPDATED}</p>
        {lang === 'hi' && <p className="mt-4 rounded-lg bg-gold-300/30 p-3 text-sm text-brand-900">{t.policyEnglishNote}</p>}

        <div className="mt-8 space-y-8 text-gray-700">
          {policy.sections.map((s, i) => (
            <section key={s.h || i}>
              {s.h && <h2 className="mb-2 text-xl font-bold text-brand-900">{s.h}</h2>}
              {s.p?.map((text) => <p key={text} className="mb-3 leading-relaxed">{text}</p>)}
              {s.list && (
                <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                  {s.list.map((text) => <li key={text}>{text}</li>)}
                </ul>
              )}
            </section>
          ))}

          <section className="rounded-2xl bg-brand-50 p-5 ring-1 ring-brand-100">
            <h2 className="mb-2 text-xl font-bold text-brand-900">Contact us</h2>
            {CONTACT_LINES.map((line) => <p key={line}>{line}</p>)}
          </section>
        </div>

        <nav className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-gray-200 pt-6 text-sm font-semibold" aria-label={t.policies}>
          {POLICIES.filter((p) => p !== policy).map((p) => (
            <a key={p.path} href={p.path} className="text-brand-700 hover:underline">{p.title[lang] || p.title.en}</a>
          ))}
        </nav>
      </div>
    </main>
  )
}
