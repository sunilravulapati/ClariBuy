# backend/app/prompts.py

def build_explanation_prompt(data: dict) -> str:
    traits = data.get("dominant_traits", {})
    # Identify the highest scoring trait for focused reasoning
    top_trait = max(traits, key=traits.get) if traits else "balanced"
    
    product = data['recommended_products'][0]
    feature = product.get("top_feature", "overall quality")

    return f"""
    You are a Psychometric Shopping Analyst. 
    User Profile: Strongest driver is {top_trait}.
    Primary Match: {product['name']}
    Key Feature: {feature}

    TASK:
    Generate a detailed, multi-sentence psychological analysis (3-5 sentences).
    1. Sentence 1: Connect their {top_trait} driver directly to the '{product['name']}'.
    2. Sentence 2: Explain how the specific feature '{feature}' satisfies their subconscious need.
    3. Sentence 3: Highlight a specific trade-off they accepted (e.g., choosing reliability over flashiness).
    4. Sentence 4: Conclude with why this specific match offers more long-term satisfaction than generic alternatives.

    STRICT RULES:
    - Do NOT use technical jargon.
    - Do NOT provide a generic one-liner.
    - Tone: Sophisticated, insightful, and reassuring.
    """