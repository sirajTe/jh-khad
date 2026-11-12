import { ChatIcon, RupeeIcon, ShieldIcon, StoreIcon } from './Icons'
import Section from './Section'

const ICONS = [ShieldIcon, ChatIcon, StoreIcon, RupeeIcon]

export default function WhyUs({ t }) {
  return (
    <Section id="why" title={t.whyTitle} className="bg-brand-900 [&_h2]:text-white">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.why.map((item, i) => {
          const Icon = ICONS[i]
          return (
            <div key={item.title} className="rounded-2xl bg-white/5 p-5 text-white ring-1 ring-white/10">
              <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400 text-brand-950">
                <Icon />
              </span>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-1 text-white/80">{item.text}</p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
