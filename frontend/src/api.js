const BASE = "http://127.0.0.1:8000";


export const getCoreQuestions = () => fetch(`${BASE}/questions/core`).then(r=>r.json());
export const submitCore = (answers) =>
  fetch(`${BASE}/profile/core`, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ answers })
  }).then(r=>r.json());

export const getOverview = async (profile = {}) => {
  const response = await fetch("http://127.0.0.1:8000/recommendations/overview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile), // Ensure this is at least an empty object {}
  });
  return response.json();
};

export const getCategoryQuestions = (c) =>
  fetch(`${BASE}/questions/${c}`).then(r=>r.json());

export const submitCategory = (c, answers) => {
  // 1. Find the highest trait value to use as a scale
  const values = Object.values(answers);
  const maxVal = values.length > 0 ? Math.max(...values) : 1;
  const scale = maxVal > 1 ? maxVal : 1;

  // 2. Create a normalized version of the answers (all values between 0 and 1)
  const normalizedAnswers = {};
  for (const trait in answers) {
    normalizedAnswers[trait] = answers[trait] / scale;
  }

  return fetch(`${BASE}/recommendations/${c}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      category: c, 
      answers: normalizedAnswers // Send normalized data to backend
    })
  }).then(r => r.json());
};

  export const getExplanation = (payload) =>
  fetch("http://127.0.0.1:8000/explain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(res => res.json());

