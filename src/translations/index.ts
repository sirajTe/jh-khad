import type { Language } from '@/types'

export interface FormTranslations {
  name: string
  mobile: string
  village: string
  address: string
  addressPh: string
  pincode: string
  product: string
  quantity: string
  message: string
  remark: string
  quantityPh: string
  messagePh: string
  productPh: string
  submit: string
  sending: string
  thanks: string
  sendAnother: string
  errName: string
  errMobile: string
  errVillage: string
  errNameInvalid: string
  errAddress: string
  errAddressShort: string
  errPincode: string
  errProduct: string
  errQuantity: string
  errSend: string
  errSetup: string
}

export interface CartTranslations {
  title: string
  item: string
  items: string
  view: string
  empty: string
  emptyText: string
  browse: string
  bill: string
  itemTotal: string
  discount: string
  toPay: string
  saving: string
  onRequestNote: string
  proceed: string
  viaWhatsapp: string
  checkout: string
  back: string
  address: string
  note: string
  confirmNote: string
  place: string
  placedTitle: string
  placed: string
  orderId: string
  placedText: string
  continue: string
  payment: string
  payCod: string
  payUpi: string
  payUpiHint: string
  payTitle: string
  payAmount: string
  scanQr: string
  upiId: string
  copy: string
  copied: string
  payNote: string
  sendProof: string
  payLaterNote: string
}

export interface WhyItem {
  title: string
  text: string
}

export interface Translation {
  tagline: string
  nav: Record<string, string>
  callNow: string
  whatsappUs: string
  menu: string
  heroBadge: string
  heroTitle: string
  heroText: string
  categoriesTitle: string
  viewProducts: string
  productsTitle: string
  all: string
  packSizes: string
  priceOnRequest: string
  off: string
  youSave: string
  qty: string
  total: string
  orderNow: string
  add: string
  remove: string
  cart: CartTranslations
  close: string
  call: string
  whatsapp: string
  noProducts: string
  viewDetails: string
  relatedProducts: string
  productNotFound: string
  askOnWhatsapp: string
  pesticideNote: string
  otherPacks: string
  whyTitle: string
  why: readonly WhyItem[]
  galleryTitle: string
  enquiryTitle: string
  enquiryText: string
  form: FormTranslations
  shopsTitle: string
  shopsText: string
  mainShop: string
  directions: string
  contactTitle: string
  address: string
  phone: string
  email: string
  hours: string
  hoursMain: string
  hoursFri: string
  openMap: string
  footerAbout: string
  quickLinks: string
  rights: string
  policies: string
  backHome: string
  lastUpdated: string
  policyEnglishNote: string
}

