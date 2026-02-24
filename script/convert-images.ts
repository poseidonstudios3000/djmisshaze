import sharp from "sharp";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ORIGINALS_DIR = path.resolve("assets/originals");
const FINAL_DIR = path.resolve("assets/final");

const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];
const VIDEO_EXTS = [".mp4", ".mov"];

async function walkDir(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkDir(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  if (!fs.existsSync(ORIGINALS_DIR)) {
    console.error(`Originals directory not found: ${ORIGINALS_DIR}`);
    process.exit(1);
  }

  const files = await walkDir(ORIGINALS_DIR);
  let converted = 0;
  let copied = 0;
  let skipped = 0;

  for (const filePath of files) {
    const rel = path.relative(ORIGINALS_DIR, filePath);
    const ext = path.extname(filePath).toLowerCase();
    const dirName = path.dirname(rel);
    const baseName = path.basename(rel, path.extname(rel));

    if (IMAGE_EXTS.includes(ext)) {
      const outDir = path.join(FINAL_DIR, dirName);
      const safeName = baseName.replace(/\s+/g, "-").replace(/[()]/g, "");
      const outPath = path.join(outDir, `${safeName}.webp`);
      fs.mkdirSync(outDir, { recursive: true });

      try {
        const pipeline = ext === ".svg"
          ? sharp(filePath, { density: 300 }).webp({ quality: 90 })
          : sharp(filePath).webp({ quality: 80 });
        await pipeline.toFile(outPath);
        console.log(`  converted: ${rel} → ${path.relative(FINAL_DIR, outPath)}`);
        converted++;
      } catch (err: any) {
        console.warn(`  warning: could not convert ${rel} (${err.message}), copying as-is`);
        fs.copyFileSync(filePath, path.join(outDir, path.basename(rel)));
        copied++;
      }
    } else if (VIDEO_EXTS.includes(ext)) {
      const outDir = path.join(FINAL_DIR, dirName);
      const safeName = baseName.replace(/\s+/g, "-").replace(/[()]/g, "");
      const outPath = path.join(outDir, `${safeName}.mp4`);
      fs.mkdirSync(outDir, { recursive: true });

      if (fs.existsSync(outPath) && fs.statSync(outPath).size > 0) {
        console.log(`  skipped (exists): ${rel}`);
        skipped++;
      } else {
        try {
          console.log(`  converting video: ${rel} ...`);
          execSync(
            `ffmpeg -y -i "${filePath}" -c:v libx264 -preset slow -crf 23 -vf "scale='min(1280,iw)':-2" -c:a aac -b:a 128k -movflags +faststart "${outPath}"`,
            { stdio: "pipe" }
          );
          const origSize = (fs.statSync(filePath).size / 1024 / 1024).toFixed(1);
          const newSize = (fs.statSync(outPath).size / 1024 / 1024).toFixed(1);
          console.log(`  converted: ${rel} → ${path.relative(FINAL_DIR, outPath)} (${origSize}MB → ${newSize}MB)`);
          converted++;
        } catch (err: any) {
          console.warn(`  warning: ffmpeg failed for ${rel}, copying as-is`);
          fs.copyFileSync(filePath, outPath);
          copied++;
        }
      }
    } else {
      skipped++;
    }
  }

  console.log(`\nDone: ${converted} converted, ${copied} copied, ${skipped} skipped`);
}

main();
