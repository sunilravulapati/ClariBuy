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

def build_category_insight_prompt(category, top_trait, products):
    product_names = ", ".join([p['name'] for p in products])
    
    # Map category codes to friendly names
    category_map = {
        "pc": "laptops",
        "tv": "televisions",
        "phone": "smartphones",
        "headphone": "audio devices"
    }
    
    category_friendly = category_map.get(category, category)
    
    return f"""
    You are a Psychometric Shopping Assistant analyzing tech purchasing decisions.
    
    User's Dominant Decision Driver: {top_trait}
    Product Category: {category_friendly}
    Top 2 Psychometric Matches: {product_names}

    TASK:
    Write ONE concise, insightful sentence (20-30 words) that explains the psychological 
    alignment between their {top_trait}-driven mindset and these specific {category_friendly}.
    
    Focus on:
    - The subconscious need their {top_trait} trait reveals
    - Why THESE products specifically satisfy that need
    - Avoid generic statements like "great value" or "perfect choice"
    
    Example styles by category:
    - Laptops: "Your performance-focused mindset gravitates toward these laptops' processing power, prioritizing future-proof capability over aesthetic trends."
    - TVs: "Your longevity-driven approach aligns with these televisions' build quality, valuing long-term reliability over temporary feature novelty."
    - Phones: "Your simplicity preference resonates with these smartphones' intuitive interfaces, choosing seamless daily usability over complex customization."
    - Headphones: "Your brand-conscious profile connects with these audio devices' heritage craftsmanship, investing in proven acoustic excellence over trendy marketing."
    
    Output ONLY the insight sentence, no preamble.
    """