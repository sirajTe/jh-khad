export default function Section({ id, title, subtitle, className = '', children }) {
  return (
    <section id={id} className={`py-14 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">{title}</h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-gold-500" />
          {subtitle && <p className="mt-3 text-gray-600">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

// Lazy-loaded image with a soft green background while it loads.
export function LazyImg({ src, alt, className = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`bg-brand-100 object-cover ${className}`}
    />
  )
}
