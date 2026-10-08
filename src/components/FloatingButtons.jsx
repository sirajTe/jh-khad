import { telLink, whatsappLink } from '../utils'
import { PhoneSolidIcon, WhatsAppIcon } from './Icons'

// Round buttons fixed to the bottom-right corner.
// Call shows on phones only (desktops can't dial); WhatsApp shows everywhere.
export default function FloatingButtons({ t }) {
  const round = 'flex h-11 w-11 items-center justify-center rounded-full shadow-lg sm:h-16 sm:w-16'

  return (
    <div className="fixed bottom-4 right-3 z-50 flex flex-col items-center gap-2.5 sm:right-4 sm:gap-3">
      <a href={telLink} aria-label={t.callNow} className={`${round} bg-brand-800 text-white hover:bg-brand-900 md:hidden`}>
        <PhoneSolidIcon className="h-5 w-5 sm:h-8 sm:w-8" />
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsappUs}
        className={`${round} bg-wa text-white hover:bg-wa-dark`}
      >
        <WhatsAppIcon className="h-6 w-6 sm:h-9 sm:w-9" />
      </a>
    </div>
  )
}
