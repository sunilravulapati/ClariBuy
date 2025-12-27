import { useEffect, useState } from "react";

const INITIAL_PROFILE = {
  performance: 0, 
  budget: 0, 
  brand: 0, 
  simplicity: 0, 
  longevity: 0
};

export default function CoreQuiz({ onDone }) {
  const [questions, setQuestions] = useState([]);
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/questions/core")
      .then(res => {
        if (!res.ok) throw new Error('Failed to load questions');
        return res.json();
      })
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load core questions", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  function handleAnswer(weights) {
    // Accumulate weights from this answer
    const updatedProfile = { ...profile };
    for (const key in weights) {
      updatedProfile[key] = (updatedProfile[key] || 0) + weights[key];
    }
    
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < questions.length) {
      // Move to next question
      setProfile(updatedProfile);
      setCurrentIndex(nextIndex);
    } else {
      // Quiz complete - normalize profile to 0-1 scale
      const normalized = {};
      const maxPossible = 2.0; // Adjust based on your weight ranges
      
      for (const key in updatedProfile) {
        normalized[key] = Math.min(1, Math.max(0, updatedProfile[key] / maxPossible));
      }
      
      console.log('Final Profile:', normalized);
      onDone(normalized);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="text-indigo-400 animate-pulse font-mono tracking-widest uppercase mb-4">
            Loading your psychometric assessment...
          </div>
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">⚠️ Failed to load quiz</div>
          <p className="text-slate-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-400">
        No questions available
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Psychometric Assessment
          </h1>
          <p className="text-slate-400">
            Help us understand your tech buying preferences
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400 font-medium">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-mono text-indigo-400 font-bold">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-8 backdrop-blur-sm shadow-2xl">
          <div className="mb-8">
            <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Preference Assessment
            </div>
            <h2 className="text-2xl font-bold leading-relaxed text-white">
              {currentQ.text}
            </h2>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.weights)}
                className="w-full p-5 rounded-xl text-left transition-all duration-200 border-2 bg-slate-900/50 border-slate-700 text-slate-300 hover:border-indigo-500 hover:bg-slate-800/80 hover:text-white group active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-600 group-hover:border-indigo-500 flex items-center justify-center transition-all">
                    <div className="w-0 h-0 rounded-full bg-indigo-500 group-hover:w-3 group-hover:h-3 transition-all"></div>
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
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'bg-indigo-500 w-8'
                  : idx < currentIndex
                  ? 'bg-green-500 w-2'
                  : 'bg-slate-700 w-2'
              }`}
              title={
                idx === currentIndex 
                  ? 'Current' 
                  : idx < currentIndex 
                  ? 'Completed' 
                  : 'Upcoming'
              }
            />
          ))}
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>Select the option that best describes your preference</p>
        </div>
      </div>
    </div>
  );
}