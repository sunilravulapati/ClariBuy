import { useEffect, useState } from "react";

export default function CategoryQuiz({ category, onDone }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accumulatedWeights, setAccumulatedWeights] = useState({
    performance: 0, budget: 0, brand: 0, simplicity: 0, longevity: 0
  });
  const [loading, setLoading] = useState(true);

  const categoryLabels = {
    pc: "Laptops",
    tv: "Televisions",
    phone: "Smartphones",
    headphone: "Headphones"
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/questions/category/${category}`)
      .then(res => res.json())
      .then(qs => {
        setQuestions(qs);
        setLoading(false);
      })
      .catch(err => console.error("Failed to load category questions", err));
  }, [category]);

  function handleOptionSelect(weights) {
    const newWeights = { ...accumulatedWeights };
    for (const trait in weights) {
      newWeights[trait] = (newWeights[trait] || 0) + weights[trait];
    }
    setAccumulatedWeights(newWeights);

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      // Normalize weights to 0-1 scale
      const normalized = {};
      for (const key in newWeights) {
        normalized[key] = Math.min(1, newWeights[key]);
      }
      
      // Call the API to get recommendations
      fetch(`http://127.0.0.1:8000/recommendations/${category}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: normalized })
      })
        .then(res => res.json())
        .then(results => onDone(results, normalized))
        .catch(err => console.error("Recommendation failed", err));
    }
  }

  if (loading || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-indigo-400 animate-pulse font-mono tracking-widest uppercase">
          Loading {categoryLabels[category]} questions...
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Refining Your {categoryLabels[category]} Match</h2>
          <p className="text-slate-400">Help us understand your specific preferences</p>
        </header>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">Question {currentIndex + 1} of {questions.length}</span>
            <span className="text-sm font-mono text-indigo-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-8">
          <p className="text-2xl font-bold text-white mb-8 leading-relaxed">
            {currentQ.text}
          </p>
          
          <div className="space-y-3">
            {currentQ.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionSelect(opt.weights)}
                className="w-full p-5 rounded-xl border-2 border-slate-700 bg-slate-900/50 hover:border-indigo-500 hover:bg-slate-800 transition-all text-left text-slate-300 hover:text-white group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-600 group-hover:border-indigo-500 flex items-center justify-center transition-colors">
                    <div className="w-0 h-0 rounded-full bg-indigo-500 group-hover:w-2 group-hover:h-2 transition-all"></div>
                  </div>
                  <span className="font-medium text-lg">{opt.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Question Indicators */}
        <div className="flex justify-center gap-2">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-indigo-500 w-8'
                  : idx < currentIndex
                  ? 'bg-green-500 w-2'
                  : 'bg-slate-700 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}