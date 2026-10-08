import { useState } from 'react'
import { SHOP } from '../config'
import { telLink } from '../utils'
import { CloseIcon, MenuIcon, PhoneIcon } from './Icons'

export const NAV_IDS = ['categories', 'products', 'shops', 'why', 'gallery', 'enquiry', 'contact']

// Logo mark: a young sprout rising in front of the sun over farm furrows.
// The same drawing is used for the browser tab icon (public/favicon.svg).
export function LogoMark({ className = 'h-11 w-11' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#166534" />
      <circle cx="24" cy="33" r="13" fill="#facc15" />
      <circle cx="24" cy="33" r="17" fill="none" stroke="#facc15" strokeOpacity=".35" strokeWidth="1.5" />
      <path d="M0 33h48v3a12 12 0 0 1-12 12H12A12 12 0 0 1 0 36z" fill="#0b3d20" />
      <path d="M5 39.5q19-4.5 38 0M10 44.5q14-3 28 0" fill="none" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24 34V21" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M24 29c-.6-5.2-4.4-8.4-10-8.4 0 5.2 4 8.4 10 8.4z" fill="#fff" />
      <path d="M24 25c.6-6.2 5-9.6 11.2-9.6 0 6.2-4.8 9.6-11.2 9.6z" fill="#dcfce7" />
    </svg>
  )
}

export function Logo({ t, light = false }) {
  const [first, ...rest] = SHOP.name.split(' ') // "JH" + "KHAD BHANDAR"
  return (
    <a href="#top" className="flex min-w-0 items-center gap-2.5" aria-label={SHOP.name}>
      <LogoMark className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
      <span className="min-w-0 leading-none">
        <span className={`block truncate text-base font-black tracking-wide sm:text-xl ${light ? 'text-white' : 'text-brand-900'}`}>
          <span className={light ? 'text-gold-400' : 'text-gold-600'}>{first}</span> {rest.join(' ')}
        </span>
        <span className={`mt-1 block truncate text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-xs ${light ? 'text-white/70' : 'text-brand-700'}`}>
          {t.tagline}
        </span>
      </span>
    </a>
  )
}

export default function Header({ t, lang, onToggleLang }) {
  const [open, setOpen] = useState(false)

  return (
    <header id="top" className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4">
        <Logo t={t} />

        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex gap-5 text-sm font-semibold text-gray-700">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="hover:text-brand-700">{t.nav[id]}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onToggleLang}
            className="rounded-lg border-2 border-gold-500 px-2.5 py-1.5 text-sm font-bold text-brand-900 hover:bg-gold-300/40"
            aria-label="Change language / भाषा बदलें"
          >
            {lang === 'en' ? 'हिंदी' : 'EN'}
          </button>
          <a
            href={telLink}
            className="flex items-center gap-1.5 rounded-lg bg-brand-700 px-3 py-2 text-sm font-bold text-white hover:bg-brand-800"
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{t.callNow}</span>
          </a>
          <button
            type="button"
            className="rounded-lg p-1.5 text-brand-900 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={t.menu}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-brand-100 bg-white lg:hidden" aria-label="Mobile">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-gray-100 py-3 text-base font-semibold text-gray-800 last:border-0"
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
