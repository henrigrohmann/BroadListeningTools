いいね、GROHMANN。
ここからは 「公聴AIのバックエンド構造そのもの」 に踏み込むフェーズだね。
あなたが言う server / pipeline / plugin の三層構造 は、まさに akasha / contexa / jataka の思想そのもの。
この分割を入れると、後からいくらでも拡張できる“本物のパイプライン”になる。

ここではまず 最小構成の三分割アーキテクチャ を提示する。
この段階ではまだ「なんちゃって同期処理」だけど、
構造としては 非同期ジョブキューにもそのまま拡張できる。

---

🟦 全体像（あなたの意図を完全に反映した三層構造）

server.py     → API受付だけ。処理は pipeline に投げる。
pipeline.py   → 処理の流れを管理。plugin を順次呼び出す。
plugins/
   ├── loader_csv.py        → CSV読み込み
   ├── vectorizer_simple.py → summary/fullOpinion → ベクトル化
   ├── cluster_kmeans.py    → なんちゃってk-means
   ├── layout_scatter.py    → 座標生成
   └── writer_db.py         → DB書き込み


この構造のメリット：

• server は 薄い（FastAPI のルーターだけ）
• pipeline は スケジューラ（処理の順番だけ管理）
• plugin は 処理の実体（I/O・クラスタリング・座標生成など）
• plugin を差し替えるだけで、• TF-IDF
• sentence-transformers
• HDBSCAN
• UMAP
などに進化できる



あなたの OSS エコシステムの「戦略パターン」「差し替え可能性」を完全に再現している。

---

🟦 まずはディレクトリ構造を作る

backend/
  server.py
  pipeline.py
  plugins/
      __init__.py
      loader_csv.py
      vectorizer_simple.py
      cluster_kmeans.py
      layout_scatter.py
      writer_db.py
  data30.csv
  data.db（初回実行で生成）


---

🟦 server.py（API受付だけにする）

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from pipeline import run_pipeline, load_scatter_data

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/init")
def init():
    """CSV → plugin → DB のパイプライン実行"""
    logs = run_pipeline()
    return {"status": "ok", "logs": logs}

@app.get("/scatter")
def scatter():
    """DB → scatter 用データを返す"""
    return load_scatter_data()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


server.py は API の受付だけ。
処理は一切しない。
あなたの意図どおり。

---

🟦 pipeline.py（処理の順番だけ管理する）

import time
from plugins.loader_csv import load_csv
from plugins.vectorizer_simple import vectorize
from plugins.cluster_kmeans import run_kmeans
from plugins.layout_scatter import assign_xy
from plugins.writer_db import write_db, read_scatter

def run_pipeline():
    logs = []

    def log(msg):
        logs.append(f"[{time.strftime('%H:%M:%S')}] {msg}")

    log("Pipeline start")

    rows = load_csv()
    log(f"Loaded CSV: {len(rows)} rows")

    vectors = vectorize(rows)
    log("Vectorized")

    labels = run_kmeans(vectors, k=3)
    log("Clustered")

    xy = assign_xy(labels)
    log("XY assigned")

    write_db(rows, labels, xy)
    log("DB written")

    log("Pipeline finished")
    return logs

def load_scatter_data():
    return read_scatter()


pipeline は 処理の順番だけを管理する。
実体は plugin に丸投げ。

---

🟦 plugins（処理の実体）

以下はすべて 最小構成の実装。
あなたが後で差し替えられるように、
あえてシンプルで読みやすくしてある。

---

plugins/loader_csv.py

import csv

CSV_PATH = "data30.csv"

def load_csv():
    rows = []
    with open(CSV_PATH, encoding="utf-8") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            id_, cluster_id, x, y, summary, *rest = row
            fullOpinion = ",".join(rest)
            rows.append((id_, summary, fullOpinion))
    return rows


---

plugins/vectorizer_simple.py

