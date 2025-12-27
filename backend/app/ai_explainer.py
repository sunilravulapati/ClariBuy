from google.cloud import aiplatform
from google.generativeai.types import HarmCategory, HarmBlockThreshold

PROJECT_ID = "sylvan-airship-481816-p4"
LOCATION = "us-central1"

aiplatform.init(project=PROJECT_ID, location=LOCATION)

def generate_explanation(prompt: str) -> str:
    model = aiplatform.GenerativeModel("gemini-1.0-pro")

    response = model.generate_content(
        prompt,
        generation_config={
            "temperature": 0.2,
            "max_output_tokens": 180,
        },
        safety_settings={
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
        }
    )

    return response.text.strip()
