import { useState } from "react";

export default function ComparisonMode({ products, onClose }) {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const traitLabels = {
    performance: "Speed & Power",
    budget: "Price Sensitivity",
    brand: "Brand Trust",
    simplicity: "Ease of Use",
    longevity: "Built to Last"
  };

  const toggleProduct = (product) => {
    if (selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    } else {
      if (selectedProducts.length < 3) {
        setSelectedProducts([...selectedProducts, product]);
      }
    }
  };

  const isSelected = (product) => selectedProducts.find(p => p.id === product.id);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Compare Products</h2>
            <p className="text-slate-400">
              Select up to 3 products to compare ({selectedProducts.length}/3 selected)
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
          >
            Close Comparison
          </button>
        </div>

        {/* Product Selection Grid */}
        {selectedProducts.length < 3 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">
              Available Products
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => toggleProduct(product)}
                  disabled={selectedProducts.length >= 3 && !isSelected(product)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    isSelected(product)
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  } ${selectedProducts.length >= 3 && !isSelected(product) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-bold text-sm text-white">{product.name}</p>
                    {isSelected(product) && (
                      <span className="text-indigo-400 text-xl">✓</span>
                    )}
                  </div>
                  <p className="text-indigo-400 font-mono text-xs font-bold">
                    ₹{product.price?.toLocaleString()}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {selectedProducts.length > 0 && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 overflow-x-auto">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
              Side-by-Side Comparison
            </h3>
            
            <div className="grid gap-6" style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}>
              {/* Header Row - Product Names */}
              <div className="font-bold text-slate-500 text-xs uppercase tracking-wider">Product</div>
              {selectedProducts.map((product) => (
                <div key={product.id} className="relative">
                  <button
                    onClick={() => toggleProduct(product)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full text-white text-xs font-bold transition-all"
                  >
                    ×
                  </button>
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                    <p className="font-bold text-white text-sm mb-1">{product.name}</p>
                    <p className="text-indigo-400 font-mono text-xs font-bold">
                      ₹{product.price?.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              {/* Price Row */}
              <div className="text-slate-400 text-sm py-4 border-t border-slate-700">Price</div>
              {selectedProducts.map((product) => (
                <div key={product.id} className="py-4 border-t border-slate-700">
                  <p className="text-white font-mono font-bold">
                    ₹{product.price?.toLocaleString()}
                  </p>
                </div>
              ))}

              {/* Confidence Row */}
              <div className="text-slate-400 text-sm py-4 border-t border-slate-700">Match Quality</div>
              {selectedProducts.map((product) => (
                <div key={product.id} className="py-4 border-t border-slate-700">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    product.confidence === 'High Match' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {product.confidence || 'Balanced Fit'}
                  </span>
                </div>
              ))}

              {/* Technical Specs Rows */}
              {selectedProducts[0]?.specs && Object.keys(selectedProducts[0].specs || {}).map((trait) => (
                <>
                  <div key={trait} className="text-slate-400 text-sm py-4 border-t border-slate-700">
                    {traitLabels[trait] || trait}
                  </div>
                  {selectedProducts.map((product) => (
                    <div key={`${product.id}-${trait}`} className="py-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex-grow">
                          <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-500 transition-all duration-500"
                              style={{ width: `${(product.specs?.[trait] || 0) * 100}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-indigo-400 font-mono text-xs font-bold min-w-[40px] text-right">
                          {Math.round((product.specs?.[trait] || 0) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              ))}

              {/* Key Feature Row */}
              <div className="text-slate-400 text-sm py-4 border-t border-slate-700">Key Feature</div>
              {selectedProducts.map((product) => (
                <div key={product.id} className="py-4 border-t border-slate-700">
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {product.top_feature || 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedProducts.length === 0 && (
          <div className="text-center py-20 border border-dashed border-slate-700 rounded-2xl">
            <p className="text-slate-500">Select products above to start comparing</p>
          </div>
        )}
      </div>
    </div>
  );
}