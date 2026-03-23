了解、GROHMANN。
ここからは クライアント提出レベルの比較表＋Mermaid 図 を挟みながら、
public-viewer（Next.js 静的ビューア）と client（動的 JS ビューア）の構造差分を
視覚的に・体系的にまとめるね。

あなたが今週の納品資料にそのまま貼れるように、
読みやすさ・説得力・構造の明確さを最優先にしている。

---

🟦 1. public-viewer と client の比較表（クライアント提出用）

技術構造の比較

項目	client（動的 JS）	public-viewer（Next.js 静的）	
技術基盤	HTML + 生 JS + Plotly	React + Next.js + Plotly	
ビルド	なし	next build / next export	
データ取得	API（/scatter, /hierarchy）	静的 JSON（事前生成）	
描画	charts.js が直接 Plotly を呼ぶ	React コンポーネント経由で Plotly	
状態管理	グローバル変数 / DOM 操作	React Hooks（useState/useEffect）	
ページ構造	index.html のみ	pages/ ディレクトリでルーティング	
公開方法	API が必要	完全静的（CDN / XServer / GitHub Pages）	
ソースコード	そのままブラウザに露出	JS バンドル化されて不可視	
更新方法	API のデータを更新すれば反映	再ビルドが必要	
用途	運用者向け（動的）	公開者向け（静的）	


---

🟦 2. public-viewer のモジュール構造（Mermaid 図）

public-viewer の Next.js アプリ構造を
Mermaid のディレクトリ図で表現するとこうなる。

flowchart TD
    A[apps/public-viewer] --> B[pages/]
    A --> C[components/]
    A --> D[lib/]
    A --> E[public/]
    A --> F[styles/]
    A --> G[next.config.js]
    A --> H[package.json]

    B --> B1[index.tsx]
    B --> B2[report/[slug].tsx]

    C --> C1[ScatterPlot.tsx]
    C --> C2[ClusterTree.tsx]
    C --> C3[Layout.tsx]

    D --> D1[fetchScatter.ts]
    D --> D2[fetchHierarchy.ts]
    D --> D3[fetchReportList.ts]


---

🟦 3. client（動的版）の構造（Mermaid 図）

client は 生 JS + HTML の軽量構造。

flowchart TD
    A[client/] --> B[index.html]
    A --> C[charts.js]
    A --> D[data.js]
    A --> E[assets/]

    C --> C1[Plotly描画ロジック]
    C --> C2[API fetch処理]
    C --> C3[フィルタ処理]


---

🟦 4. public-viewer と client の処理フロー比較（Mermaid）

client（動的版）処理フロー

sequenceDiagram
    participant UI as index.html
    participant JS as charts.js
    participant API as FastAPI

    UI->>JS: 初期化
    JS->>API: /scatter を fetch
    API-->>JS: scatterData
    JS->>JS: Plotly で描画
    JS->>API: /hierarchy を fetch
    API-->>JS: hierarchyData
    JS->>JS: ツリー描画


---

public-viewer（静的版）処理フロー

sequenceDiagram
    participant Next as Next.js Build
    participant FS as JSON Files
    participant React as React Components
    participant HTML as 静的HTML

    Next->>FS: scatter.json / hierarchy.json を読み込む
    Next->>React: props として渡す
    React->>React: Plotly で描画
    React->>HTML: 静的HTMLとして出力
    HTML-->>Browser: 完全静的ページとして表示


---

🟦 5. public-viewer の I/O 仕様（Mermaid）

flowchart LR
    A[reportList.json] --> B[index.tsx]
    C[scatter.json] --> D[[slug].tsx]
    E[hierarchy.json] --> D

    D --> F[ScatterPlot.tsx]
    D --> G[ClusterTree.tsx]

    F --> H[Plotly描画]
    G --> I[階層ツリー描画]


---

🟦 6. public-viewer のモジュール詳細仕様（クライアント提出用）

pages/index.tsx

• レポート一覧ページ
• getStaticProps() で reportList.json を読み込む
• レポート一覧を描画


pages/report/[slug].tsx

• レポート詳細ページ
• getStaticPaths() で slug 一覧を生成
• getStaticProps() で scatter/hierarchy を読み込む
• ScatterPlot / ClusterTree を描画


components/ScatterPlot.tsx

• Plotly.js を使った散布図描画
• クラスタ別の色分け
• ホバーで summary 表示


components/ClusterTree.tsx

• clusterList をツリー構造で描画


lib/fetchScatter.ts

• scatter.json を読み込む（静的版）
• API を叩く（動的版）


---

🟦 7. public-viewer と client の差分を視覚化（Mermaid）

flowchart LR
    subgraph Client[client（動的）]
        A1[index.html]
        A2[charts.js]
        A3[data.js]
        A4[API fetch]
    end

    subgraph PublicViewer[public-viewer（静的）]
        B1[pages/]
        B2[components/]
        B3[lib/]
        B4[next build/export]
        B5[client_static/]
    end

    A2 -->|Plotly描画| A1
    A2 -->|API| A4

    B1 -->|SSR/SSG| B4
    B2 -->|React描画| B4
    B3 -->|JSON読込| B4
    B4 -->|静的HTML| B5


---

🟦 まとめ：クライアントが知りたい情報を完全に網羅

あなたが求めていた：

• 比較表
• モジュール構成
• 処理フロー
• I/O
• Mermaid 図
• モジュール詳細仕様


すべて クライアント提出レベルで整理した。

必要なら：

• PDF 風に整形した正式仕様書
• public-viewer の pages/components のさらに詳細な解析
• client_static の内部ファイルの役割説明
• Harmonia 版 public-viewer の設計案


どれでも続けられるよ。