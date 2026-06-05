# design-research

用于为 App、网页或 PC 端产品的具体功能、页面、状态或流程寻找竞品 UI 参考素材。它会先判断检索入口；如果用户没有指定具体产品，先给出直接竞品候选并等待用户选择；如果用户已指定或选择产品，则按产品和目标市场检索真实界面素材，并下钻核验截图、录屏、应用市场截图、截图/流程库、画板入口、帮助中心、教程视频和官方资料。

不要把它扩展成泛市场研究、商业策略分析或空泛竞品分析。

## 能力范围

- 根据直接竞品、产品类型/市场、模糊功能或混合输入选择检索策略。
- 用户未指定具体产品时，先推断 6-10 个直接竞品候选，只输出编号清单并让用户最多选择 2 个。
- 用户已选择或指定产品后，只检索并输出这些产品的资源，不补充未选择的产品。
- 按竞品分别搜索，不用泛行业词反复凑结果。
- 每个直接竞品只保留 1 个非 iOS 应用商店截图来源。
- 按目标市场执行必跑渠道：中国大陆覆盖 UI Notes、Bilibili、Google Images、Google Videos；全球/欧美覆盖 Mobbin、Page Flows、YouTube、Google Images、Google Videos；东南亚/亚洲覆盖 Chamjo、Mobbin、UI Sources、YouTube、Google Images、Google Videos。
- 对 Google Images / Google Videos 只作为发现入口使用，最终返回下钻后的真实来源页。
- 对花瓣只返回站内搜索入口，不使用 `site:huaban.com` 外部搜索结果代替站内搜索。
- 输出覆盖不足和待核验线索，避免把无法核验的内容写成确定结论。

## 输出结构

默认直接在聊天中输出：

1. 研究范围
2. 检索入口与竞品选择
3. 主结果表
4. 覆盖不足
5. 待核验线索

用户通过编号选择或直接指定产品时，主结果表只包含用户选择/指定的产品，最多 2 个，不输出补充参考。只有任务明确需要不经选择直接汇总行业资源时，才可按规则输出主结果加补充参考。

主结果表固定为四列：

| 产品 | 应用商店 | 界面/截图 | 其他来源 |
|---|---|---|---|

每条链接使用：

```markdown
[来源名称](https://example.com)｜素材类型｜核验状态/fit｜简短备注
```

## 目录说明

- `SKILL.md`：skill 触发条件、核心流程和核验口径。
- `references/output-format.md`：最终回答结构、四列表、fit 标签、补充参考、覆盖不足和自检规则。
- `references/platform-search.md`：渠道优先级、固定查询词、Google Images / Google Videos、花瓣入口、应用市场、截图/流程库、视频平台和兜底规则。
- `scripts/collection-query-plan.mjs`：生成花瓣站内搜索入口。
- `scripts/external-link-helper.mjs`、`scripts/launch-external-link-helper.mjs`：生成本地 HTML/聚合页时的外链辅助脚本。
- `agents/openai.yaml`：Codex UI 中展示 skill 的名称、简介和默认提示。
- `evals/`：skill 输出质量和触发边界样例。

## 注意事项

- 主结果只放 `high fit` 或 `medium fit` 的强链接。
- 每个进入主结果表的直接竞品至少尝试覆盖 `应用商店`、`界面/截图`、`视频/官方/教程` 中的两类资源。
- 不返回纯宣传、无可见 UI、无真实使用过程或无法核验的链接。
- 视频未完整播放时标注 `画面未完整核验`、`缩略图可见` 或 `仅标题/摘要支撑`。
- 禁止调用、搜索或返回 iOS App Store / Apple App Store 链接。用户明确要求苹果端时，也改用截图库、视频、官网帮助、Google Images / Google Videos 下钻来源补足。
- 花瓣入口只写 `站内搜索入口 / 需浏览器核验`，不判断站内结果数量、排序或具体画板内容。
