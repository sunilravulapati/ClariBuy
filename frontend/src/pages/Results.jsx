import { useEffect, useState } from "react";
import { getExplanation } from "../api";

export default function Results({ category, results, profile, onRestart }) {
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Prevents state updates if component unmounts
    setLoading(true);

    getExplanation({
      category,
      dominant_traits: profile,
      decision_style: "Performance-focused but value-aware",
      questions_answered: 5,
      recommended_products: results.map(p => ({
        name: p.name,
        price: p.price,
        key_strength: "Strong match"
      }))
    })
      .then(res => {
        if (isMounted) {
          setExplanation(res.explanation);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setExplanation("Could not generate explanation at this time.");
          setLoading(false);
        }
      });

    return () => { isMounted = false; }; 
    // Dependency array updated to include props used inside effect
  }, [category, profile, results]); 

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Recommended for you</h2>

      {results.length === 0 ? (
        <p className="text-gray-400">
          No recommendations available. Please try again.
        </p>
      ) : (
        <ul className="space-y-2">
          {results.map(r => (
            <li key={r.id} className="border-b border-gray-700 pb-2">
              <span className="font-semibold">{r.name}</span> – ₹{r.price}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 p-4 bg-slate-800 rounded text-gray-300 italic">
        {loading ? "Generating explanation..." : explanation}
      </div>

      <button 
        onClick={onRestart}
        className="mt-6 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        Start Over
      </button>
    </div>
  );
}