import { useEffect, useState } from "react";
import { getOverview } from "../api";
import ComparisonMode from "../components/ComparisonMode";
import { exportBuyerReport } from "../utils/exportPDF";

export default function Overview({ onSelect, profile }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeSpec, setActiveSpec] = useState(null);
  const [compareCategory, setCompareCategory] = useState(null);

  const categoryLabels = {
    pc: "Laptops & Computers",
    tv: "Smart Televisions",
    phone: "Mobile Devices",
    headphone: "Audio & Headphones"
  };

  const categoryButtonLabels = {
    pc: "Laptop",
    tv: "TV",
    phone: "Phone",
    headphone: "Headphone"
  };

  const traitLabels = {
    performance: "Speed & Power",
    budget: "Price Sensitivity",
    brand: "Brand Trust",
    simplicity: "Ease of Use",
    longevity: "Built to Last" 
  };

  useEffect(() => {
    setLoading(true);
    getOverview()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch overview:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-indigo-400 animate-pulse font-mono tracking-widest uppercase">
          Mapping your buying DNA...
        </div>
      </div>
    );
  }

  if (compareCategory) {
    return (
      <ComparisonMode 
        products={data[compareCategory]?.items || []} 
        onClose={() => setCompareCategory(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight mb-2">
            Your Top Matches
          </h2>
          <p className="text-slate-400">
            Initial recommendations based on your psychometric profile. Select a category to refine further.
          </p>
        </header>

        {Object.keys(data).length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-700 rounded-2xl">
            <p className="text-slate-500 italic">No products matched your criteria. Try adjusting your preferences.</p>
          </div>
        ) : (
          Object.keys(data).map((cat) => (
            <div
              key={cat}
              className="mb-10 p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm"
            >
              <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                <h3 className="text-2xl font-bold">
                  {categoryLabels[cat] || cat}
                </h3>

                <div className="flex gap-3">
                  {data[cat]?.items?.length > 1 && (
                    <button
                      onClick={() => setCompareCategory(cat)}
                      className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold transition-all duration-300 flex items-center gap-2 text-sm"
                    >
                      <span>⚖️</span>
                      <span>Compare</span>
                    </button>
                  )}
                  <button
                    onClick={() => onSelect(cat)}
                    className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-white hover:text-black font-bold transition-all duration-300 shadow-lg shadow-indigo-900/20"
                  >
                    Refine {categoryButtonLabels[cat] || cat} Fit
                  </button>
                </div>
              </div>

              {/* AI Categorical Insight */}
              {data[cat]?.insight && (
                <div className="mb-6 p-4 rounded-lg bg-indigo-500/5 border-l-4 border-indigo-500">
                  <p className="text-sm text-indigo-200 italic font-serif leading-relaxed">
                    "{data[cat].insight}"
                  </p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                {data[cat]?.items?.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setActiveSpec(item)}
                    className="p-5 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500/50 transition-all cursor-pointer group"
                  >
                    <p className="font-bold text-slate-200 group-hover:text-white mb-3">{item?.name}</p>
                    
                    {/* Technical Specs Preview */}
                    {item.specs && (
                      <div className="space-y-2 mb-4">
                        {Object.entries(item.specs).slice(0, 3).map(([trait, value]) => (
                          <div key={trait}>
                            <div className="flex justify-between text-[9px] uppercase text-slate-500 mb-0.5">
                              <span>{traitLabels[trait] || trait}</span>
                              <span className="font-mono text-indigo-500 font-bold">{Math.round(value * 100)}%</span>
                            </div>
                            <div className="h-0.5 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-indigo-500 transition-all duration-500" 
                                style={{ width: `${value * 100}%` }} 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-800">
                      <p className="text-indigo-400 font-mono font-bold">
                        ₹{item?.price?.toLocaleString()}
                      </p>
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold group-hover:text-slate-400">
                        {item?.confidence || "Balanced Fit"}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-2 uppercase tracking-wider group-hover:text-slate-500">
                      Click for full breakdown
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Spec Modal */}
      {activeSpec && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-6"
          onClick={() => setActiveSpec(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveSpec(null)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl leading-none"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-2 text-white">{activeSpec.name}</h3>
            <p className="text-sm text-slate-400 mb-6">Product Psychometric Profile</p>
            <div className="space-y-4">
              {activeSpec.specs && Object.entries(activeSpec.specs).map(([trait, value]) => (
                <div key={trait}>
                  <div className="flex justify-between text-xs uppercase text-slate-400 mb-1.5">
                    <span>{traitLabels[trait] || trait}</span>
                    <span className="font-mono text-indigo-400 font-bold">{Math.round(value * 100)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 transition-all duration-500" 
                      style={{ width: `${value * 100}%` }} 
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
            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Price</span>
                <span className="text-2xl font-mono font-bold text-white">₹{activeSpec.price?.toLocaleString()}</span>
              </div>
            </div>
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
        
        <button onClick={() => window.location.reload()} className="text-slate-500 hover:text-white text-sm">
          Take Test Again
        </button>
      </div>
    </div>
  );
}