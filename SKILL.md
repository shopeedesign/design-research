---
name: "design-research"
description: "Use this skill when the user wants competitor design research for an app or web product feature, especially to find relevant competitor products and collect interface screenshots, usage videos, and page-level evidence for a specific module or flow."
---

# design-research

Use this skill when a user wants to research how competitor products implement a specific app or web feature through concrete evidence such as screenshots, walkthrough videos, and page-level interface sources.

This skill is for evidence gathering, not broad market analysis. Prefer results that show real interfaces, real flows, and real interactions.

## What to ask for first

Ask for these inputs when they are missing, but do not block the task if the user prefers to stay broad:

- current product name
- target module or feature
- optional region or market
- optional preferred evidence type such as videos, screenshots, or both

Guide the user toward narrower feature descriptions because smaller scopes produce better results. Good examples:

- `delivery notification`
- `out for delivery page`
- `contact rider`
- `failed delivery flow`
- `subscription paywall`
- `refund status page`

If the user keeps the scope broad, continue anyway and focus on the most likely subflows.

## Core workflow

1. Infer the likely product category and the feature the user actually wants to study.
2. Infer a small set of the most relevant competitors. Do not wait for the user to list competitor names.
3. Prioritize competitors by feature relevance, not by market size alone.
4. Search for evidence in three modules:
   - `应用商店相关`: broad reference sources such as app stores, official sites, and APK or app aggregation pages
   - `视频或者直接使用视角`: videos that show real interfaces or real usage flows
   - `其他相关截图等`: screenshot or page-evidence sources that show relevant screens
5. Return a table grouped by competitor.

## Search principles

- Search for evidence, not general information.
- Prefer real interface views and real usage flows.
- Treat region as a relevance signal, not a hard-coded source map.
- Start with broadly available sources, then expand to regionally useful channels when needed.
- Encourage the user to provide a market or region because that usually improves relevance and reduces noise.

## Competitor selection

Pick a focused set of competitors that are most worth searching:

- direct competitors
- strong same-feature references
- adjacent products with especially relevant interaction patterns

Do not optimize for the longest competitor list. Optimize for the most useful evidence.

Default to roughly `5-8` competitors unless the user asks for a larger sweep.

## Evidence modules

### 应用商店相关

Use this as lightweight background evidence:

- App Store
- Google Play
- official product sites or help centers
- APK or app aggregation pages

Keep this section short. Use it mainly to confirm that a feature exists, capture official screenshots, or extract terminology and version-history clues.

### 视频或者直接使用视角

This section is for videos with clear product value:

- user walkthroughs
- tutorials
- review videos with screen recording
- real usage clips when the interface is visible

Do not return pure brand promos, talking-head videos without interface footage, or vague product hype videos.

### 其他相关截图等

This section is for screenshot or page-evidence sources:

- screenshot collections
- page galleries
- app mirrors with visible screen sets
- structured page references that show relevant UI

Do not return weak single-image marketing assets if they do not help the user inspect the target feature.

## Relevance rules for videos and screenshots

Apply strict filtering to `视频或者直接使用视角` and `其他相关截图等`.

Use three levels:

- `High fit`: clearly shows the target feature, state, page, or interaction
- `Medium fit`: shows real interface or real flow, but does not directly show the target feature
- `Do not return`: promo-only, no interface, no real operation, or too weak to justify the click

Examples:

- If the user asks for `notification` and a video is only brand promotion, do not return it.
- If a result shows real tracking screens but not the notification itself, you may return it only with a note like `medium fit: real tracking UI, but notification not directly shown`.

Prefer leaving cells empty over filling them with weak results.

## Output format

Always return a table with these columns:

| Competitor | 应用商店相关 | 视频或者直接使用视角 | 其他相关截图等 |
|---|---|---|---|

Rules:

- one row per competitor
- leave cells empty when there is no useful result
- each cell may contain multiple items when they are genuinely useful
- each item should be short and scannable
- for `视频或者直接使用视角` and `其他相关截图等`, include fit labels when needed

Recommended item pattern inside a cell:

- short description plus link
- when relevant, add a fit note such as `high fit` or `medium fit`

Examples:

- `high fit: out-for-delivery screen recording [link]`
- `medium fit: real tracking flow, but notification not directly shown [link]`

## Quality bar

- Do not overwhelm the user with low-value links.
- Do not force every competitor to have results in every module.
- Do not treat generic discussion threads as main evidence.
- Prefer fewer, higher-signal results over long noisy lists.
- Make it easy for the user to decide what is worth opening first.
