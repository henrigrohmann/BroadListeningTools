

---

📘 公聴AI（public‑viewer）

「画面状態遷移 × コーディング詳細仕様書」

この仕様書は、以下の目的で作られている：

• 画面単体ではなく、画面間のつながりを理解させる
• 遷移時にどの hooks が再評価されるかを明示
• URL パラメータの流れを理解させる
• 状態を持つべき場所／持ってはいけない場所を明確化
• 迷わずコーディングできるように、遷移ごとにコード例を提示


---

🧭 0. 公聴AIの「画面状態遷移」の基本原則

新人がまず理解すべきはこれ。

---

✔ 1. 状態は「画面」ではなく「URL」が持つ

Next.js App Router では、
画面の状態は URL パラメータで表現する。

例：

• /reports/123 → reportId = “123”
• /clusters/45 → clusterId = “45”
• /sections/9 → sectionId = “9”


---

✔ 2. 画面遷移すると hooks は「必ず再評価」される

例：
ReportPage → ClusterDetailPage

useReport → 破棄
useClusters → 破棄
useClusterDetail → 新規評価


---

✔ 3. UI コンポーネントは状態を持たない

状態は hooks が持つ。
UI は props を受け取って描画するだけ。

---

✔ 4. 画面遷移は Link または router.push を使う

例：

<Link href={`/clusters/${cluster.cluster_id}`}>詳細</Link>


---

✔ 5. 画面遷移図は「状態遷移図」と同じ意味を持つ

つまり、
画面遷移図 = 状態遷移図 = hooks の再評価図

---

🗺 1. 公聴AI 全画面の「状態遷移図」

新人が迷わないように、
画面遷移と状態遷移を 1 枚に統合した図を作る。

stateDiagram-v2
    [*] --> ReportPage

    ReportPage --> ClusterDetailPage: cluster_id を渡す
    ReportPage --> ChartPage: reportId を渡す
    ReportPage --> SectionListPage: reportId を渡す

    ClusterDetailPage --> ChartPage: reportId を保持
    ClusterDetailPage --> CommentDetailPage: commentId を渡す

    SectionListPage --> SectionDetailPage: sectionId を渡す

    SectionDetailPage --> ClusterDetailPage: clusterId を渡す

    CommentDetailPage --> ClusterDetailPage: clusterId を保持
    CommentDetailPage --> ReportPage: reportId を保持


---

🧩 2. 遷移ごとの「状態の流れ × hooks 再評価表」

新人が最も迷うポイントを完全に可視化する。

---

📄 ReportPage → ClusterDetailPage

項目	内容	
遷移元	/reports/[id]	
遷移先	/clusters/[cluster_id]	
URL パラメータ	cluster_id が新規に決まる	
再評価される hooks	useClusterDetail(cluster_id) / useComments(cluster_id)	
破棄される hooks	useReport / useClusters / useSections	
引き継がれる状態	なし（URL が変わるため）	


💡 コーディング例（ClusterCard → ClusterDetailPage）

<Link href={`/clusters/${cluster.cluster_id}`}>
  詳細を見る
</Link>


---

📄 ClusterDetailPage → ChartPage

項目	内容	
遷移元	/clusters/[cluster_id]	
遷移先	/reports/[id]/chart	
URL パラメータ	reportId を保持	
再評価される hooks	useChartData(reportId) / useClusters(reportId)	
破棄される hooks	useClusterDetail / useComments	


💡 コーディング例

<Link href={`/reports/${cluster.report_id}/chart`}>
  グラフを見る
</Link>


---

📄 ReportPage → SectionListPage

項目	内容	
遷移元	/reports/[id]	
遷移先	/reports/[id]/sections	
URL パラメータ	reportId を引き継ぐ	
再評価される hooks	useSections(reportId)	
破棄される hooks	useClusters / useReport（※同じ reportId なら SWR キャッシュが効く）	


---

📄 SectionListPage → SectionDetailPage

項目	内容	
遷移元	/reports/[id]/sections	
遷移先	/sections/[section_id]	
URL パラメータ	sectionId が新規に決まる	
再評価される hooks	useSectionDetail(sectionId)	
破棄される hooks	useSections	


---

📄 SectionDetailPage → ClusterDetailPage

項目	内容	
遷移元	/sections/[section_id]	
遷移先	/clusters/[cluster_id]	
URL パラメータ	clusterId が新規に決まる	
再評価される hooks	useClusterDetail(clusterId)	
破棄される hooks	useSectionDetail	


---

🧱 3. 新人向け「画面遷移の実装テンプレート」

新人が迷わないように、
どの画面でも使える共通テンプレートを用意する。

---

📌 画面遷移リンクのテンプレート

<Link href={`/${path}/${id}`}>
  {label}
</Link>


---

📌 hooks の呼び出しテンプレート

export default function Page({ params }) {
  const { data } = useHook(params.id);

  if (!data) return <Loading />;

  return <UIComponent data={data} />;
}


---

📌 画面遷移時の「状態の考え方」

画面遷移 = URL が変わる
URL が変わる = hooks が再評価される
hooks が再評価される = 新しいデータが取られる


新人はこれを理解すれば迷わない。

---

🎯 4. 新人が迷わない「画面遷移 × コーディング手順」

以下の順番で実装すれば、必ず成功する。

---

① まず URL パラメータを理解する

例：
/clusters/[cluster_id] → params.cluster_id

---

② 次に hooks を呼ぶ

例：

const { cluster } = useClusterDetail(params.cluster_id);


---

③ データが揃うまで Loading を出す

if (!cluster) return <Loading />;


---

④ UI コンポーネントに props を渡す

<ClusterHeader cluster={cluster} />


---

⑤ 遷移リンクを作る

<Link href={`/reports/${cluster.report_id}/chart`}>グラフへ</Link>


---

まとめ

• 画面単体の仕様
• hooks の仕様
• 画面遷移の仕様
• 状態の流れ
• コーディング例
