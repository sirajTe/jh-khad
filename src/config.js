// =====================================================================
//  JH KHAD BHANDAR — EDIT THIS FILE TO CHANGE SHOP DETAILS, PHOTOS
//  AND PRODUCTS. You do not need to touch any other file.
// =====================================================================

// 1) GOOGLE SHEET LINK
// Paste your Google Apps Script "Web app URL" here (see README.md).
// Enquiries go to the "JH" sheet → "JH" tab:
// https://docs.google.com/spreadsheets/d/1YdJglOuZiBYhmKsZPqL_Y4aRA11hRK5NQ79IK406cqw/edit
export const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyjbukKylJImZ6K3dhcaglQJqvUx2hg-quX6dk6lqUqMd6-jPp5JD-sqi7CtT6B9OvY/exec'

// 2) SHOP DETAILS
export const SHOP = {
  name: 'JH KHAD BHANDAR',
  phone: '+917477445056',
  phoneDisplay: '+91 74774 45056',
  whatsapp: '917477445056',
  email: 'jh749910@gmail.com',
  address: 'Karanpur, Barsoi, Katihar, Bihar - 854317',
  addressHi: 'करनपुर, बारसोई, कटिहार, बिहार - 854317',
  // Text used to search Google Maps for the shop location
  mapQuery: 'Karanpur, Barsoi, Katihar, Bihar 854317',
}

