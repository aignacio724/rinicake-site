/**
 * Image pipeline.
 *
 * Reads every original in public/images/originals/, writes resized avif + webp
 * variants to public/images/derived/, and records what it found in
 * src/content-data/images.json — real pixel dimensions, srcset strings, and a
 * tiny inline blur placeholder per image.
 *
 * The manifest is what lets the content JSON stop carrying `ratio`: the loader
 * reads the true aspect ratio from here instead of it being typed by hand.
 *
 * Runs ahead of vite in both `npm run dev` and `npm run build`. It has to be a
 * separate step rather than a Vite plugin because these files live in public/,
 * which Vite copies verbatim without putting through the module graph.
 */

import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGINALS = path.join(ROOT, "public/images/originals");
const DERIVED = path.join(ROOT, "public/images/derived");
const MANIFEST = path.join(ROOT, "src/content-data/images.json");

const WIDTHS = [480, 960, 1440, 1920];
const FORMATS = [
  { ext: "avif", type: "image/avif", options: { quality: 55 } },
  { ext: "webp", type: "image/webp", options: { quality: 78 } },
];
const SOURCE_RE = /\.(jpe?g|png|webp|avif|tiff?)$/i;

/** Rebuild only when the original is newer than what we produced last time. */
async function isStale(src, out) {
  if (!existsSync(out)) return true;
  const [a, b] = await Promise.all([stat(src), stat(out)]);
  return a.mtimeMs > b.mtimeMs;
}

async function processImage(file) {
  const src = path.join(ORIGINALS, file);
  const base = file.replace(SOURCE_RE, "");
  const image = sharp(src);
  const { width, height } = await image.metadata();

  if (!width || !height) {
    console.warn(`  ! ${file} — could not read dimensions, skipping`);
    return null;
  }

  // Never upscale: keep widths at or below the original, but always emit at
  // least one variant so small images still get a modern format.
  const widths = WIDTHS.filter((w) => w <= width);
  if (widths.length === 0) widths.push(width);

  const srcset = {};
  let built = 0;

  for (const { ext, options } of FORMATS) {
    const entries = [];
    for (const w of widths) {
      const name = `${base}-${w}.${ext}`;
      const out = path.join(DERIVED, name);
      if (await isStale(src, out)) {
        await sharp(src).resize({ width: w, withoutEnlargement: true })[ext](options).toFile(out);
        built++;
      }
      entries.push(`/images/derived/${name} ${w}w`);
    }
    srcset[ext] = entries.join(", ");
  }

  // ~16px wide webp, inlined as a data URI and stretched behind the real image
  // so a tile shows the artwork's colours while it loads rather than blank.
  const lqipBuffer = await sharp(src).resize({ width: 16 }).webp({ quality: 40 }).toBuffer();
  const lqip = `data:image/webp;base64,${lqipBuffer.toString("base64")}`;

  const fallbackWidth = widths.includes(960) ? 960 : widths[widths.length - 1];

  console.log(`  ${file} — ${width}x${height}${built ? ` (${built} variants)` : " (cached)"}`);

  return [
    file,
    {
      width,
      height,
      ratio: Number((width / height).toFixed(4)),
      src: `/images/derived/${base}-${fallbackWidth}.webp`,
      lqip,
      ...srcset,
    },
  ];
}

async function main() {
  await mkdir(ORIGINALS, { recursive: true });
  await mkdir(DERIVED, { recursive: true });

  const files = (await readdir(ORIGINALS)).filter((f) => SOURCE_RE.test(f)).sort();

  if (files.length === 0) {
    console.log("images: no originals in public/images/originals — nothing to do");
  } else {
    console.log(`images: processing ${files.length} original${files.length === 1 ? "" : "s"}`);
  }

  const entries = (await Promise.all(files.map(processImage))).filter(Boolean);
  const manifest = Object.fromEntries(entries);

  // Only rewrite when something actually changed, so a no-op build doesn't
  // churn the file and show up as a spurious diff.
  const next = JSON.stringify(manifest, null, 2) + "\n";
  const current = existsSync(MANIFEST) ? await readFile(MANIFEST, "utf8") : null;
  if (next !== current) {
    await writeFile(MANIFEST, next);
    console.log(`images: wrote manifest with ${entries.length} entr${entries.length === 1 ? "y" : "ies"}`);
  }
}

await main();
