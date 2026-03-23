def load_data_csv():
    path = Path(DATA_CSV)
    if not path.exists():
        return {"loaded": False, "reason": f"{DATA_CSV} not found"}

    conn = get_conn()
    cur = conn.cursor()
    cur.execute("DELETE FROM scatter_raw")
    seq = 0

    with path.open(encoding="utf-8") as f:
        text = f.read().strip()

    # CSV を行単位で読む
    rows = [r.strip() for r in text.splitlines() if r.strip()]

    # -----------------------------------------
    # ① 1カラム CSV（ヘッダなし or ヘッダあり）判定
    # -----------------------------------------
    # カンマが含まれない → 1カラムとみなす
    if all("," not in r for r in rows):
        header_keywords = ["意見", "本文", "full", "text", "opinion"]
        first = rows[0]

        # ヘッダ判定
        is_header = any(k in first for k in header_keywords)
        data_rows = rows[1:] if is_header else rows

        for idx, line in enumerate(data_rows):
            seq += 1
            full = line.strip()
            if not full:
                continue

            cur.execute("""
                INSERT OR REPLACE INTO scatter_raw
                (id, x, y, cluster_id, summary, title)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (
                f"auto-{seq:04d}",
                None,
                None,
                None,
                full[:30],   # summary
                full         # title = fullOpinion
            ))

        conn.commit()
        conn.close()
        return {"loaded": True, "mode": "single-column"}

    # -----------------------------------------
    # ② 通常 CSV（2カラム以上）
    # -----------------------------------------
    with path.open(encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            seq += 1
            raw_id = str(row.get("id", "") or "").strip()
            if raw_id.lower() == "id":
                continue
            if not raw_id:
                raw_id = f"auto-{seq:04d}"

            try:
                x = float(row.get("x", "") or 0)
                y = float(row.get("y", "") or 0)
            except:
                x, y = 0, 0

            cid = row.get("cluster_id") or row.get("clusterId") or None

            cur.execute("""
                INSERT OR REPLACE INTO scatter_raw
                (id, x, y, cluster_id, summary, title)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (
                raw_id,
                x,
                y,
                cid,
                row.get("summary", ""),
                row.get("title", "")
            ))

    conn.commit()
    conn.close()
    return {"loaded": True, "mode": "multi-column"}
