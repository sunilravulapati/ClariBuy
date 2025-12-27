from pydantic import BaseModel
from typing import Dict

class CoreAnswers(BaseModel):
    answers: Dict[str, float]  # Maps question_id -> selected option score

class CategoryAnswers(BaseModel):
    answers: Dict[str, float]  # Maps trait -> accumulated weight
    # Example: {"performance": 0.5, "budget": 0.3, "brand": 0.2, ...}

class Feedback(BaseModel):
    rating: int
    comment: str = ""