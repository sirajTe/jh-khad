import { whatsappLink } from '../utils'
import { WhatsAppIcon } from './Icons'

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-xl ring-4 ring-white hover:bg-wa-dark sm:h-16 sm:w-16"
    >
      <WhatsAppIcon className="h-8 w-8 sm:h-9 sm:w-9" />
    </a>
  )
}
