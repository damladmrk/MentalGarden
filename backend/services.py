# backend/services.py
from transformers import pipeline

# Tek seferlik model yüklemesi
sentiment_pipeline = pipeline("sentiment-analysis")

def analyze_sentiment(sentence: str) -> int:
    result = sentiment_pipeline(sentence)[0]
    label = result["label"]

    # Etiketi skora çevir (0–4 arası)
    score_map = {
        "NEGATIVE": 1,
        "POSITIVE": 3,
        "NEUTRAL": 2  # bazı modellerde olabilir
    }
    return score_map.get(label, 2)  # bilinmeyen olursa 2 (nötr)
