import { IMAGES } from '../config'
import Section, { LazyImg } from './Section'

export default function Gallery({ t }) {
  return (
    <Section id="gallery" title={t.galleryTitle}>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {IMAGES.gallery.map((src, i) => (
          <LazyImg key={src} src={src} alt={`${t.galleryTitle} ${i + 1}`} className="aspect-square w-full rounded-xl sm:aspect-[4/3]" />
        ))}
      </div>
    </Section>
  )
}
