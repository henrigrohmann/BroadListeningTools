
---

📘 公聴AI（public‑viewer）画面仕様書（完全版）

対象画面：

1. ReportPage（レポートトップ）
2. ClusterDetailPage（クラスタ詳細）
3. ChartPage（散布図＋棒グラフ）
4. SectionListPage（セクション一覧）
5. SectionDetailPage（セクション詳細）
6. CommentDetailPage（コメント詳細）※任意


すべて ReportPage と同じフォーマットで記述する。

---

① ReportPage（レポートトップ）

※これはあなたが提示したフォーマットをそのまま踏襲している。

---

🖥 ReportPage（画面レイアウト＋コンポーネント階層）

flowchart TB

subgraph PAGE["📄 ReportPage (app/reports/[id]/page.tsx)"]
direction TB

    %% --- Header ---
    subgraph HEADER["Header (components/report/ReportHeader.tsx)"]
        H1["Title (props: report.title)"]
        H2["MetaInfo (props: report.created_at)"]
    end

    %% --- Summary ---
    subgraph SUMMARY["SummarySection (components/report/ReportSummary.tsx)"]
        S1["SummaryText (props: report.summary)"]
    end

    %% --- Navigation ---
    subgraph NAV["Navigation (components/common/NavButtons.tsx)"]
        N1["→ Cluster List"]
        N2["→ Chart Page"]
        N3["→ Section List"]
    end

    %% --- Cluster List ---
    subgraph CLUSTERS["ClusterList (components/cluster/ClusterList.tsx)"]
    direction TB
        C1["ClusterCard (components/cluster/ClusterCard.tsx)"]
        C2["ClusterCard"]
        C3["ClusterCard"]
    end

    %% --- Section List ---
    subgraph SECTIONS["SectionList (components/section/SectionList.tsx)"]
    direction TB
        SEC1["SectionCard (components/section/SectionCard.tsx)"]
        SEC2["SectionCard"]
    end

end


---

🧩 ReportPage の仕様（構造化）

📍 パス

/reports/[id]

📥 使用 hooks

useReport(reportId): Report
useClusters(reportId): Cluster[]
useSections(reportId): Section[]


📤 UI に渡る props

{
  report: Report,
  clusters: Cluster[],
  sections: Section[]
}


🧱 コンポーネント構造

ReportPage
 ├─ ReportHeader
 ├─ ReportSummary
 ├─ NavButtons
 ├─ ClusterList
 │    └─ ClusterCard[]
 └─ SectionList
      └─ SectionCard[]


---

② ClusterDetailPage（クラスタ詳細）

---

🖥 ClusterDetailPage（画面レイアウト＋コンポーネント階層）

flowchart TB

subgraph PAGE["📚 ClusterDetailPage (app/clusters/[cluster_id]/page.tsx)"]
direction TB

    %% --- Header ---
    subgraph HEADER["ClusterHeader (components/cluster/ClusterHeader.tsx)"]
        H1["Cluster Title (props: cluster.label)"]
        H2["Comment Count (props: cluster.comment_count)"]
    end

    %% --- Summary ---
    subgraph SUMMARY["ClusterSummary (components/cluster/ClusterSummary.tsx)"]
        S1["SummaryText (props: cluster.summary)"]
        S2["RepresentativeComments (props: cluster.representative_comments[])"]
    end

    %% --- Comment List ---
    subgraph COMMENTS["CommentList (components/comment/CommentList.tsx)"]
    direction TB
        CM1["CommentCard (components/comment/CommentCard.tsx)"]
        CM2["CommentCard"]
        CM3["CommentCard"]
    end

    %% --- Navigation ---
    subgraph NAV["NavButtons (components/common/NavButtons.tsx)"]
        N1["→ Chart Page"]
        N2["→ Back to Report"]
    end

end


---

🧩 ClusterDetailPage の仕様（構造化）

📍 パス

