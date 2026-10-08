import { SHOP } from '../config'
import { telLink, whatsappLink } from '../utils'
import { Logo, NAV_IDS } from './Header'

export default function Footer({ t, lang }) {
  return (
    <footer className="bg-brand-950 pb-32 pt-12 md:pb-24 text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3">
        <div>
          <Logo t={t} light />
          <p className="mt-3 text-sm">{t.footerAbout}</p>
        </div>
        <div>
          <h3 className="mb-3 font-bold text-gold-400">{t.quickLinks}</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {NAV_IDS.map((id) => (
              <li key={id}><a href={`#${id}`} className="hover:text-white">{t.nav[id]}</a></li>
            ))}
          </ul>
        </div>
        <div className="space-y-1.5 text-sm">
          <h3 className="mb-3 font-bold text-gold-400">{t.contactTitle}</h3>
          <p>{lang === 'hi' ? SHOP.addressHi : SHOP.address}</p>
          <p><a href={telLink} className="hover:text-white">{SHOP.phoneDisplay}</a></p>
          <p><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp</a></p>
          <p><a href={`mailto:${SHOP.email}`} className="break-words hover:text-white">{SHOP.email}</a></p>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-6 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {SHOP.name}. {t.rights}
      </p>
    </footer>
  )
}
