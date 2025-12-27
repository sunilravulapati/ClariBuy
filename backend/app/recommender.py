# backend/app/recommender.py

def recommend(profile, products, category=None):
    results = []
    for p in products:
        if category and p.get("category") != category:
            continue
            
        # Example logic: Match product 'specs' against user 'profile' traits
        # Ensure your products.json has a 'specs' object and a 'top_feature' string
        p_specs = p.get("specs", {})
        match_scores = [1 - abs(profile.get(t, 0.5) - p_specs.get(t, 0.5)) for t in profile]
        final_score = sum(match_scores) / len(match_scores)

        results.append({
            "id": p["id"],
            "name": p["name"],
            "price": p["price"],
            "score": round(final_score, 2),
            "top_feature": p.get("top_feature", "Build quality"),
            "psychometric_tags": [t for t, s in profile.items() if s > 0.7]
        })
    
    results.sort(key=lambda x: x["score"], reverse=True)
    return results[:3]