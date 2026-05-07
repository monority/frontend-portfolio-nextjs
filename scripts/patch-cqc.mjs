import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const enginePath = join(
  process.cwd(),
  "node_modules",
  "commit-quality-check",
  "src",
  "core",
  "Engine.js",
);

const oldImport = 'import { join } from "node:path";';
const newImport = 'import { fileURLToPath } from "node:url";';
const oldCheckersDirLine = '      const checkersDir = join(process.cwd(), "src/checkers");';
const newCheckersDirLine = '      const checkersDir = fileURLToPath(new URL("../checkers", import.meta.url));';

export async function patchCqcEngine() {
  if (!existsSync(enginePath)) {
    console.log("[patch-cqc] commit-quality-check not installed. Skip.");
    return;
  }

  const source = await readFile(enginePath, "utf8");

  if (source.includes(newCheckersDirLine)) {
    console.log("[patch-cqc] Engine already patched.");
    return;
  }

  if (!source.includes(oldCheckersDirLine)) {
    console.log("[patch-cqc] Expected engine signature not found. Skip.");
    return;
  }

  const patched = source
    .replace(oldImport, newImport)
    .replace(oldCheckersDirLine, newCheckersDirLine);

  await writeFile(enginePath, patched, "utf8");
  console.log("[patch-cqc] Engine patched.");
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, "/")}`) {
  patchCqcEngine().catch((error) => {
    console.error(`[patch-cqc] Failed: ${error.message}`);
    process.exitCode = 1;
  });
}