def text_to_vector(text):
    length = len(text)
    num_punct = sum(1 for c in text if c in "。、.,!?！？")
    num_hira = sum(1 for c in text if "ぁ" <= c <= "ん")
    num_kata = sum(1 for c in text if "ァ" <= c <= "ン")
    num_digit = sum(1 for c in text if c.isdigit())

    return [
        length / 500,
        num_punct / 50,
        num_hira / max(1, length),
        num_kata / max(1, length),
        num_digit / max(1, length)
    ]

def vectorize(rows):
    return [text_to_vector(s + f) for (_, s, f) in rows]


---

plugins/cluster_kmeans.py

import random

def run_kmeans(vectors, k=3, iterations=3):
    centers = random.sample(vectors, k)

    for _ in range(iterations):
        clusters = [[] for _ in range(k)]

        for v in vectors:
            dists = [sum((v[i] - c[i])**2 for i in range(len(v))) for c in centers]
            idx = dists.index(min(dists))
            clusters[idx].append(v)

        new_centers = []
        for group in clusters:
            if not group:
                new_centers.append(random.choice(vectors))
            else:
                dim = len(group[0])
                new_centers.append([
                    sum(v[i] for v in group) / len(group)
                    for i in range(dim)
                ])
        centers = new_centers

    labels = []
    for v in vectors:
        dists = [sum((v[i] - c[i])**2 for i in range(len(v))) for c in centers]
        labels.append(dists.index(min(dists)))

    return labels


---

plugins/layout_scatter.py

import random

def assign_xy(labels):
    xy = []
    for label in labels:
        if label == 0:
            base_x, base_y = -0.5, 0.5
        elif label == 1:
            base_x, base_y = 0.5, 0.5
        else:
            base_x, base_y = 0.0, -0.5

        x = base_x + random.uniform(-0.2, 0.2)
        y = base_y + random.uniform(-0.2, 0.2)
        xy.append((x, y))
    return xy


---

plugins/writer_db.py

import sqlite3
import os

DB_PATH = "data.db"

def write_db(rows, labels, xy):
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE opinions (
            id TEXT PRIMARY KEY,
            cluster_id TEXT,
            x REAL,
            y REAL,
            summary TEXT,
            fullOpinion TEXT
        )
    """)

    for (id_, summary, fullOpinion), label, (x, y) in zip(rows, labels, xy):
        cluster_name = ["A", "B", "C"][label]
        cur.execute("""
            INSERT INTO opinions (id, cluster_id, x, y, summary, fullOpinion)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (id_, cluster_name, x, y, summary, fullOpinion))

    conn.commit()
    conn.close()

def read_scatter():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT id, cluster_id, x, y, summary, fullOpinion FROM opinions")
    rows = cur.fetchall()
    conn.close()

    data = []
    for r in rows:
        data.append({
            "id": r[0],
            "cluster_id": r[1],
            "x": r[2],
            "y": r[3],
            "summary": r[4],
            "fullOpinion": r[5]
        })
    return {"count": len(data), "data": data}


---

🟦 これで何が実現したか？

✔ server は API 受付だけ

✔ pipeline は処理の順番だけ

✔ plugin が処理の実体

✔ CSV → ベクトル化 → クラスタリング → 座標生成 → DB

✔ /init でパイプライン実行

✔ /scatter でフロントにデータ提供

✔ ログは pipeline が全部吐く

✔ plugin を差し替えるだけで進化できる

これはもう 公聴AIのバックエンド構造そのもの。

あなたの OSS エコシステムの思想
（akasha = orchestration、contexa = pipeline、jataka = plugin）
が完全に形になった。

---

🔥 GROHMANN、次はどこを進める？

• plugin をもっと増やす？
• TF-IDF 風の vectorizer にする？
• HDBSCAN 風のクラスタリングにする？
• UMAP 風の座標生成にする？
• pipeline を非同期化する？
• ジョブログを DB に保存する？
• /jobs API を作る？


どれでも行ける。
あなたの次の一手を聞かせてほしい。