/clusters/[cluster_id]

📥 使用 hooks

useClusterDetail(clusterId): Cluster
useComments(clusterId): Comment[]


📤 UI に渡る props

{
  cluster: Cluster,
  comments: Comment[]
}


🧱 コンポーネント構造

ClusterDetailPage
 ├─ ClusterHeader
 ├─ ClusterSummary
 ├─ CommentList
 │    └─ CommentCard[]
 └─ NavButtons


---

③ ChartPage（散布図＋棒グラフ）

---

🖥 ChartPage（画面レイアウト＋コンポーネント階層）

flowchart TB

subgraph PAGE["📊 ChartPage (app/reports/[id]/chart/page.tsx)"]
direction TB

    subgraph HEADER["Header"]
        H1["Report Title (props: report.title)"]
    end

    subgraph SCATTER["ScatterPlot (components/chart/ScatterPlot.tsx)"]
        G1["Recharts ScatterChart (props: chartData[])"]
    end

    subgraph BAR["ClusterBarChart (components/chart/ClusterBarChart.tsx)"]
        G2["Recharts BarChart (props: clusters[])"]
    end

    subgraph NAV["NavButtons"]
        N1["→ Back to Report"]
        N2["→ Cluster List"]
    end

end


---

🧩 ChartPage の仕様（構造化）

📍 パス

/reports/[id]/chart

📥 使用 hooks

useChartData(reportId): { x, y, cluster }[]
useClusters(reportId): Cluster[]
useReport(reportId): Report


📤 UI に渡る props

{
  chartData: ChartPoint[],
  clusters: Cluster[],
  report: Report
}


🧱 コンポーネント構造

ChartPage
 ├─ Header
 ├─ ScatterPlot
 ├─ ClusterBarChart
 └─ NavButtons


---

④ SectionListPage（セクション一覧）

---

🖥 SectionListPage（画面レイアウト＋コンポーネント階層）

flowchart TB

subgraph PAGE["📖 SectionListPage (app/reports/[id]/sections/page.tsx)"]
direction TB

    subgraph HEADER["Header"]
        H1["Report Title"]
    end

    subgraph SECTIONS["SectionList (components/section/SectionList.tsx)"]
    direction TB
        S1["SectionCard"]
        S2["SectionCard"]
        S3["SectionCard"]
    end

    subgraph NAV["NavButtons"]
        N1["→ Back to Report"]
    end

end


---

🧩 SectionListPage の仕様（構造化）

📍 パス

/reports/[id]/sections

📥 使用 hooks

useSections(reportId): Section[]
useReport(reportId): Report


📤 UI に渡る props

{
  sections: Section[],
  report: Report
}


🧱 コンポーネント構造

SectionListPage
 ├─ Header
 ├─ SectionList
 │    └─ SectionCard[]
 └─ NavButtons


---

⑤ SectionDetailPage（セクション詳細）

---

🖥 SectionDetailPage（画面レイアウト＋コンポーネント階層）

flowchart TB

subgraph PAGE["📘 SectionDetailPage (app/sections/[section_id]/page.tsx)"]
direction TB

    subgraph HEADER["SectionHeader (components/section/SectionHeader.tsx)"]
        H1["Section Title (props: section.title)"]
    end

    subgraph SUMMARY["SectionSummary (components/section/SectionSummary.tsx)"]
        S1["SummaryText (props: section.summary)"]
    end

    subgraph RELATED["ClusterList (components/cluster/ClusterList.tsx)"]
        C1["ClusterCard"]
        C2["ClusterCard"]
    end

    subgraph NAV["NavButtons"]
        N1["→ Back to Report"]
        N2["→ Cluster List"]
    end

end


---

🧩 SectionDetailPage の仕様（構造化）

📍 パス

/sections/[section_id]

📥 使用 hooks

useSectionDetail(sectionId): Section
useClusters(reportId): Cluster[]


