def load_data_csv():
    path = Path(DATA_CSV)
    if not path.exists():
        return {"loaded": False, "reason": f"{DATA_CSV} not found"}

    conn = get_conn()
    cur = conn.cursor()
    cur.execute("DELETE FROM scatter_raw")
    seq = 0

    with path.open(encoding="utf-8") as f:
        text = f.read().replace("\ufeff", "").strip()

    lines = [line.strip() for line in text.splitlines() if line.strip()]

    if len(lines) == 0:
        conn.close()
        return {"loaded": False, "reason": "CSV empty"}

    # -----------------------------------------
    # ① 1カラム CSV 判定（堅牢版）
    # -----------------------------------------
    is_single_column = all(len(line.split(",")) == 1 for line in lines)

    if is_single_column:
        # ★ ヘッダ判定は完全に無効化する
        data_rows = lines

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
                full[:30],
                full
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
