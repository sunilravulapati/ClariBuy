from pydantic import BaseModel
from typing import Dict, Optional

class CoreAnswers(BaseModel):
    answers: Dict[str, float]

class CategoryAnswers(BaseModel):
    category: str
    answers: Dict[str, float]

class Feedback(BaseModel):
    category: str
    satisfied: bool
