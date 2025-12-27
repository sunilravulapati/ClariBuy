export function getNextQuestion(pool, askedQuestions) {
  return pool.find(q => !askedQuestions.has(q.id)) || null;
}
