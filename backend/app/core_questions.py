# backend/app/core_questions.py

CORE_QUESTIONS = [
    {
        "id": "decision_speed",
        "text": "When I see a tech product I like, I prefer to buy it immediately rather than spending days comparing alternatives",
        "options": [
            {
                "text": "Strongly Disagree",
                "value": 1,
                "weights": {"simplicity": 0.2, "performance": 0.1}
            },
            {
                "text": "Disagree",
                "value": 2,
                "weights": {"simplicity": 0.1, "longevity": 0.1}
            },
            {
                "text": "Neutral",
                "value": 3,
                "weights": {"performance": 0.05, "budget": 0.05}
            },
            {
                "text": "Agree",
                "value": 4,
                "weights": {"simplicity": 0.15, "brand": 0.1}
            },
            {
                "text": "Strongly Agree",
                "value": 5,
                "weights": {"simplicity": 0.3, "brand": 0.15}
            }
        ]
    },
    {
        "id": "budget_sensitivity",
        "text": "I often find myself choosing a cheaper option even when I can afford something better",
        "options": [
            {
                "text": "Strongly Disagree",
                "value": 1,
                "weights": {"performance": 0.25, "brand": 0.2}
            },
            {
                "text": "Disagree",
                "value": 2,
                "weights": {"performance": 0.15, "longevity": 0.1}
            },
            {
                "text": "Neutral",
                "value": 3,
                "weights": {"budget": 0.1, "performance": 0.05}
            },
            {
                "text": "Agree",
                "value": 4,
                "weights": {"budget": 0.2, "simplicity": 0.1}
            },
            {
                "text": "Strongly Agree",
                "value": 5,
                "weights": {"budget": 0.35, "simplicity": 0.15}
            }
        ]
    },
    {
        "id": "brand_trust",
        "text": "I feel more confident purchasing from established brands like Apple, Sony, or Samsung than lesser-known alternatives",
        "options": [
            {
                "text": "Strongly Disagree",
                "value": 1,
                "weights": {"budget": 0.2, "performance": 0.15}
            },
            {
                "text": "Disagree",
                "value": 2,
                "weights": {"budget": 0.15, "performance": 0.1}
            },
            {
                "text": "Neutral",
                "value": 3,
                "weights": {"brand": 0.1, "longevity": 0.05}
            },
            {
                "text": "Agree",
                "value": 4,
                "weights": {"brand": 0.2, "longevity": 0.15}
            },
            {
                "text": "Strongly Agree",
                "value": 5,
                "weights": {"brand": 0.35, "longevity": 0.2}
            }
        ]
    },
    {
        "id": "performance_bias",
        "text": "I'm willing to pay significantly more for better specs and performance, even if the difference isn't noticeable in daily use",
        "options": [
            {
                "text": "Strongly Disagree",
                "value": 1,
                "weights": {"budget": 0.25, "simplicity": 0.2}
            },
            {
                "text": "Disagree",
                "value": 2,
                "weights": {"budget": 0.15, "simplicity": 0.1}
            },
            {
                "text": "Neutral",
                "value": 3,
                "weights": {"performance": 0.1, "budget": 0.05}
            },
            {
                "text": "Agree",
                "value": 4,
                "weights": {"performance": 0.25, "brand": 0.1}
            },
            {
                "text": "Strongly Agree",
                "value": 5,
                "weights": {"performance": 0.4, "brand": 0.15}
            }
        ]
    },
    {
        "id": "overwhelm",
        "text": "When faced with too many product options, I feel paralyzed and struggle to make a decision",
        "options": [
            {
                "text": "Strongly Disagree",
                "value": 1,
                "weights": {"performance": 0.2, "brand": 0.1}
            },
            {
                "text": "Disagree",
                "value": 2,
                "weights": {"performance": 0.1, "longevity": 0.1}
            },
            {
                "text": "Neutral",
                "value": 3,
                "weights": {"simplicity": 0.1, "brand": 0.05}
            },
            {
                "text": "Agree",
                "value": 4,
                "weights": {"simplicity": 0.25, "brand": 0.15}
            },
            {
                "text": "Strongly Agree",
                "value": 5,
                "weights": {"simplicity": 0.4, "brand": 0.2}
            }
        ]
    }
]