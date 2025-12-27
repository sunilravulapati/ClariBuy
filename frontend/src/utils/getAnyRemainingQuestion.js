export function getAnyRemainingQuestion(questionPool, askedQuestions) {
  for (const dim in questionPool) {
    const q = questionPool[dim].find(
      question => !askedQuestions.has(question.id)
    );
    if (q) return q;
  }
  return null;
}
