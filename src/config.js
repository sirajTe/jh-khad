// =====================================================================
//  JH KHAD BHANDAR — EDIT THIS FILE TO CHANGE SHOP DETAILS, PHOTOS
//  AND PRODUCTS. You do not need to touch any other file.
// =====================================================================

// 1) GOOGLE SHEET LINK
// Paste your Google Apps Script "Web app URL" here (see README.md).
export const GOOGLE_SCRIPT_URL = 'GOOGLE_SCRIPT_URL'

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
  hero: u('1574943320219-553eb213f72d', 1280), // green paddy fields in village
  heroSmall: u('1574943320219-553eb213f72d', 640),

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
  ],
}

// 4) PRODUCTS — add, remove or edit products here.
//    category must be one of: 'fertilizer', 'pesticide', 'seed'
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
    image: IMAGES.products.vegetableSeeds,
  },
]
