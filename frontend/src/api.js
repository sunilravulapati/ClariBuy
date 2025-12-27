const BASE = "http://127.0.0.1:8000";


export const getCoreQuestions = () => fetch(`${BASE}/questions/core`).then(r=>r.json());
export const submitCore = (answers) =>
  fetch(`${BASE}/profile/core`, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ answers })
  }).then(r=>r.json());

export const getOverview = (payload) =>
  fetch(`${BASE}/recommendations/overview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(res => res.json());

export const getCategoryQuestions = (c) =>
  fetch(`${BASE}/questions/${c}`).then(r=>r.json());

export const submitCategory = (c, answers) =>
  fetch(`${BASE}/recommendations/${c}`, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ category:c, answers })
  }).then(r=>r.json());

  export const getExplanation = (payload) =>
  fetch("http://127.0.0.1:8000/explain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(res => res.json());

