import { useEffect, useState } from "react";
import { getExplanation } from "../api";

export default function Results({ category, results, profile, onRestart }) {
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Move labels inside the component or to the top level correctly
  const traitLabels = {
    performance: "Speed & Power",
    budget: "Price Sensitivity",
    brand: "Brand Trust",
    simplicity: "Ease of Use",
    longevity: "Built to Last" 
  };

  useEffect(() => {
    if (!results || results.length === 0 || !profile) return;

    let isMounted = true;
    setLoading(true);

    // Results.jsx useEffect call
    const requestData = {
      category: category,
      dominant_traits: profile, // Must be the object like { performance: 0.9, budget: 0.2 ... }
      recommended_products: results.map(p => ({
        name: p.name,
        price: p.price,
        top_feature: p.top_feature // Passing this is crucial for unique AI output
      }))
    };

    getExplanation(requestData)
      .then(res => {
        if (isMounted) {
          setExplanation(res.explanation);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setExplanation("Based on your unique profile, this selection balances technical excellence with your specific value requirements.");
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [category, profile, results]);

  const TraitScale = ({ label, value }) => (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-[10px] uppercase tracking-tighter text-slate-400">
        <span>{label}</span>
        <span>{Math.round(value * 100)}%</span>
      </div>
      <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-500 transition-all duration-1000" 
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );

  const profileTraits = profile || {};
  const numericTraits = Object.entries(profileTraits).filter(([_, score]) => typeof score === 'number');

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <header className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-white tracking-tight">Your Matches</h2>
        <p className="text-slate-400 mt-2">Personalized recommendations based on your decision-making DNA.</p>
      </header>

      {/* Trait Analysis Visualization */}
      {numericTraits.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 shadow-inner">
          {numericTraits.map(([traitName, score]) => (
            <TraitScale 
                key={traitName} 
                label={traitLabels[traitName] || traitName} 
                value={score} 
            />
          ))}
        </div>
      )}
      {/* Top Result Card */}
      <div className="bg-slate-900 rounded-[14px] p-8">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex gap-2 mb-4">
              <span className="px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
                Best Psychological Fit
              </span>
              {/* New Confidence Label */}
              <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
                results[0].confidence === 'High Match' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
              }`}>
                {results[0].confidence}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white tracking-tight">
              {results[0].name}
            </h3>
          </div>
          <div className="text-2xl font-mono font-bold text-white bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
            ₹{results[0].price}
          </div>
        </div>
      </div>
      {/* AI Explanation Card */}
    <div className="mt-8 p-8 rounded-2xl bg-slate-800/40 border border-slate-700 backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex space-x-1">
            <div className={`h-1.5 w-1.5 rounded-full bg-indigo-500 ${loading ? 'animate-bounce' : ''}`}></div>
            <div className={`h-1.5 w-1.5 rounded-full bg-indigo-500 ${loading ? 'animate-bounce [animation-delay:-0.15s]' : ''}`}></div>
            <div className={`h-1.5 w-1.5 rounded-full bg-indigo-500 ${loading ? 'animate-bounce [animation-delay:-0.3s]' : ''}`}></div>
          </div>
          <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400">AI Psychometric Insight</h4>
        </div>
        <span className="text-[10px] text-slate-500 font-mono uppercase">Analysis Version 1.5</span>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          <div className="h-4 bg-slate-700/50 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-slate-700/50 rounded w-11/12 animate-pulse"></div>
          <div className="h-4 bg-slate-700/50 rounded w-4/5 animate-pulse"></div>
          <div className="h-4 bg-slate-700/50 rounded w-3/4 animate-pulse"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-slate-200 font-serif italic">
            {explanation}
          </p>
          <div className="pt-4 border-t border-slate-700/50">
            <p className="text-[11px] text-slate-500 leading-tight">
              *This analysis cross-references your inferred decision drivers with the engineering priorities of {results[0]?.name}.
            </p>
          </div>
        </div>
      )}
    </div>
      {/* Secondary Results */}
      {results?.length > 1 && (
        <div className="mt-12">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-4">
            <span>Alternative Considerations</span>
            <div className="h-px bg-slate-800 flex-grow"></div>
          </h4>
          <div className="grid gap-4">
            {results.slice(1).map(r => (
              <div key={r.id} className="flex justify-between items-center p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800 transition-all">
                <span className="font-bold text-slate-300">{r.name}</span>
                <span className="font-mono text-indigo-400 font-bold">₹{r.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button 
        onClick={onRestart} 
        className="mt-16 w-full py-5 rounded-xl bg-slate-800 hover:bg-white hover:text-black text-white font-bold transition-all duration-300 border border-slate-700 shadow-lg"
      >
        Start New Analysis
      </button>
    </div>
  );
}