📤 UI に渡る props

{
  section: Section,
  clusters: Cluster[]
}


🧱 コンポーネント構造

SectionDetailPage
 ├─ SectionHeader
 ├─ SectionSummary
 ├─ ClusterList
 │    └─ ClusterCard[]
 └─ NavButtons


---

⑥ CommentDetailPage（コメント詳細）※任意

---

🖥 CommentDetailPage（画面レイアウト＋コンポーネント階層）

flowchart TB

subgraph PAGE["💬 CommentDetailPage (app/comments/[id]/page.tsx)"]
direction TB

    subgraph HEADER["Header"]
        H1["Comment ID"]
    end

    subgraph BODY["CommentBody (components/comment/CommentBody.tsx)"]
        B1["Comment Text (props: comment.text)"]
        B2["Cluster Link (props: comment.cluster_id)"]
    end

    subgraph NAV["NavButtons"]
        N1["→ Back to Cluster"]
        N2["→ Back to Report"]
    end

end


---

🧩 CommentDetailPage の仕様（構造化）

📍 パス

/comments/[id]

📥 使用 hooks

useComment(commentId): Comment


📤 UI に渡る props

{
  comment: Comment
}


🧱 コンポーネント構造

CommentDetailPage
 ├─ Header
 ├─ CommentBody
 └─ NavButtons


---
了解した、GROHMANN。
ここからは 新人プログラマが “サンドボックス環境で元コードを見ずに” 公聴AIの Client を実装できるように、レイヤーごとに「実装手順」と「コーディング例」を段階的に示す“実装手順書” を作る。

あなたが求めているのは：

• レイヤーごとに何を作ればよいか
• どの順番で作ればよいか
• どのファイルを作るか
• どんなコードを書くか（抽象化された例）
• サンドボックスでも破綻しないように、依存関係を明示
• 新人が迷わないように、1 ステップずつのガイド


なので、以下のように 段階式・レイヤー式・コード例付きでまとめる。

---

📘 公聴AI（public‑viewer）新人向け「実装手順書（サンドボックス版）」

この手順書は、元のコードを見せずに、サンドボックス環境で公聴AIの Client を再構築するためのガイドです。

構成は次の 5 レイヤー：

1. データモデル（型）を作る
2. API 通信層（fetcher / api/）を作る
3. hooks（状態管理・整形）を作る
4. UI コンポーネントを作る
5. ページ（画面）を組み立てる


各レイヤーに 実装手順 → コーディング例 → 完成形のイメージ を含める。

---

🧱 レイヤー 1：データモデル（型）を作る

🎯 目的

全レイヤーで共通して使う 型（interface） を定義する。

📂 作成するファイル

/lib/types.ts


📝 実装手順

1. Report / Cluster / Section / Comment / EmbeddingPoint の型を定義
2. すべての API の返却値がこの型に準拠するようにする
3. UI コンポーネントは props としてこの型を受け取る


💡 コーディング例（サンドボックス用）

export interface Report {
  id: string;
  title: string;
  summary: string;
  created_at: string;
  clusters: Cluster[];
  sections: Section[];
}

export interface Cluster {
  cluster_id: string;
  label: string;
  summary: string;
  comment_count: number;
  representative_comments: string[];
}

export interface Section {
  section_id: string;
  title: string;
  summary: string;
  clusters: string[];
}

export interface Comment {
  id: string;
  text: string;
  cluster_id: string | null;
  created_at: string;
}

export interface EmbeddingPoint {
  comment_id: string;
  x: number;
  y: number;
  cluster_id: string;
}


---

🌐 レイヤー 2：API 通信層（fetcher / api/）

🎯 目的

• Route Handler を叩くための fetcher
• 各 API 呼び出し関数（getReport など）


📂 作成するファイル

/lib/fetcher.ts
/api/report.ts
/api/clusters.ts
/api/sections.ts
/api/embedding.ts


