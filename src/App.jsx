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
import PolicyPage from './components/PolicyPage'
import { findPolicy } from './policies'
import { cartCount, useCart } from './cart'
import { CartBar, CartPanel } from './components/Cart'

// /terms, /privacy, /refund, /shipping show a policy page instead of the home page
const policy = findPolicy(window.location.pathname)

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
  const [cartOpen, setCartOpen] = useState(false)
  const cart = useCart()
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

  const header = (
    <Header t={t} lang={lang} onToggleLang={toggleLang} cartCount={cartCount(cart.items)} onOpenCart={() => setCartOpen(true)} />
  )
  const cartUi = (
    <>
      <CartBar t={t} items={cart.items} onOpen={() => setCartOpen(true)} />
      <CartPanel t={t} lang={lang} cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
  const raised = cart.items.length > 0 // floating buttons move up above the cart bar

  if (policy) {
    return (
      <>
        {header}
        <PolicyPage t={t} lang={lang} policy={policy} />
        <Footer t={t} lang={lang} />
        <FloatingButtons t={t} raised={raised} />
        {cartUi}
      </>
    )
  }

  return (
    <>
      {header}
      <main>
        <Hero t={t} onBook={() => openBooking()} />
        <Categories t={t} onSelect={showCategory} />
        <Products t={t} lang={lang} filter={filter} setFilter={setFilter} cart={cart} />
        <Shops t={t} lang={lang} />
        <WhyUs t={t} />
        <Gallery t={t} />
        <EnquiryForm t={t} lang={lang} />
        <Contact t={t} lang={lang} />
      </main>
      <Footer t={t} lang={lang} />
      <FloatingButtons t={t} raised={raised} />
      {cartUi}
      <BookingModal t={t} lang={lang} booking={booking} onClose={() => setBooking(null)} />
    </>
  )
}
