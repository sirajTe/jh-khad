import { useState } from 'react'
import { SHOP } from '../config'
import { telLink } from '../utils'
import { CloseIcon, LeafIcon, MenuIcon, PhoneIcon } from './Icons'

export const NAV_IDS = ['categories', 'products', 'why', 'gallery', 'enquiry', 'contact']

export function Logo({ light = false }) {
  return (
    <a href="#top" className="flex items-center gap-2 min-w-0" aria-label={SHOP.name}>
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-800 font-extrabold text-white">
        JH
        <LeafIcon className="absolute -right-1.5 -top-1.5 h-4 w-4 text-gold-400" />
      </span>
      <span className={`text-sm font-extrabold leading-tight sm:text-lg ${light ? 'text-white' : 'text-brand-900'}`}>
        {SHOP.name}
      </span>
    </a>
  )
}

export default function Header({ t, lang, onToggleLang }) {
  const [open, setOpen] = useState(false)

  return (
    <header id="top" className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4">
        <Logo />

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
