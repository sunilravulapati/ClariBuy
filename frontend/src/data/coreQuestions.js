const coreQuestions = [
  {
    id: "q1",
    text: "What frustrates you more?",
    options: [
      { label: "A slow or laggy device", weights: { performance: 1 } },
      { label: "Feeling like I overpaid", weights: { budget: 1 } }
    ]
  },
  {
    id: "q2",
    text: "Which do you usually trust more?",
    options: [
      { label: "Big brands with a proven history", weights: { brand: 1 } },
      { label: "Lesser-known brands with better specs", weights: { performance: 0.5, budget: 0.5 } }
    ]
  },
  {
    id: "q3",
    text: "When buying tech, you prefer something that…",
    options: [
      { label: "Is effortless to use (Plug & Play)", weights: { simplicity: 1 } },
      { label: "Gives me full control and settings", weights: { performance: 0.5 } }
    ]
  },
  {
    id: "q4",
    text: "What matters most for your peace of mind?",
    options: [
      { label: "Knowing it's built to last for years", weights: { longevity: 1 } }, // Reframed for clarity
      { label: "Knowing I have the latest tech", weights: { performance: 0.5 } }
    ]
  },
  {
    id: "q5",
    text: "If two products are similar, you choose based on…",
    options: [
      { label: "The lowest price", weights: { budget: 1 } },
      { label: "The one that feels more 'premium'", weights: { brand: 0.5, longevity: 0.5 } }
    ]
  }
];

export default coreQuestions;