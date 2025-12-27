from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

from .models import CoreAnswers, CategoryAnswers, Feedback
from .core_questions import CORE_QUESTIONS
from .category_questions import CATEGORY_QUESTIONS
from .profiler import build_profile
from .recommender import recommend
from .personas import assign_persona

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ ROUTES BELOW ------------------

@app.post("/recommendations/overview")
def overview(data: dict):
    return {"message": "Overview works"}

@app.post("/explain")
def explain(data: dict):
    return {"explanation": "Test explanation"}

with open("data/products.json") as f:
    PRODUCTS = json.load(f)

USER_PROFILE = {}  # temp in-memory (replace with DB later)

@app.get("/questions/core")
def get_core_questions():
    return CORE_QUESTIONS

@app.post("/profile/core")
def submit_core_answers(data: CoreAnswers):
    profile = build_profile(data.answers)
    USER_PROFILE.update(profile)
    return {"persona": assign_persona(profile)}

@app.post("/recommendations/overview")
def overview(data: dict):
    return {
        "detail": [
            {
                "id": "d1",
                "name": "Detail Product A",
                "price": 12000,
                "score": 0.82
            },
            {
                "id": "d2",
                "name": "Detail Product B",
                "price": 9500,
                "score": 0.74
            }
        ],
        "tv": [
            {
                "id": "t1",
                "name": "Smart TV X",
                "price": 42000,
                "score": 0.68
            }
        ]
    }

@app.get("/questions/{category}")
def category_questions(category: str):
    return CATEGORY_QUESTIONS.get(category, [])

@app.post("/recommendations/{category}")
def category_recommend(category: str, data: CategoryAnswers):
    refined = {**USER_PROFILE, **data.answers}
    return recommend(refined, PRODUCTS, category)

@app.post("/feedback")
def feedback(data: Feedback):
    return {"status": "recorded"}
