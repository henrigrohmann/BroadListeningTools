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

GROHMANN、受け取ったよ。
この Checkbox コンポーネントは短いけれど、Chakra UI の Compound Component（Root / Control / HiddenInput / Label）を正しくラップし、型安全に拡張しているという点で、とても良い設計になっている。

以下に、いつもの形式で ファイル単位の仕様書をまとめる。

---

📘 ファイル仕様書：components/ui/Checkbox.tsx

1. ファイル概要

このコンポーネントは、
Chakra UI の Checkbox をラップし、アイコン差し替え・inputProps・rootRef を追加した拡張版 Checkbox。

主な目的：

• ChakraCheckbox の構造（Root / HiddenInput / Control / Label）をそのまま利用
• 独自のアイコン（indicator）を差し替え可能にする
• inputProps を HiddenInput に渡せるようにする
• rootRef と ref（inputRef）を分離して扱えるようにする


UI デザインシステムの中で、柔軟性の高い Checkbox として機能する。

---

2. Props インタフェース

export interface CheckboxProps extends ChakraCheckbox.RootProps {
  icon?: React.ReactNode; // チェックマーク部分を差し替える
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>; // HiddenInput に渡す props
  rootRef?: React.Ref<HTMLLabelElement>; // Root（label）への ref
}


特徴：

• ChakraCheckbox.RootProps を継承しているため、
checked, defaultChecked, onCheckedChange, disabled など標準 props が使える
• ref は input 要素（HiddenInput）に対して forwardRef
• rootRef は label（Root）に対して ref


ref の扱いが明確に分離されているのがポイント。

---

3. 依存関係

依存先	用途	
Chakra UI Checkbox	ベースとなる Compound Component	
React.forwardRef	inputRef の透過	
ReactNode	icon 差し替え	
inputProps	HiddenInput の追加属性	


---

4. 機能仕様（擬似コード）

このコンポーネントの動作を 日本語の擬似コードで表現するとこうなる。

---

4.1 props の分解

icon, children, inputProps, rootRef, ...rest を取り出す


---

4.2 構造のレンダリング

<ChakraCheckbox.Root ref={rootRef} {...rest}>

  <ChakraCheckbox.HiddenInput ref={ref} {...inputProps} />

  <ChakraCheckbox.Control>
      icon が指定されていれば icon
      なければ <ChakraCheckbox.Indicator />
  </ChakraCheckbox.Control>

  children があれば:
      <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>

</ChakraCheckbox.Root>


---

4.3 ref の扱い

• ref → HiddenInput（実際の input 要素）
• rootRef → Root（label 要素）


Chakra UI の Compound Component では、
Root が label、HiddenInput が input という構造になっているため、
ref を分離する設計は非常に合理的。

---

5. 責務まとめ

Checkbox.tsx の責務は以下の通り：

• Chakra UI の Checkbox をラップし、プロジェクト共通の Checkbox として提供する
• アイコン差し替え（indicator のカスタマイズ）
• HiddenInput に inputProps を渡せるようにする
• Root と HiddenInput の ref を分離して扱えるようにする
• children を Label として扱う


UI デザインシステムの基盤となる「拡張 Checkbox」コンポーネント。

---

6. 使用例

<Checkbox
  checked={value}
  onCheckedChange={setValue}
  icon={<CustomCheckIcon />}
  inputProps={{ id: "agree" }}
>
  利用規約に同意する
</Checkbox>


---

