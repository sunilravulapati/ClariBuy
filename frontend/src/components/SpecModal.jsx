export default function SpecModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
        
        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-indigo-400 font-mono mb-4">₹{product.price.toLocaleString()}</p>
        
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Technical DNA</h4>
          {Object.entries(product.specs).map(([trait, value]) => (
            <div key={trait} className="flex justify-between items-center text-sm">
              <span className="capitalize text-slate-300">{trait}</span>
              <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: `${value * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}