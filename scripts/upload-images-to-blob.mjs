import fs from "fs";
import path from "path";
import { fileFromPath } from "bfile";
import { put } from "@vercel/blob";

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Image files to upload
const imageFiles = [
  "diamond-stud-earrings-on-ear-model.jpg",
  "diamond-stud-earrings-side-angle.jpg",
  "diamond-stud-earrings-white-gold-front-view.jpg",
  "diamond-tennis-bracelet-white-gold.jpg",
  "emerald-cut-diamond-detail-clarity.jpg",
  "emerald-cut-three-stone-diamond-ring.jpg",
  "engagement-ring-diamond-closeup-sparkle.jpg",
  "engagement-ring-on-hand-model.jpg",
  "engagement-ring-side-view-prongs.jpg",
  "halo-diamond-ring-top-view.jpg",
  "luxury-diamond-engagement-ring-solitaire-platinum.jpg",
  "luxury-diamond-jewelry-sparkle-elegant.jpg",
  "luxury-diamond-jewelry.jpg",
  "luxury-diamond-ring.jpg",
  "pave-diamond-band-detail-sparkle.jpg",
  "pearl-necklace-on-model.jpg",
  "pearl-pendant-chain-detail.jpg",
  "pearl-pendant-closeup-lustre.jpg",
  "platinum-solitaire-engagement-ring-diamond.jpg",
  "rose-gold-pave-diamond-band.jpg",
  "rose-gold-pave-diamond-wedding-band.jpg",
  "rose-gold-wedding-band.jpg",
  "sapphire-diamond-pendant-necklace-luxury.jpg",
  "south-sea-pearl-pendant-yellow-gold.jpg",
  "sparkling-diamond-jewelry.jpg",
  "tennis-bracelet-class-detail.jpg",
  "tennis-bracelet-diamonds-closeup.jpg",
  "tennis-bracelet-on-wrist-model.jpg",
  "vintage-halo-diamond-ring-art-deco.jpg",
  "blue-sapphire-pendant-closeup.jpg",
  "cushion-cut-diamond-ring-detail.jpg",
  "diamond-halo-sapphire-necklace.jpg",
  "diamond-ring-closeup-sparkle.jpg",
];

async function uploadImages() {
  if (!BLOB_TOKEN) {
    console.error("[v0] ERROR: BLOB_READ_WRITE_TOKEN not set");
    process.exit(1);
  }

  console.log("[v0] Starting image upload to Vercel Blob...");
  const uploadedUrls = {};
  let successCount = 0;
  let failCount = 0;

  for (const filename of imageFiles) {
    const filePath = path.join(PUBLIC_DIR, filename);

    if (!fs.existsSync(filePath)) {
      console.log(`[v0] ⚠️  Skipping ${filename} (file not found)`);
      continue;
    }

    try {
      const file = await fileFromPath(filePath);
      const result = await put(`portfolio/${filename}`, file, {
        access: "public",
        token: BLOB_TOKEN,
      });

      uploadedUrls[filename] = result.url;
      console.log(`[v0] ✅ Uploaded: ${filename}`);
      successCount++;
    } catch (error) {
      console.error(`[v0] ❌ Failed to upload ${filename}:`, error.message);
      failCount++;
    }
  }

  console.log(
    `[v0] Upload complete: ${successCount} succeeded, ${failCount} failed`
  );
  console.log("[v0] URLs saved to blob-urls.json for reference");

  // Save URLs for reference
  fs.writeFileSync(
    "blob-urls.json",
    JSON.stringify(uploadedUrls, null, 2)
  );
}

uploadImages().catch(console.error);
