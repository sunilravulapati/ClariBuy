import { useEffect, useState } from "react";
import { getCategoryQuestions, submitCategory } from "../api";

export default function CategoryQuiz({ category, onDone }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategoryQuestions(category).then(qs => {
      setQuestions(qs);
      setLoading(false);
    });
  }, [category]);

  async function submit() {
    const res = await submitCategory(category, answers);
    onDone(res);
  }

  if (loading) return <p>Loading questions...</p>;

  return (
    <div>
      <h2>Refine recommendations for {category.toUpperCase()}</h2>

      {questions.map(q => (
        <div key={q.id} style={{ marginBottom: "16px" }}>
          <p>{q.text}</p>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            onChange={e =>
              setAnswers({ ...answers, [q.id]: +e.target.value })
            }
          />
        </div>
      ))}

      <button onClick={submit}>
        Show refined results
      </button>
    </div>
  );
}
