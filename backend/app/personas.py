import numpy as np

def assign_persona(traits):
    """
    Assigns a persona based on the dominant psychometric trait.
    In a production scale, this would use KMeans clustering.
    """
    if not traits:
        return "The Balanced Explorer"
    
    # Mapping traits to professional Persona titles
    persona_map = {
        "performance": "The Performance Purist",
        "budget": "The Value Strategist",
        "brand": "The Brand Loyalist",
        "simplicity": "The Seamless Minimalist",
        "longevity": "The Sustainable Investor"
    }
    
    # Identify the trait with the highest normalized score
    top_trait = max(traits, key=traits.get)
    return persona_map.get(top_trait, "The Balanced Explorer")