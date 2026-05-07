import { patchCqcEngine } from "./patch-cqc.mjs";
import { runCheck } from "../node_modules/commit-quality-check/scripts/quality-staged.js";

const profile = process.argv[2] === "full" ? "full" : "fast";

await patchCqcEngine();
await runCheck({ fullProfile: profile === "full" });