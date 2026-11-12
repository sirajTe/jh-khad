import { SHOP } from '../config'
import { telLink, whatsappLink } from '../utils'
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from './Icons'
import Section from './Section'

export default function Contact({ t, lang }) {
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(SHOP.mapQuery)}`
  const address = lang === 'hi' ? SHOP.addressHi : SHOP.address

  const rows = [
    { Icon: MapPinIcon, label: t.address, value: address, href: mapUrl, external: true },
    { Icon: PhoneIcon, label: t.phone, value: SHOP.phoneDisplay, href: telLink },
    { Icon: WhatsAppIcon, label: t.whatsapp, value: SHOP.phoneDisplay, href: whatsappLink(), external: true },
    { Icon: MailIcon, label: t.email, value: SHOP.email, href: `mailto:${SHOP.email}` },
  ]

  return (
    <Section id="contact" title={t.contactTitle}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          {rows.map(({ Icon, label, value, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-start gap-4 rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-100 hover:bg-brand-100"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-800 text-white">
                <Icon />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-gray-600">{label}</span>
                <span className="block break-words text-lg font-semibold text-brand-900">{value}</span>
              </span>
            </a>
          ))}
          <div className="flex items-start gap-4 rounded-2xl bg-gold-300/30 p-4 ring-1 ring-gold-300">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500 text-brand-950">
              <ClockIcon />
            </span>
            <span>
              <span className="block text-sm font-bold text-gray-600">{t.hours}</span>
              <span className="block text-lg font-semibold text-brand-900">{t.hoursMain}</span>
              <span className="block font-semibold text-brand-900">{t.hoursFri}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-2xl ring-1 ring-gray-200">
          <iframe
            title="Google Map"
            src={`${mapUrl}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full flex-1 border-0 bg-brand-50 lg:h-full lg:min-h-96"
          />
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="bg-brand-800 py-3 text-center font-bold text-white hover:bg-brand-900">
            {t.openMap} →
          </a>
        </div>
      </div>
    </Section>
  )
}
