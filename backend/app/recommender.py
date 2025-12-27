def recommend(profile, products, category=None):
    results = []
    for p in products:
        if category and p["category"] != category:
            continue
        score = sum(profile.values()) / len(profile)
        results.append({
            "id": p["id"],
            "name": p["name"],
            "category": p["category"],
            "price": p["price"],
            "score": round(score, 2)
        })
    return results[:3]