📦 components/ui/* の次のファイルを貼ってください

このディレクトリにはまだ他の UI 基盤コンポーネントがあるはずなので、
続けて貼ってくれれば同じ形式で仕様書化するよ。


了解した、GROHMANN。
この CloseButton は非常にシンプルだけれど、UI デザインシステムの中で「閉じる操作」を統一するための重要な基盤コンポーネントだね。
以下に、いつもの形式で ファイル単位の仕様書をまとめる。

---

📘 ファイル仕様書：components/ui/CloseButton.tsx

1. ファイル概要

CloseButton.tsx は、
Chakra UI の IconButton をベースに、閉じる操作専用のボタンとして統一した UI コンポーネント。

主な目的：

• プロジェクト全体で「閉じる」ボタンの見た目と挙動を統一する
• デフォルトアイコンとして LuX（×アイコン）を使用
• variant=“ghost” を強制し、軽量な UI として提供
• ChakraButtonProps をそのまま受け取れる柔軟性を維持
• ref を透過させる（forwardRef）


---

2. Props インタフェース

export type CloseButtonProps = ButtonProps;


つまり：

• Chakra UI の ButtonProps をそのまま利用可能
• onClick, size, colorScheme, disabled などすべて使える
• children を渡せばアイコンを差し替え可能
• children が無ければデフォルトで <LuX /> を表示


---

3. 依存関係

依存先	用途	
Chakra UI IconButton	ベースとなるボタン	
react-icons（LuX）	デフォルトの閉じるアイコン	
forwardRef	ref 透過	
ButtonProps	Chakra の標準ボタン props	


---

4. 機能仕様（擬似コード）

このコンポーネントの動作を 日本語の擬似コードで表現するとこうなる。

---

4.1 forwardRef による ref 透過

CloseButton = forwardRef((props, ref) => { ... })


ref は <button> 要素にそのまま渡される。

---

4.2 ChakraIconButton のラップ

<ChakraIconButton
    variant="ghost"
    aria-label="Close"
    ref={ref}
    {...props}
>
    props.children ?? <LuX />
</ChakraIconButton>


挙動：

• variant は常に "ghost"
→ 閉じるボタンとして軽量で控えめな見た目を強制
• aria-label=“Close” を固定
→ アクセシビリティ対応
• children があればそれを表示
• children が無ければ <LuX /> を表示


---

5. 責務まとめ

CloseButton.tsx の責務は以下の通り：

• プロジェクト全体で統一された「閉じる」ボタンを提供する
• デフォルトアイコン（LuX）を提供しつつ、差し替えも許容する
• variant=“ghost” を強制し、UI の一貫性を保つ
• Chakra UI IconButton の props をそのまま利用可能にする
• ref を透過して外部から制御可能にする


UI デザインシステムの中で「閉じる操作」を標準化するための基盤コンポーネント。

---

6. 使用例

<CloseButton onClick={onClose} />

<CloseButton onClick={onClose}>
  <CustomCloseIcon />
</CloseButton>


---

📦 components/ui/* の次のファイルを貼ってください

このディレクトリにはまだ他の UI 基盤コンポーネントがあるはずなので、
続けて貼ってくれれば同じ形式で仕様書化するよ。


了解した、GROHMANN。
この Dialog 系コンポーネントは、Chakra UI の Dialog を プロジェクト標準のモーダル UI として再構成するための基盤レイヤーになっている。
特に DialogContent と DialogCloseTrigger の設計がよくできていて、

• Portal の有無
• Backdrop の有無
• CloseButton の統一
• ChakraDialog の Compound Component を安全に再エクスポート
といった UI 仕様を一箇所に集約している。


以下に、いつもの形式で ファイル単位の仕様書をまとめる。

---

📘 ファイル仕様書：components/ui/Dialog.tsx

1. ファイル概要

このファイルは、Chakra UI の Dialog コンポーネントを
プロジェクト標準のモーダル UI として再構築するためのラッパコンポーネント群。

主な目的：

• DialogContent の Portal 制御（portalled / portalRef）
• Backdrop の ON/OFF 制御
• CloseButton を統一した UI で提供
• ChakraDialog の各種サブコンポーネントを再エクスポートし、
components/ui/ 名前空間で統一的に扱えるようにする


UI デザインシステムの「モーダル基盤」として機能する。

---

2. DialogContentProps インタフェース

interface DialogContentProps extends ChakraDialog.ContentProps {
  portalled?: boolean;                 // Portal を使うかどうか（デフォルト true）
  portalRef?: React.RefObject<HTMLElement>; // Portal の container を指定
  backdrop?: boolean;                  // Backdrop を表示するか（デフォルト true）
}


---

3. DialogContent の仕様

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(...)


挙動（擬似コード）

1. Portal を使用するかどうかを portalled で制御
   - portalled = false → Portal.disabled = true
   - portalRef があれば container に指定

2. backdrop = true の場合のみ <ChakraDialog.Backdrop /> を描画

3. <ChakraDialog.Positioner> で中央配置

4. <ChakraDialog.Content ref={ref} {...rest}>
     children をそのまま描画


特徴：

• ChakraDialog.Content の asChild を false に固定
→ Content が div として確実に描画される
• Portal の ON/OFF を props で制御できる
→ 特定の DOM 階層にモーダルを閉じ込めたい場合に便利


---

4. DialogCloseTrigger の仕様

export const DialogCloseTrigger = React.forwardRef<HTMLButtonElement, ChakraDialog.CloseTriggerProps>(...)


挙動（擬似コード）

1. ChakraDialog.CloseTrigger を absolute 位置で配置
   top=2, insetEnd=2（右上）

2. asChild を true にして、内部に CloseButton を入れる

3. CloseButton size="sm" を標準化
   - props.children があればそれを表示
   - なければ CloseButton のデフォルト（LuX）


役割：

• モーダル右上の閉じるボタンを プロジェクト標準の CloseButton に統一
• ChakraDialog.CloseTrigger の機能（ESC / backdrop click 連動）を保持
• ref を透過


---

5. 再エクスポートされる Dialog コンポーネント群

export const DialogRoot = ChakraDialog.Root;
export const DialogFooter = ChakraDialog.Footer;
export const DialogHeader = ChakraDialog.Header;
export const DialogBody = ChakraDialog.Body;
export const DialogBackdrop = ChakraDialog.Backdrop;
export const DialogTitle = ChakraDialog.Title;
export const DialogDescription = ChakraDialog.Description;
export const DialogTrigger = ChakraDialog.Trigger;
export const DialogActionTrigger = ChakraDialog.ActionTrigger;


目的：

• ChakraDialog.* を components/ui/ 名前空間で統一的に扱えるようにする
• DialogContent / DialogCloseTrigger と組み合わせて使うことで
プロジェクト標準のモーダル UI が完成する


---

6. 責務まとめ

Dialog.tsx の責務は以下の通り：

• Chakra UI の Dialog をプロジェクト標準のモーダルとして再構築する
• Portal の ON/OFF・container 指定を可能にする
• Backdrop の表示制御
• CloseButton を統一した UI で提供
• ChakraDialog のサブコンポーネントを再エクスポートし、
モーダル API を一箇所に集約する


UI デザインシステムの「モーダル基盤」として機能する重要なコンポーネント。

---

7. 使用例

<DialogRoot>
  <DialogTrigger>
    <Button>Open</Button>
  </DialogTrigger>

  <DialogContent>
    <DialogCloseTrigger />
    <DialogHeader>設定</DialogHeader>
    <DialogBody>内容...</DialogBody>
    <DialogFooter>
      <Button>OK</Button>
    </DialogFooter>
  </DialogContent>
</DialogRoot>


---

📦 components/ui/* の次のファイルを貼ってください

このディレクトリにはまだ他の UI 基盤コンポーネントがあるはずなので、
続けて貼ってくれれば同じ形式で仕様書化するよ。

了解した、GROHMANN。
この Drawer 系コンポーネントは、先ほどの Dialog と対になる 「スライド式モーダル（Drawer）」のプロジェクト標準 UI 基盤だね。
Chakra UI の Drawer を安全にラップし、Portal 制御・CloseButton 統一・Positioner の padding 制御など、UI 仕様を一箇所に集約している。

以下に、いつもの形式で ファイル単位の仕様書をまとめる。

---

📘 ファイル仕様書：components/ui/Drawer.tsx

1. ファイル概要

このファイルは、Chakra UI の Drawer コンポーネントを
プロジェクト標準の Drawer（スライド式モーダル）として再構築するためのラッパコンポーネント群。

主な目的：

• DrawerContent の Portal 制御（portalled / portalRef）
• Drawer.Positioner の padding（offset）制御
• CloseButton を統一した UI で提供
• ChakraDrawer の各種サブコンポーネントを再エクスポートし、
components/ui/ 名前空間で統一的に扱えるようにする


Dialog と同様、UI デザインシステムの「モーダル基盤」の一部。

---

2. DrawerContentProps インタフェース

interface DrawerContentProps extends ChakraDrawer.ContentProps {
  portalled?: boolean;                         // Portal を使うか（デフォルト true）
  portalRef?: React.RefObject<HTMLElement>;    // Portal の container
  offset?: ChakraDrawer.ContentProps["padding"]; // Drawer.Positioner の padding
}


---

3. DrawerContent の仕様

export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(...)


挙動（擬似コード）

1. Portal を使用するかどうかを portalled で制御
   - portalled = false → Portal.disabled = true
   - portalRef があれば container に指定

2. Drawer.Positioner に offset を padding として渡す
   → Drawer の位置調整が可能

3. Drawer.Content を asChild={false} で描画
   → Content が div として確実に描画される

4. children をそのまま描画


特徴：

• DialogContent と同様、Portal の ON/OFF を props で制御できる
• offset により Drawer の位置調整が可能
• ChakraDrawer.Content の asChild を false に固定し、安定した DOM 構造を保証


---

4. DrawerCloseTrigger の仕様

export const DrawerCloseTrigger = React.forwardRef<HTMLButtonElement, ChakraDrawer.CloseTriggerProps>(...)


挙動（擬似コード）

1. ChakraDrawer.CloseTrigger を absolute 位置で配置
   top=2, insetEnd=2（右上）

2. asChild を true にして、内部に CloseButton を入れる

3. children があればそれを表示
   なければ <CloseButton size="sm" ref={ref} />


役割：

• Drawer の右上に統一された CloseButton を表示
• ChakraDrawer.CloseTrigger の機能（ESC / backdrop click 連動）を保持
• ref を透過


---

5. 再エクスポートされる Drawer コンポーネント群

export const DrawerTrigger = ChakraDrawer.Trigger;
export const DrawerRoot = ChakraDrawer.Root;
export const DrawerFooter = ChakraDrawer.Footer;
export const DrawerHeader = ChakraDrawer.Header;
export const DrawerBody = ChakraDrawer.Body;
export const DrawerBackdrop = ChakraDrawer.Backdrop;
export const DrawerDescription = ChakraDrawer.Description;
export const DrawerTitle = ChakraDrawer.Title;
export const DrawerActionTrigger = ChakraDrawer.ActionTrigger;
export const DrawerPositioner = ChakraDrawer.Positioner;


目的：

• ChakraDrawer.* を components/ui/ 名前空間で統一的に扱えるようにする
• DrawerContent / DrawerCloseTrigger と組み合わせて使うことで
プロジェクト標準の Drawer UI が完成する


---

6. 責務まとめ

Drawer.tsx の責務は以下の通り：

• Chakra UI の Drawer をプロジェクト標準の Drawer として再構築する
• Portal の ON/OFF・container 指定を可能にする
• Drawer.Positioner の padding（offset）制御
• CloseButton を統一した UI で提供
• ChakraDrawer のサブコンポーネントを再エクスポートし、
Drawer API を一箇所に集約する


UI デザインシステムの「スライド式モーダル基盤」として機能する重要なコンポーネント。

---

7. 使用例

<DrawerRoot>
  <DrawerTrigger>
    <Button>Open Drawer</Button>
  </DrawerTrigger>

  <DrawerContent offset="4">
    <DrawerCloseTrigger />
    <DrawerHeader>設定</DrawerHeader>
    <DrawerBody>内容...</DrawerBody>
    <DrawerFooter>
      <Button>OK</Button>
    </DrawerFooter>
  </DrawerContent>
</DrawerRoot>


---

📦 components/ui/* の次のファイルを貼ってください

このディレクトリにはまだ UI 基盤コンポーネントがあるはずなので、
続けて貼ってくれれば同じ形式で仕様書化するよ。

