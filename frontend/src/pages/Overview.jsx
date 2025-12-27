import { useEffect, useState } from "react";
import { getOverview } from "../api";

export default function Overview({ onSelect }) {
  const [data, setData] = useState({});

  useEffect(() => {
    getOverview().then(setData);
  }, []);

  return (
    <div>
      <h2>Recommendations</h2>

      {Object.keys(data).map(cat => (
        <div key={cat} style={{ marginBottom: "20px" }}>
          <h3>{cat.toUpperCase()}</h3>

          <ul>
            {data[cat].map(item => (
              <li key={item.id}>
                <b>{item.name}</b> – ₹{item.price}  
                <span style={{ marginLeft: "10px", color: "gray" }}>
                  (score {item.score})
                </span>
              </li>
            ))}
          </ul>

          <button onClick={() => onSelect(cat)}>
            Refine {cat.toUpperCase()}
          </button>
        </div>
      ))}
    </div>
  );
}
