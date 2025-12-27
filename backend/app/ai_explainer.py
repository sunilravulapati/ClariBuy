from google.cloud import aiplatform
import vertexai.generative_models as generative_models
from .prompts import build_explanation_prompt
import os

PROJECT_ID = os.getenv("GCP_PROJECT_ID")
LOCATION = os.getenv("GCP_LOCATION")
aiplatform.init(project=PROJECT_ID, location=LOCATION)
model = generative_models.GenerativeModel("gemini-2.0-flash-001")
def generate_psychometric_explanation(data: dict) -> str:
    # 1. Build the specialized psychometric prompt
    prompt = build_explanation_prompt(data)

    # 2. Configure for concise, focused output
    generation_config = {
        "temperature": 0.85,      # High temperature is CRITICAL for unique, non-generic insight
        "max_output_tokens": 350,  # Enough room for a deep 4-5 sentence analysis
        "top_p": 0.95,
        "top_k": 40,
    }

    # 3. Safety settings (Updated for current SDK standards)
    safety_settings = {
        generative_models.HarmCategory.HARM_CATEGORY_HATE_SPEECH: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        generative_models.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        generative_models.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        generative_models.HarmCategory.HARM_CATEGORY_HARASSMENT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    }
    response = model.generate_content(
        prompt,
        generation_config=generation_config,
        safety_settings=safety_settings,
    )
    return response.text.strip()