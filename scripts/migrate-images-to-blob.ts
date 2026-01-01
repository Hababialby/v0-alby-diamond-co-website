import { put } from "@vercel/blob"
import { createClient } from "@supabase/supabase-js"
import { readFile } from "fs/promises"
import { join } from "path"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Map filenames to portfolio items
const portfolioItems = [
  {
    files: ["luxury-diamond-engagement-ring-solitaire-platinum.jpg", "diamond-ring-closeup-sparkle.jpg"],
    title: "Solitaire Platinum",
    category: "Engagement Rings",
    quote: "Absolutely stunning. The craftsmanship is impeccable and the diamond sparkles beautifully.",
    customer: "Jennifer M.",
  },
  {
    files: ["halo-diamond-ring-top-view.jpg", "engagement-ring-diamond-closeup-sparkle.jpg"],
    title: "Halo Ring",
    category: "Engagement Rings",
    quote: "My fiancée loves this! The halo design makes the diamond look even more brilliant.",
    customer: "Michael T.",
  },
  {
    files: ["diamond-stud-earrings-white-gold-front-view.jpg", "diamond-stud-earrings-close-up-sparkle.jpg"],
    title: "Diamond Studs",
    category: "Earrings",
    quote: "Classic and elegant. These diamond studs are perfect for everyday wear or special occasions.",
    customer: "Sarah L.",
  },
  {
    files: ["diamond-tennis-bracelet-white-gold.jpg"],
    title: "Tennis Bracelet",
    category: "Bracelets",
    quote: "The tennis bracelet is gorgeous and sits perfectly on my wrist. I get compliments constantly.",
    customer: "Amanda K.",
  },
  {
    files: ["blue-sapphire-pendant-closeup.jpg", "diamond-halo-sapphire-necklace.jpg"],
    title: "Sapphire Pendant",
    category: "Necklaces",
    quote: "The sapphire pendant is exquisite. The blue stone is vibrant and beautifully cut.",
    customer: "David R.",
  },
  {
    files: ["pearl-necklace-on-model.jpg", "pearl-pendant-closeup-lustre.jpg"],
    title: "Pearl Necklace",
    category: "Necklaces",
    quote: "Timeless elegance. This pearl necklace adds sophistication to any outfit. Highly recommend!",
    customer: "Elizabeth P.",
  },
  {
    files: ["emerald-cut-three-stone-diamond-ring.jpg"],
    title: "Three Stone",
    category: "Engagement Rings",
    quote: "The three stone design is unique and stunning. Each diamond is perfectly matched and brilliant.",
    customer: "Jessica H.",
  },
  {
    files: ["rose-gold-pave-diamond-band-engagement-ring-diamond.jpg"],
    title: "Rose Gold",
    category: "Wedding Bands",
    quote: "Beautiful rose gold band with perfect detail work. My favorite piece of jewelry.",
    customer: "Nicole W.",
  },
  {
    files: ["emerald-cut-diamond-detail-clarity.jpg", "engagement-ring-side-view-prongs.jpg"],
    title: "Emerald Cut",
    category: "Engagement Rings",
    quote: "The emerald cut is striking and sophisticated. This ring is a true statement piece.",
    customer: "Laura S.",
  },
  {
    files: ["pave-diamond-band-detail-sparkle.jpg"],
    title: "Diamond Pave",
    category: "Bracelets",
    quote: "The pave diamond bracelet is dazzling. So many sparkles and beautifully designed.",
    customer: "Maria G.",
  },
  {
    files: ["cushion-cut-diamond-ring-detail.jpg", "engagement-ring-on-hand-model.jpg"],
    title: "Cushion Ring",
    category: "Engagement Rings",
    quote: "Cushion cut diamond ring is absolutely gorgeous. The vintage styling is perfect and timeless.",
    customer: "Rachel B.",
  },
  {
    files: ["luxury-diamond-jewelry-sparkle-elegant.jpg", "luxury-diamond-jewelry.jpg"],
    title: "Luxury Diamond",
    category: "Engagement Rings",
    quote: "Stunning elegant design with exceptional sparkle. Truly one-of-a-kind and beautiful.",
    customer: "Catherine D.",
  },
]

async function migrateImages() {
  console.log("[v0] Starting image migration to Vercel Blob...")

  for (const item of portfolioItems) {
    console.log(`[v0] Processing: ${item.title}`)

    const blobUrls: string[] = []

    // Upload each image to Vercel Blob
    for (const filename of item.files) {
      try {
        const filePath = join(process.cwd(), "public", filename)
        const fileBuffer = await readFile(filePath)
        const blob = new Blob([fileBuffer])

        console.log(`[v0] Uploading ${filename}...`)
        const { url } = await put(filename, blob, {
          access: "public",
        })

        blobUrls.push(url)
        console.log(`[v0] ✓ Uploaded: ${url}`)
      } catch (error) {
        console.error(`[v0] Failed to upload ${filename}:`, error)
      }
    }

    // Insert into Supabase
    if (blobUrls.length > 0) {
      const { error } = await supabase.from("portfolio_items").insert({
        title: item.title,
        category: item.category,
        customer_quote: item.quote,
        customer_name: item.customer,
        images: blobUrls,
      })

      if (error) {
        console.error(`[v0] Failed to insert ${item.title}:`, error)
      } else {
        console.log(`[v0] ✓ Created portfolio item: ${item.title}`)
      }
    }
  }

  console.log("[v0] Migration complete!")
}

migrateImages().catch(console.error)
