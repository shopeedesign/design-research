import { spawn } from "node:child_process";
import { openSync, closeSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const nodePath = process.execPath;
const helperPath = join(here, "external-link-helper.mjs");
const logPath = join(here, "external-link-helper.log");
const logFd = openSync(logPath, "a");

const child = spawn(nodePath, [helperPath], {
  cwd: here,
  detached: true,
  stdio: ["ignore", logFd, logFd],
});

child.unref();
closeSync(logFd);
console.log(`External link helper launched with pid ${child.pid}`);
