import { useEffect, useState } from 'react'
import { TEXT } from './i18n'
import Header from './components/Header'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Products from './components/Products'
import Shops from './components/Shops'
import WhyUs from './components/WhyUs'
import Gallery from './components/Gallery'
import EnquiryForm from './components/EnquiryForm'
import BookingModal from './components/BookingModal'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'

function getSavedLang() {
  try {
    return localStorage.getItem('lang') === 'hi' ? 'hi' : 'en'
  } catch {
    return 'en'
  }
}

export default function App() {
  const [lang, setLang] = useState(getSavedLang)
  const [filter, setFilter] = useState('all')
  const [booking, setBooking] = useState(null) // set → Order Now popup is open
  const t = TEXT[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // storage blocked — language just won't be remembered
    }
  }, [lang])

  const toggleLang = () => setLang((l) => (l === 'en' ? 'hi' : 'en'))

  const showCategory = (category) => {
    setFilter(category)
    document.getElementById('products')?.scrollIntoView()
  }

  const openBooking = (productName, quantity) => {
    setBooking({ name: productName, quantity, at: Date.now() })
  }

  return (
    <>
      <Header t={t} lang={lang} onToggleLang={toggleLang} />
      <main>
        <Hero t={t} onBook={() => openBooking()} />
        <Categories t={t} onSelect={showCategory} />
        <Products t={t} lang={lang} filter={filter} setFilter={setFilter} onBook={openBooking} />
        <Shops t={t} lang={lang} />
        <WhyUs t={t} />
        <Gallery t={t} />
        <EnquiryForm t={t} lang={lang} />
        <Contact t={t} lang={lang} />
      </main>
      <Footer t={t} lang={lang} />
      <FloatingButtons t={t} />
      <BookingModal t={t} lang={lang} booking={booking} onClose={() => setBooking(null)} />
    </>
  )
}
