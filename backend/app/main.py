# backend/app/main.py - Updated Routes

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import Optional

from .models import CoreAnswers, CategoryAnswers, Feedback
from .core_questions import CORE_QUESTIONS
from .category_questions import CATEGORY_QUESTIONS
from .profiler import build_profile
from .recommender import recommend
from .personas import assign_persona
from .ai_explainer import generate_psychometric_explanation
from .prompts import build_explanation_prompt, build_category_insight_prompt
from .ai_explainer import model

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://sylvan-airship-481816-p4.web.app",
    "https://claribuy-c65c4.web.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load products
with open("data/products.json") as f:
    PRODUCTS = json.load(f)

USER_PROFILE = {}  # temp in-memory

@app.get("/api/questions/core")
def get_core():
    return CORE_QUESTIONS

@app.get("/api/questions/category/{cat_id}")
def get_category_questions(cat_id: str):
    return CATEGORY_QUESTIONS.get(cat_id, [])

@app.post("/profile/core")
def submit_core_answers(data: CoreAnswers):
    profile = build_profile(data.answers)
    USER_PROFILE.update(profile)
    return {"persona": assign_persona(profile)}

@app.post("/recommendations/overview")
def overview(profile: Optional[dict] = None):
    user_profile = profile or {
        "performance": 0.5, "budget": 0.5, "brand": 0.5, 
        "simplicity": 0.5, "longevity": 0.5
    }
    
    dominant_trait = max(user_profile, key=user_profile.get)
    categories = ["pc", "tv", "phone", "headphone"]
    response_data = {}

    for cat in categories:
        matches = recommend(user_profile, PRODUCTS, category=cat)
        top_products = matches[:2]
        
        for product in top_products:
            full_product = next((p for p in PRODUCTS if p['id'] == product['id']), None)
            if full_product:
                product['specs'] = full_product.get('specs', {})
                product['top_feature'] = full_product.get('top_feature', '')
        
        prompt = build_category_insight_prompt(cat, dominant_trait, top_products)
        insight = model.generate_content(prompt).text.strip()
        
        response_data[cat] = {
            "insight": insight,
            "items": top_products
        }

    return response_data

@app.post("/recommendations/{category}")
def category_recommend(category: str, data: CategoryAnswers):
    """Get refined recommendations for a specific category"""
    # Use category answers directly, with USER_PROFILE as fallback
    base_profile = {
        "performance": 0.5, "budget": 0.5, "brand": 0.5,
        "simplicity": 0.5, "longevity": 0.5
    }
    
    # Merge: base -> core profile -> category answers
    refined = {**base_profile, **USER_PROFILE, **data.answers}
    
    results = recommend(refined, PRODUCTS, category)
    
    # Enrich with full product data
    for product in results:
        full_product = next((p for p in PRODUCTS if p['id'] == product['id']), None)
        if full_product:
            product['specs'] = full_product.get('specs', {})
            product['top_feature'] = full_product.get('top_feature', '')
    
    return results

@app.post("/explain")
def explain(data: dict):
    return {"explanation": generate_psychometric_explanation(data)}

@app.post("/feedback")
def feedback(data: Feedback):
    return {"status": "recorded"}
