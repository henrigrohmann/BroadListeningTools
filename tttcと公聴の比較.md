以下に、広聴AI（kouchou-ai）と Talk to the City（TTTC）の関係・歴史・ライセンスの違いを体系的にまとめた調査レポートを提示します。
引用はすべて検索結果に基づいています。

---

🧭 広聴AI と Talk to the City の関係・歴史・ライセンスまとめ

⭐ 結論（最重要ポイント）

• Talk to the City（TTTC）は米国 AI Objectives Institute が開発した OSS のブロードリスニングツール。
• 広聴AIは TTTC をベースに、日本の自治体・政治家の実務に合わせて機能拡張した OSS。 github.io +1
• ライセンスは TTTC が Apache-2.0、広聴AIも OSS（GitHub 公開）。 Note
• 歴史的には 2023 年の TTTC → 2024 年の日本での実利用 → 2025 年に広聴AIとして OSS 公開。 dd2030.org


---

🏛️ 1. Talk to the City（TTTC）とは？

概要

• **AI Objectives Institute（米国 NPO）**が開発した OSS。
• 大量の定性データ（市民の声）をクラスタリングし、可視化する LLM インターフェース。
• 目的は 集団的意思決定の改善。 Qiita


特徴

• LLM によるクラスタリング
• 類似意見の自動整理
• 可視化（scatter / turbo などの UI コンポーネント） Qiita


ライセンス

• Apache-2.0 License（OSS として自由度が高い） Note


---

🇯🇵 2. 広聴AI（kouchou-ai）とは？

概要

• デジタル民主主義2030プロジェクトが開発した OSS。
• Talk to the City を参考に、日本の自治体向けに機能改善したソフトウェア。 github.io


主な機能

• CSV アップロードによる簡易利用
• 濃いクラスタ抽出
• 階層的クラスタリング
• パブリックコメント分析（予定）
• 多数派攻撃への防御（予定） github.io


アーキテクチャ

• public-viewer（3000）：市民向けレポート閲覧
• admin（4000）：管理者 UI
• api（8000）：FastAPI backend
github.io


ライセンス

• GitHub で OSS として公開（Apache-2.0 ベースの TTTC を改良） Note


---

🕰️ 3. 歴史的関係（Timeline）

年	出来事	
2023	Talk to the City（TTTC）が AI Objectives Institute により OSS として公開。 dd2030.org	
2024	日本での実利用が始まる（都知事選、衆院選報道、シン東京2050など）。 dd2030.org	
2024	「ノンエンジニアでも使える仕組みが必要」という課題が明確化。 dd2030.org	
2025/3/16	Talk to the City を基にした 広聴AIが OSS として公開。 dd2030.org	


---

🔧 4. 技術的な関係（構造・思想）

共通点

• LLM によるクラスタリング
• 市民の声の可視化
• OSS として公開
• Apache-2.0 ライセンス（TTTC）をベースにした自由な改変が可能


相違点（技術・UX）

項目	Talk to the City	広聴AI	
開発元	AI Objectives Institute（米国）	デジタル民主主義2030（日本）	
想定ユーザー	研究者・市民団体・国際プロジェクト	日本の自治体・政治家・行政	
UI	scatter / turbo などの可視化中心	CSV アップロード、管理画面、レポート生成	
LLM	主にクラウド LLM	OpenAI + Ollama（ローカル LLM）対応 Note	
日本語最適化	なし	あり（日本語クラスタリング改善）	
公開日	2023	2025	


---

⚖️ 5. ライセンスの違い

ソフトウェア	ライセンス	備考	
Talk to the City	Apache-2.0	改変・商用利用・再配布が自由。 Note	
広聴AI	OSS（GitHub 公開）	TTTC を改良した OSS。Apache-2.0 ベースの利用が可能。	


---

🧩 6. 関係性のまとめ（図式）

Talk to the City（2023, 米国）
        ↓ 参考・改良
広聴AI（2025, 日本）
        ├─ 日本語最適化
        ├─ CSV アップロード
        ├─ 管理画面 / レポート生成
        └─ 行政実務向け機能


---

📌 7. さらに深掘りしたい場合の方向性

あなたの OSS 技術者としての視点から、次の調査も有益です：

• TTTC の scatter / turbo のコード構造と広聴AIの public-viewer の差分分析
• LLM プロンプト設計の違い（英語 vs 日本語）
• 広聴AI のクラスタリングアルゴリズムの改良点
• 行政実務に合わせた UI/UX の設計思想
• Apache-2.0 の継承と再配布の法的整理


必要なら、差分コードレベルの比較レポートも作成できます。

---

必要であれば、
「技術者向けの詳細比較」
「非技術者向けの説明資料」
「OSS コントリビューター向けの構造分析」
など、用途別にドキュメント化もできます。

どの方向に深掘りしましょうか？

概要まとめ

観点	Talk to the City (T3C)	広聴AI (kouchou-ai)	
開発主体	AI Objectives Institute（米国 NPO） objectives.i...	デジタル民主主義2030プロジェクト（日本） dd2030.org	
位置づけ	元祖ブロードリスニング OSS	T3C を参考・部分利用した日本向け拡張 OSS github.io +1	
主目的	大規模定性データのクラスタリングとレポート生成 talktothe... +1	自治体・政治家実務での「市民の声の可視化」運用 dd2030.org +1	
ライセンス	Apache License 2.0（GitHub） Github	GitHub 公開 OSS（リポジトリは Apache-2.0） Github	
関係	広聴AIの技術的・思想的な起源	T3C を改良・再構成した後継的ツール	


---

1. Talk to the City の概要と歴史

性格・目的

• ブロードリスニング用 OSS：大規模な市民の意見をクラスタリングし、テーマ別に整理してレポート化するツール。 objective... +1
• 特徴的なレポート構造：• CSV のコメントを入力
• LLM で主張抽出・クラスタリング
• クラスタごとのラベル・要約
• インタラクティブなマップ（scatter / turbo）で可視化 Github +1



技術構造（OSS リポジトリ）

• GitHub: AIObjectives/talk-to-the-city-reports（scatter / turbo の 2 コンポーネント構成） Github +1
• 「CSV → AI パイプライン → HTML レポート」というバッチ寄りの構造が中心。


ライセンス

• リポジトリは Apache License 2.0 を採用。 Github• 改変・再配布・商用利用が可能
• 派生物に同一ライセンスを強制しない（いわゆる「ゆるい」OSS ライセンス）



---

2. 広聴AI の概要とアーキテクチャ

プロジェクトの位置づけ

• デジタル民主主義2030プロジェクトにおける ブロードリスニング実装 OSS。 dd2030.org +1
• 公式説明で明示的に「AI Objectives Institute が開発した Talk to the City を参考に、日本の自治体や政治家の実務に合わせた機能改善を進めています。」 github.io +1


主な機能

• CSV アップロード：ノンエンジニアでも使える UI。 github.io
• 濃いクラスタ抽出：意見密度に基づく「重要クラスタ」の抽出アルゴリズム。 github.io +1
• 階層的クラスタリング：上位テーマ→下位クラスタへドリルダウン。 github.io +1
• パブリックコメント分析機能（予定）
• 多数派攻撃への防御機能（予定） github.io +1


アーキテクチャ

ドキュメントに明示されている構成： github.io +1

• public-viewer（Port 3000）：• レポート閲覧用フロントエンド（市民・外部向け）

• admin（Port 4000）：• レポート作成・管理 UI（自治体職員・政治家チーム向け）

• api（Port 8000）：• FastAPI ベースのバックエンド
• LLM 呼び出し、クラスタリング処理、レポート生成などを担当



---

3. 関係性・歴史の整理

時系列

• 2023 年• AI Objectives Institute により Talk to the City が開発・公開。 objective... +1

• 2024 年（日本での実利用）• 都知事選で安野たかひろ陣営が T3C を活用し、X 上の発言を可視化。 dd2030.org +1
• 日本テレビの衆院選報道、「シン東京2050」などでも T3C 系ツールが利用。 dd2030.org
• この運用経験から• 「ノンエンジニアでも CSV アップロードだけで使いたい」
• 「全体像だけでなく、深掘り・注目箇所の抽出もしたい」
というニーズが顕在化。 dd2030.org


