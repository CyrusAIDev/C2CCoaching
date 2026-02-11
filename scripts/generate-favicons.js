import sharp from "sharp";
import { writeFileSync } from "fs";

const SOURCE = "public/images/c2c-favicon-source.jpg";

async function generateFavicons() {
  // Generate 16x16 PNG
  await sharp(SOURCE)
    .resize(16, 16, { fit: "cover" })
    .png()
    .toFile("public/icon-16x16.png");
  console.log("Created icon-16x16.png");

  // Generate 32x32 PNG (used for both light and dark, and main icon)
  const icon32 = await sharp(SOURCE)
    .resize(32, 32, { fit: "cover" })
    .png()
    .toBuffer();
  writeFileSync("public/icon-light-32x32.png", icon32);
  writeFileSync("public/icon-dark-32x32.png", icon32);
  console.log("Created icon-light-32x32.png and icon-dark-32x32.png");

  // Generate 180x180 Apple Touch Icon
  await sharp(SOURCE)
    .resize(180, 180, { fit: "cover" })
    .png()
    .toFile("public/apple-icon.png");
  console.log("Created apple-icon.png");

  // Generate favicon.ico (32x32 PNG — browsers accept PNG-based ICOs)
  const ico32 = await sharp(SOURCE)
    .resize(32, 32, { fit: "cover" })
    .png()
    .toBuffer();
  writeFileSync("public/favicon.ico", ico32);
  console.log("Created favicon.ico");

  // Generate a higher-res 192x192 for PWA / general use
  await sharp(SOURCE)
    .resize(192, 192, { fit: "cover" })
    .png()
    .toFile("public/icon-192x192.png");
  console.log("Created icon-192x192.png");

  console.log("All favicons generated successfully!");
}

generateFavicons().catch(console.error);
