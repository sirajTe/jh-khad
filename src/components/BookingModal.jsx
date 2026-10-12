import { useEffect, useRef } from 'react'
import { EnquiryFields } from './EnquiryForm'
import { CloseIcon } from './Icons'

// Popup enquiry form opened by every "Order Now" button.
export default function BookingModal({ t, lang, booking, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!booking || dialog.open) return
    dialog.showModal()
    dialog.querySelector('input[name="name"]')?.focus()
    document.documentElement.style.overflow = 'hidden' // stop the page scrolling behind
  }, [booking])

  const handleClose = () => {
    document.documentElement.style.overflow = ''
    onClose()
  }

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      // a tap on the dark background closes the popup
      onClick={(e) => e.target === ref.current && ref.current.close()}
      aria-labelledby="booking-title"
      className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-black/60"
    >
      <div className="p-5 sm:p-8">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="booking-title" className="text-xl font-extrabold text-brand-900 sm:text-2xl">{t.enquiryTitle}</h2>
            <p className="mt-1 text-gray-600">{t.enquiryText}</p>
          </div>
          <button
            type="button"
            onClick={() => ref.current.close()}
            aria-label={t.close}
            className="shrink-0 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          >
            <CloseIcon />
          </button>
        </div>
        <EnquiryFields t={t} lang={lang} selectedProduct={booking} />
      </div>
    </dialog>
  )
}
