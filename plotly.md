import csv
from io import StringIO

def parse_csv_text(csv_text: str):
    """
    CSV を解析して内部データ構造に変換する。
    ・1カラムのみ
    ・ヘッダなし
    ・本文のみ
    のパターンを完全サポートする。
    """

    f = StringIO(csv_text)
    reader = csv.reader(f)

    rows = list(reader)

    # -----------------------------
    # ① 空ファイルチェック
    # -----------------------------
    if len(rows) == 0:
        return []

    # -----------------------------
    # ② 列数チェック
    # -----------------------------
    col_count = len(rows[0])

    # -----------------------------
    # ③ 1カラム & ヘッダなしパターン
    # -----------------------------
    if col_count == 1:
        # 1行目がヘッダかどうか判定（簡易）
        first = rows[0][0].strip()

        # ヘッダっぽい語を含む場合はヘッダとみなす
        header_keywords = ["意見", "本文", "full", "text", "opinion"]
        is_header = any(k in first for k in header_keywords)

        if is_header:
            # ヘッダあり → 2行目以降を本文として扱う
            data_rows = rows[1:]
        else:
            # ヘッダなし → 全行を本文として扱う
            data_rows = rows

        # 内部データ構造に変換
        result = []
        for idx, r in enumerate(data_rows):
            text = r[0].strip()

            if text == "":
                continue

            result.append({
                "id": idx + 1,
                "cluster_id": "",
                "x": None,
                "y": None,
                "summary": text[:30],   # summary 自動生成
                "fullOpinion": text
            })

        return result

    # -----------------------------
    # ④ 2カラム以上の通常 CSV（既存ロジックに委譲）
    # -----------------------------
    # ここはあなたの既存コードに合わせて差し替えてください
    # 例：
    # return parse_multi_column_csv(rows)
    raise ValueError("2カラム以上の CSV は別ルートで処理してください")
