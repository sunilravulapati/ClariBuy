import { useEffect, useState } from "react";
import { getExplanation } from "../api";
import ComparisonMode from "../components/ComparisonMode";
import { exportBuyerReport } from "../utils/exportPDF";

export default function Results({ category, results, profile, onRestart }) {
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSpec, setActiveSpec] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const traitLabels = {
    performance: "Speed & Power",
    budget: "Price Sensitivity",
    brand: "Brand Trust",
    simplicity: "Ease of Use",
    longevity: "Built to Last" 
  };

  // Enhance confidence for refined results
  const enhancedResults = results?.map((r, idx) => ({
    ...r,
    confidence: idx === 0 ? 'High Match' : (idx === 1 ? 'High Match' : r.confidence || 'Moderate Match')
  })) || [];

  useEffect(() => {
    if (!results || results.length === 0 || !profile) return;

    let isMounted = true;
    setLoading(true);

    const requestData = {
      category: category,
      dominant_traits: profile,
      recommended_products: results.map(p => ({
        name: p.name,
        price: p.price,
        top_feature: p.top_feature
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
  const normalizedProfile = (() => {
    if (!profile) return {};
    const values = Object.values(profile).filter(v => typeof v === 'number');
    const maxVal = values.length > 0 ? Math.max(...values) : 1;
    const scale = maxVal > 1 ? maxVal : 1;
    
    const normalized = {};
    for (const trait in profile) {
      normalized[trait] = profile[trait] / scale;
    }
    return normalized;
  })();

  if (showComparison) {
    return <ComparisonMode products={enhancedResults} onClose={() => setShowComparison(false)} />;
  }

  const profileTraits = profile || {};
  const numericTraits = Object.entries(profileTraits).filter(([_, score]) => typeof score === 'number');

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <header className="mb-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">Your Refined Matches</h2>
            <p className="text-slate-400 mt-2">Refined recommendations based on your decision-making DNA.</p>
          </div>
          {results?.length > 1 && (
            <button
              onClick={() => setShowComparison(true)}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-900/20 flex items-center gap-2 justify-center"
            >
              <span>⚖️</span>
              <span>Compare All</span>
            </button>
          )}
        </div>
      </header>

      {/* Top Result Card - NOW WITH SPECS */}
      <div 
        onClick={() => setActiveSpec(results[0])}
        className="bg-slate-900 rounded-[14px] p-8 cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all group"
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="flex gap-2 mb-4">
              <span className="px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
                Best Psychological Fit
              </span>
              <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
                results[0].confidence === 'High Match' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
              }`}>
                {results[0].confidence}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
              {results[0].name}
            </h3>
            <p className="text-xs text-slate-500 mt-2 uppercase tracking-wider group-hover:text-slate-400">Click to view technical specs</p>
          </div>
          <div className="text-2xl font-mono font-bold text-white bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
            ₹{results[0].price?.toLocaleString()}
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
                *This analysis cross-references your inferred decision drivers with the engineering priorities of {enhancedResults[0]?.name}.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Secondary Results - WITH SPECS PREVIEW */}
                {results?.length > 1 && (
        <div className="mt-12">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-4">
            <span>Alternative Considerations</span>
            <div className="h-px bg-slate-800 flex-grow"></div>
          </h4>
          <div className="grid gap-4">
            {enhancedResults.slice(1).map(r => (
              <div 
                key={r.id}
                onClick={() => setActiveSpec(r)}
                className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800 transition-all group cursor-pointer"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-slate-300 group-hover:text-white">{r.name}</span>
                  <span className="font-mono text-indigo-400 font-bold">₹{r.price?.toLocaleString()}</span>
                </div>
                
                {/* Compact Specs Preview */}
                {r.specs && (
                  <div className="space-y-2 mt-3">
                    {Object.entries(r.specs).slice(0, 3).map(([trait, val]) => (
                      <div key={trait}>
                        <div className="flex justify-between text-[9px] uppercase text-slate-500 mb-0.5">
                          <span>{traitLabels[trait] || trait}</span>
                          <span className="font-mono text-indigo-500 font-bold">{Math.round(val * 100)}%</span>
                        </div>
                        <div className="h-0.5 w-full bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 transition-all duration-1000" 
                            style={{ width: `${val * 100}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <p className="text-[10px] text-slate-600 mt-3 uppercase tracking-wider group-hover:text-slate-500">
                  Click for full breakdown
                </p>
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

      {/* Spec Modal */}
      {activeSpec && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setActiveSpec(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveSpec(null)} 
              className="absolute top-5 right-5 text-slate-500 hover:text-white transition text-2xl leading-none"
            >
              ✕
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-1">{activeSpec.name}</h3>
            <p className="text-indigo-400 font-mono font-bold mb-6 text-lg">₹{activeSpec.price?.toLocaleString()}</p>
            
            <div className="space-y-5">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-2">Technical DNA</h4>
              {activeSpec.specs && Object.entries(activeSpec.specs).map(([trait, val]) => (
                <div key={trait}>
                  <div className="flex justify-between text-[10px] uppercase text-slate-400 mb-1">
                    <span>{traitLabels[trait] || trait}</span>
                    <span className="font-mono text-indigo-400 font-bold">{Math.round(val * 100)}%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 transition-all duration-1000" 
                      style={{ width: `${val * 100}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>

            {activeSpec.top_feature && (
              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Key Feature</p>
                <p className="text-sm text-slate-300 leading-relaxed">{activeSpec.top_feature}</p>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="mt-10 flex flex-col gap-4">
        <button 
          onClick={() => exportBuyerReport(results[0], explanation, profile)}
          className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 border border-slate-700 transition-all"
        >
          <span>📄</span> Download Buyer Persona Report
        </button>
        
        <button onClick={onRestart} className="text-slate-500 hover:text-white text-sm">
          Take Test Again
        </button>
      </div>
    </div>
  );
}