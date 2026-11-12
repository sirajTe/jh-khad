import { useEffect, useState } from 'react'
import { TEXT } from '@/translations'
import type { BookingRequest, Language } from '@/types'
import Header from '@/features/layout/Header'
import Hero from '@/features/home/Hero'
import Categories from '@/features/catalog/Categories'
import Products from '@/features/catalog/Products'
import Shops from '@/features/home/Shops'
import WhyUs from '@/features/home/WhyUs'
import Gallery from '@/features/home/Gallery'
import EnquiryForm from '@/features/enquiry/EnquiryForm'
import BookingModal from '@/features/enquiry/BookingModal'
import Contact from '@/features/home/Contact'
import Footer from '@/features/layout/Footer'
import FloatingButtons from '@/features/layout/FloatingButtons'
import PolicyPage from '@/pages/PolicyPage'
import ProductPage from '@/pages/ProductPage'
import { findPolicy } from '@/content/policies'
import { productIdFromPath } from '@/shared/lib/routes'
import { cartCount, useCart } from '@/features/cart/store'
import { CartBar, CartPanel } from '@/features/cart/Cart'

function getSavedLang(): Language {
  try {
    return localStorage.getItem('lang') === 'hi' ? 'hi' : 'en'
  } catch {
    return 'en'
  }
}

export default function App() {
  const [lang, setLang] = useState<Language>(getSavedLang)
  const [filter, setFilter] = useState<string>('all')
  const [booking, setBooking] = useState<BookingRequest | null>(null) // set → Order Now popup is open
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

  const showCategory = (category: string) => {
    setFilter(category)
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  const openBooking = (productName?: string, quantity?: string) => {
    setBooking({ name: productName, quantity, at: Date.now() })
  }

  const header = (
    <Header
      t={t}
      lang={lang}
      onToggleLang={toggleLang}
      cartCount={cartCount(cart.items)}
      onOpenCart={() => setCartOpen(true)}
    />
  )

  const cartUi = (
    <>
      <CartBar t={t} items={cart.items} onOpen={() => setCartOpen(true)} />
      <CartPanel t={t} lang={lang} cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )

  const raised = cart.items.length > 0 // floating buttons move up above the cart bar
  const policy = findPolicy(window.location.pathname)
  const productId = productIdFromPath(window.location.pathname)

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

  if (productId) {
    return (
      <>
        {header}
        <ProductPage t={t} lang={lang} productId={productId} cart={cart} />
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
        <Categories t={t} lang={lang} onSelect={showCategory} />
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
