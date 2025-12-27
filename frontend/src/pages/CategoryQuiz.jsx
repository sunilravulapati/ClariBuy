import { useEffect, useState } from "react";
import { getCategoryQuestions, submitCategory } from "../api";

export default function CategoryQuiz({ category, onDone }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    getCategoryQuestions(category)
      .then(qs => {
        if (isMounted) {
          setQuestions(qs);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [category]);

  async function submit() {
    try {
      const res = await submitCategory(category, answers);
      onDone(res);
    } catch (error) {
      console.error("Submission failed", error);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500 mb-4"></div>
        <p className="text-gray-400">Tailoring questions for {category}...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-10">
      <header className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Refine {category.toUpperCase()}</h2>
        <p className="text-gray-400">Adjust the sliders to match your specific preferences for this category.</p>
      </header>

      <div className="space-y-6">
        {questions.map(q => (
          <div key={q.id} className="bg-slate-800/40 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium text-gray-200">{q.text}</p>
              <span className="text-indigo-400 font-mono text-sm bg-indigo-500/10 px-2 py-1 rounded">
                {(answers[q.id] || 0.5).toFixed(1)}
              </span>
            </div>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={answers[q.id] || 0.5}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              onChange={e =>
                setAnswers({ ...answers, [q.id]: parseFloat(e.target.value) })
              }
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500 uppercase tracking-widest">
              <span>Less Important</span>
              <span>Essential</span>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={submit}
        className="w-full mt-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
      >
        Show Refined Results
      </button>
    </div>
  );
}