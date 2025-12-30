export interface Product {
  id: string
  name: string
  category: string
  price: number
  images: string[]
  description: string
  inStock: boolean
  details: {
    metal: string
    stones?: string
    size?: string
  }
  sizes?: {
    label: string
    value: string
    inStock: boolean
  }[]
  specifications?: string[]
  relatedProducts?: string[]
}

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Classic Diamond Stud Earrings",
    category: "Earrings",
    price: 3499,
    images: [
      "/diamond-stud-earrings-white-gold-front-view.jpg",
      "/diamond-stud-earrings-side-angle.jpg",
      "/diamond-stud-earrings-close-up-sparkle.jpg",
      "/diamond-stud-earrings-on-ear-model.jpg",
    ],
    description: "Timeless 0.75ct total weight diamond studs in 14k white gold. Perfect for everyday elegance.",
    inStock: true,
    details: {
      metal: "14K White Gold",
      stones: "Round Brilliant Diamonds 0.75ct",
    },
    specifications: [
      "14K white gold posts and backs",
      "Total diamond weight: 0.75 carats",
      "Dimensions: 5mm diameter per earring",
      "Carat weight and measurements may vary slightly",
    ],
    relatedProducts: ["prod-7"],
  },
  {
    id: "prod-2",
    name: "Solitaire Engagement Ring",
    category: "Engagement Rings",
    price: 8999,
    images: [
      "/platinum-solitaire-engagement-ring-diamond.jpg",
      "/engagement-ring-side-view-prongs.jpg",
      "/engagement-ring-on-hand-model.jpg",
      "/engagement-ring-diamond-closeup-sparkle.jpg",
    ],
    description: "Elegant 1ct round diamond solitaire in platinum four-prong setting.",
    inStock: true,
    details: {
      metal: "Platinum 950",
      stones: "Round Diamond 1ct",
      size: "Size 6 (Resizable)",
    },
    sizes: [
      { label: "44 mm (US 3)", value: "3", inStock: true },
      { label: "46 mm (US 3¾)", value: "3.75", inStock: true },
      { label: "48 mm (US 4½)", value: "4.5", inStock: true },
      { label: "50 mm (US 5¼)", value: "5.25", inStock: false },
      { label: "52 mm (US 6)", value: "6", inStock: true },
      { label: "54 mm (US 7)", value: "7", inStock: true },
      { label: "56 mm (US 7¾)", value: "7.75", inStock: false },
      { label: "58 mm (US 8½)", value: "8.5", inStock: true },
      { label: "60 mm (US 9¼)", value: "9.25", inStock: true },
    ],
    specifications: [
      "Platinum 950",
      "Center diamond: 1.0 carat round brilliant",
      "Band width: 2mm",
      "Carat weight and measurements may vary depending on size ordered",
    ],
    relatedProducts: ["prod-6", "prod-5"],
  },
  {
    id: "prod-3",
    name: "Tennis Bracelet",
    category: "Bracelets",
    price: 5499,
    images: [
      "/diamond-tennis-bracelet-white-gold.jpg",
      "/tennis-bracelet-on-wrist-model.jpg",
      "/tennis-bracelet-clasp-detail.jpg",
      "/tennis-bracelet-diamonds-closeup.jpg",
    ],
    description: "Classic tennis bracelet with 40 matched diamonds in 18k white gold.",
    inStock: true,
    details: {
      metal: "18K White Gold",
      stones: "Round Diamonds 4ct total",
    },
    specifications: [
      "18K white gold",
      "40 round brilliant diamonds",
      "Total diamond weight: 4.0 carats",
      "Length: 7 inches (custom sizing available)",
    ],
  },
  {
    id: "prod-4",
    name: "Pearl Pendant Necklace",
    category: "Necklaces",
    price: 1299,
    images: [
      "/south-sea-pearl-pendant-yellow-gold.jpg",
      "/pearl-necklace-on-model.jpg",
      "/pearl-pendant-closeup-lustre.jpg",
      "/pearl-pendant-chain-detail.jpg",
    ],
    description: "Lustrous 10mm South Sea pearl on 18k yellow gold chain.",
    inStock: true,
    details: {
      metal: "18K Yellow Gold",
      stones: "South Sea Pearl 10mm",
    },
    specifications: [
      "18K yellow gold chain",
      "South Sea pearl: 10mm diameter",
      "Chain length: 18 inches",
      "Lobster clasp closure",
    ],
  },
  {
    id: "prod-5",
    name: "Pavé Diamond Band",
    category: "Wedding Bands",
    price: 2199,
    images: [
      "/rose-gold-pave-diamond-wedding-band.jpg",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    description: "Delicate pavé diamond band in 14k rose gold, perfect as a wedding or anniversary band.",
    inStock: true,
    details: {
      metal: "14K Rose Gold",
      stones: "Pavé Diamonds 0.5ct",
      size: "Size 7 (Resizable)",
    },
    sizes: [
      { label: "44 mm (US 3)", value: "3", inStock: true },
      { label: "46 mm (US 3¾)", value: "3.75", inStock: true },
      { label: "48 mm (US 4½)", value: "4.5", inStock: true },
      { label: "50 mm (US 5¼)", value: "5.25", inStock: true },
      { label: "52 mm (US 6)", value: "6", inStock: true },
      { label: "54 mm (US 7)", value: "7", inStock: true },
      { label: "56 mm (US 7¾)", value: "7.75", inStock: true },
      { label: "58 mm (US 8½)", value: "8.5", inStock: true },
    ],
    specifications: [
      "14K rose gold",
      "Pavé diamonds: 0.5 carat total",
      "Band width: 2.5mm",
      "Carat weight may vary depending on size ordered",
    ],
    relatedProducts: ["prod-8", "prod-2"],
  },
  {
    id: "prod-6",
    name: "Halo Diamond Ring",
    category: "Engagement Rings",
    price: 12999,
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    description: "1.5ct center diamond with micro-pavé halo in platinum.",
    inStock: true,
    details: {
      metal: "Platinum 950",
      stones: "Center Diamond 1.5ct with Halo",
      size: "Size 6 (Resizable)",
    },
    sizes: [
      { label: "44 mm (US 3)", value: "3", inStock: false },
      { label: "46 mm (US 3¾)", value: "3.75", inStock: true },
      { label: "48 mm (US 4½)", value: "4.5", inStock: true },
      { label: "50 mm (US 5¼)", value: "5.25", inStock: true },
      { label: "52 mm (US 6)", value: "6", inStock: true },
      { label: "54 mm (US 7)", value: "7", inStock: true },
      { label: "56 mm (US 7¾)", value: "7.75", inStock: true },
      { label: "58 mm (US 8½)", value: "8.5", inStock: true },
      { label: "60 mm (US 9¼)", value: "9.25", inStock: false },
    ],
    specifications: [
      "Platinum 950",
      "Center diamond: 1.5 carat round brilliant",
      "Halo diamonds: 0.3 carat total",
      "Band width: 2mm",
      "Carat weight may vary depending on size ordered",
    ],
    relatedProducts: ["prod-2", "prod-5"],
  },
  {
    id: "prod-7",
    name: "Huggies Hoop Earrings",
    category: "Earrings",
    price: 899,
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    description: "Small diamond huggies hoops in 14k white gold for everyday wear.",
    inStock: true,
    details: {
      metal: "14K White Gold",
      stones: "Pavé Diamonds 0.25ct",
    },
    specifications: ["14K white gold", "Pavé diamonds: 0.25 carat total", "Diameter: 10mm", "Hinged clasp closure"],
    relatedProducts: ["prod-1"],
  },
  {
    id: "prod-8",
    name: "Eternity Band",
    category: "Wedding Bands",
    price: 3799,
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    description: "Full eternity band with matched round diamonds in platinum.",
    inStock: true,
    details: {
      metal: "Platinum 950",
      stones: "Round Diamonds 1.5ct total",
      size: "Size 7 (Resizable)",
    },
    sizes: [
      { label: "44 mm (US 3)", value: "3", inStock: true },
      { label: "46 mm (US 3¾)", value: "3.75", inStock: true },
      { label: "48 mm (US 4½)", value: "4.5", inStock: true },
      { label: "50 mm (US 5¼)", value: "5.25", inStock: true },
      { label: "52 mm (US 6)", value: "6", inStock: true },
      { label: "54 mm (US 7)", value: "7", inStock: true },
      { label: "56 mm (US 7¾)", value: "7.75", inStock: false },
      { label: "58 mm (US 8½)", value: "8.5", inStock: true },
      { label: "60 mm (US 9¼)", value: "9.25", inStock: true },
    ],
    specifications: [
      "Platinum 950",
      "Round brilliant diamonds: 1.5 carat total",
      "Band width: 3mm",
      "Carat weight may vary depending on size ordered",
    ],
    relatedProducts: ["prod-5", "prod-2"],
  },
]
