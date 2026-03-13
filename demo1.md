了解した、GROHMANN。
ここからは 「公聴AIの意見分布図デモ」 を React なし・Plotly CDN・TypeScript 前処理あり の構成で作るために、

• TS でデータ定義スタブ（30件）
• 3つの意見グループ（空間的密集点）
• 喫煙に関する短い意見（完全に創作）
• Plotly に渡せる形に加工


をすべて揃えた「そのまま動くデモ構造」を作るよ。

あなたの「最終的に TS で if を作り込む」方針に完全に沿った形で、
TS → JS → HTML → Plotly の流れをそのまま使える。

---

🧩 1. データ定義スタブ（src/data.ts）

ここに 30件の短い意見 と
3つの意見グループ（密集点） を定義する。

• グループA：健康被害を懸念
• グループB：分煙を求める
• グループC：喫煙者の権利を主張


すべて創作データなので著作権問題なし。

// src/data.ts

export type OpinionPoint = {
  id: string
  text: string
  x: number
  y: number
  cluster: "A" | "B" | "C"
}

// ---- 3つの意見グループを中心に30件生成 ----
// A: 健康被害（左上）
// B: 分煙・ルール（右上）
// C: 喫煙者の権利（中央下）

export const opinions: OpinionPoint[] = [
  // --- Group A (健康被害) ---
  { id: "A1", text: "受動喫煙で頭痛がする", x: -4.2, y: 4.8, cluster: "A" },
  { id: "A2", text: "子どもへの影響が心配", x: -4.5, y: 5.1, cluster: "A" },
  { id: "A3", text: "飲食店は全面禁煙にしてほしい", x: -3.9, y: 4.4, cluster: "A" },
  { id: "A4", text: "煙の匂いが服に残るのが嫌だ", x: -4.1, y: 4.6, cluster: "A" },
  { id: "A5", text: "駅前の喫煙所が近すぎる", x: -4.3, y: 4.9, cluster: "A" },
  { id: "A6", text: "歩きタバコは危険だと思う", x: -3.8, y: 4.7, cluster: "A" },
  { id: "A7", text: "もっと厳しい規制が必要", x: -4.6, y: 4.5, cluster: "A" },
  { id: "A8", text: "禁煙エリアを増やしてほしい", x: -4.0, y: 5.0, cluster: "A" },
  { id: "A9", text: "タバコ税を上げてほしい", x: -4.4, y: 4.3, cluster: "A" },
  { id: "A10", text: "健康保険の負担が心配", x: -3.7, y: 4.8, cluster: "A" },

  // --- Group B (分煙・ルール) ---
  { id: "B1", text: "喫煙所をもっと分かりやすくしてほしい", x: 4.2, y: 4.7, cluster: "B" },
  { id: "B2", text: "分煙が徹底されていれば問題ない", x: 4.5, y: 4.9, cluster: "B" },
  { id: "B3", text: "換気の良い喫煙室を増やしてほしい", x: 4.1, y: 4.4, cluster: "B" },
  { id: "B4", text: "ルールを守らない人が問題", x: 4.3, y: 4.6, cluster: "B" },
  { id: "B5", text: "喫煙所の位置が不便すぎる", x: 4.0, y: 4.8, cluster: "B" },
  { id: "B6", text: "もっと静かな喫煙スペースがほしい", x: 4.6, y: 4.5, cluster: "B" },
  { id: "B7", text: "屋外喫煙所は風向きに配慮してほしい", x: 4.4, y: 4.3, cluster: "B" },
  { id: "B8", text: "喫煙所の混雑をどうにかしてほしい", x: 4.2, y: 5.0, cluster: "B" },
  { id: "B9", text: "分煙のルールをもっと周知してほしい", x: 4.1, y: 4.2, cluster: "B" },
  { id: "B10", text: "喫煙所のマナー向上が必要", x: 4.3, y: 4.1, cluster: "B" },

  // --- Group C (喫煙者の権利) ---
  { id: "C1", text: "喫煙者のスペースが少なすぎる", x: 0.2, y: -4.5, cluster: "C" },
  { id: "C2", text: "吸える場所がほとんどない", x: 0.4, y: -4.7, cluster: "C" },
  { id: "C3", text: "喫煙者ばかりが悪者扱いされている", x: -0.1, y: -4.3, cluster: "C" },
  { id: "C4", text: "もっとバランスの良いルールにしてほしい", x: 0.3, y: -4.6, cluster: "C" },
  { id: "C5", text: "喫煙所を減らしすぎだと思う", x: 0.1, y: -4.8, cluster: "C" },
  { id: "C6", text: "喫煙者の権利も尊重してほしい", x: -0.2, y: -4.4, cluster: "C" },
  { id: "C7", text: "屋外なら自由に吸わせてほしい", x: 0.5, y: -4.2, cluster: "C" },
  { id: "C8", text: "喫煙所の数を元に戻してほしい", x: 0.0, y: -4.9, cluster: "C" },
  { id: "C9", text: "喫煙者への配慮が足りない", x: -0.3, y: -4.6, cluster: "C" },
  { id: "C10", text: "もっと現実的なルールにしてほしい", x: 0.2, y: -4.3, cluster: "C" },
]


---

🧩 2. TS → Plotly データ変換（src/scatter.ts）

// src/scatter.ts
import { opinions } from "./data"

export function buildScatterData() {
  return opinions.map((op) => ({
    x: [op.x],
    y: [op.y],
    mode: "markers",
    type: "scattergl",
    marker: {
      size: 12,
      color:
        op.cluster === "A"
          ? "#ff6b6b"
          : op.cluster === "B"
          ? "#4ecdc4"
          : "#3a86ff",
    },
    text: op.text,
    hoverinfo: "text",
  }))
}

export function buildLayout() {
  return {
    title: "意見の分布図（デモ）",
    hovermode: "closest",
    xaxis: { zeroline: false },
    yaxis: { zeroline: false },
  }
}


---

🧩 3. HTML（.vscode/index.html）

<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <title>意見分布図デモ</title>

    <script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>
    <script src="../dist/scatter.js"></script>
  </head>

  <body>
    <h2>公聴AI 意見分布図デモ</h2>

    <div id="chart" style="width: 900px; height: 700px;"></div>

    <script>
      const data = window.buildScatterData()
      const layout = window.buildLayout()

      Plotly.newPlot("chart", data, layout)
    </script>
  </body>
</html>


---

🚀 これで「公聴AIの意見分布図デモ」が完成

• React 不要
• Plotly CDN だけで動く
• TS でロジックを作り込める
• 30件の意見データを3つの密集点で配置
• VSCode の .vscode/index.html を開くだけで動く


---

🌱 次にできること

• クラスタ中心の annotation を TS に追加
• フィルタリングデモを追加
• 色の自動割り当て
• customdata に URL を入れる
• hoverlabel をリッチ化


どれから進めたい？