import { IMAGES } from '../config'
import { telLink, whatsappLink } from '../utils'
import { PhoneIcon, WhatsAppIcon } from './Icons'

export default function Hero({ t }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-900">
      <img
        src={IMAGES.hero}
        srcSet={`${IMAGES.heroSmall} 640w, ${IMAGES.hero} 1280w`}
        sizes="100vw"
        alt=""
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-950/70 via-brand-950/55 to-brand-950/80" />

      <div className="mx-auto flex min-h-[min(80vh,640px)] max-w-6xl flex-col justify-center px-4 py-16 text-white">
        <p className="mb-4 inline-block self-start rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-brand-950 sm:text-sm">
          {t.heroBadge}
        </p>
        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">{t.heroTitle}</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">{t.heroText}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={telLink}
            className="flex items-center justify-center gap-2 rounded-xl bg-gold-400 px-6 py-4 text-lg font-extrabold text-brand-950 shadow-lg hover:bg-gold-300"
          >
            <PhoneIcon className="h-6 w-6" /> {t.callNow}
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-wa px-6 py-4 text-lg font-extrabold text-white shadow-lg hover:bg-wa-dark"
          >
            <WhatsAppIcon className="h-6 w-6" /> {t.whatsappUs}
          </a>
        </div>
      </div>
    </section>
  )
}
