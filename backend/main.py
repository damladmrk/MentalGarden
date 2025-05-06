from fastapi import FastAPI, Depends
from sqlmodel import Session, select
from backend.database import create_db_and_tables, get_session
from backend.models import Mood, AutoMoodRequest
from typing import List
from backend.services import analyze_sentiment

app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.post("/mood", response_model=Mood)
def create_mood(mood: Mood, session: Session = Depends(get_session)):
    session.add(mood)
    session.commit()
    session.refresh(mood)
    return mood

@app.get("/moods", response_model=List[Mood])
def get_moods(session: Session = Depends(get_session)):
    return session.exec(select(Mood)).all()

@app.post("/mood/auto", response_model=Mood)
def auto_create_mood(request: AutoMoodRequest, session: Session = Depends(get_session)):
    mood_score = analyze_sentiment(request.sentence)

    mood = Mood(
        username=request.username,
        sentence=request.sentence,
        mood=mood_score
    )
    session.add(mood)
    session.commit()
    session.refresh(mood)
    return mood
