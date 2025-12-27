export default function Hero({ onStart }) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* HERO SECTION */}
      <section className="py-16 text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Buy Smarter.<br />Not Harder.
        </h2>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
          ClariBuy helps you choose the right product based on how <span className="text-white font-semibold">you think</span>,
          not just specs and fake reviews.
        </p>

        <button
          onClick={onStart}
          className="px-8 py-4 text-lg bg-indigo-500 rounded-lg hover:bg-indigo-600 transition shadow-lg shadow-indigo-500/20"
        >
          Take the Quiz
        </button>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
          <h3 className="text-xl font-semibold mb-3">Answer Simple Questions</h3>
          <p className="text-gray-400">
            No technical jargon. Just real-life choices that reflect how you decide.
          </p>
        </div>

        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
          <h3 className="text-xl font-semibold mb-3">Get Personalized Matches</h3>
          <p className="text-gray-400">
            We translate your preferences into meaningful recommendations.
          </p>
        </div>

        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
          <h3 className="text-xl font-semibold mb-3">Refine If Needed</h3>
          <p className="text-gray-400">
            Want better results for a specific category? Dive deeper anytime.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 text-center">
        <h3 className="text-2xl font-bold mb-8 text-gray-300">Supported Categories</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {["PC", "TV", "Laptop", "Phone", "Headphones"].map(cat => (
            <span
              key={cat}
              className="px-6 py-2 bg-slate-800 border border-slate-700 rounded-full text-gray-300 text-sm"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="py-20 text-center border-t border-slate-800 mt-10">
        <p className="text-gray-400 mb-6">Make confident buying decisions today.</p>
        <p className="text-sm text-gray-500">Built by Sunil Ravulapati</p>
      </footer>
    </div>
  );
}