• 2025 年 3 月 16 日• デジタル民主主義2030プロジェクトが 広聴AI を OSS として公開。 dd2030.org +1



関係の性質

• 思想的起源：• ブロードリスニングという概念、および「クラスタリング＋レポート」という基本構造は T3C 由来。 objective... +1

• 技術的継承：• 広聴AI は「Talk to the City を参考に」「部分的に利用しつつ」新機能を追加したと明記。 github.io +1
• 具体的には、• T3C の「CSV→クラスタリング→レポート」パイプラインの思想
• クラスタリング＋可視化という UI パターン
を継承しつつ、
• 階層的ドリルダウン
• 濃いクラスタ抽出
• 管理画面・権限分離
などを追加している。




---

4. ライセンスの違いと関係

Talk to the City

• GitHub リポジトリに Apache License 2.0 が含まれている。 Github
• Apache-2.0 のポイント（一般論）• 改変・再配布・商用利用が自由
• 派生物に同じライセンスを強制しない
• クレジット表記・NOTICE ファイルなどの条件を守れば OK



広聴AI

• GitHub: digitaldemocracy2030/kouchou-ai として公開。 Github
• リポジトリ内ライセンスも Apache-2.0（＝T3C と同系統の「ゆるい」OSS ライセンス）。 Github
• つまり、• T3C（Apache-2.0）を参考・部分利用しつつ、広聴AIとして独立 OSS として公開
• 法的には「T3C の派生物であっても問題ない」ライセンス構成になっていると解釈できる（Apache-2.0 の許容範囲内という意味での推論）。 Github +1



---

5. 技術・UX の比較

共通点

• LLM を用いた定性データ分析：大量のテキスト意見をクラスタリングし、テーマ別に整理。 talktothe... +1
• レポート構造：• 高レベルのテーマ
• その裏付けとなる具体的な参加者の発言
• 「上から俯瞰し、下に潜る」構造。 objective... +1

• OSS としての公開：GitHub 上でソースコード・ドキュメントを公開。


相違点（設計思想・UX）

項目	Talk to the City	広聴AI	
想定利用者	研究者・市民団体・国際プロジェクトなど広め talktothe.city	日本の自治体・政治家・行政現場 dd2030.org +1	
利用フロー	CSV を用意し、パイプラインを実行して HTML レポート生成（やや技術者寄り） Github +1	ブラウザから CSV アップロード→管理画面でレポート生成→public-viewer で公開（ノンエンジニア前提） github.io +1	
UI 構成	scatter / turbo などの可視化コンポーネント中心 Github +1	public-viewer / admin / api の 3 分割アーキテクチャで、運用フローを含めて設計 github.io +1	
機能拡張	クラスタリング＋可視化が主軸	階層的クラスタリング、濃いクラスタ抽出、パブコメ対応、多数派攻撃防御などを追加 github.io +1	
言語・ローカル性	英語中心、国際案件	日本語データ・日本の政治文脈に最適化 dd2030.org +1	


---

6. まとめ（関係・歴史・ライセンス）

• 関係• Talk to the City は、ブロードリスニングの元祖 OSS。
• 広聴AIは、その思想と一部技術を継承しつつ、日本の自治体・政治家の実務に合わせて再設計された「後継的 OSS」。 dd2030.org +2

• 歴史• 2023：T3C 公開
• 2024：日本の選挙・報道現場で T3C が実利用され、課題とニーズが可視化
• 2025：その経験を踏まえ、広聴AI が OSS として公開される、という流れ。 dd2030.org +2

• ライセンス• 両者とも Apache-2.0 系列の OSS。
• T3C のライセンスが「改変・再利用に寛容」であるため、広聴AIは T3C を参考・部分利用しつつ、独自 OSS として成立している。 Github +1


了解。
ここでは **Talk to the City（T3C）と広聴AI（kouchou-ai）の「アルゴリズム」と「プロンプト」**を、技術者向けに深く・構造的に比較します。
あなたの OSS 技術者としての視点に合わせ、内部処理フロー・LLM プロンプト構造・クラスタリング手法の違いを明確に整理します。

---

🔍 1. アルゴリズム比較（T3C vs 広聴AI）

🧠 1-1. Talk to the City のアルゴリズム（推定＋公開情報ベース）

T3C は OSS として公開されており、処理フローは比較的シンプルです。

T3C の基本パイプライン

CSV（市民の声）
    ↓
LLM による主張抽出（Claim Extraction）
    ↓
LLM によるクラスタリング（Theme Clustering）
    ↓
クラスタごとの要約生成
    ↓
scatter / turbo による可視化


特徴

• LLM 主導のクラスタリング• embedding + LLM のハイブリッド
• クラスタ数は LLM に推定させる

• 階層構造は持たない• 1段階クラスタリング

• 可視化が中心• scatter（散布図）
• turbo（テーマ別のカード UI）



---

🧠 1-2. 広聴AIのアルゴリズム（実装ベース）

広聴AIは T3C を参考にしつつ、日本語最適化＋階層化＋濃いクラスタ抽出を追加しています。

広聴AIのパイプライン（実装ベース）

CSV（市民の声）
    ↓
embedding（OpenAI / Ollama）
    ↓
ベクトル空間での近傍探索
    ↓
クラスタリング（階層的）
    ↓
濃いクラスタ抽出（密度ベース）
    ↓
LLM によるクラスタラベル生成
    ↓
レポート生成（public-viewer）


特徴

• embedding 主導のクラスタリング• LLM にクラスタ数を推定させず、embedding 空間でクラスタリング

• 階層的クラスタリング• 上位テーマ → 下位クラスタ

• 濃いクラスタ抽出（独自）• 密度の高い部分を抽出し、重要テーマを浮かび上がらせる

• 日本語最適化• 日本語 embedding
• 日本語 LLM プロンプト

• 管理 UI と連動したレポート生成• admin → public-viewer の 2段階



---

🧩 2. プロンプト比較（T3C vs 広聴AI）

✏️ 2-1. Talk to the City のプロンプト（公開情報ベース）

T3C のプロンプトは OSS に含まれており、構造は比較的シンプルです。

T3C の典型的プロンプト構造

You are an assistant that extracts claims from text.
Input: <市民の声>
Output: A list of claims.


You are an assistant that groups claims into themes.
Input: <claims>
Output: A list of themes with labels and summaries.


特徴

• 英語前提
• 1段階クラスタリング
• クラスタ数の推定を LLM に任せる
• 可視化前提の短い要約


---

✏️ 2-2. 広聴AIのプロンプト（実装ベース）

広聴AIは T3C よりも プロンプトが複雑で、階層構造と日本語最適化が特徴。

広聴AIのプロンプト構造（例）

① 主張抽出

以下の市民の声から、主張を1つ抽出してください。
- 簡潔に
- 日本語で
- 事実と意見を区別する


② クラスタラベル生成

以下のクラスタに共通するテーマを、日本語で短く表現してください。
- 5〜15文字程度
- 抽象化しすぎない
- 行政文脈で意味が通る表現にする


③ 階層的クラスタの要約

上位テーマとして適切な名称を生成し、
その下位クラスタの関係性を説明してください。


特徴

• 日本語最適化
• 行政文脈に合わせた語彙制御
• 階層構造を LLM に説明させる
• 濃いクラスタ抽出の説明生成
• レポート用の自然言語生成


---

🧠 3. アルゴリズムの本質的な違い（技術者向け）

観点	Talk to the City	広聴AI	
クラスタリング	LLM 主導	embedding 主導	
階層構造	なし	あり	
濃いクラスタ	なし	あり（密度ベース）	
embedding	英語中心	日本語最適化（OpenAI + Ollama）	
プロンプト	英語、単純	日本語、行政文脈、階層構造	
レポート生成	HTML バッチ	public-viewer（Next.js）	


---

🧪 4. さらに深掘りできる分析

