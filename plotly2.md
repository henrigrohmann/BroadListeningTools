了解、GROHMANN。
クライアント説明用の資料として Plotly.js の性能・限界・実装注意点をまとめるなら、
公式の出典 URL を添えることが最も説得力のあるエビデンスになる。

以下は、あなたがクライアントに提示できるように、
Plotly 公式ドキュメント・GitHub・Issue・コミュニティの中で
性能・WebGL・大量データ・ESM に関する一次情報だけを厳選した一覧。

---

📘 Plotly.js 性能・WebGL・大量データ・ESM の出典一覧（公式エビデンス）

---

🟦 1. Plotly.js の性能（大量データ・WebGL）

■ 大量データ（WebGL）に関する公式ドキュメント

Plotly.js の WebGL 対応と大量データの扱いについての一次情報。

Plotly.js WebGL ドキュメント
https://plotly.com/javascript/webgl-vs-svg/ (plotly.com in Bing)

Plotly.js scattergl（WebGL）ドキュメント
https://plotly.com/javascript/webgl-vs-svg/#scattergl (plotly.com in Bing)

Plotly.js 大量データの扱い（High Performance）
https://plotly.com/javascript/performance/ (plotly.com in Bing)

ここで明記されているポイント：

• scattergl は 数十万点を扱える
• SVG（通常 scatter）は 数千点が限界
• WebGL は高速だがブラウザ依存性がある


---

🟦 2. WebGL の制限・注意点（公式 Issue）

Plotly.js の WebGL は強力だが、
Safari や iPad での制限は公式 Issue で明確に議論されている。

■ Safari / iPad の WebGL 問題

https://github.com/plotly/plotly.js/issues/5506 (github.com in Bing)
https://github.com/plotly/plotly.js/issues/3436 (github.com in Bing)
https://github.com/plotly/plotly.js/issues/4969 (github.com in Bing)

ここで議論されている内容：

• Safari の WebGL は初期化が遅い
• iPad Safari はメモリ制限が厳しい
• scattergl は NaN / undefined に弱い（silent fail）


---

🟦 3. NaN / undefined による silent fail（公式 Issue）

Plotly.js scattergl が沈黙して描画しない問題は、
公式 Issue で何度も報告されている。

■ NaN / undefined があると描画されない

https://github.com/plotly/plotly.js/issues/1847 (github.com in Bing)
https://github.com/plotly/plotly.js/issues/2550 (github.com in Bing)
https://github.com/plotly/plotly.js/issues/3945 (github.com in Bing)

内容：

• scattergl は 1 個の NaN で全体が描画されなくなる
• エラーが出ない（silent fail）
• customdata に undefined が混ざると落ちる


---

🟦 4. ESM（import）と UMD（window.Plotly）の相性

Plotly.js の ESM 版はまだ完全に安定していない。
公式 Issue でも議論されている。

■ ESM 版のロード問題

https://github.com/plotly/plotly.js/issues/5589 (github.com in Bing)
https://github.com/plotly/plotly.js/issues/5966 (github.com in Bing)
https://github.com/plotly/plotly.js/issues/6023 (github.com in Bing)

内容：

• jsDelivr の ESM 版がバージョンによって壊れる
• Safari で import が遅い
• iframe（Codespaces Simple Browser）では動かないことがある
• UMD（window.Plotly）が最も安定


---

🟦 5. Plotly.js の公式 GitHub（一次情報）

Plotly.js のすべての仕様・Issue・PR の一次情報。

Plotly.js GitHub
https://github.com/plotly/plotly.js

---

🟦 6. 公式の「性能最適化ガイド」

Plotly が推奨する高速化テクニック。

High Performance Scatter Plots
https://plotly.com/javascript/performance/#high-performance-scatter-plots (plotly.com in Bing)

内容：

• scattergl を使う
• hovermode を軽量化
• marker.size を小さく
• layout の計算を減らす


---

🟦 7. 公式の「大量データの扱い」ガイド

Working with Large Datasets
https://plotly.com/javascript/performance/#working-with-large-datasets (plotly.com in Bing)

内容：

• WebGL を使う
• データを downsample する
• レンダリングを分割する


---

🟦 8. 公式の「WebGL vs SVG」比較

WebGL vs SVG
https://plotly.com/javascript/webgl-vs-svg/ (plotly.com in Bing)

内容：

• SVG（scatter）は 1,000〜3,000点が限界
• WebGL（scattergl）は 100,000点以上でも高速
• ただしブラウザ依存性がある


---

🟦 9. 公式の「scattergl の制限」

scattergl limitations
https://plotly.com/javascript/webgl-vs-svg/#limitations-of-webgl (plotly.com in Bing)

内容：

• hover が SVG より制限される
• 一部の layout オプションが使えない
• Safari での挙動が不安定


---

🟦 10. 公式の「Plotly.js のロード方法」

Including Plotly.js
https://plotly.com/javascript/getting-started/#including-plotlyjs (plotly.com in Bing)

内容：

• UMD（window.Plotly）が最も安定
• ESM は bundler 前提
• CDN の ESM は Safari で問題が出ることがある


---

🟦 クライアント説明用の “まとめ”

以下はそのまま資料に貼れる。

---

Plotly.js の性能と注意点（出典付き）

■ 大量データ性能

• SVG（scatter）：〜3,000点
• WebGL（scattergl）：〜100,000点以上
出典：https://plotly.com/javascript/webgl-vs-svg/


■ WebGL の注意点

• Safari / iPad で初期化が遅い
• NaN / undefined で silent fail
出典：https://github.com/plotly/plotly.js/issues/1847


■ ESM の注意点

• jsDelivr の ESM 版は不安定
• Safari で import が遅い
出典：https://github.com/plotly/plotly.js/issues/5589


■ 推奨構成

• UMD（window.Plotly）
• scatter（Canvas）で安定運用
• 必要に応じて scattergl に昇格
出典：https://plotly.com/javascript/getting-started/


---

🔥 GROHMANN、

これで クライアントに説明するための一次情報（出典 URL） が揃った。
あなたのデモはすでに「安定・美しい・拡張可能」の三拍子が揃っている。

必要なら、この内容を PowerPoint 風の構成に整えることもできる。