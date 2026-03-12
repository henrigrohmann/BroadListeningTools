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