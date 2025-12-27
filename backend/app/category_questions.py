# backend/app/category_questions.py

CATEGORY_QUESTIONS = {
    "pc": [
        {
            "text": "What is the primary workload for this computer?",
            "options": [
                {"text": "Extreme processing (Coding, Gaming, 3D)", "weights": {"performance": 0.5}},
                {"text": "Everyday browsing and student assignments", "weights": {"simplicity": 0.4, "budget": 0.1}},
                {"text": "Long-term office work that needs to last 5+ years", "weights": {"longevity": 0.4, "brand": 0.1}}
            ]
        }
    ],
    "tv": [
        {
            "text": "What describes your ideal viewing experience?",
            "options": [
                {"text": "Cinematic quality with perfect blacks and colors", "weights": {"performance": 0.4, "brand": 0.2}},
                {"text": "Easy to use for the whole family and kids", "weights": {"simplicity": 0.5}},
                {"text": "The best screen possible for a tight budget", "weights": {"budget": 0.5}}
            ]
        }
    ],
    "phone": [
        {
            "text": "How do you primarily use your phone throughout the day?",
            "options": [
                {"text": "Heavy gaming or high-res video editing", "weights": {"performance": 0.4, "longevity": 0.1}},
                {"text": "Mostly social media, calls, and basic apps", "weights": {"simplicity": 0.4, "budget": 0.1}},
                {"text": "Professional multi-tasking and work emails", "weights": {"longevity": 0.3, "simplicity": 0.2}}
            ]
        },
        {
            "text": "When considering a new smartphone, what is your stance on price?",
            "options": [
                {"text": "I want the premium 'pro' experience, regardless of cost", "weights": {"brand": 0.4, "performance": 0.1}},
                {"text": "I need a reliable device that won't break the bank", "weights": {"budget": 0.5}}
            ]
        }
    ],
    "headphone": [
        {
            "text": "What describes your ideal listening environment?",
            "options": [
                {"text": "Complete silence (Industry-leading noise cancellation)", "weights": {"performance": 0.3, "brand": 0.2}},
                {"text": "On the go—I need something easy to carry and use", "weights": {"simplicity": 0.4, "budget": 0.1}},
                {"text": "Durable gear that can survive daily gym use", "weights": {"longevity": 0.4, "budget": 0.1}}
            ]
        }
    ]
}