📝 実装手順

1. fetcher を作る（共通の HTTP 通信）
2. 各 API 関数を作る
3. hooks から呼ばれるようにする


💡 コーディング例（抽象化）

fetcher.ts

export async function fetcher(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("API Error");
  return res.json();
}


api/report.ts

import { fetcher } from "@/lib/fetcher";

export function getReport(reportId: string) {
  return fetcher(`/api/reports/${reportId}`);
}


---

🔄 レイヤー 3：hooks（状態管理・整形）

🎯 目的

• SWR を使ってデータ取得
• UI が扱いやすい形に整形
• ローディング・エラー管理


📂 作成するファイル

/hooks/useReport.ts
/hooks/useClusters.ts
/hooks/useChartData.ts
/hooks/useSections.ts
/hooks/useClusterDetail.ts


📝 実装手順

1. SWR を使って API を呼ぶ
2. 必要なら整形（例：クラスタのソート）
3. UI に返す


💡 コーディング例（useClusters）

import useSWR from "swr";
import { getClusters } from "@/api/clusters";

export function useClusters(reportId: string) {
  const { data } = useSWR(
    reportId ? `/reports/${reportId}/clusters` : null,
    () => getClusters(reportId)
  );

  const clusters = data?.sort((a, b) => b.comment_count - a.comment_count) ?? [];

  return { clusters };
}


---

🎨 レイヤー 4：UI コンポーネントを作る

🎯 目的

• props を受け取って描画するだけ
• ロジックは持たない
• hooks や API を直接呼ばない


📂 作成するファイル

/components/report/ReportHeader.tsx
/components/report/ReportSummary.tsx
/components/cluster/ClusterCard.tsx
/components/cluster/ClusterList.tsx
/components/section/SectionCard.tsx
/components/section/SectionList.tsx
/components/chart/ScatterPlot.tsx
/components/chart/ClusterBarChart.tsx
/components/common/NavButtons.tsx


📝 実装手順

1. props を受け取る
2. UI を描画する
3. クリック時の遷移は Next.js の Link を使う


💡 コーディング例（ClusterCard）

export function ClusterCard({ cluster }) {
  return (
    <div className="card">
      <h3>{cluster.label}</h3>
      <p>{cluster.summary}</p>
      <p>{cluster.comment_count} 件のコメント</p>
      <a href={`/clusters/${cluster.cluster_id}`}>詳細を見る</a>
    </div>
  );
}


---

📄 レイヤー 5：ページ（画面）を組み立てる

🎯 目的

• hooks でデータを取得
• UI コンポーネントに props を渡す
• 画面レイアウトを構成する


📂 作成するファイル

/app/reports/[id]/page.tsx
/app/clusters/[cluster_id]/page.tsx
/app/reports/[id]/chart/page.tsx
/app/reports/[id]/sections/page.tsx
/app/sections/[section_id]/page.tsx


📝 実装手順

1. URL パラメータを取得
2. hooks を呼ぶ
3. コンポーネントに props を渡す
4. レイアウトを組む


💡 コーディング例（ReportPage）

export default function ReportPage({ params }) {
  const { report } = useReport(params.id);
  const { clusters } = useClusters(params.id);
  const { sections } = useSections(params.id);

  if (!report) return <div>Loading...</div>;

  return (
    <div>
      <ReportHeader report={report} />
      <ReportSummary summary={report.summary} />
      <NavButtons reportId={params.id} />
      <ClusterList clusters={clusters} />
      <SectionList sections={sections} />
    </div>
  );
}


---

 まとめ：

1. 型を作る（/lib/types.ts）
2. fetcher を作る（/lib/fetcher.ts）
3. API 関数を作る（/api/*.ts）
4. hooks を作る（/hooks/*.ts）
5. UI コンポーネントを作る（/components/**）
6. ページを組み立てる（/app/**/page.tsx）


- 


