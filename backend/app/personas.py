def assign_persona(profile):
    if profile.get("overwhelm", 0) > 0.7:
        return "Guidance Seeker"
    if profile.get("performance_bias", 0) > 0.7:
        return "Performance Focused"
    return "Balanced Buyer"