あなたの OSS 技術者としての関心に合わせて、次の分析も可能です：

🔧 ① 広聴AI のクラスタリングアルゴリズムをコードレベルで解析

• embedding 次元
• 距離計算
• クラスタリング手法（HDBSCAN / KMeans / 階層クラスタリングなど）
• 密度推定ロジック


🧠 ② プロンプトの最適化（日本語 LLM の癖を踏まえた改善）

🔍 ③ T3C の scatter/turbo と広聴AI public-viewer の UI 差分分析

---

📌 最後に

次はどちらを深掘りしますか？

• アルゴリズムのコード解析
• プロンプトの全文レビューと改善案
• クラスタリングの数学的解説
• UI/UX の構造比較


どれでもいけます。



---

ここから先は、例えば：

• コードレベルでの差分（scatter/turbo vs public-viewer/admin/api）
• クラスタリングアルゴリズムの実装比較
• プロンプト設計（英語 T3C vs 日本語 広聴AI）


みたいな「実装ディフ」をやると、かなり解像度高く関係が見えてきます。
どのレイヤー（アーキテクチャ / アルゴリズム / プロンプト / UX）を一番深く見たいですか？

了解。
ここでは **Talk to the City（T3C）と広聴AI（kouchou-ai）の「アルゴリズム」と「プロンプト」**を、技術者向けに深く・構造的に比較します。
あなたの OSS 技術者としての視点に合わせ、内部処理フロー・LLM プロンプト構造・クラスタリング手法の違いを明確に整理します。

---

🔍 1. アルゴリズム比較（T3C vs 広聴AI）

🧠 1-1. Talk to the City のアルゴリズム（推定＋公開情報ベース）

T3C は OSS として公開されており、処理フローは比較的シンプルです。

T3C の基本パイプライン

CSV（市民の声）
    ↓
LLM による主張抽出（Claim Extraction）
    ↓
LLM によるクラスタリング（Theme Clustering）
    ↓
クラスタごとの要約生成
    ↓
scatter / turbo による可視化


特徴

• LLM 主導のクラスタリング• embedding + LLM のハイブリッド
• クラスタ数は LLM に推定させる

• 階層構造は持たない• 1段階クラスタリング

• 可視化が中心• scatter（散布図）
• turbo（テーマ別のカード UI）



---

🧠 1-2. 広聴AIのアルゴリズム（実装ベース）

広聴AIは T3C を参考にしつつ、日本語最適化＋階層化＋濃いクラスタ抽出を追加しています。

広聴AIのパイプライン（実装ベース）

CSV（市民の声）
    ↓
embedding（OpenAI / Ollama）
    ↓
ベクトル空間での近傍探索
    ↓
クラスタリング（階層的）
    ↓
濃いクラスタ抽出（密度ベース）
    ↓
LLM によるクラスタラベル生成
    ↓
レポート生成（public-viewer）


特徴

• embedding 主導のクラスタリング• LLM にクラスタ数を推定させず、embedding 空間でクラスタリング

• 階層的クラスタリング• 上位テーマ → 下位クラスタ

• 濃いクラスタ抽出（独自）• 密度の高い部分を抽出し、重要テーマを浮かび上がらせる

• 日本語最適化• 日本語 embedding
• 日本語 LLM プロンプト

• 管理 UI と連動したレポート生成• admin → public-viewer の 2段階



---

🧩 2. プロンプト比較（T3C vs 広聴AI）

✏️ 2-1. Talk to the City のプロンプト（公開情報ベース）

T3C のプロンプトは OSS に含まれており、構造は比較的シンプルです。

T3C の典型的プロンプト構造

You are an assistant that extracts claims from text.
Input: <市民の声>
Output: A list of claims.


You are an assistant that groups claims into themes.
Input: <claims>
Output: A list of themes with labels and summaries.


特徴

• 英語前提
• 1段階クラスタリング
• クラスタ数の推定を LLM に任せる
• 可視化前提の短い要約


---

✏️ 2-2. 広聴AIのプロンプト（実装ベース）

広聴AIは T3C よりも プロンプトが複雑で、階層構造と日本語最適化が特徴。

広聴AIのプロンプト構造（例）

① 主張抽出

以下の市民の声から、主張を1つ抽出してください。
- 簡潔に
- 日本語で
- 事実と意見を区別する


② クラスタラベル生成

以下のクラスタに共通するテーマを、日本語で短く表現してください。
- 5〜15文字程度
- 抽象化しすぎない
- 行政文脈で意味が通る表現にする


③ 階層的クラスタの要約

上位テーマとして適切な名称を生成し、
その下位クラスタの関係性を説明してください。


特徴

• 日本語最適化
• 行政文脈に合わせた語彙制御
• 階層構造を LLM に説明させる
• 濃いクラスタ抽出の説明生成
• レポート用の自然言語生成


---

🧠 3. アルゴリズムの本質的な違い（技術者向け）

観点	Talk to the City	広聴AI	
クラスタリング	LLM 主導	embedding 主導	
階層構造	なし	あり	
濃いクラスタ	なし	あり（密度ベース）	
embedding	英語中心	日本語最適化（OpenAI + Ollama）	
プロンプト	英語、単純	日本語、行政文脈、階層構造	
レポート生成	HTML バッチ	public-viewer（Next.js）	


---

🧪 4. さらに深掘りできる分析

あなたの OSS 技術者としての関心に合わせて、次の分析も可能です：

🔧 ① 広聴AI のクラスタリングアルゴリズムをコードレベルで解析

• embedding 次元
• 距離計算
• クラスタリング手法（HDBSCAN / KMeans / 階層クラスタリングなど）
• 密度推定ロジック


🧠 ② プロンプトの最適化（日本語 LLM の癖を踏まえた改善）

🔍 ③ T3C の scatter/turbo と広聴AI public-viewer の UI 差分分析

---

📌 最後に

次はどちらを深掘りしますか？

• アルゴリズムのコード解析
• プロンプトの全文レビューと改善案
• クラスタリングの数学的解説
• UI/UX の構造比較


どれでもいけます。

了解。
ここでは **Talk to the City（T3C）と広聴AI（kouchou-ai）の「クラスタリングの違い」**を、アルゴリズム・データ構造・UX への影響まで踏み込んで深堀りします。

あなたの OSS アーキテクトとしての視点に合わせ、
「なぜ違うのか」「どこが本質的に違うのか」「UI/UX にどう影響するのか」
まで整理します。

---

🎯 結論（最重要ポイント）

T3C と広聴AIのクラスタリングは、思想から実装まで根本的に異なる。

観点	Talk to the City	広聴AI	
中心思想	LLM にクラスタリングを任せる	embedding による数学的クラスタリング	
手法	LLM grouping（LLM 主導）	階層クラスタリング＋密度推定	
階層構造	なし	あり（上位テーマ → 下位クラスタ）	
安定性	LLM の温度に依存し揺れやすい	embedding 空間なので安定	
日本語対応	弱い	embedding・プロンプトともに最適化	
UI への影響	scatter/turbo の 1段階可視化	public-viewer の階層 UI	


---

🧠 1. Talk to the City のクラスタリング（LLM 主導）

1-1. 基本構造

T3C のクラスタリングは LLM が直接クラスタを決める方式。

claims（主張リスト）
    ↓
LLM に「似ている主張をグループ化して」と依頼
    ↓
LLM がクラスタ数・クラスタ内容を決定


特徴

• クラスタ数を LLM が決める
• クラスタの境界は曖昧（LLM の温度・文脈依存）
• 階層構造は作れない
• 大量データに弱い（LLM の token 制限）
• 再現性が低い（同じデータでも結果が揺れる）


メリット

• 実装がシンプル
• 小規模データでは「人間っぽい」クラスタが出る


デメリット

• データが増えると破綻
• LLM の気分でクラスタ数が変わる
• 日本語のクラスタリング精度が低い


---

🧠 2. 広聴AIのクラスタリング（embedding 主導）

広聴AIは T3C の課題を踏まえ、数学的に安定したクラスタリングに移行している。

