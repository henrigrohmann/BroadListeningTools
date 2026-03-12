受け取ったよ、GROHMANN。
今回のコードも 正常に届いているので、このまま続けて貼ってくれれば問題ない。

そして、今回のメッセージも 改行が失われて 1 行に圧縮されていた部分があるので、こちらで 正しい構造に復元しておくね。

あなたが送ってくれたのは ScatterChart.tsx の annotations → ChartCore の描画部分 → onClick → コンポーネント終了 だと判断できる。

---

📄 ScatterChart.tsx（あなたが送った部分を整形したもの）

// アノテーションの設定
const annotations: Partial<Annotations>[] = showClusterLabels
  ? clusterDataSets.map((dataSet) => {
      // フィルターされていても背景色を維持（灰色のクラスターでもラベルは元の色で表示）
      // @ts-ignore allFilteredプロパティが存在する前提で処理（TypeScript型定義に追加済み）
      const isAllFiltered =
        filteredArgumentIds &&
        (separateDataByFilter(dataSet.cluster).matching.length === 0 ||
          dataSet.cluster.allFiltered);

      const bgColor = isAllFiltered
        ? clusterColorMapA[dataSet.cluster.id].replace(/[0-9a-f]{2}$/i, "cc") // クラスター全体がフィルターされた場合も薄くする
        : clusterColorMapA[dataSet.cluster.id];

      return {
        x: dataSet.centerX,
        y: dataSet.centerY,
        text: wrapLabelText(dataSet.cluster.label), // ラベルを折り返し処理
        showarrow: false,
        font: {
          color: "white",
          size: annotationFontsize,
          weight: 700,
        },
        bgcolor: bgColor,
        borderpad: 10,
        width: annotationLabelWidth,
        align: "left" as const,
      };
    })
  : [];

// 描画
return (
  <Box width="100%" height="100%">
    <Box width="100%" height="100%">
      <ChartCore
        data={plotData as unknown as Data[]}
        layout={
          {
            margin: { l: 0, r: 0, b: 0, t: 0 },
            xaxis: {
              zeroline: false,
              showticklabels: false,
              showgrid: false,
            },
            yaxis: {
              zeroline: false,
              showticklabels: false,
              showgrid: false,
            },
            hovermode: "closest",
            dragmode: "pan", // ドラッグによる移動（パン）を有効化
            annotations,
            showlegend: false,
          } as Partial<Layout>
        }
        useResizeHandler={true}
        style={{
          width: "100%",
          height: "100%",
          cursor: config?.enable_source_link ? "pointer" : "default",
        }}
        config={{
          responsive: true,
          displayModeBar: "hover", // 操作時にツールバーを表示
          scrollZoom: true, // マウスホイールによるズームを有効化
          locale: "ja",
        }}
        onHover={onHover}
        onUpdate={onUpdate}
        onClick={(data: PlotMouseEvent) => {
          if (!config?.enable_source_link) return;

          try {
            const point = data.points?.[0];

            // customdataから直接argumentの情報を取得
            if (point?.customdata) {
              const customData = point.customdata as unknown as {
                arg_id: string;
                url?: string;
              };

              if (customData.url) {
                window.open(customData.url, "_blank", "noopener,noreferrer");
              } else {
                // customdataにURLがない場合、argumentListから検索
                const matchedArgument = argumentList.find(
                  (arg) => arg.arg_id === customData.arg_id,
                );
                if (matchedArgument?.url) {
                  window.open(
                    matchedArgument.url,
                    "_blank",
                    "noopener,noreferrer",
                  );
                } else {
                  console.log(
                    "No URL found for argument:",
                    customData.arg_id,
                  );
                }
              }
            } else {
              console.log("No customdata found in clicked point");
            }
          } catch (error) {
            console.error("Error in click handler:", error);
          }
        }}
      />
    </Box>
  </Box>
);
}


---

📌 ScatterChart.tsx のコードは ほぼ全体が揃った

あなたが送ってくれた内容を統合すると、ScatterChart.tsx は：

• Props 定義
• 色マップ生成
• ラベル折り返し
• onUpdate（DOM 操作）
• separateDataByFilter
• clusterDataSets（matching / notMatching）
• plotData（描画用 trace）
• annotations
• ChartCore の描画
• onClick（ソースリンク）
• コンポーネント終了


まで揃っている。

残りがある場合は続けて送ってください。

---

📣 ScatterChart.tsx の残りがあれば送ってください

次のように送ると確実に届く：

--- ScatterChart.tsx (next) ---
```tsx
<続きのコード>
```


もしこれで全てなら、
ScatterChart.tsx のファイル単位仕様書（インタフェース＋機能仕様＋擬似コード＋責務まとめ） を作成する準備ができている。


