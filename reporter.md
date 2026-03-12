
GROHMANN、受け取ったよ。
このファイルは短いけれど、Next.js の Server Component × Chakra UI × 動的画像存在チェックという、意外と重要な構造を持っている。
ここでも、あなたが求めている形式で ファイル単位の仕様書をまとめる。

---

📘 ファイル仕様書：components/reporter/Reporter.tsx

1. ファイル概要

Reporter.tsx は、
レポート作成者（reporter）のプロフィール画像とメタ情報を表示するコンポーネント。

主な機能：

• reporter.png がサーバーに存在するかどうかをチェック
• 存在すれば画像を表示、なければ非表示
• ReporterContent（別コンポーネント）に meta を渡してラップ


完全に Server Component として動作する。

---

2. Props インタフェース

export function Reporter({ meta }: { meta: Meta })


Meta 型には少なくとも以下が含まれる：

• reporter: string（レポーター名）
• その他レポートメタ情報


---

3. 依存関係

依存先	用途	
getImageFromServerSrc	API_BASEPATH を考慮した画像 URL 生成	
ReporterContent	レイアウトコンポーネント	
chakra-ui Image	画像表示	
Meta 型	レポートメタ情報	


---

4. 機能仕様（擬似コード）

以下は、このファイルの動作を 日本語の擬似コードで表現したもの。

---

4.1 画像存在チェック：hasReporterImage()

1. imagePath = "/meta/reporter.png"
2. url = new URL(imagePath, API_BASEPATH)
3. fetch(url)
4. res.status === 200 → true
5. エラー時 → false


ポイント：

• Server Component 内で fetch を直接行う
• 画像が存在しない場合は UI に何も出さない


---

4.2 ReporterImage コンポーネント

引数: reporterName

1. hasReporterImage() を await
2. true → <Image src={getImageFromServerSrc(imagePath)} alt={reporterName} />
3. false → null


役割：

• reporter.png が存在する場合のみ画像を描画する
• 存在しない場合は UI に影響を与えない


---

4.3 Reporter コンポーネント（エクスポートされる本体）

引数: meta

1. ReporterContent(meta) でラップ
2. 子要素として <ReporterImage reporterName={meta.reporter} />


役割：

• ReporterContent に meta を渡す
• ReporterImage を内部に配置
• レポーター情報の UI を構築する


---

5. 責務まとめ

このファイルの責務は非常に明確：

• reporter.png の存在チェック（サーバー側）
• 存在すれば画像を表示
• ReporterContent に meta を渡して UI を構築
• UI ロジックとデータロジックを分離（ReporterImage と ReporterContent）


データ処理は最小限、UI 表示制御に特化した Server Component。

---

6. 使用例（呼び出し側）

<Reporter meta={reportMeta} />


---

📦 components/reporter/* の次のファイルも貼ってください

この調子で進めれば、
reporter レイヤー全体の仕様書もすぐに完成する。

次のファイルを貼ってくれれば、同じ形式でまとめるよ。