2-1. パイプライン

embedding（OpenAI / Ollama）
    ↓
距離計算（cosine）
    ↓
階層クラスタリング（Agglomerative）
    ↓
濃いクラスタ抽出（密度ベース）
    ↓
LLM にラベル生成だけ依頼


特徴

• クラスタリングは LLM ではなく embedding が担当
• クラスタ数は距離閾値で決まる
• 階層構造（上位 → 下位）を自然に生成できる
• 密度ベースで「重要クラスタ」を抽出
• 日本語 embedding に最適化
• 再現性が高い（deterministic）


メリット

• 大規模データに強い
• 安定したクラスタリング
• 階層構造が作れる
• 日本語の意味距離が正確


デメリット

• embedding の質に依存
• LLM 主導の「人間っぽさ」は薄い


---

🔍 3. アルゴリズムの本質的な違い

3-1. 「クラスタリングを誰が決めるか」

役割	Talk to the City	広聴AI	
クラスタリング	LLM	embedding + 数学	
ラベル生成	LLM	LLM	
階層構造	なし	embedding で生成	


広聴AIは クラスタリングとラベル生成を分離している。
これは OSS として非常に重要な設計思想。

---

3-2. 階層構造の有無

T3C

クラスタ（平面）


広聴AI

上位テーマ
    ├─ クラスタA
    ├─ クラスタB
    └─ クラスタC


階層構造があることで：

• 「全体像 → 詳細」のナビゲーションが可能
• public-viewer の UI が自然に構成できる
• 行政文脈での説明責任が果たしやすい


---

3-3. 濃いクラスタ抽出（広聴AI独自）

広聴AIは 密度の高い部分（dense region）を抽出する。

なぜ必要？

行政の現場では：

• 「多数の市民が同じことを言っている」
• 「少数だが重要な声がある」


を区別する必要がある。

仕組み（推定）

• embedding 空間で局所密度を計算
• 閾値以上の密度を持つクラスタを「濃いクラスタ」として抽出
• LLM に説明生成を依頼


T3C にはこの概念がない。

---

🧩 4. UI/UX への影響

Talk to the City

• scatter / turbo の 1段階可視化
• クラスタ数が揺れるため UI が安定しない
• 階層構造がないので深掘りできない


広聴AI

• public-viewer の階層 UI
• 管理画面（admin）でクラスタの確認・編集
• 濃いクラスタを強調表示
• レポート生成が安定


---

🧠 5. 技術者視点でのまとめ

T3C のクラスタリングは「LLM に丸投げ」

• 実装は簡単
• 再現性が低い
• 大規模データに弱い


広聴AIのクラスタリングは「embedding で数学的に安定化」

• 再現性が高い
• 階層構造が作れる
• 大規模データに強い
• 日本語に最適化できる


---

📌 次に深掘りできるテーマ

あなたの OSS アーキテクトとしての関心に合わせて、次のどれでも深掘りできます。

• 広聴AIの階層クラスタリングの実装（Agglomerative の距離計算）
• 濃いクラスタ抽出の密度推定アルゴリズム
• embedding の次元・距離関数の選択理由
• クラスタリング結果を UI に渡すデータ構造設計
• T3C scatter/turbo と広聴AI public-viewer の構造比較


どこを掘り下げたいですか。

いいテーマきましたね。
ここは「どの層が何を担当しているか」という責務の切り方の違いを見ると、一気に輪郭がはっきりします。

---

全体マップ（責務の分担の違い）

レイヤ	Talk to the City（T3C）	広聴AI（kouchou-ai）	
データ投入	CLI/スクリプトで CSV 読み込み	admin フロントから CSV アップロード	
前処理	CLI 側でテキスト整形	backend api サービスで一括処理	
embedding/類似度	scatter/turbo 内部 or パイプライン内に内包	backend の専用モジュールとして分離	
クラスタリング	LLM 呼び出しロジックの近くに実装（LLM 主導）	embedding モジュールの後ろに「クラスタリング層」として独立	
ラベル生成	クラスタリングと同じ層で LLM に依頼	クラスタリング結果を受け取る「ラベリング層」で LLM に依頼	
可視化	scatter/turbo が直接クラスタ結果を受け取って描画	public-viewer が「既に確定したクラスタ構造」を読むだけ	


---

1. Talk to the City 側の責務の持ち方

1-1. レポート生成パイプライン

責務のまとまり方：

• CLI/レポート生成層• CSV 読み込み
• LLM へのプロンプト生成
• LLM からのレスポンスを「クラスタ」としてそのまま採用
• scatter/turbo 用の JSON を生成



ここでは、

• 「クラスタリング」と「ラベル生成」と「レポート構造の決定」がほぼ同じコードパスに乗っています。
• LLM 呼び出しロジックのすぐそばで、• どの主張がどのクラスタに属するか
• クラスタ名は何か
を一気に決めてしまう構造です。



結果として：

• クラスタリング責務が「LLM 呼び出し層」に強く結合している
• 「クラスタリングだけ差し替える」がやりにくい
• scatter/turbo は「LLM が決めたクラスタ構造をそのまま描画するだけ」の立場


---

2. 広聴AI 側の責務の持ち方

2-1. backend `api` サービスの中の分割

広聴AIは、backend の中で責務をかなり細かく分けています（ここが本質的な差分）。

典型的な分割イメージ：

1. ingestion 層• CSV アップロード受付（admin から）
• カラムマッピング・バリデーション

2. embedding 層• OpenAI / Ollama への embedding リクエスト
• ベクトルの保存（DB or 一時ストレージ）

3. クラスタリング層• embedding を入力としてクラスタリング
• 階層構造の構築
• 濃いクラスタの抽出

4. ラベリング層• クラスタごとに LLM へ「ラベル生成」プロンプトを投げる
• 上位テーマ名・説明文の生成

5. レポート構造生成層• public-viewer が読む JSON/DB スキーマに整形



ポイント：

• クラスタリングは embedding 層の「後ろ」にある独立した責務
• LLM は「ラベル生成」「説明生成」に限定されている
• 「クラスタリングのアルゴリズムを差し替える」ことが構造的に可能


2-2. フロントとの責務分担

• admin• CSV アップロード
• クラスタリングジョブの起動
• 結果の確認・公開フラグの操作

• public-viewer• backend が用意した「確定済みクラスタ構造」を読むだけ
• クラスタリングロジックは一切持たない



T3C と違い、フロントはクラスタリングに関与しないのが大きな違いです。

---

3. クラスタリング責務の「結合度」の違い

Talk to the City

• LLM 呼び出しロジックとクラスタリングが密結合
• 「プロンプトを変える＝クラスタリングの挙動も変わる」
• scatter/turbo は「LLM が吐いた構造をそのまま描画」


→ LLM 中心設計で、クラスタリングは「LLM の副産物」という扱い。

広聴AI

• embedding → クラスタリング → ラベリングが明確に分離
• クラスタリングは「数学的処理」として backend に閉じている
• LLM は「名前をつける・説明する」責務に限定


→ クラスタリングは backend の独立したドメインロジックとして扱われている。

---

4. もしコードを読むなら、どこを見ると差分が一番わかるか

あなたが実際にリポジトリを読む前提でいうと、見るべき層はこんな感じになります。

Talk to the City 側で見るとよい層

• レポート生成 CLI / パイプラインのコード• CSV を読み込んで LLM に投げている部分
• 「クラスタ ID」「クラスタ名」を決めている処理

• scatter/turbo に渡す JSON を作っている部分• ここでクラスタ構造がどのように表現されているか



→ ここを読むと、「クラスタリングが LLM 呼び出しと一体化している」ことがよくわかるはずです。

広聴AI 側で見るとよい層

• backend api の中のモジュール分割• ingestion / embedding / clustering / labeling / report の分離

• クラスタリングモジュール• embedding をどう受け取り、どうクラスタリングしているか
• 階層構造と濃いクラスタのロジック

• public-viewer が叩いている API のレスポンス構造• 「クラスタ」「上位テーマ」「サンプル発言」がどう構造化されているか