// All website text in English (en) and Hindi (hi).
export const TEXT: Record<Language, Translation> = {
  en: {
    tagline: 'Fertilizers · Pesticides · Seeds',
    nav: {
      categories: 'Categories',
      products: 'Products',
      shops: 'Shops',
      why: 'Why Us',
      gallery: 'Gallery',
      enquiry: 'Enquiry',
      contact: 'Contact',
    },
    callNow: 'Call Now',
    whatsappUs: 'WhatsApp Us',
    menu: 'Menu',
    heroBadge: 'Trusted by farmers of Katihar, Purnia, Kishanganj & Araria',
    heroTitle: 'Genuine Seeds, Fertilizers & Pesticides for Your Farm',
    heroText: 'Quality products and honest advice for maize, makhana, paddy, wheat and vegetables.',
    categoriesTitle: 'Our Categories',
    viewProducts: 'View products',
    productsTitle: 'Our Products',
    all: 'All',
    packSizes: 'Pack sizes',
    priceOnRequest: 'Price on Request',
    off: 'OFF',
    youSave: 'You save',
    qty: 'Qty',
    total: 'Total',
    orderNow: 'Order Now',
    add: 'ADD',
    remove: 'Remove one',
    cart: {
      title: 'My Cart',
      item: 'item',
      items: 'items',
      view: 'View Cart',
      empty: 'Your cart is empty',
      emptyText: 'Add seeds, fertilizers or pesticides to get started.',
      browse: 'Browse products',
      bill: 'Bill details',
      itemTotal: 'Item total (MRP)',
      discount: 'Discount',
      toPay: 'To pay',
      saving: 'You are saving',
      onRequestNote: 'Some items are price on request — we will tell you the price on call.',
      proceed: 'Proceed',
      viaWhatsapp: 'or order on WhatsApp',
      checkout: 'Delivery details',
      back: 'Back to cart',
      address: 'Village / Address',
      note: 'Note for shop (optional)',
      confirmNote: 'We will call you to confirm the order. Pay at the shop or on delivery.',
      place: 'Place Order',
      placedTitle: 'Order placed',
      placed: 'Your order is placed!',
      orderId: 'Your order ID',
      placedText: 'Please keep this ID. We will call you soon to confirm.',
      continue: 'Continue shopping',
      payment: 'Payment method',
      payCod: 'Pay at shop / on delivery',
      payUpi: 'Pay now with UPI',
      payUpiHint: 'PhonePe, Google Pay, Paytm or any UPI app',
      payTitle: 'Pay with UPI',
      payAmount: 'Amount to pay',
      scanQr: 'Scan this QR from any UPI app, or pay to the UPI ID below',
      upiId: 'UPI ID',
      copy: 'Copy',
      copied: 'Copied',
      payNote: 'After paying, send the payment screenshot with your order ID on WhatsApp.',
      sendProof: 'Send screenshot on WhatsApp',
      payLaterNote: 'The final amount will be confirmed on call. You can pay to this UPI ID after that.',
    },
    close: 'Close',
    call: 'Call',
    whatsapp: 'WhatsApp',
    noProducts: 'No products in this category yet.',
    viewDetails: 'View details',
    relatedProducts: 'Related products',
    productNotFound: 'This product is not available.',
    askOnWhatsapp: 'Ask on WhatsApp',
    pesticideNote:
      'Use pesticides only as directed on the pack. Wear protection, keep away from children and food, and ask us if you are unsure which product fits your crop.',
    otherPacks: 'All pack sizes',
    whyTitle: 'Why Choose Us',
    why: [
      { title: 'Genuine Products', text: 'Only original products from trusted companies.' },
      { title: 'Free Crop Advice', text: 'Tell us your crop problem — we suggest the right solution.' },
      { title: 'Local Shop', text: 'Right here in Karanpur, Barsoi. Easy to reach.' },
      { title: 'Fair Prices', text: 'Honest prices for every farmer, big or small.' },
    ],
    galleryTitle: 'Our Farmers, Our Fields',
    enquiryTitle: 'Send an Enquiry',
    enquiryText: 'Fill the form and we will call you back.',
    form: {
      name: 'Your Name',
      mobile: 'Mobile Number',
      village: 'Village',
      address: 'Address',
      addressPh: 'Village / house, post office',
      pincode: 'PIN Code',
      product: 'Product Name',
      quantity: 'Quantity',
      message: 'Message',
      remark: 'Remark (optional)',
      quantityPh: 'e.g. 5 kg',
      messagePh: 'Your crop, problem or question',
      productPh: 'Choose or type product name',
      submit: 'Send Enquiry',
      sending: 'Sending...',
      thanks: 'Thank you! We will contact you soon.',
      sendAnother: 'Send another enquiry',
      errName: 'Please enter your name',
      errMobile: 'Please enter a valid 10-digit mobile number',
      errVillage: 'Please enter your village',
      errNameInvalid: 'Please enter a valid name (letters only)',
      errAddress: 'Please enter your address',
      errAddressShort: 'Please enter your full address',
      errPincode: 'Please enter a valid PIN code',
      errProduct: 'Please enter the product name',
      errQuantity: 'Please enter the quantity, e.g. 5 kg',
      errSend: 'Could not send. Please call or WhatsApp us.',
      errSetup: 'Enquiry form is not connected yet. Please call or WhatsApp us.',
    },
    shopsTitle: 'Our Shops',
    shopsText: 'Visit your nearest JH AGRO AGENCY shop.',
    mainShop: 'Main Shop',
    directions: 'Directions',
    contactTitle: 'Contact Us',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    hours: 'Shop Hours',
    hoursMain: 'Mon – Sun: 7:00 AM – 6:30 PM',
    hoursFri: 'Friday: 8:00 AM – 12:00 PM',
    openMap: 'Open in Google Maps',
    footerAbout: 'Agricultural products — micronutrient fertilizers, pesticides & seeds.',
    quickLinks: 'Quick Links',
    rights: 'All rights reserved.',
    policies: 'Policies',
    backHome: 'Back to home',
    lastUpdated: 'Last updated',
    policyEnglishNote: '',
  },
  hi: {
    tagline: 'खाद · कीटनाशक · बीज',
    nav: {
      categories: 'श्रेणियाँ',
      products: 'उत्पाद',
      shops: 'दुकानें',
      why: 'हमें क्यों चुनें',
      gallery: 'गैलरी',
      enquiry: 'पूछताछ',
      contact: 'संपर्क',
    },
    callNow: 'अभी कॉल करें',
    whatsappUs: 'व्हाट्सऐप करें',
    menu: 'मेनू',
    heroBadge: 'कटिहार, पूर्णिया, किशनगंज और अररिया के किसानों का भरोसा',
    heroTitle: 'आपके खेत के लिए असली बीज, खाद और कीटनाशक',
    heroText: 'मक्का, मखाना, धान, गेहूं और सब्जियों के लिए अच्छे उत्पाद और सही सलाह।',
    categoriesTitle: 'हमारी श्रेणियाँ',
    viewProducts: 'उत्पाद देखें',
    productsTitle: 'हमारे उत्पाद',
    all: 'सभी',
    packSizes: 'पैक साइज़',
    priceOnRequest: 'कीमत के लिए संपर्क करें',
    off: 'छूट',
    youSave: 'आपकी बचत',
    qty: 'मात्रा',
    total: 'कुल',
    orderNow: 'ऑर्डर करें',
    add: 'जोड़ें',
    remove: 'एक कम करें',
    cart: {
      title: 'मेरी कार्ट',
      item: 'सामान',
      items: 'सामान',
      view: 'कार्ट देखें',
      empty: 'आपकी कार्ट खाली है',
      emptyText: 'बीज, खाद या कीटनाशक जोड़ें।',
      browse: 'उत्पाद देखें',
      bill: 'बिल',
      itemTotal: 'सामान का कुल (MRP)',
      discount: 'छूट',
      toPay: 'कुल भुगतान',
      saving: 'आपकी बचत',
      onRequestNote: 'कुछ सामान की कीमत कॉल पर बताई जाएगी।',
      proceed: 'आगे बढ़ें',
      viaWhatsapp: 'या व्हाट्सऐप पर ऑर्डर करें',
      checkout: 'डिलीवरी की जानकारी',
      back: 'कार्ट पर वापस',
      address: 'गाँव / पता',
      note: 'दुकान के लिए संदेश (वैकल्पिक)',
      confirmNote: 'ऑर्डर पक्का करने के लिए हम आपको कॉल करेंगे। भुगतान दुकान पर या डिलीवरी पर करें।',
      place: 'ऑर्डर करें',
      placedTitle: 'ऑर्डर हो गया',
      placed: 'आपका ऑर्डर हो गया!',
      orderId: 'आपका ऑर्डर नंबर',
      placedText: 'यह नंबर संभाल कर रखें। हम जल्द ही कॉल करेंगे।',
      continue: 'खरीदारी जारी रखें',
      payment: 'भुगतान का तरीका',
      payCod: 'दुकान पर / डिलीवरी पर भुगतान',
      payUpi: 'अभी UPI से भुगतान करें',
      payUpiHint: 'PhonePe, Google Pay, Paytm या कोई भी UPI ऐप',
      payTitle: 'UPI से भुगतान करें',
      payAmount: 'भुगतान राशि',
      scanQr: 'किसी भी UPI ऐप से यह QR स्कैन करें, या नीचे दी गई UPI ID पर भुगतान करें',
      upiId: 'UPI ID',
      copy: 'कॉपी',
      copied: 'कॉपी हो गया',
      payNote: 'भुगतान के बाद, ऑर्डर नंबर के साथ भुगतान का स्क्रीनशॉट व्हाट्सऐप पर भेजें।',
      sendProof: 'व्हाट्सऐप पर स्क्रीनशॉट भेजें',
      payLaterNote: 'अंतिम राशि कॉल पर बताई जाएगी। उसके बाद इस UPI ID पर भुगतान करें।',
    },
    close: 'बंद करें',
    call: 'कॉल',
    whatsapp: 'व्हाट्सऐप',
    noProducts: 'इस श्रेणी में अभी कोई उत्पाद नहीं है।',
    viewDetails: 'विवरण देखें',
    relatedProducts: 'सम्बंधित उत्पाद',
    productNotFound: 'यह उत्पाद उपलब्ध नहीं है।',
    askOnWhatsapp: 'व्हाट्सऐप पर पूछें',
    pesticideNote:
      'कीटनाशक केवल पैक पर लिखे निर्देश के अनुसार इस्तेमाल करें। बचाव पहनें, बच्चों और खाने से दूर रखें, और फसल के हिसाब से सही उत्पाद के लिए हमसे पूछें।',
    otherPacks: 'सभी पैक साइज़',
    whyTitle: 'हमें क्यों चुनें',
    why: [
      { title: 'असली उत्पाद', text: 'भरोसेमंद कंपनियों के केवल असली उत्पाद।' },
      { title: 'मुफ़्त फसल सलाह', text: 'अपनी फसल की समस्या बताएं — हम सही उपाय बताएंगे।' },
      { title: 'स्थानीय दुकान', text: 'यहीं करनपुर, बारसोई में। आसानी से पहुँचें।' },
      { title: 'उचित दाम', text: 'हर किसान के लिए ईमानदार दाम।' },
    ],
    galleryTitle: 'हमारे किसान, हमारे खेत',
    enquiryTitle: 'पूछताछ भेजें',
    enquiryText: 'फ़ॉर्म भरें, हम आपको कॉल करेंगे।',
    form: {
      name: 'आपका नाम',
      mobile: 'मोबाइल नंबर',
      village: 'गाँव',
      address: 'पता',
      addressPh: 'गाँव / मकान, डाकघर',
      pincode: 'पिन कोड',
      product: 'उत्पाद का नाम',
      quantity: 'मात्रा',
      message: 'संदेश',
      remark: 'टिप्पणी (वैकल्पिक)',
      quantityPh: 'जैसे 5 किलो',
      messagePh: 'आपकी फसल, समस्या या सवाल',
      productPh: 'उत्पाद चुनें या नाम लिखें',
      submit: 'पूछताछ भेजें',
      sending: 'भेजा जा रहा है...',
      thanks: 'धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।',
      sendAnother: 'एक और पूछताछ भेजें',
      errName: 'कृपया अपना नाम लिखें',
      errMobile: 'कृपया सही 10 अंकों का मोबाइल नंबर लिखें',
      errVillage: 'कृपया अपने गाँव का नाम लिखें',
      errNameInvalid: 'कृपया सही नाम लिखें (केवल अक्षर)',
      errAddress: 'कृपया अपना पता लिखें',
      errAddressShort: 'कृपया अपना पूरा पता लिखें',
      errPincode: 'कृपया सही पिन कोड लिखें',
      errProduct: 'कृपया उत्पाद का नाम लिखें',
      errQuantity: 'कृपया मात्रा लिखें, जैसे 5 किलो',
      errSend: 'भेजा नहीं जा सका। कृपया कॉल या व्हाट्सऐप करें।',
      errSetup: 'पूछताछ फ़ॉर्म अभी चालू नहीं है। कृपया कॉल या व्हाट्सऐप करें।',
    },
    shopsTitle: 'हमारी दुकानें',
    shopsText: 'अपनी नज़दीकी JH एग्रो एजेंसी दुकान पर आएं।',
    mainShop: 'मुख्य दुकान',
    directions: 'रास्ता देखें',
    contactTitle: 'संपर्क करें',
    address: 'पता',
    phone: 'फ़ोन',
    email: 'ईमेल',
    hours: 'दुकान का समय',
    hoursMain: 'सोम – रवि: सुबह 7:00 – शाम 6:30',
    hoursFri: 'शुक्रवार: सुबह 8:00 – दोपहर 12:00',
    openMap: 'गूगल मैप में खोलें',
    footerAbout: 'कृषि उत्पाद — सूक्ष्म पोषक खाद, कीटनाशक और बीज।',
    quickLinks: 'लिंक',
    rights: 'सर्वाधिकार सुरक्षित।',
    policies: 'नीतियाँ',
    backHome: 'होम पेज पर जाएँ',
    lastUpdated: 'अंतिम अपडेट',
    policyEnglishNote: 'यह नीति अंग्रेज़ी में है। कोई सवाल हो तो हमें कॉल या व्हाट्सऐप करें।',
  },
}
