import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

async function main() {
  const logoPath = path.join(root, "public", "images", "logo.png");

  // Get logo metadata
  const meta = await sharp(logoPath).metadata();
  console.log(`Logo dimensions: ${meta.width}x${meta.height}`);

  // The icon (truck+house) is on the left ~38% of the logo
  const iconWidth = Math.round(meta.width * 0.38);
  const iconHeight = meta.height;

  // Extract the icon portion
  const iconBuffer = await sharp(logoPath)
    .extract({ left: 0, top: 0, width: iconWidth, height: iconHeight })
    .png()
    .toBuffer();

  // Generate icon.png (512x512) for Next.js app icon
  await sharp(iconBuffer)
    .resize(512, 512, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(root, "src", "app", "icon.png"));
  console.log("✓ Generated src/app/icon.png (512x512)");

  // Generate apple-icon.png (180x180) for Apple devices
  await sharp(iconBuffer)
    .resize(180, 180, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(root, "src", "app", "apple-icon.png"));
  console.log("✓ Generated src/app/apple-icon.png (180x180)");

  // Generate a 32x32 PNG for favicon.ico replacement
  // Next.js will automatically serve icon.png as the favicon
  // But let's also generate a small favicon.ico-compatible PNG
  await sharp(iconBuffer)
    .resize(32, 32, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(root, "src", "app", "favicon.ico"));
  console.log("✓ Generated src/app/favicon.ico (32x32)");

  console.log("\nDone! All favicons generated.");
}

main().catch(console.error);