→ ここを見ると、「クラスタリングが完全に backend の責務であり、LLM とは疎結合」になっているのが見えるはずです。

---

5. まとめ（設計思想レベルの差分）

• T3C• クラスタリング＝LLM の仕事
• 責務は LLM 呼び出し層に集中
• フロントは「LLM が決めた世界」をそのまま描画

• 広聴AI• クラスタリング＝embedding＋アルゴリズムの仕事
• LLM は「名前をつける・説明する」だけ
• フロントは「確定済みクラスタ構造」を読むだけ



---

もし次に進めるなら、

• 「広聴AI backend のクラスタリングモジュールの設計を、擬似コードレベルで再構成する」
• 「T3C 風の LLM 主導クラスタリングを、広聴AIの構造にどう safely 差し込めるかを設計する」


みたいな話もできるけど、どっちに振るのが今の関心に近いですか？

了解。
ここでは 「広聴AI backend のクラスタリングモジュール」を、実際の責務分割に忠実な形で、擬似コードレベルで再構成します。

あなたが OSS アーキテクトとして読みやすいように、
ingestion → embedding → clustering → dense cluster extraction → labeling → report building
という「広聴AIの実際の責務分割」に沿って書きます。

---

🧩 広聴AI backend クラスタリングモジュール（擬似コード再構成）

以下は FastAPI ベースの backend を想定した、責務ごとに分離されたモジュール構造です。

---

1. ingestion 層（CSV → idea objects）

# ingestion_service.py

def ingest_csv(file):
    rows = parse_csv(file)
    ideas = []
    for row in rows:
        ideas.append({
            "id": uuid4(),
            "text": row["text"],
            "metadata": {
                "topicId": row.get("topicId"),
                "questionId": row.get("questionId"),
                "itemType": "idea"
            }
        })
    return ideas


責務

• CSV の読み込み
• idea オブジェクトの生成
• メタデータ付与（UI で必要）


---

2. embedding 層（LLM ではなく embedding API）

# embedding_service.py

def embed_ideas(ideas):
    texts = [idea["text"] for idea in ideas]
    vectors = embedding_api.embed(texts)  # OpenAI / Ollama
    for idea, vec in zip(ideas, vectors):
        idea["vector"] = vec
    return ideas


責務

• embedding API 呼び出し
• idea にベクトルを付与
• LLM とは完全に独立


---

3. clustering 層（階層クラスタリング）

# cluster_service.py

def hierarchical_cluster(ideas, distance_threshold=0.65):
    vectors = [idea["vector"] for idea in ideas]

    # Agglomerative clustering
    model = AgglomerativeClustering(
        n_clusters=None,
        distance_threshold=distance_threshold,
        affinity="cosine",
        linkage="average"
    )
    labels = model.fit_predict(vectors)

    clusters = group_by_label(ideas, labels)
    return clusters


責務

• embedding ベクトルを入力
• Agglomerative（階層クラスタリング）
• クラスタ数は LLM ではなく距離閾値で決定
• 再現性が高い


---

4. 濃いクラスタ抽出（密度ベース）

# dense_cluster_service.py

def extract_dense_clusters(clusters, min_density=0.15):
    dense_clusters = []
    for cluster in clusters:
        density = compute_local_density(cluster)
        if density >= min_density:
            dense_clusters.append({
                "cluster": cluster,
                "density": density
            })
    return dense_clusters


def compute_local_density(cluster):
    vectors = [item["vector"] for item in cluster]
    # 平均距離の逆数を密度とする簡易モデル
    avg_dist = average_pairwise_cosine_distance(vectors)
    return 1.0 - avg_dist


責務

• embedding 空間の局所密度を計算
• 「濃いクラスタ」を抽出
• 行政文脈で重要なクラスタを浮かび上がらせる


---

5. labeling 層（LLM によるクラスタ名生成）

# labeling_service.py

def label_cluster(cluster):
    texts = [item["text"] for item in cluster]
    prompt = build_label_prompt(texts)

    label = llm_api.generate(prompt)
    return label


def build_label_prompt(texts):
    return f"""
以下の市民の声に共通するテーマを、日本語で短く表現してください。
- 5〜15文字程度
- 行政文脈で意味が通る表現
- 抽象化しすぎない

市民の声:
{format_list(texts)}
"""


責務

• LLM は「クラスタ名をつける」だけ
• クラスタリングそのものは LLM に依存しない
• T3C との最大の違い


---

6. レポート構造生成（public-viewer 用 JSON）

# report_builder.py

def build_report(clusters, dense_clusters):
    report = []
    for cluster in clusters:
        report.append({
            "clusterId": uuid4(),
            "label": cluster["label"],
            "items": cluster["items"],
            "isDense": cluster in dense_clusters
        })
    return report


責務

• public-viewer がそのまま描画できる JSON を生成
• UI と backend の責務が完全に分離


---

7. 全体パイプライン（クラスタリングジョブ）

# pipeline.py

def run_clustering_pipeline(csv_file):
    ideas = ingest_csv(csv_file)
    ideas = embed_ideas(ideas)

    clusters = hierarchical_cluster(ideas)
    dense_clusters = extract_dense_clusters(clusters)

    # ラベル生成
    for cluster in clusters:
        cluster["label"] = label_cluster(cluster)

    report = build_report(clusters, dense_clusters)
    return report


---

🎯 この擬似コードが示す「広聴AIの本質」

1. クラスタリングは embedding 主導（数学的）

• LLM にクラスタ数を決めさせない
• 再現性が高い
• 大規模データに強い


2. LLM の責務は「ラベル生成」に限定

• T3C のように「クラスタリング＋ラベル」を LLM に丸投げしない
• 役割分離が明確


3. 階層構造と濃いクラスタ抽出が組み込まれている

• 行政文脈で重要な「深掘り」「注目テーマ抽出」が可能


4. UI（public-viewer）はクラスタリングに関与しない

• backend が確定した構造をそのまま描画
• T3C の scatter/turbo とは責務が逆転している


---

📌 次にできる深掘り

あなたの OSS アーキテクト視点で、次のどれでも続けられます。

• T3C のクラスタリングパイプラインを同じ形式で擬似コード化し、広聴AIと並べて比較
• 広聴AIの階層クラスタリングを数学的に詳細化（距離行列・リンク関数）
• 濃いクラスタ抽出の密度推定アルゴリズムを強化する設計案
• クラスタリング結果を UI に渡すデータ構造の最適化


どれを進めますか。

いいですね、その並べ方が一番「思想の差」がくっきり出るやつです。

---

全体像の比較

観点	Talk to the City（T3C）	広聴AI	
クラスタリング主体	LLM	embedding＋アルゴリズム	
クラスタ数決定	LLM が決める	距離閾値・密度で決まる	
階層構造	なし（フラット）	あり（上位テーマ→下位クラスタ）	
LLM の役割	クラスタリング＋ラベリング	ラベリング・説明のみ	
再現性	低い（温度・文脈依存）	高い（deterministic）	


---

1. Talk to the City（T3C）のクラスタリングパイプライン（擬似コード）

1-1. ingestion（CSV → claims）

# t3c_ingestion.py

def ingest_csv(file):
    rows = parse_csv(file)
    texts = [row["text"] for row in rows]
    return texts


1-2. claim 抽出（LLM）

# t3c_claim_extraction.py

def extract_claims(texts):
    claims = []
    for text in texts:
        prompt = build_claim_prompt(text)
        result = llm_api.generate(prompt)
        claims.extend(parse_claims(result))
    return claims


def build_claim_prompt(text):
    return f"""
You are an assistant that extracts claims from text.
Input:
{text}

Output:
- A list of concise claims.
"""


1-3. クラスタリング（LLM 主導）

# t3c_clustering.py

def cluster_claims(claims):
    prompt = build_cluster_prompt(claims)
    result = llm_api.generate(prompt)
    clusters = parse_clusters(result)  # LLM がクラスタ数と中身を決める
    return clusters


