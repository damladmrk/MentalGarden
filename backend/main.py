from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
import os, json

app = FastAPI()

DATA_DIR = "data"
os.makedirs(DATA_DIR, exist_ok=True)

class MoodData(BaseModel):
    username: str
    sentence: str
    mood: int
    date: str

@app.post("/mood")
def save_mood(data: MoodData):
    filename = os.path.join(DATA_DIR, f"{data.username}_mood.json")
    with open(filename, "a", encoding="utf-8") as f:
        f.write(json.dumps(data.dict()) + "\n")
    return {"status": "saved"}

@app.get("/mood-history/{username}")
def get_history(username: str):
    filename = os.path.join(DATA_DIR, f"{username}_mood.json")
    if not os.path.exists(filename):
        return []
    with open(filename, "r", encoding="utf-8") as f:
        return [json.loads(line) for line in f]
