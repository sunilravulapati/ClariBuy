from pydantic import BaseModel
from typing import Dict, Optional

class UserProfile(BaseModel):
    user_id: str
    email: str
    traits: Dict[str, float]  # Normalized scores (0.0 - 1.0)
    history: list = []
class CoreAnswers(BaseModel):
    answers: Dict[str, float]  # Maps question_id -> selected option score

class CategoryAnswers(BaseModel):
    answers: Dict[str, float]  # Maps trait -> accumulated weight
    # Example: {"performance": 0.5, "budget": 0.3, "brand": 0.2, ...}

class Feedback(BaseModel):
    rating: int
    comment: str = ""