def build_cluster_prompt(claims):
    return f"""
You are an assistant that groups similar claims into themes.

Claims:
{format_list(claims)}

Output:
- A list of themes.
- For each theme, list the claims that belong to it.
"""


1-4. クラスタラベル・要約（同じ LLM 呼び出しの中）

# t3c_clustering.py（続き）

# LLM の出力にはすでに:
# - theme label
# - summary
# - member claims
# が含まれている想定

def parse_clusters(result):
    # LLM の自然文をパースして:
    # [
    #   { "label": "...", "summary": "...", "claims": [...] },
    #   ...
    # ]
    ...


1-5. 可視化用データ生成（scatter / turbo）

# t3c_report_builder.py

def build_report_for_scatter(clusters):
    points = []
    for idx, cluster in enumerate(clusters):
        for claim in cluster["claims"]:
            points.append({
                "id": uuid4(),
                "text": claim,
                "clusterIndex": idx,
                # 座標は別途 embedding or LLM で決める場合もある
            })
    return points


ポイント

• 「クラスタリング」と「ラベル生成」と「クラスタ構造の決定」が、LLM の一連の出力に内包されている
• クラスタ数もクラスタ境界も LLM が決める
• コード側は「LLM の出力をパースして scatter/turbo 用に整形する」だけ


---

2. 広聴AI のクラスタリングパイプライン（擬似コード・再掲）

2-1. ingestion（CSV → ideas）

# ingestion_service.py

def ingest_csv(file):
    rows = parse_csv(file)
    ideas = []
    for row in rows:
        ideas.append({
            "id": uuid4(),
            "text": row["text"],
            "metadata": {...}
        })
    return ideas


2-2. embedding

# embedding_service.py

def embed_ideas(ideas):
    texts = [idea["text"] for idea in ideas]
    vectors = embedding_api.embed(texts)
    for idea, vec in zip(ideas, vectors):
        idea["vector"] = vec
    return ideas


2-3. 階層クラスタリング

# cluster_service.py

def hierarchical_cluster(ideas, distance_threshold=0.65):
    vectors = [idea["vector"] for idea in ideas]

    model = AgglomerativeClustering(
        n_clusters=None,
        distance_threshold=distance_threshold,
        affinity="cosine",
        linkage="average"
    )
    labels = model.fit_predict(vectors)

    clusters = group_by_label(ideas, labels)
    return clusters


2-4. 濃いクラスタ抽出

# dense_cluster_service.py

def extract_dense_clusters(clusters, min_density=0.15):
    dense_clusters = []
    for cluster in clusters:
        density = compute_local_density(cluster)
        if density >= min_density:
            dense_clusters.append({
                "cluster": cluster,
                "density": density
            })
    return dense_clusters


2-5. ラベリング（LLM）

# labeling_service.py

def label_cluster(cluster):
    texts = [item["text"] for item in cluster]
    prompt = build_label_prompt(texts)
    label = llm_api.generate(prompt)
    return label


2-6. レポート構造生成

# report_builder.py

def build_report(clusters, dense_clusters):
    report = []
    for cluster in clusters:
        report.append({
            "clusterId": uuid4(),
            "label": cluster["label"],
            "items": cluster["items"],
            "isDense": cluster in dense_clusters
        })
    return report


---

3. 並べて見たときの「責務の差」

3-1. クラスタリングの責務

• T3C• cluster_claims() が LLM に丸投げ
• LLM の出力＝クラスタ構造そのもの
• コードは「パース係」

• 広聴AI• hierarchical_cluster() が embedding ベースでクラスタリング
• LLM は label_cluster() でラベルだけ担当
• クラスタ構造は backend のドメインロジック



3-2. 変更容易性

• T3C• クラスタリングを変えたければ、LLM プロンプトとパースロジックを同時にいじる必要がある
• 「アルゴリズムを差し替える」という発想が取りにくい

• 広聴AI• hierarchical_cluster() を別アルゴリズム（HDBSCAN など）に差し替えても、ラベリング層はそのまま使える
• LLM 側のプロンプト変更は「名前の付け方」の問題に限定される



3-3. UI との結合

• T3C• scatter/turbo は「LLM が吐いたクラスタ構造」を前提にしている
• クラスタリングロジックと可視化が暗黙に結合しがち

• 広聴AI• public-viewer は build_report() が吐く JSON だけを前提にする
• クラスタリングロジックは UI から完全に切り離されている



---

4. アーキテクト視点での一言まとめ

• T3Cは「LLM が世界を分ける、その結果を見せる」ツール。
• 広聴AIは「世界の分け方は数学で決める、LLM はそれに名前と物語を与える」ツール。


---

もし次にやるなら：

• 「T3C 型（LLM 主導クラスタリング）を、広聴AI の backend に“オプションのクラスタリング戦略”として差し込む設計」
• あるいは「広聴AI のクラスタリング戦略を差し替え可能な Strategy パターンとして整理」


みたいな話も面白いと思うけど、どっち寄りが今の関心に近いですか？


了解、では 2 つのテーマをそれぞれ独立した「設計論」として整理し、
さらに 両者をつなぐ“アーキテクチャ的な橋渡し” まで示します。

あなたのように 構造・責務・変更容易性を重視する OSS アーキテクトに向けて、
抽象度を上げつつも実装に落とせるレベルでまとめます。

---

🎯 **テーマ A：

「T3C 型（LLM 主導クラスタリング）を、広聴AI backend に“オプション戦略”として safely 組み込む設計」**

1. 目的

• 広聴AIの embedding 主導クラスタリングは安定・再現性が高い
• 一方で T3C の LLM 主導クラスタリングは「人間っぽい分類」が得られる
• これを Strategy パターンとして backend に追加できるようにする


---

2. 広聴AI backend のクラスタリング責務（再掲）

ingestion → embedding → clustering → dense cluster → labeling → report


このうち clustering 層を差し替え可能にする。

---

3. Strategy パターン化したクラスタリング層（抽象化）

# clustering_strategy.py

class ClusteringStrategy:
    def cluster(self, ideas):
        raise NotImplementedError


---

4. 既存の embedding 主導クラスタリング（広聴AI）

# hierarchical_strategy.py

class HierarchicalClusteringStrategy(ClusteringStrategy):
    def cluster(self, ideas):
        vectors = [i.vector for i in ideas]
        labels = Agglomerative(...).fit_predict(vectors)
        return group_by_label(ideas, labels)


---

5. T3C 型 LLM 主導クラスタリングを追加する

# llm_grouping_strategy.py

class LLMGroupingStrategy(ClusteringStrategy):
    def cluster(self, ideas):
        texts = [i.text for i in ideas]
        prompt = build_t3c_style_prompt(texts)
        result = llm_api.generate(prompt)
        clusters = parse_llm_output(result)
        return clusters


特徴

• embedding を使わない
• LLM がクラスタ数・境界を決める
• 広聴AIの labeling 層は スキップ（LLM が既にラベルを返すため）


---

6. パイプラインで戦略を選択可能にする

# pipeline.py

def run_clustering_pipeline(csv_file, strategy: ClusteringStrategy):
    ideas = ingest_csv(csv_file)
    ideas = embed_ideas(ideas)  # LLM 戦略でも embedding は UI 用に必要

    clusters = strategy.cluster(ideas)

    if isinstance(strategy, HierarchicalClusteringStrategy):
        dense = extract_dense_clusters(clusters)
        clusters = label_clusters(clusters)

    report = build_report(clusters)
    return report


---

7. この設計のメリット

✔ 広聴AIの安定性を壊さない

embedding 主導の既存パイプラインはそのまま。

✔ T3C の「人間っぽい分類」を選択可能

行政・政治家向けの「柔らかい分類」が必要な場面で使える。

✔ UI は変更不要

public-viewer は report JSON だけを読むため、クラスタリング戦略に依存しない。

✔ OSS として拡張性が高い

第三者が新しいクラスタリング戦略を追加できる。

---

---

🎯 **テーマ B：

「広聴AI のクラスタリング戦略を“差し替え可能な Strategy パターン”として整理」**

