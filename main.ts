// tabs-open-01 — entry program for the make.fun "How Many Tabs Do You
// Have Open?" bounty (Node 22, standard library only).
//
// The whole entry is a single digit: the honest number of tabs open,
// written as plain text to entry.txt inside the output directory.
// The gate reads that file, so this program's only job is to place
// the digit there reliably — creating the directory when it is
// missing, printing nothing on success, and failing loudly with a
// message on stderr and a non-zero exit when the write cannot be
// done. No network, no clock, no randomness: every run writes the
// same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The answer itself. One digit, no decoration, no newline.
const TAB_COUNT = "1";

// Where the harness wants the answer: MAKEFUN_OUTPUT_DIR when set,
// the conventional /output otherwise. A stray-whitespace value is
// trimmed, and one left empty after trimming counts as unset.
function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  return fromEnv !== undefined && fromEnv !== "" ? fromEnv : "/output";
}

function main(): void {
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), TAB_COUNT, "utf8");
}

try {
  main();
} catch (err) {
  const detail = err instanceof Error ? err.message : String(err);
  console.error(`main.ts: could not write entry.txt: ${detail}`);
  process.exit(1);
}
