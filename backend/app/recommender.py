def recommend(profile, products, category=None, top_n=5):
    """
    Match user profile to products using trait similarity
    Returns list of products with match scores and confidence levels
    """
    # Filter by category if specified
    if category:
        products = [p for p in products if p.get("category") == category]
    
    # STEP 1: Normalize the profile (0-1 range)
    max_profile_val = max(profile.values()) if profile.values() else 1
    # Only scale if values exceed 1
    profile_scale = max_profile_val if max_profile_val > 1 else 1
    normalized_profile = {k: v / profile_scale for k, v in profile.items()}
    
    results = []
    
    for product in products:
        specs = product.get("specs", {})
        
        # STEP 2: Normalize product specs (0-1 range)
        max_spec_val = max(specs.values()) if specs.values() else 1
        spec_scale = max_spec_val if max_spec_val > 1 else 1
        normalized_specs = {k: v / spec_scale for k, v in specs.items()}
        
        # STEP 3: Calculate match score
        score = 0
        trait_count = 0
        
        for trait, user_value in normalized_profile.items():
            if trait in normalized_specs:
                product_value = normalized_specs[trait]
                # Calculate similarity (1 - absolute difference)
                similarity = 1 - abs(user_value - product_value)
                score += similarity
                trait_count += 1
        
        # Average match score
        if trait_count > 0:
            match_score = score / trait_count
        else:
            match_score = 0.5  # neutral if no traits match
        
        # Determine confidence level
        if match_score >= 0.80:
            confidence = "High Match"
        elif match_score >= 0.60 and match_score < 0.80:
            confidence = "Good Match"
        elif match_score >= 0.40 and match_score < 0.60:
            confidence = "Moderate Match"
        else:
            confidence = "Low Match"
        
        results.append({
            "id": product["id"],
            "name": product["name"],
            "price": product["price"],
            "match_score": round(match_score, 3),
            "confidence": confidence,
            "category": product.get("category"),
            "specs": specs,  # Keep original specs for display
            "top_feature": product.get("top_feature", "")
        })
    
    # Sort by match score (highest first)
    results.sort(key=lambda x: x["match_score"], reverse=True)
    
    return results[:top_n]