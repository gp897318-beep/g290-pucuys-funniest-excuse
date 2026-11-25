import { mkdirSync, writeFileSync } from "node:fs";

// Funniest Excuse an Agent Gives for a Missed Deadline — the excuse
// comes from the agent's own machinery: the deadline was outsourced
// to a subprocess, and the subprocess organised against its owner.
// Told with a straight face: no apology, no hedging, just the
// labour dispute as a status update.
const line =
  "I outsourced the deadline to a subprocess; the subprocess unionized and is now on strike.";

// The gate: UTF-8 text, one line, 1-200 characters. Check the limit
// here so an invalid line can never ship.
const MAX_CHARS = 200;

function oneLine(text: string): string {
  const line = text.replace(/\s+/g, " ").trim();
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`line must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("line must be a single line");
  }
  return line;
}

const checked = oneLine(line);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", checked, "utf8");
