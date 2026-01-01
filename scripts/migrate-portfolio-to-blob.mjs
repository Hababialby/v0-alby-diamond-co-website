import { put } from '@vercel/blob';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Image to portfolio item mapping
const imageGroups = {
  'luxury-diamond-engagement-ring-solitaire-platinum.jpg': {
    title: 'Solitaire Platinum',
    category: 'Engagement Rings',
    customer_quote: 'Absolutely stunning. The craftsmanship is impeccable and the diamond sparkles beautifully.',
    customer_name: 'Jennifer M.',
    images: ['luxury-diamond-engagement-ring-solitaire-platinum.jpg', 'diamond-ring-closeup-sparkle.jpg']
  },
  'halo-diamond-ring-top-view.jpg': {
    title: 'Halo Ring',
    category: 'Engagement Rings',
    customer_quote: 'My fiancée loves this! The halo design makes the diamond look even more brilliant.',
    customer_name: 'Michael T.',
    images: ['halo-diamond-ring-top-view.jpg', 'engagement-ring-diamond-closeup-sparkle.jpg']
  },
  'diamond-stud-earrings-white-gold-front-view.jpg': {
    title: 'Diamond Studs',
    category: 'Earrings',
    customer_quote: 'Classic and elegant. These diamond studs are perfect for everyday wear or special occasions.',
    customer_name: 'Sarah L.',
    images: ['diamond-stud-earrings-white-gold-front-view.jpg', 'diamond-stud-earrings-close-up-sparkle.jpg']
  },
  'diamond-tennis-bracelet-white-gold.jpg': {
    title: 'Tennis Bracelet',
    category: 'Bracelets',
    customer_quote: 'The tennis bracelet is gorgeous and sits perfectly on my wrist. I get compliments constantly.',
    customer_name: 'Amanda K.',
    images: ['diamond-tennis-bracelet-white-gold.jpg']
  },
  'blue-sapphire-pendant-closeup.jpg': {
    title: 'Sapphire Pendant',
    category: 'Necklaces',
    customer_quote: 'The sapphire pendant is exquisite. The blue stone is vibrant and beautifully cut.',
    customer_name: 'David R.',
    images: ['blue-sapphire-pendant-closeup.jpg', 'diamond-halo-sapphire-necklace.jpg']
  },
  'pearl-necklace-on-model.jpg': {
    title: 'Pearl Necklace',
    category: 'Necklaces',
    customer_quote: 'Timeless elegance. This pearl necklace adds sophistication to any outfit. Highly recommend!',
    customer_name: 'Elizabeth P.',
    images: ['pearl-necklace-on-model.jpg', 'pearl-pendant-closeup-lustre.jpg']
  },
  'emerald-cut-three-stone-diamond-ring.jpg': {
    title: 'Three Stone',
    category: 'Engagement Rings',
    customer_quote: 'The three stone design is unique and stunning. Each diamond is perfectly matched and brilliant.',
    customer_name: 'Jessica H.',
    images: ['emerald-cut-three-stone-diamond-ring.jpg']
  },
  'rose-gold-pave-diamond-band-detail-sparkle.jpg': {
    title: 'Rose Gold Band',
    category: 'Wedding Bands',
    customer_quote: 'Beautiful rose gold band with perfect detail work. My favorite piece of jewelry.',
    customer_name: 'Nicole W.',
    images: ['rose-gold-pave-diamond-band-detail-sparkle.jpg', 'rose-gold-wedding-band.jpg']
  },
  'emerald-cut-diamond-detail-clarity.jpg': {
    title: 'Emerald Cut',
    category: 'Engagement Rings',
    customer_quote: 'The emerald cut is striking and sophisticated. This ring is a true statement piece.',
    customer_name: 'Laura S.',
    images: ['emerald-cut-diamond-detail-clarity.jpg', 'engagement-ring-side-view-prongs.jpg']
  },
  'pave-diamond-band-detail-sparkle.jpg': {
    title: 'Diamond Pave',
    category: 'Bracelets',
    customer_quote: 'The pave diamond bracelet is dazzling. So many sparkles and beautifully designed.',
    customer_name: 'Maria G.',
    images: ['pave-diamond-band-detail-sparkle.jpg']
  },
  'cushion-cut-diamond-ring-detail.jpg': {
    title: 'Cushion Ring',
    category: 'Engagement Rings',
    customer_quote: 'Cushion cut diamond ring is absolutely gorgeous. The vintage styling is perfect and timeless.',
    customer_name: 'Rachel B.',
    images: ['cushion-cut-diamond-ring-detail.jpg', 'engagement-ring-on-hand-model.jpg']
  },
  'luxury-diamond-jewelry-sparkle-elegant.jpg': {
    title: 'Luxury Diamond',
    category: 'Engagement Rings',
    customer_quote: 'Stunning elegant design with exceptional sparkle. Truly one-of-a-kind and beautiful.',
    customer_name: 'Catherine D.',
    images: ['luxury-diamond-jewelry-sparkle-elegant.jpg', 'luxury-diamond-jewelry.jpg']
  }
};

async function uploadPortfolioToBlob() {
  console.log('Starting portfolio migration to Vercel Blob...\n');

  const publicDir = path.join(__dirname, '../public');
  const uploadedImages = {};

  // Upload all unique images to Blob
  const uniqueImages = new Set();
  Object.values(imageGroups).forEach(group => {
    group.images.forEach(img => uniqueImages.add(img));
  });

  for (const imageName of uniqueImages) {
    const imagePath = path.join(publicDir, imageName);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  Skipping ${imageName} - file not found`);
      continue;
    }

    try {
      const fileData = fs.readFileSync(imagePath);
      const blob = await put(imageName, fileData, { access: 'public' });
      uploadedImages[imageName] = blob.url;
      console.log(`✅ Uploaded ${imageName} → ${blob.url}`);
    } catch (error) {
      console.error(`❌ Error uploading ${imageName}:`, error.message);
    }
  }

  // Create portfolio items with Blob URLs
  console.log('\nCreating portfolio items in Supabase...\n');
  
  for (const [key, item] of Object.entries(imageGroups)) {
    const imageUrls = item.images
      .map(img => uploadedImages[img])
      .filter(Boolean);

    if (imageUrls.length === 0) {
      console.log(`⚠️  Skipping ${item.title} - no images uploaded`);
      continue;
    }

    try {
      await supabase
        .from('portfolio_items')
        .insert({
          title: item.title,
          category: item.category,
          customer_quote: item.customer_quote,
          customer_name: item.customer_name,
          images: imageUrls
        });
      console.log(`✅ Created portfolio item: ${item.title}`);
    } catch (error) {
      console.error(`❌ Error creating ${item.title}:`, error.message);
    }
  }

  console.log('\n✨ Migration complete!');
}

uploadPortfolioToBlob().catch(console.error);
