const QUESTION_POOL = {
  performance: [
    {
      id: "perf_1",
      text: "Which would annoy you more?",
      options: [
        { label: "Lag or stuttering", weights: { performance: 1 } },
        { label: "Paying extra", weights: { budget: 0.5 } }
      ]
    },
    {
      id: "perf_2",
      text: "You prefer a device that is…",
      options: [
        { label: "Fast even if it runs hot", weights: { performance: 1 } },
        { label: "Cool and quiet", weights: { simplicity: 0.5 } }
      ]
    }
  ],

  budget: [
    {
      id: "budget_1",
      text: "When prices increase, you usually…",
      options: [
        { label: "Wait for a deal", weights: { budget: 1 } },
        { label: "Buy if worth it", weights: { performance: 0.5 } }
      ]
    }
  ],

  simplicity: [
    {
      id: "simplicity_1",
      text: "Setting things up should be…",
      options: [
        { label: "Instant & effortless", weights: { simplicity: 1 } },
        { label: "Flexible & configurable", weights: { performance: 0.5 } }
      ]
    }
  ]
};

export default QUESTION_POOL;