// 3) PHOTOS — replace any link with your own photo link
//    (or put a file in the "public" folder and use '/my-photo.jpg').
//    Unsplash links are resized with ?w=...&q=... to keep them small.
const u = (id, w = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=60&auto=format&fit=crop`

export const IMAGES = {
  // Hero slider — photos change every few seconds. Add or remove ids freely.
  heroSlides: [
    '1574943320219-553eb213f72d', // green paddy fields in village
    '1559884743-74a57598c6c7', // farmer sowing in paddy field
    '1625246333195-78d9c38ad449', // maize crop
    '1500382017468-9049fed747ef', // wheat field at sunset
    '1464226184884-fa280b87c399', // fresh vegetables
  ].map((id) => ({ large: u(id, 1280), small: u(id, 640) })),

  categories: {
    fertilizer: u('1416879595882-3373a0480b5b'), // soil & fertilizer
    pesticide: u('1515150144380-bca9f1650ed9'), // spraying crops
    seed: u('1530836369250-ef72a3f5cda8'), // planting seeds by hand
  },

  products: {
    maizeSeeds: u('1551754655-cd27e38d2076'),
    paddySeeds: u('1586201375761-83865001e31c'),
    zinc: u('1590682680695-43b964a3ae17'),
    boron: u('1586771107445-d3ca888129ff'),
    insecticide: u('1515150144380-bca9f1650ed9'),
    fungicide: u('1598512752271-33f913a5af13'),
    herbicide: u('1627920769842-6887c6df05ca'),
    vegetableSeeds: u('1523348837708-15d4a09cfac2'),
  },

  gallery: [
    u('1559884743-74a57598c6c7'), // farmer sowing in paddy field
    u('1530507629858-e4977d30e9e0'), // woman farmer in field
    u('1625246333195-78d9c38ad449'), // maize crop
    u('1576045057995-568f588f82fb'), // fresh spinach
    u('1592841200221-a6898f307baa'), // tomatoes on the plant
    u('1605000797499-95a51c5269ae'), // farmers working in green field
    u('1628352081506-83c43123ed6d'), // farmer spraying in paddy field
    u('1592982537447-7440770cbfc9'), // green crop field
    u('1499529112087-3cb3b73cec95'), // ripe wheat
    u('1622383563227-04401ab4e5ea'), // hands planting a seedling
    u('1560493676-04071c5f467b'), // crop rows at sunset
    u('1471193945509-9ad0617afabf'), // fresh vegetables at market
  ],
}

// 4) PRODUCTS — add, remove or edit products here.
//    category must be one of: 'fertilizer', 'pesticide', 'seed'
//    prices are in rupees, one for each pack size, in the same order.
//    Remove the prices line to show "Price on Request" instead.
//    offer is the % discount on those prices (remove it or set 0 for no offer).
export const PRODUCTS = [
  {
    id: 'maize-seeds',
    category: 'seed',
    name: { en: 'Hybrid Maize Seeds', hi: 'हाइब्रिड मक्का बीज' },
    use: {
      en: 'High-yield hybrid for Rabi & Kharif maize',
      hi: 'रबी और खरीफ मक्का के लिए अधिक उपज वाला हाइब्रिड',
    },
    packs: ['1 kg', '4 kg', '5 kg'],
    prices: [350, 1300, 1600], // MRP in ₹ for each pack above (dummy)
    offer: 10, // % off MRP (dummy)
    image: IMAGES.products.maizeSeeds,
  },
  {
    id: 'paddy-seeds',
    category: 'seed',
    name: { en: 'Paddy (Dhan) Seeds', hi: 'धान बीज' },
    use: {
      en: 'Hybrid & improved varieties for Kharif paddy',
      hi: 'खरीफ धान के लिए हाइब्रिड और उन्नत किस्में',
    },
    packs: ['3 kg', '6 kg', '10 kg'],
    prices: [900, 1750, 2800], // MRP in ₹ for each pack above (dummy)
    offer: 8, // % off MRP (dummy)
    image: IMAGES.products.paddySeeds,
  },
  {
    id: 'zinc',
    category: 'fertilizer',
    name: { en: 'Zinc Sulphate 33%', hi: 'जिंक सल्फेट 33%' },
    use: {
      en: 'Fixes zinc deficiency in paddy, maize & wheat',
      hi: 'धान, मक्का और गेहूं में जिंक की कमी दूर करे',
    },
    packs: ['1 kg', '5 kg', '10 kg'],
    prices: [90, 420, 800], // MRP in ₹ for each pack above (dummy)
    offer: 15, // % off MRP (dummy)
    image: IMAGES.products.zinc,
  },
  {
    id: 'boron',
    category: 'fertilizer',
    name: { en: 'Boron 20%', hi: 'बोरॉन 20%' },
    use: {
      en: 'Better flowering & grain filling in maize, vegetables',
      hi: 'मक्का व सब्जियों में अच्छा फूल और दाना भराव',
    },
    packs: ['250 g', '500 g', '1 kg'],
    prices: [120, 220, 420], // MRP in ₹ for each pack above (dummy)
    offer: 12, // % off MRP (dummy)
    image: IMAGES.products.boron,
  },
  {
    id: 'insecticide',
    category: 'pesticide',
    name: { en: 'Insecticide (Chlorpyriphos)', hi: 'कीटनाशक (क्लोरपाइरीफॉस)' },
    use: {
      en: 'Controls stem borer, termites & sucking pests',
      hi: 'तना छेदक, दीमक और रस चूसक कीटों पर नियंत्रण',
    },
    packs: ['250 ml', '500 ml', '1 L'],
    prices: [180, 340, 650], // MRP in ₹ for each pack above (dummy)
    offer: 10, // % off MRP (dummy)
    image: IMAGES.products.insecticide,
  },
  {
    id: 'fungicide',
    category: 'pesticide',
    name: { en: 'Fungicide (Mancozeb 75% WP)', hi: 'फफूंदनाशक (मैंकोजेब 75% WP)' },
    use: {
      en: 'Prevents blight & leaf spot in paddy, potato, tomato',
      hi: 'धान, आलू, टमाटर में झुलसा और पत्ती धब्बा से बचाव',
    },
    packs: ['250 g', '500 g', '1 kg'],
    prices: [150, 280, 520], // MRP in ₹ for each pack above (dummy)
    offer: 20, // % off MRP (dummy)
    image: IMAGES.products.fungicide,
  },
  {
    id: 'herbicide',
    category: 'pesticide',
    name: { en: 'Herbicide (Weed Killer)', hi: 'खरपतवारनाशक' },
    use: {
      en: 'Controls weeds in maize, wheat & paddy fields',
      hi: 'मक्का, गेहूं और धान के खेत में खरपतवार नियंत्रण',
    },
    packs: ['100 ml', '250 ml', '1 L'],
    prices: [120, 270, 950], // MRP in ₹ for each pack above (dummy)
    offer: 5, // % off MRP (dummy)
    image: IMAGES.products.herbicide,
  },
  {
    id: 'vegetable-seeds',
    category: 'seed',
    name: { en: 'Vegetable Seeds', hi: 'सब्जी बीज' },
    use: {
      en: 'Okra, brinjal, tomato, spinach, chilli & more',
      hi: 'भिंडी, बैंगन, टमाटर, पालक, मिर्च आदि',
    },
    packs: ['10 g', '50 g', '100 g'],
    prices: [50, 220, 400], // MRP in ₹ for each pack above (dummy)
    offer: 15, // % off MRP (dummy)
    image: IMAGES.products.vegetableSeeds,
  },
]

// 5) SHOPS / BRANCHES — shown in the "Our Shops" section.
//    The first shop is the main one. Add, remove or edit shops here.
//    mapQuery is what Google Maps searches for to give directions.
export const SHOPS = [
  {
    id: 'karanpur',
    main: true,
    name: { en: 'Karanpur (Main Shop)', hi: 'करनपुर (मुख्य दुकान)' },
    address: { en: SHOP.address, hi: SHOP.addressHi },
    mapQuery: SHOP.mapQuery,
    phone: SHOP.phone,
    phoneDisplay: SHOP.phoneDisplay,
    hours: { en: 'Mon – Sun: 7:00 AM – 6:30 PM', hi: 'सोम – रवि: सुबह 7:00 – शाम 6:30' },
    image: u('1416879595882-3373a0480b5b'),
  },
  {
    // DUMMY branch — replace with real details
    id: 'barsoi-bazar',
    name: { en: 'Barsoi Bazar', hi: 'बारसोई बाज़ार' },
    address: { en: 'Main Road, Barsoi Bazar, Katihar, Bihar - 854317', hi: 'मेन रोड, बारसोई बाज़ार, कटिहार, बिहार - 854317' },
    mapQuery: 'Barsoi Bazar, Katihar, Bihar 854317',
    phone: SHOP.phone,
    phoneDisplay: SHOP.phoneDisplay,
    hours: { en: 'Mon – Sat: 8:00 AM – 7:00 PM', hi: 'सोम – शनि: सुबह 8:00 – शाम 7:00' },
    image: u('1530836369250-ef72a3f5cda8'),
  },
  {
    // DUMMY branch — replace with real details
    id: 'azamnagar',
    name: { en: 'Azamnagar', hi: 'आज़मनगर' },
    address: { en: 'Station Road, Azamnagar, Katihar, Bihar - 854327', hi: 'स्टेशन रोड, आज़मनगर, कटिहार, बिहार - 854327' },
    mapQuery: 'Azamnagar, Katihar, Bihar 854327',
    phone: SHOP.phone,
    phoneDisplay: SHOP.phoneDisplay,
    hours: { en: 'Mon – Sat: 8:00 AM – 6:00 PM', hi: 'सोम – शनि: सुबह 8:00 – शाम 6:00' },
    image: u('1586201375761-83865001e31c'),
  },
]
