// The fortune lives in entry.txt, not in this file, so swapping the line
// never needs a code change — the runner just carries whatever it finds.
// A blank fortune would leave the judge staring at an empty cookie.
// Overlong lines get turned away here, before the grader ever sees them.
// Keep the output byte-identical: what goes in is exactly what comes out.
// The cookie promises riches without ever peeking at the wallet first.
// Optimism here is unconditional — no balance check stands in its way.
// A fortune that skips the audit still counts as a fortune, apparently.
// The joke is the gap between the bold promise and the empty account behind it.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");
const trimmed = text.trim();

if (trimmed.length === 0 || text.length > 160 || trimmed.split(/\s+/).length > 20) {
  console.error("entry.txt is empty, over 160 characters, or over 20 words");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text);
