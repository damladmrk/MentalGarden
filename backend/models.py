# backend/models.py
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
from pydantic import BaseModel

# Veritabanı modeli
class Mood(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    sentence: str
    mood: int
    date: str = Field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d"))

# Swagger üzerinden gelen veri yapısı için (Auto Mood)
class AutoMoodRequest(BaseModel):
    username: str
    sentence: str
