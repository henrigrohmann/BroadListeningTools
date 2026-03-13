了解した、GROHMANN。
ここが新しいチャットなので、継続チャット仕様はすでに有効とみなし、この文脈で ScatterChart の汎用化タスクにすぐ入るよ。

ここからは React + TypeScript + Plotly.js の純粋な汎用 ScatterPlot.tsx を設計・実装するフェーズに移行する。

---

🔧 Step 1: 汎用 ScatterPlot.tsx の props 設計案（初版）

まずは、どのプロジェクトでも使えるようにするための props 設計の最小構成を提示する。

🎯 目標

• Plotly の散布図描画に必要な部分だけ抽出
• Chakra / Uli 依存ゼロ
• 単一ファイルで完結
• データと設定を props で渡せる
• hover/click を外部に公開できる


---

📐 Props 設計（初版）

export interface ScatterPlotProps {
  data: {
    x: number[]
    y: number[]
    label?: string
    color?: string
    size?: number
  }[]

  width?: number | string
  height?: number | string

  layoutOptions?: Partial<Plotly.Layout>

  onPointClick?: (payload: {
    x: number
    y: number
    pointIndex: number
    seriesIndex: number
  }) => void

  onPointHover?: (payload: {
    x: number
    y: number
    pointIndex: number
    seriesIndex: number
  }) => void

  style?: React.CSSProperties
}


🔍 設計意図

• data は複数 series を扱えるように配列化
• label / color / size は Plotly trace にそのまま反映可能
• layoutOptions は Plotly の layout を上書きできる柔軟性確保
• hover/click は最低限の情報だけ返す
• width/height は CSS と Plotly 両方に対応


---

🔧 Step 2: 汎用化した Plotly trace の最小構成

元の ScatterChart.tsx から抽出すると、Plotly trace は以下のような最小構成で十分。

const traces = data.map((series, seriesIndex) => ({
  x: series.x,
  y: series.y,
  mode: "markers",
  type: "scatter",
  name: series.label ?? `Series ${seriesIndex + 1}`,
  marker: {
    color: series.color ?? "blue",
    size: series.size ?? 8,
  },
}))


---

🔧 Step 3: layout の最小構成

const layout: Partial<Plotly.Layout> = {
  margin: { t: 20, r: 20, b: 40, l: 40 },
  hovermode: "closest",
  ...layoutOptions,
}


---

🔧 Step 4: 単一ファイル ScatterPlot.tsx（ドラフト）

ここまでの設計を踏まえた 初版ドラフトを提示するよ。
（まだ最終版ではなく、あなたの元コードを見て調整可能）

import React from "react"
import Plot from "react-plotly.js"
import * as Plotly from "plotly.js"

export interface ScatterPlotProps {
  data: {
    x: number[]
    y: number[]
    label?: string
    color?: string
    size?: number
  }[]

  width?: number | string
  height?: number | string

  layoutOptions?: Partial<Plotly.Layout>

  onPointClick?: (payload: {
    x: number
    y: number
    pointIndex: number
    seriesIndex: number
  }) => void

  onPointHover?: (payload: {
    x: number
    y: number
    pointIndex: number
    seriesIndex: number
  }) => void

  style?: React.CSSProperties
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data,
  width = "100%",
  height = 400,
  layoutOptions,
  onPointClick,
  onPointHover,
  style,
}) => {
  const traces = data.map((series, seriesIndex) => ({
    x: series.x,
    y: series.y,
    mode: "markers",
    type: "scatter",
    name: series.label ?? `Series ${seriesIndex + 1}`,
    marker: {
      color: series.color ?? "blue",
      size: series.size ?? 8,
    },
  }))

  const layout: Partial<Plotly.Layout> = {
    margin: { t: 20, r: 20, b: 40, l: 40 },
    hovermode: "closest",
    ...layoutOptions,
  }

  return (
    <Plot
      data={traces}
      layout={layout}
      style={{ width, height, ...style }}
      onClick={(event) => {
        if (!onPointClick) return
        const p = event.points?.[0]
        if (!p) return
        onPointClick({
          x: p.x as number,
          y: p.y as number,
          pointIndex: p.pointIndex,
          seriesIndex: p.curveNumber,
        })
      }}
      onHover={(event) => {
        if (!onPointHover) return
        const p = event.points?.[0]
        if (!p) return
        onPointHover({
          x: p.x as number,
          y: p.y as number,
          pointIndex: p.pointIndex,
          seriesIndex: p.curveNumber,
        })
      }}
    />
  )
}


---

🌱 次のステップ

ここからはあなたの判断で進められるよ。

✔ 元の ScatterChart.tsx の該当部分を貼ってくれれば

• trace の構造
• layout の細かい設定
• hover/click の扱い
• 色やサイズの扱い
• 軸設定
などを 完全に一致する形で抽出・汎用化できる。


✔ このまま汎用化を進めても OK

すでに汎用 ScatterPlot.tsx の初版は成立している。

---

GROHMANN、次はどう進めたい？
元コードを貼ってくれれば、さらに精密に抽出していくよ。