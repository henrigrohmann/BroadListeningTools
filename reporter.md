
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


了解した、GROHMANN。
components/reporter/* の 2 ファイルがすべて揃ったので、ここから ReporterContent.tsx の仕様書をまとめる。

このファイルは UI ロジックがしっかりしていて、
「メタデータが未設定の場合の fallback 表示」
「メッセージの折りたたみ／全文表示」
「外部リンクボタン群」
など、Reporter 表示の中心的な役割を担っている。

以下に、あなたが求めている形式で整理する。

---

📘 ファイル仕様書：components/reporter/ReporterContent.tsx

1. ファイル概要

ReporterContent は、
レポート作成者（reporter）のプロフィール情報・メッセージ・外部リンクを表示する UI コンポーネント。

主な機能：

• reporter 名の表示
• reporter メッセージの折りたたみ／全文表示
• メタデータ未設定時の案内テキスト
• Web / プライバシーポリシー / 利用規約リンクの表示
• ReporterImage（親から渡される children）をレイアウトに組み込む


Client Component であり、内部で useState を使用する。

---

2. Props インタフェース

export function ReporterContent({
  meta,
  children,
}: {
  meta: Meta;
  children: ReactNode;
})


Meta 型には少なくとも以下が含まれる：

• reporter: string
• message: string
• isDefault: boolean（メタデータ未設定フラグ）
• webLink?: string
• privacyLink?: string
• termsLink?: string


---

3. 依存関係

依存先	用途	
Chakra UI（Box, Flex, Text）	レイアウト	
lucide-react（Globe）	アイコン	
Button / Link（UI コンポーネント）	外部リンクボタン	
useState	メッセージ折りたたみ制御	


---

4. 内部コンポーネント仕様

このファイルには 3 つの内部 UI コンポーネントがある。

---

4.1 EmptyText

meta.isDefault === true の場合に表示する案内文。

内容：
「レポーター情報が未設定です。メタデータをセットアップしてください」
GitHub README の該当セクションへのリンク付き。


---

4.2 ReadMore

「... 全文表示」リンクを表示する UI。

クリックすると setIsExpanded(true) を呼び出す。


---

4.3 MessageText

レポーターのメッセージ表示ロジックを担当。

挙動：

1. メタデータ未設定（isDefault=true）なら EmptyText を返す。

2. message の改行を除去した messageWithoutNewLines を作成。

3. 55 文字を超える場合は折りたたみ表示。
   isExpanded = false（初期状態）

4. isExpanded = false の場合：
   - 先頭 55 文字のみ表示
   - ReadMore を表示

5. isExpanded = true の場合：
   - message 全文を pre-line で表示


---

5. ReporterContent 本体の仕様

以下はコンポーネント全体の擬似コード。

---

5.1 レイアウト構造

<Flex column gap=4>

  1. 上段（画像 + reporter名）
     <Flex row or column>
        <Box> children（ReporterImage） </Box>
        <Flex column>
           <Text>レポーター</Text>
           <Text bold>{meta.reporter}</Text>
        </Flex>
     </Flex>

  2. メッセージ表示
     <MessageText isDefault={meta.isDefault} message={meta.message} />

  3. 外部リンクボタン群
     <Flex gap=3>
        webLink があれば Webページボタン
        privacyLink があれば プライバシーポリシー
        termsLink があれば 利用規約
     </Flex>

</Flex>


---

5.2 外部リンクボタンの仕様

meta.isDefault === false の場合のみ表示。

webLink:
  - Globe アイコン
  - variant="tertiary"
  - target="_blank"

privacyLink:
  - 「プライバシーポリシー」

termsLink:
  - 「利用規約」


---

6. 責務まとめ

ReporterContent.tsx の責務は以下の通り：

• レポーター情報の UI 表示（名前・画像・メッセージ）
• メタデータ未設定時の案内表示
• メッセージの折りたたみ／全文表示
• 外部リンクボタンの表示制御
• ReporterImage（children）をレイアウトに統合


データ処理は行わず、UI 表示ロジックに特化した Client Component。

---

7. 使用例（Reporter.tsx からの呼び出し）

<ReporterContent meta={meta}>
  <ReporterImage reporterName={meta.reporter} />
</ReporterContent>


---

📦 components/reporter/* の仕様書はこれで完了

次に進めたいディレクトリやファイルがあれば、貼ってくれれば同じ形式でまとめるよ。