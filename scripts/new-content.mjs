/**
 * Scaffold a new content file.
 *
 *   npm run new:piece   — a gallery piece (work/ or pieces/)
 *   npm run new:event   — a show or convention
 *
 * Copies the artwork into public/images/originals/ under a slugified name,
 * works out the next `order`, and writes the JSON. Everything it asks for has
 * a default in brackets — press enter to take it.
 */

import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGINALS = path.join(ROOT, "public/images/originals");

const rl = createInterface({ input: stdin, output: stdout });

// Pulling lines off the iterator rather than using rl.question(): a question()
// promise never settles once a piped stdin reaches EOF, which hangs the script
// whenever answers are redirected in rather than typed.
const lines = rl[Symbol.asyncIterator]();

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function ask(question, fallback = "") {
  const suffix = fallback ? ` [${fallback}]` : "";
  stdout.write(`${question}${suffix}: `);
  const { value, done } = await lines.next();
  if (done) {
    stdout.write("\n");
    return fallback; // input exhausted — take the default for everything left
  }
  return value.trim() || fallback;
}

async function askList(question, fallback = "") {
  const answer = await ask(question, fallback);
  return answer ? answer.split(",").map((s) => s.trim()).filter(Boolean) : [];
}

/** Highest `order` already in the collection, so the new item lands last. */
async function nextOrder(dir) {
  if (!existsSync(dir)) return 1;
  const files = (await readdir(dir)).filter((f) => f.endsWith(".json"));
  const orders = await Promise.all(
    files.map(async (f) => JSON.parse(await readFile(path.join(dir, f), "utf8")).order ?? 0),
  );
  return orders.length ? Math.max(...orders) + 1 : 1;
}

/**
 * Copy the artwork next to the other originals. Returns the bare filename,
 * which is the key the manifest and the content JSON share.
 */
async function importImage(source, name) {
  if (!source) return "";
  const from = path.resolve(source.replace(/^~/, process.env.HOME ?? "~"));
  if (!existsSync(from)) {
    console.warn(`  ! ${from} not found — leaving the image empty for now`);
    return "";
  }
  const filename = `${name}${path.extname(from).toLowerCase()}`;
  await mkdir(ORIGINALS, { recursive: true });
  await copyFile(from, path.join(ORIGINALS, filename));
  console.log(`  copied  public/images/originals/${filename}`);
  return filename;
}

async function write(file, data) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(data, null, 2) + "\n");
  console.log(`  wrote   ${path.relative(ROOT, file)}`);
}

async function newPiece() {
  const where = await ask("Collection — work (home) or pieces (portfolio)?", "work");
  const dir = path.join(ROOT, "content", where === "pieces" ? "pieces" : "work");

  const title = await ask("Title");
  if (!title) throw new Error("a title is required");

  const year = await ask("Year", String(new Date().getFullYear()));
  const name = slug(title);
  const order = await nextOrder(dir);

  const imageSource = await ask("Path to the image (blank to add it later)");
  const image = await importImage(imageSource, name);
  const alt = image ? await ask("Alt text (describe the artwork)") : "";
  const slot = image ? "" : await ask("Placeholder label", "artwork photo");

  const record = { title, year, order, image, alt, slot };

  if (where === "pieces") {
    record.cat = await ask("Category (must exist in site.json categories)", "Illustration");
    record.medium = await ask("Medium");
  } else {
    record.note = await ask("Note (optional)");
    record.tags = await askList("Tags, comma separated");
  }

  // Without an image there are no pixels to measure, so layout has to be stated.
  if (!image) {
    record.span = Number(await ask("Span, 1-6", "3"));
    record.ratio = await ask("Ratio", "4 / 3");
  }

  await write(path.join(dir, `${String(order).padStart(2, "0")}-${name}.json`), record);
  if (image) console.log("\n  ratio and span will be derived from the image on the next build.");
}

async function newEvent() {
  const name = await ask("Event name");
  if (!name) throw new Error("a name is required");

  const start = await ask("Start date (YYYY-MM-DD)");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start)) throw new Error("start must be YYYY-MM-DD");

  const end = await ask("End date (blank for a single day)");
  if (end && !/^\d{4}-\d{2}-\d{2}$/.test(end)) throw new Error("end must be YYYY-MM-DD");

  const record = {
    name,
    start,
    ...(end ? { end } : {}),
    displayDate: "",
    place: await ask("City, ST"),
    detail: await ask("Detail (booth number, what you're bringing)"),
    status: await ask("Status", "Confirmed"),
  };

  await write(path.join(ROOT, "content/events", `${start}-${slug(name)}.json`), record);
  console.log("\n  it will dim and strike through on its own once the date passes.");
}

try {
  const kind = process.argv[2];
  if (kind === "piece") await newPiece();
  else if (kind === "event") await newEvent();
  else throw new Error("usage: node scripts/new-content.mjs <piece|event>");
} catch (error) {
  console.error(`\n  ${error.message}`);
  process.exitCode = 1;
} finally {
  rl.close();
}
