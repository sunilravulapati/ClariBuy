import { useEffect, useState } from "react";
import { getOverview } from "../api";

export default function Overview({ onSelect }) {
  const [data, setData] = useState({});

  useEffect(() => {
    getOverview().then(setData);
  }, []);

  return (
  <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
    <div className="max-w-4xl mx-auto">

      <h2 className="text-3xl font-bold mb-8">
        Your Top Matches by Category
      </h2>

      {Object.keys(data).map(cat => (
        <div
          key={cat}
          className="mb-8 p-6 rounded-xl bg-slate-800 border border-slate-700"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold capitalize">
              {cat}
            </h3>

            <button
              onClick={() => onSelect(cat)}
              className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 transition"
            >
              Refine
            </button>
          </div>

          <div className="grid gap-3">
            {data[cat].slice(0, 2).map(item => (
              <div
                key={item.id}
                className="p-3 rounded bg-slate-900 border border-slate-700"
              >
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-400">
                  ₹{item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  </div>
);

}
