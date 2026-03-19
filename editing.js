from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .pipeline import (
    run_raw_pipeline,
    run_cluster_pipeline,
)
from .writer_db import (
    read_opinions,
    TABLE_OPINIONS_RAW,
    TABLE_OPINIONS_CLUSTERED,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/init")
def init_db():
    return {"status": "initialized"}

@app.get("/raw")
def raw():
    run_raw_pipeline()
    return {"status": "raw pipeline executed"}

@app.get("/cluster")
def cluster():
    run_cluster_pipeline()
    return {"status": "cluster pipeline executed"}

@app.get("/scatter")
def scatter(mode: str):
    if mode == "raw":
        rows = read_opinions(TABLE_OPINIONS_RAW)
    elif mode == "cluster":
        rows = read_opinions(TABLE_OPINIONS_CLUSTERED)
    else:
        return {"error": "unknown mode"}

    return {"data": rows}
