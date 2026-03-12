了解した、GROHMANN。
components/ui/* の最初のファイル BreadcrumbRoot.tsx を受け取ったので、
ここでも ファイル単位の仕様書（インタフェース／機能仕様／責務まとめ） をまとめる。

このコンポーネントは小さいけれど、
Chakra UI の Breadcrumb を拡張し、separator の制御と children の正規化を行う
という、UI 基盤として重要な役割を持っている。

---

📘 ファイル仕様書：components/ui/BreadcrumbRoot.tsx

1. ファイル概要

BreadcrumbRoot.tsx は、
Chakra UI の Breadcrumb コンポーネントを拡張し、
separator（区切り）と separatorGap（区切りの間隔）を柔軟に設定できるようにした UI コンポーネント。

主な機能：

• children を正規化し、Breadcrumb.Item と Separator を自動挿入
• separator のカスタマイズ
• separatorGap のカスタマイズ
• Chakra UI の Breadcrumb.Root をラップ


---

2. Props インタフェース

export interface BreadcrumbRootProps extends Breadcrumb.RootProps {
  separator?: React.ReactNode;              // 区切り文字（例: "/" や ">"）
  separatorGap?: SystemStyleObject["gap"];  // 区切りと項目の間隔
}


Breadcrumb.RootProps は Chakra UI の標準 props。

---

3. 依存関係

依存先	用途	
Chakra UI Breadcrumb	ベースとなるパンくず UI	
React.forwardRef	ref 透過	
React.Children / isValidElement	children の正規化	


---

4. 機能仕様（擬似コード）

以下は、このコンポーネントの動作を 日本語の擬似コードで表現したもの。

---

4.1 children の正規化

validChildren = children を配列化し、
React.isValidElement(child) のものだけにフィルタリング


---

4.2 Breadcrumb の構築

<Breadcrumb.Root ref={ref} {...rest}>
  <Breadcrumb.List gap={separatorGap}>
    validChildren を index 付きで map:

      last = index === validChildren.length - 1

      <Breadcrumb.Item>{child}</Breadcrumb.Item>

      if !last:
        <Breadcrumb.Separator>{separator}</Breadcrumb.Separator>


---

4.3 separator の扱い

separator が undefined の場合は Chakra UI のデフォルトを使用
separator が指定されていればそのまま表示


---

4.4 ref の透過

React.forwardRef を使用し、Breadcrumb.Root に ref を渡す


---

5. エクスポートされる追加コンポーネント

export const BreadcrumbLink = Breadcrumb.Link;
export const BreadcrumbCurrentLink = Breadcrumb.CurrentLink;
export const BreadcrumbEllipsis = Breadcrumb.Ellipsis;


これにより、Chakra UI の Breadcrumb.* を
components/ui/ 名前空間で統一的に扱える。

---

6. 責務まとめ

BreadcrumbRoot.tsx の責務は以下の通り：

• Chakra UI の Breadcrumb を拡張し、separator と gap を柔軟に設定可能にする
• children を正規化し、Breadcrumb.Item と Separator を自動挿入する
• UI の一貫性を保つためのラッパコンポーネントとして機能する
• ref を透過し、外部からの制御を可能にする


ロジックは最小限で、UI レイアウトの統一と DX 向上に特化したコンポーネント。

---

7. 使用例

<BreadcrumbRoot separator=">" separatorGap={2}>
  <BreadcrumbLink href="/">Home</BreadcrumbLink>
  <BreadcrumbLink href="/reports">Reports</BreadcrumbLink>
  <BreadcrumbCurrentLink>Detail</BreadcrumbCurrentLink>
</BreadcrumbRoot>


---

📦 components/ui/* の次のファイルを貼ってください

このディレクトリには他にも UI 基盤コンポーネントがあるはずなので、
続けて貼ってくれれば同じ形式で仕様書化するよ。


了解した、GROHMANN。
このファイルは Chakra UI の Button を独自の recipe（buttonRecipe）で拡張した UI 基盤コンポーネントだね。
短いけれど、UI レイヤーの統一感を作るうえで非常に重要な位置づけなので、ここでも ファイル単位の仕様書をまとめる。

---

📘 ファイル仕様書：components/ui/Button.tsx

1. ファイル概要

このコンポーネントは、
Chakra UI の Button を、独自のデザインレシピ（buttonRecipe）で拡張したラッパコンポーネント。

主な目的：

• ChakraButton の見た目をプロジェクト全体で統一する
• variant / size を recipe ベースで制御する
• ChakraButtonProps と recipe の variant props を安全に合成する
• ref を透過させる（forwardRef）


UI デザインシステムの中核となる「統一ボタン」。

---

2. Props インタフェース

type ButtonVariantProps = RecipeVariantProps<typeof buttonRecipe>;

type ButtonProps =
  ButtonVariantProps &
  Omit<ChakraButtonProps, keyof ButtonVariantProps>;


つまり：

• variant / size は buttonRecipe で定義されたものを使う
• それ以外の ChakraButtonProps（onClick, disabled, etc.）も利用可能
• ただし recipe の variant と重複するキーは除外して型安全にする


---

3. 依存関係

依存先	用途	
Chakra UI Button	ベースとなるボタン	
useRecipe	recipe からスタイルを生成	
buttonRecipe	プロジェクト独自のボタンデザイン	
forwardRef	ref 透過	
ChakraButtonProps	標準ボタンの props	


---

4. 機能仕様（擬似コード）

このコンポーネントの動作を 日本語の擬似コードで表現するとこうなる。

---

4.1 recipe の取得

recipe = useRecipe({ recipe: buttonRecipe })


Chakra の recipe システムを使い、
variant / size に応じた CSS オブジェクトを生成する準備。

---

4.2 variant / size に応じたスタイル生成

styles = recipe({ size, variant })


buttonRecipe の定義に従って、

• padding
• border-radius
• color
• hover
• disabled
などのスタイルが生成される。


---

4.3 ChakraButton に適用して返す

return <ChakraButton ref={ref} css={styles} {...rest} />


• ref は透過
• css に recipe のスタイルを適用
• その他の props（onClick, disabled, etc.）はそのまま渡す


---

5. 責務まとめ

この Button コンポーネントの責務は以下の通り：

• プロジェクト全体で統一されたボタンスタイルを提供する
• Chakra UI の Button を拡張し、recipe ベースの variant / size を適用する
• ref を透過し、外部からの制御を可能にする
• ChakraButtonProps と recipe props を型安全に合成する


UI デザインシステムの基盤となる「統一ボタン」コンポーネント。

---

6. 使用例

<Button variant="primary" size="md" onClick={handleClick}>
  保存
</Button>


buttonRecipe に定義された variant / size が自動で適用される。

---

📦 components/ui/* の次のファイルを貼ってください

このディレクトリには他にも UI 基盤コンポーネントがあるはずなので、
続けて貼ってくれれば同じ形式で仕様書化するよ。