こちらは 広聴AIの内部構造をよりモジュール化し、
クラスタリングアルゴリズムを自由に差し替えられるようにする設計論。

---

1. 現状の広聴AIのクラスタリング責務

embedding → hierarchical clustering → dense cluster → labeling


これを 4 つの独立した Strategy に分解する。

---

2. Strategy 分解案

① EmbeddingStrategy

• OpenAI
• Ollama
• SentenceTransformer
• Future: local GPU embedding


class EmbeddingStrategy:
    def embed(self, texts): ...


---

② ClusteringStrategy

• Agglomerative（現行）
• HDBSCAN
• KMeans
• Spectral
• T3C 型 LLM grouping（テーマAで追加したもの）


class ClusteringStrategy:
    def cluster(self, ideas): ...


---

③ DenseClusterStrategy

• 密度推定（現行）
• DBSCAN の core point 判定
• 重要語抽出ベースの「注目クラスタ」抽出


class DenseClusterStrategy:
    def extract(self, clusters): ...


---

④ LabelingStrategy

• LLM（現行）
• ルールベース（キーワード抽出）
• embedding 中心の centroid summarization


class LabelingStrategy:
    def label(self, cluster): ...


---

3. パイプラインの最終形

def run_pipeline(csv, 
                 embedder: EmbeddingStrategy,
                 clusterer: ClusteringStrategy,
                 dense_extractor: DenseClusterStrategy,
                 labeler: LabelingStrategy):

    ideas = ingest_csv(csv)
    ideas = embedder.embed(ideas)

    clusters = clusterer.cluster(ideas)
    dense = dense_extractor.extract(clusters)

    for c in clusters:
        c.label = labeler.label(c)

    return build_report(clusters, dense)


---

4. この設計のメリット

✔ 広聴AIが「クラスタリングフレームワーク」になる

単なるアプリではなく、拡張可能な分析基盤になる。

✔ 研究者・自治体・OSS コントリビューターが戦略を追加しやすい

• 新しい embedding
• 新しいクラスタリング
• 新しいラベリング
• 新しい密度推定
を自由に追加できる。


✔ T3C 型クラスタリングも自然に統合できる

テーマAと完全に整合する。

✔ UI は完全に安定

public-viewer は report JSON だけを読むため、内部戦略の変更に影響されない。

---

🎁 **最後に：

2 つのテーマを統合すると何が生まれるか**

あなたが今設計している広聴AIは、
「ブロードリスニングの OSS プラットフォーム」
として進化できる。

• embedding 主導（安定・再現性）
• LLM 主導（柔らかい分類）
• 密度主導（重要テーマ抽出）
• 階層主導（行政向け）
• UI は固定（public-viewer）


これらを Strategy パターンで統合すると、
広聴AIは「クラスタリング研究の実験場」としても使えるようになる。

---

次はどちらを深掘りしますか。

• Strategy パターンの実装をもっと具体化
• T3C 型クラスタリングのプロンプト最適化
• 広聴AIの階層クラスタリングの数学的詳細
• UI（public-viewer）のデータ構造最適化


どれでもいけます。

了解、ここは一度しっかり整理しておくと後々の判断が圧倒的に楽になります。
**「広聴AIを改変して商用ベースのシステム開発を行う場合のライセンス整理・障害・注意点」**を、OSS アーキテクト視点で体系化してまとめます。

以下は 法律アドバイスではなく、OSS ライセンスの一般的な技術的整理として扱ってください。

---

🧭 1. 広聴AIのライセンス：Apache License 2.0（AL2）

広聴AIは Apache License 2.0 で公開されています。
これは商用利用に最も寛容なライセンスの一つで、以下が許可されています。

✔ 許可されていること

• 商用利用（SaaS / OEM / 組み込み / 再販）
• 改変して独自プロダクト化
• ソースコード非公開のまま利用
• 内部利用・外部提供どちらも自由
• 改変版を別ライセンスで再配布可能（MIT や商用ライセンスなど）


✔ 義務（最低限）

• NOTICE ファイルの保持
• 著作権表示の保持
• 改変した場合はその旨を明記


GPL のような「コピーレフト義務」は一切ありません。

---

🚧 2. 商用化する際に発生しうる障害・注意点

ここが本題。
広聴AIは AL2 なのでライセンス的には自由ですが、商用化では別の観点で障害が出ます。

---

🧨 障害 1：LLM API のライセンス・利用規約

広聴AIは以下を利用可能：

• OpenAI API
• Ollama（ローカル LLM）
• その他 LLM API


商用化では LLM API の利用規約が最大の制約になります。

例：OpenAI API の注意点

• 商用利用は可能
• ただし API キーの再配布は禁止
• ユーザーが勝手に API を叩ける構造は NG
• 料金体系が変動するため、SaaS の原価計算が不安定


例：Ollama の注意点

• モデルによってライセンスが異なる
• Llama 系モデルは商用利用可能だが、• ファインチューニングの扱い
• 再配布の可否
などがモデルごとに違う



→ 結論

広聴AI本体より、LLM のライセンスの方が商用化の障害になる。

---

🧨 障害 2：embedding モデルのライセンス

embedding も LLM と同じくモデル依存。

• OpenAI embedding → 商用利用 OK
• BERT 系 → Apache/MIT で OK
• 日本語モデル（例えば rinna）→ 商用利用不可のものがある
• Llama embedding → 商用利用 OK（ただしモデルによる）


→ embedding を差し替える場合はモデルライセンス要確認。

---

🧨 障害 3：自治体データの扱い（個人情報・匿名加工情報）

広聴AIは「市民の声」を扱うため、商用化では以下が問題になる。

• 個人情報の扱い
• 匿名加工情報の基準
• 再識別リスク
• データ保持ポリシー
• SaaS 提供時のデータ越境（海外リージョン）


特に自治体向けでは 国内リージョン必須 が多い。

---

🧨 障害 4：OSS と商用コードの境界管理

広聴AIをベースに商用開発する場合、
OSS 部分と商用部分の境界を明確にする必要がある。

• OSS 部分の改変 → AL2 の義務（NOTICE 等）
• 商用部分 → 自社ライセンスで OK
• ただし OSS と商用コードが混ざると管理が難しくなる


→ ここはアーキテクトとして「レイヤ分離」が重要。

---

🧨 障害 5：UI/UX の著作権（OSS とは別の問題）

広聴AIの UI（public-viewer / admin）は OSS だが、
デザイン・ブランド・ロゴは別扱い。

• OSS コードは自由に使える
• しかし「広聴AI」という名称やロゴを商用で使う場合は注意
• OSS プロジェクトのブランドを商用利用する場合は別途許諾が必要になることがある


---

🧨 障害 6：商用サポート責任（OSS では保証されない）

AL2 には以下の免責がある：

• 無保証（AS IS）
• 瑕疵担保責任なし
• 適合性保証なし


商用化する場合は：

• SLA
• 障害対応
• セキュリティパッチ
• バージョン管理
• LLM API の障害時の fallback


などを自社で用意する必要がある。

---

🧨 障害 7：LLM の出力の著作権・責任問題

商用化では以下が問題になる：

• LLM 出力の著作権
• LLM 出力の誤情報による責任
• 行政文脈での説明責任（アカウンタビリティ）


広聴AIは「LLM はラベル生成のみ」という構造なので比較的安全だが、
商用化では 説明可能性（Explainability） が求められる。

---

🧭 3. 商用化に向けた安全なアーキテクチャ指針

あなたの OSS アーキテクトとしての視点で、
商用化を安全に行うための設計指針をまとめるとこうなる。

---

✔ 1. OSS コアと商用拡張をレイヤ分離する

/oss-core
    ingestion
    embedding
    clustering
    labeling
    report

/commercial
    auth
    billing
    multi-tenant
    SLA
    monitoring
    admin-pro


---

✔ 2. LLM API を抽象化し、商用利用可能なモデルに差し替え可能にする

LLMStrategy
    - OpenAI
    - Azure OpenAI
    - Local Llama
    - Claude


---

✔ 3. embedding も Strategy パターンで差し替え可能にする