了解した、GROHMANN。
このファイルは短くて構造も明確なので、すぐに ファイル単位の仕様書（インタフェース＋機能仕様＋擬似コード＋責務まとめ） を作成できる。

以下に、あなたが求めている形式でまとめる。

---

📘 ファイル仕様書：SelectChartButton.tsx

1. ファイル概要

このコンポーネントは、
散布図ビュー（全体 / 濃い意見 / 階層）を切り替えるための UI ボタン群
および
フィルタ・表示設定・全画面ボタン
をまとめた操作パネル。

主な役割：

• 3 種類のチャートビュー切り替え（SegmentGroup）
• 濃い意見ビューの有効/無効制御
• 注意フィルタ（Attention Filter）ボタン
• 表示設定（Density Setting）ボタン
• 全画面表示ボタン


---

2. Props インタフェース

type Props = {
  selected: string; // 現在選択されているビュー ("scatterAll" | "scatterDensity" | "treemap")
  onChange: (value: string) => void; // ビュー切り替え時のコールバック
  onClickDensitySetting: () => void; // 表示設定ボタン押下
  onClickFullscreen: () => void; // 全画面ボタン押下
  isDenseGroupEnabled: boolean; // 濃い意見ビューが利用可能か
  onClickAttentionFilter?: () => void; // 注意フィルタ押下
  isAttentionFilterEnabled?: boolean; // 注意フィルタボタンを表示するか
  showAttentionFilterBadge?: boolean; // バッジ表示
  attentionFilterBadgeCount?: number; // バッジの数
};


---

3. 依存関係

依存先	用途	
ViewIcons	各ビューのアイコン	
Tooltip	ボタンの説明表示	
SegmentGroup	ビュー切り替え UI	
chakra-ui	レイアウト・ボタン	
lucide-react	Filter / Cog / Fullscreen アイコン	


---

4. 機能仕様（擬似コード）

以下は、このコンポーネントの動作を 日本語の擬似コードで表現したもの。

---

4.1 SegmentItemWithIcon（内部関数）

引数: icon, text, selected

1. アイコンとテキストを縦 or 横並びで配置
2. selected の場合はテキストを bold にする
3. SegmentGroup の label として使用される


---

4.2 items 配列の生成

items = [
  全体ビュー:
    value = "scatterAll"
    label = SegmentItemWithIcon(AllViewIcon, "全体")
    isDisabled = false

  濃い意見ビュー:
    value = "scatterDensity"
    label = SegmentItemWithIcon(DenseViewIcon, "濃い意見")
    isDisabled = !isDenseGroupEnabled
    tooltip = isDenseGroupEnabled ? undefined : "この設定条件では抽出できませんでした"

  階層ビュー:
    value = "treemap"
    label = SegmentItemWithIcon(HierarchyViewIcon, "階層")
    isDisabled = false
]


---

4.3 handleChange

SegmentGroup の onChange イベントを受け取り、
event.target.value を onChange に渡す。


---

4.4 レンダリング構造

1. 外枠 Box（最大幅 1200px）

2. Grid レイアウト
   左: SegmentGroup（ビュー切り替え）
   右: ボタン群（フィルタ / 設定 / 全画面）

3. SegmentGroup:
   - 選択中の value を反映
   - Indicator（選択背景）
   - Items（3 種類のビュー）

4. ボタン群:
   - 注意フィルタ（条件付き表示）
   - 表示設定（Cog）
   - 全画面（Fullscreen）


---

4.5 注意フィルタボタンの仕様

isAttentionFilterEnabled が true の場合のみ表示。

クリック時:
  onClickAttentionFilter() を呼ぶ

バッジ:
  showAttentionFilterBadge が true の場合のみ表示
  内容は attentionFilterBadgeCount


---

4.6 表示設定ボタン

Cog アイコン
クリック時: onClickDensitySetting()


---

4.7 全画面ボタン

Fullscreen アイコン
クリック時: onClickFullscreen()


---

5. 責務まとめ

このコンポーネントの責務は以下の通り：

• チャートビュー切り替え UI の提供
• 濃い意見ビューの有効/無効制御
• 注意フィルタボタンの表示・バッジ表示
• 表示設定ボタンの提供
• 全画面表示ボタンの提供
• SegmentGroup とアイコン UI の統合


データ処理やロジックは一切持たず、純粋に UI とイベント通知のみを担当する。

---

6. 使用例（呼び出し側）

<SelectChartButton
  selected={view}
  onChange={setView}
  onClickDensitySetting={openDensityModal}
  onClickFullscreen={toggleFullscreen}
  isDenseGroupEnabled={denseAvailable}
  onClickAttentionFilter={toggleAttentionFilter}
  isAttentionFilterEnabled={true}
  showAttentionFilterBadge={true}
  attentionFilterBadgeCount={5}
/>


---

必要であれば、次のファイルも同じ形式で仕様書化するよ。