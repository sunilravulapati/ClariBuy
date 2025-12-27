const coreQuestions = [
  {
    id: "q1",
    text: "What frustrates you more?",
    options: [
      { label: "A slow device", weights: { performance: 1 } },
      { label: "Paying too much", weights: { budget: 1 } }
    ]
  },
  {
    id: "q2",
    text: "Which do you usually trust more?",
    options: [
      { label: "Well-known brands", weights: { brand: 1 } },
      { label: "Better specs for the price", weights: { performance: 0.5, budget: 0.5 } }
    ]
  },
  {
    id: "q3",
    text: "When buying tech, you prefer something that…",
    options: [
      { label: "Just works without effort", weights: { simplicity: 1 } },
      { label: "Can be tweaked and customized", weights: { performance: 0.5 } }
    ]
  },
  {
    id: "q4",
    text: "How long do you usually keep a product?",
    options: [
      { label: "As long as possible", weights: { longevity: 1 } },
      { label: "Upgrade frequently", weights: { performance: 0.5 } }
    ]
  },
  {
    id: "q5",
    text: "If two products are similar, you choose based on…",
    options: [
      { label: "Price difference", weights: { budget: 1 } },
      { label: "Extra features", weights: { performance: 0.5 } }
    ]
  }
];

export default coreQuestions;