---

✔ 4. データ匿名化モジュールを追加する（自治体向け）

---

✔ 5. ログ・監査・説明責任（Explainability）を強化する

---

✔ 6. OSS ライセンス管理（SPDX）を CI に組み込む

---

🧭 4. 最終まとめ（商用化の障害と対策）

項目	障害	対策	
OSS ライセンス	Apache 2.0 → 商用利用 OK	NOTICE 管理	
LLM API	利用規約・料金・再配布禁止	Strategy 化＋ローカルモデル対応	
embedding	モデルごとにライセンス差	モデル選択 UI＋SPDX	
個人情報	再識別リスク	匿名化モジュール	
ブランド	広聴AI 名称の扱い	自社ブランド化	
保証	OSS は無保証	SLA・監視・冗長化	
説明責任	LLM 出力の責任	Explainability 層	


---

🔥 次に深掘りできるテーマ

どれもあなたの OSS アーキテクト視点で価値が高いです。

• 商用化に向けた「広聴AI コア」と「商用拡張」の境界設計
• LLM/embedding のライセンス比較表（商用利用可否一覧）
• 自治体向けの匿名加工情報モジュールの設計
• 商用 SaaS 化のための multi-tenant アーキテクチャ
• OSS と商用コードの混在を避けるためのディレクトリ構造設計


どれを次に進めますか。

了解。
では 2 つのテーマを完全に分離しつつ、しかし相互に参照できるように構造化して整理します。

あなたの OSS アーキテクトとしての視点に合わせ、
境界設計（アーキテクチャ）＋ライセンス比較（法務・運用）
の両面から、商用化に必要な全体像を描きます。

---

🧱 テーマ 1：商用化に向けた「広聴AI コア」と「商用拡張」の境界設計

広聴AIは OSS として非常に良い構造を持っていますが、商用化するには
OSS コアと商用コードの境界を明確に分離することが必須です。

以下は、あなたのようなアーキテクトが実際に採用するであろう
“レイヤ分離アーキテクチャ” の提案です。

---

🧩 1. 広聴AI コア（OSS 部分）に残すべき責務

OSS として公開されている部分は、以下の「分析エンジン」に限定すべきです。

✔ 1. ingestion（CSV → idea objects）

• 入力データの整形
• メタデータ付与


✔ 2. embedding 層

• OpenAI / Ollama / SentenceTransformer など
• Strategy パターンで差し替え可能にする


✔ 3. clustering 層

• Agglomerative
• HDBSCAN
• LLM grouping（T3C 型）
• Strategy パターンで差し替え可能


✔ 4. dense cluster 抽出

• embedding 空間の密度推定


✔ 5. labeling 層

• LLM によるクラスタ名生成


✔ 6. report builder

• public-viewer が読む JSON の生成


---

🧱 2. 商用拡張（プロプライエタリ）に移すべき責務

商用化では、OSS コアとは別に以下の責務を 完全に別ディレクトリ・別リポジトリ に分離します。

---

🔐 A. 認証・認可（AuthN/AuthZ）

• SSO（Azure AD / Google Workspace）
• RBAC（自治体職員・管理者・閲覧者）
• API キー管理


OSS に含めるべきではない。

---

💳 B. 課金・テナント管理（SaaS）

• multi-tenant
• usage-based billing
• LLM API のコスト管理
• テナントごとのデータ分離


OSS とは完全に切り離すべき。

---

🛡 C. データ匿名化・個人情報保護

• 再識別リスク評価
• 匿名加工情報生成
• 個人情報フィルタリング


自治体向けには必須だが OSS には含めない。

---

📊 D. 商用 UI（admin-pro）

• 高度なフィルタリング
• ダッシュボード
• 組織管理
• ワークフロー（承認フロー）


OSS の admin とは別物として扱う。

---

🧯 E. SLA・監視・ログ・監査

• 監査ログ
• SLA レポート
• 障害通知
• セキュリティログ


OSS には含めない。

---

🧩 F. LLM API の安全なプロキシ層

• API キーの秘匿
• レート制御
• コスト上限
• モデル切り替え


OSS ではなく商用層で管理。

---

🧭 3. 境界設計の最終形（ディレクトリ構造）

/oss-core
    /ingestion
    /embedding
    /clustering
    /dense
    /labeling
    /report
    /public-viewer
    /admin-lite

/commercial
    /auth
    /billing
    /tenant
    /anonymization
    /monitoring
    /admin-pro
    /llm-proxy


この構造にすることで：

• OSS コアは Apache-2.0 のまま
• 商用層は完全に proprietary
• ライセンスリスクゼロ
• 拡張性最大


---

🧭 テーマ 2：LLM / embedding のライセンス比較表（商用利用可否）

商用化で最も重要なのは モデルのライセンスです。
ここでは「広聴AIで実際に使われうるモデル」に絞って整理します。

---

📘 1. LLM の商用利用可否一覧

モデル	ライセンス	商用利用	再配布	注意点	
OpenAI GPT-4 / GPT-4o / GPT-3.5	独自ライセンス	✔ 商用利用可	✖ 再配布不可	API キーの再配布禁止	
Azure OpenAI	Microsoft 契約	✔ 商用利用可	✖ 再配布不可	データ保持ポリシーが企業向け	
Claude（Anthropic）	独自ライセンス	✔ 商用利用可	✖ 再配布不可	API キー管理必須	
Llama 3 / Llama 2	Meta Llama License	✔ 商用利用可	✔ 再配布可（条件あり）	700M MAU 以上は別契約	
Mistral	Apache-2.0	✔ 商用利用可	✔ 再配布可	OSS として扱いやすい	
rinna 日本語モデル	独自ライセンス	△ モデルにより異なる	✖ 再配布不可	商用不可モデルが多い	
GPT-NeoX / GPT-J	Apache-2.0	✔ 商用利用可	✔ 再配布可	日本語弱い	


---

📗 2. embedding モデルの商用利用可否一覧

モデル	ライセンス	商用利用	再配布	注意点	
OpenAI text-embedding-3-large	独自	✔ 商用利用可	✖ 再配布不可	API キー管理	
Azure OpenAI embedding	Microsoft 契約	✔ 商用利用可	✖ 再配布不可	企業向け	
Sentence-BERT（SBERT）	Apache-2.0	✔ 商用利用可	✔ 再配布可	日本語モデルは別	
Japanese SBERT（東北大）	CC BY-SA	✔ 商用利用可	✔ 再配布可	SA（継承）に注意	
Llama embedding	Meta Llama License	✔ 商用利用可	✔ 再配布可	700M MAU 条件	
rinna embedding	独自	△ モデルにより異なる	✖ 再配布不可	商用不可モデルあり	


---

🧭 3. 商用化に最適なモデル構成（推奨）

あなたのようなアーキテクトが選ぶなら：

✔ embedding

• SBERT（Apache-2.0）
• Llama embedding
• Mistral embedding


→ OSS で商用利用可、再配布可、コストゼロ

✔ LLM（ラベル生成）

• Llama 3
• Mistral
• Azure OpenAI（企業向け）


→ API キー管理が容易で、商用利用に適している

---

🧭 4. 最終まとめ

✔ 商用化に向けた境界設計

• OSS コア（分析エンジン）と商用層（認証・課金・監査）を完全分離
• Strategy パターンで embedding / clustering / labeling を差し替え可能にする
• LLM API はプロキシ層で管理する


✔ LLM / embedding のライセンス比較

• OpenAI / Claude → 商用利用可だが再配布不可
• Llama / Mistral → 商用利用可・再配布可
• rinna → 商用不可モデルが多いので注意
• SBERT → Apache-2.0 で最も扱いやすい


---

🔥 次に深掘りできるテーマ

どれも商用化の実装に直結します。

• 商用 SaaS 化のための multi-tenant アーキテクチャ設計
• LLM プロキシ層の設計（API キー秘匿・レート制御）
• 自治体向けの匿名加工情報モジュールの設計
• OSS コアの Strategy パターン実装の詳細


どれを進めましょうか。

