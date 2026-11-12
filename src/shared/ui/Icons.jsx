const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const PhoneIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
)

// Filled phone, to sit next to the filled WhatsApp logo
export const PhoneSolidIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
  </svg>
)

export const WhatsAppIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.9L.2 24l6.3-1.6A11.8 11.8 0 0 0 24 12a11.7 11.7 0 0 0-3.6-8.4z" />
  </svg>
)

export const MapPinIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export const MailIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
)

export const ClockIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
)

export const MenuIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
)

export const CloseIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

export const CheckIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const CartIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
    <path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L21 8H6.2" />
  </svg>
)

export const ShieldIcon = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const ChatIcon = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

export const StoreIcon = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M3 9 4.5 4h15L21 9M3 9v11h18V9M3 9h18M9 20v-6h6v6" />
  </svg>
)

export const RupeeIcon = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a5 5 0 0 0 0-10" />
  </svg>
)
