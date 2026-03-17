了解した、GROHMANN。
“クライアント PC で最小散布図が描画できるかどうかを確認するための、完全動作するテスト用ファイル一式” をここにまとめて送るよ。

あなたが今すぐコピペして動かせるように、
index.html / data.js / scatter.js / server.py
の 4 ファイルを “最小構成・依存ゼロ” で用意した。

これで企業 PC のセキュリティ層が Plotly や JS に干渉していないかを、
一発で確認できる。

---

🟦 1. server.py（FastAPI：3点データ返すだけ）

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/scatter_test")
def scatter_test():
    return {
        "points": [
            {"x": 0.1, "y": 0.2, "label": "A"},
            {"x": 0.4, "y": 0.5, "label": "B"},
            {"x": 0.7, "y": 0.3, "label": "C"}
        ]
    }


起動：

uvicorn server:app --reload --host 0.0.0.0 --port 8001


---

🟩 2. data.js（API ラッパー：fetch するだけ）

// @ts-nocheck
console.log("data.js loaded");

window.api = {
  async getScatterTest() {
    const url = "http://localhost:8001/scatter_test";
    const res = await fetch(url);
    return res.json();
  }
};


---

🟧 3. scatter.js（最小 3 点散布図描画）

console.log("scatter.js loaded");

window.buildScatterTestPlot = function(data) {
  const xs = data.points.map(p => p.x);
  const ys = data.points.map(p => p.y);
  const labels = data.points.map(p => p.label);

  const trace = {
    x: xs,
    y: ys,
    text: labels,
    mode: "markers+text",
    textposition: "top center",
    type: "scatter"   // WebGL を使わない → 企業PCでも安全
  };

  const layout = {
    title: "Scatter Test (3 points)",
    xaxis: { range: [0, 1] },
    yaxis: { range: [0, 1] }
  };

  Plotly.newPlot("plot", [trace], layout);
};


---

🟨 4. index.html（ボタン → API → 描画の通し動作）

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>Scatter Test</title>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    #plot { width: 600px; height: 400px; border: 1px solid #ccc; }
    button { padding: 10px 20px; font-size: 14px; }
  </style>
</head>

<body>
  <h2>Scatter Test</h2>

  <button onclick="runScatterTest()">Run Scatter Test</button>

  <div id="plot"></div>

  <script src="data.js"></script>
  <script src="scatter.js"></script>

  <script>
    async function runScatterTest() {
      console.log("Requesting scatter test data...");
      const data = await window.api.getScatterTest();
      console.log("Data received:", data);
      window.buildScatterTestPlot(data);
    }
  </script>
</body>
</html>


---

🟪 これで確認できること

• Plotly が企業 PC で正常動作するか
• WebGL がブロックされていないか（今回は非 WebGL）
• data.js → scatter.js の連携が正常か
• JS の実行順序が壊れていないか
• API → data.js → scatter.js のパイプラインが通るか
• セキュリティ層が JSON を書き換えていないか


つまり、GraphTools の最小構成が企業 PC で動くかどうかを
一発で確認できる。

---

🌟 GROHMANN、

この 4 ファイルを同じディレクトリに置いて、

• Live Server（5500 など）で index.html
• FastAPI（8001）で server.py
を動かせば、すぐにテストできる。


必要なら、次は

• WebGL 版
• scattergl 版
• 30 点版
• hover/click イベント版
もすぐに作るよ。