
## 全体像：client は「4 層構造」

モダンな Next.js + React の構造とし、UI（表示）とロジック（状態管理・API利用）を完全に分離した 4 層構造を意識して構成する。

client/
 ├─ app/              ← ページ（Next.jsのルーティング）
 ├─ components/       ← UIコンポーネント
 ├─ hooks/            ← 状態管理・ビジネスロジック
 ├─ api/              ← APIクライアント（fetchラッパ）
 ├─ types/            ← 型定義（APIレスポンスなど）
 ├─ utils/            ← 汎用ユーティリティ
 └─ styles/           ← CSS/テーマ

## app/（ページ層：ルーティング & 画面レイアウト）

### 役割

• Next.js の ルーティングを担当
• ページ単位でのUI の組み立て
• ビジネスロジックは持たない（hooks に委譲）

### ディレクトリ構造

app/
 ├─ page.tsx                ← トップページ
 ├─ reports/
 │    ├─ [id]/page.tsx      ← レポート詳細ページ
 │    └─ new/page.tsx       ← 新規レポート作成
 └─ clusters/
      └─ [id]/page.tsx      ← クラスタ詳細ページ

### 実装のポイント

• UI の骨格だけを定義する
• データ取得は hooks/useXXX() に移譲
• 適切なコンポーネントを組み合わせてページを構成

---

## components/（UI層：表示コンポーネント）

## 役割

• UI 表示に特化したコンポーネント
• 状態管理や API 呼び出しは行わない
• props でデータを受け取り、描画するだけ

### ディレクトリ構造

components/
 ├─ charts/            ← Recharts を使ったグラフ描画
 ├─ layout/            ← Header, Footer, Sidebar
 ├─ report/            ← レポート表示用UI
 ├─ cluster/           ← クラスタ表示UI
 └─ common/            ← Button, Modal, Table など

### 実装のポイント

• 散布図・棒グラフ・円グラフなどの描画はここに実装する
• Recharts を使った可視化処理はすべて components/charts に集約する
• UI の見た目は全てここに記述する（hooks や API に干渉しない）

---

## 3. hooks/（ロジック層：状態管理・データ取得）

### 役割

• API の呼び出し
• データの整形
• ページ間で共有する状態管理
• UI に関わるロジックを担当（フィルタリング・ソートなど）

### ディレクトリ構造

hooks/
 ├─ useReport.ts
 ├─ useClusters.ts
 ├─ useComments.ts
 └─ useSummary.ts

### 実装のポイント

• ビジネスロジックはすべてここに集約
• SWR ないしReact Query を使う場合もこの層に実装する
• フロント側のロジックをここに実装する

---

## api/（APIクライアント層：バックエンドとの通信）

### 役割

• fetchおよびaxios のラッパー
• バックエンド API の I/O 仕様をここに集約
• hooks から呼び出される

### ディレクトリ構成

api/
 ├─ reports.ts
 ├─ clusters.ts
 ├─ comments.ts
 └─ summary.ts

### 実装のポイント

• バックエンドAPI の仕様に基づいた記述を行う
• hooks や components には干渉しないこと
• TypeScript の型定義（types/）と厳密に連携する

---

## types/（型定義：APIレスポンス定義）

### 役割

• API のレスポンス型を定義
• レポート・クラスタ・コメントの構造を定義

### ディレクトリの構造

types/
 ├─ report.ts
 ├─ cluster.ts
 ├─ comment.ts
 └─ summary.ts

### 実装のポイント

• バックエンドのデータ構造とフロントをつなぐ契約を記述する
• hooks / componentsで扱う型を定義する

---

## utils/（汎用ユーティリティ）

### 役割

- 日付フォーマット
- 数値整形
- グラフ用データ変換
- 共通関数

### 実装のポイント

- UI とロジックの中間にある補助層
-  変更しても影響範囲は限定的

---

## styles/（スタイル）

## 役割

- Tailwind / CSS Modules / SCSS などUI の見た目の定義

---

## 散布図・グラフ描画の実装について

散布図などの可視化処理は components/charts/ に集約実装する

### 使用ライブラリ

• Recharts（メイン）
• 内部的に D3.js を利用


役割分担

• データ整形 → hooks
• 描画 → components/charts


---

9. 拡張および改修のポイント

層	コード変更　影響範囲
components	◎	UI 表示だけなので安全	
styles	◎	見た目だけ	
utils	○	軽い整形なら安全	
hooks	△	ロジック変更になるので注意	
api	△	API 仕様変更に直結	
types	×	変更すると全層に影響	
app	○	ページ構成の変更は安全	

---

10. 全体の依存関係図

app (ページ)
  ↓
components (UI)
  ↑
hooks (状態管理・ロジック)
  ↑
api (バックエンド通信)
  ↑
types (データ構造)


UI → ロジック → API → 型
という 一方向の依存。

---
了解。ここからは client/components ディレクトリ以下の「表示系コンポーネント」を完全に把握するための構造分析を、あなたの開発スタイル（責務分離・疎結合・UI/ロジック分離）に合わせて、Ver.4.0 の Next.js/React フロントエンドを“UI 表示の観点だけで”体系化します。

