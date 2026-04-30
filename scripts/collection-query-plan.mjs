#!/usr/bin/env node

const args = process.argv.slice(2);

function valueOf(flag, fallback = "") {
  const index = args.indexOf(flag);
  if (index === -1) return fallback;
  return args[index + 1] || fallback;
}

function listOf(flag) {
  return valueOf(flag)
    .split(/[,，]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function enc(value) {
  return encodeURIComponent(value);
}

function huabanBoardUrl(term) {
  const q = enc(term);
  return `https://huaban.com/search?type=board&q=${q}&search_word_type=%E6%89%8B%E5%8A%A8%E8%BE%93%E5%85%A5%E6%90%9C%E7%B4%A2%E8%AF%8D&original=${q}`;
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function huabanTermForProduct(name, surface) {
  return surface === "pc" || surface === "web" || surface === "desktop" ? `${name} UI` : `${name} app`;
}

const market = valueOf("--market", "both").toLowerCase();
const surface = valueOf("--surface", "app").toLowerCase();
const products = listOf("--products");
const categories = listOf("--category");
const flows = listOf("--flows");

const huabanTerms = unique(products.map((name) => huabanTermForProduct(name, surface)));

const includeHuaban = market === "both" || market === "china" || market === "cn" || market === "unknown";

const lines = [];
lines.push("# Collection Query Plan");
lines.push("");
lines.push(`Market: ${market}`);
lines.push(`Surface: ${surface}`);
lines.push(`Products: ${products.join(", ") || "(none)"}`);
lines.push(`Categories: ${categories.join(", ") || "(none)"}`);
lines.push(`Flows: ${flows.join(", ") || "(none)"}`);
lines.push("");

if (includeHuaban) {
  lines.push("## Huaban static board search URLs");
  huabanTerms.forEach((term) => lines.push(`- ${term}: ${huabanBoardUrl(term)}`));
  lines.push("");
} else {
  lines.push("## Huaban static board search URLs");
  lines.push("- Not generated for this market by default. Use --market china/both/unknown if Huaban is needed.");
  lines.push("");
}

lines.push("## Evidence table");
lines.push("| Platform | Stage | Search term or URL | Candidate | Status | Next step |");
lines.push("|---|---|---|---|---|---|");
lines.push("| Huaban | static board search URL |  |  | 站内搜索入口/需浏览器核验/用户/浏览器可见/自动抓取受限/已打开核验 |  |");

console.log(lines.join("\n"));
