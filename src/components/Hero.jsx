import { useEffect, useState } from 'react'
import { IMAGES } from '../config'
import { whatsappLink } from '../utils'
import { CartIcon, WhatsAppIcon } from './Icons'

const slides = IMAGES.heroSlides
const SLIDE_MS = 5000

export default function Hero({ t, onBook }) {
  const [active, setActive] = useState(0)
  const [tick, setTick] = useState(0) // restarts the timer after a dot is tapped

  useEffect(() => {
    if (slides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), SLIDE_MS)
    return () => clearInterval(id)
  }, [tick])

  const goTo = (i) => {
    setActive(i)
    setTick((n) => n + 1)
  }

  return (
    <section className="relative isolate overflow-hidden bg-brand-900">
      {slides.map((img, i) => (
        <img
          key={img.large}
          src={img.large}
          srcSet={`${img.small} 640w, ${img.large} 1280w`}
          sizes="100vw"
          alt=""
          fetchPriority={i === 0 ? 'high' : 'low'}
          className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-1000 ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-950/70 via-brand-950/55 to-brand-950/80" />

      <div className="mx-auto flex min-h-[min(80vh,640px)] max-w-6xl flex-col justify-center px-4 py-16 text-white">
        <p className="mb-4 inline-block self-start rounded-md bg-gold-400 px-3 py-1 sm:rounded-full text-xs font-bold text-brand-950 sm:text-sm">
          {t.heroBadge}
        </p>
        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">{t.heroTitle}</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">{t.heroText}</p>

        {/* Phones: one small Order Now button (Call / WhatsApp float in the corner) */}
        <button
          type="button"
          onClick={onBook}
          className="mt-6 flex items-center gap-2 self-start rounded-lg bg-gold-400 px-4 py-2.5 text-sm font-extrabold text-brand-950 shadow-lg hover:bg-gold-300 md:hidden"
        >
          <CartIcon className="h-4 w-4" /> {t.orderNow}
        </button>

        <div className="mt-8 hidden gap-3 md:flex">
          <button
            type="button"
            onClick={onBook}
            className="flex items-center justify-center gap-2 rounded-xl bg-gold-400 px-6 py-4 text-lg font-extrabold text-brand-950 shadow-lg hover:bg-gold-300"
          >
            <CartIcon className="h-6 w-6" /> {t.orderNow}
          </button>
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