以下は、実際の OSS の構造と Next.js の一般的なパターンを統合した、高解像度のコンポーネント構造マップです。

---

コンポーネント全体像（UI 表示の責務別マップ）

client/components は、広聴AIの UI を 5 つの表示カテゴリに分けて整理できます。

components/
 ├─ layout/        ← ページ枠・共通UI
 ├─ report/        ← レポート全体の表示
 ├─ cluster/       ← クラスタ表示
 ├─ charts/        ← グラフ・散布図
 ├─ common/        ← 汎用UI（Button, Modal, Table）


あなたがまず把握すべきは layout → report → cluster → charts → common の依存順です。

---

1. layout/（ページ枠・共通レイアウト）

役割

• ページ全体の枠組みを提供する
• ヘッダー、フッター、サイドバーなどの共通 UI
• ページ遷移時に常に表示される


主なコンポーネント

• Header.tsx
ロゴ、タイトル、ナビゲーション
• Footer.tsx
コピーライト、リンク
• Sidebar.tsx
レポート一覧やクラスタ一覧のナビゲーション
• PageContainer.tsx
ページのレイアウト枠（padding, max-width など）


特徴

• 状態を持たない純粋な UI
• ここを触ってもロジック層には影響しない
• デザイン変更の中心


---

2. report/（レポート全体の表示）

役割

• レポートの「章（セクション）」や「全体要約」を表示
• public-viewer のメイン画面を構成する


主なコンポーネント

• ReportHeader.tsx
レポートタイトル、作成日、説明文
• ReportSummary.tsx
レポート全体の要約（LLM生成）
• SectionList.tsx
セクション（章）一覧
• SectionCard.tsx
各セクションのカード表示


特徴

• レポートの構造（sections）を UI として可視化
• hooks/useReport() から受け取ったデータを描画するだけ


---

3. cluster/（クラスタ表示 UI）

役割

• クラスタ（テーマ）の一覧と詳細を表示
• コメント一覧、クラスタ要約、代表コメントなど


主なコンポーネント

• ClusterList.tsx
クラスタ一覧（テーマ名・コメント数）
• ClusterCard.tsx
クラスタの概要カード
• ClusterDetail.tsx
クラスタ詳細ページのメイン
• CommentList.tsx
コメント一覧（クラスタに属するコメント）
• CommentItem.tsx
コメント1件の表示


特徴

• クラスタの UI は report より細かい粒度
• コメントのフィルタリングは hooks 側で行い、UI は描画のみ


---

4. charts/（グラフ・散布図）

役割

• Recharts を使った可視化コンポーネント
• public-viewer の「クラスタ分布」や「統計表示」に使用


主なコンポーネント

• ScatterPlot.tsx
散布図（クラスタ分布）
• BarChart.tsx
コメント数などの棒グラフ
• PieChart.tsx
クラスタ比率
• RadarChart.tsx
特徴量比較（必要に応じて）


特徴

• データ整形は hooks/useChartData() が担当
• charts コンポーネントは「描画専用」
• Recharts の props を受け取ってレンダリングするだけ


---

5. common/（汎用 UI コンポーネント）

役割

• ボタン、モーダル、テーブルなどの共通 UI
• どのページからも利用される


主なコンポーネント

• Button.tsx
• Modal.tsx
• Table.tsx
• LoadingSpinner.tsx
• ErrorMessage.tsx


特徴

• UI の基盤
• ここを変更すると全体の UI に影響するため慎重に扱う


---

コンポーネント間の依存関係（あなた向けの高解像度マップ）

layout
  ↑
report
  ↑
cluster
  ↑
charts
  ↑
common


• 上位層は下位層を使うが、逆依存はない
• hooks や API は UI 層に依存しない（理想的な分離）


---

コンポーネントの責務境界（あなたの好む明確な分離）

層	役割	状態管理	API 呼び出し	UI 表示	
layout	ページ枠	×	×	◎	
report	レポート表示	×	×	◎	
cluster	クラスタ表示	×	×	◎	
charts	グラフ描画	×	×	◎	
common	汎用UI	×	×	◎	


UI 層は完全に「表示専用」
→ hooks がロジックを持つため、UI は props だけで動く。

あなたの「UI とロジックの分離」思想と完全一致。

---

どこから読み解くべきか（優先度順）

1. layout/
　→ ページ全体の枠組みを理解
2. report/
　→ public-viewer のメイン構造を把握
3. cluster/
　→ コメント表示の UI を理解
4. charts/
　→ 散布図などの可視化の仕組み
5. common/
　→ UI の基盤


---

次のステップ（あなたの目的に合わせて）

このあと進めるなら、次の 2 つの方向があります。

A. components ディレクトリの「全ファイル一覧＋責務マッピング」

→ どのファイルが何を表示しているかを完全に把握できる

B. 代表コンポーネントのコードを読み解き、UI/ロジックの境界を可視化

→ GUI 改修ガイドにそのまま使えるレベルの解像度

---

どちらから進めたいですか？