export default function Hero({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      
      {/* NAV */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">ClariBuy</h1>
        <button
          onClick={onStart}
          className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition"
        >
          Get Started
        </button>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-extrabold leading-tight mb-6">
          Buy Smarter.<br />Not Harder.
        </h2>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
          ClariBuy helps you choose the right product based on how <span className="text-white font-semibold">you think</span>,
          not just specs and fake reviews.
        </p>

        <button
          onClick={onStart}
          className="px-8 py-4 text-lg bg-indigo-500 rounded-lg hover:bg-indigo-600 transition"
        >
          Take the Quiz
        </button>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-slate-800 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">Answer Simple Questions</h3>
          <p className="text-gray-400">
            No technical jargon. Just real-life choices that reflect how you decide.
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">Get Personalized Matches</h3>
          <p className="text-gray-400">
            We translate your preferences into meaningful recommendations.
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">Refine If Needed</h3>
          <p className="text-gray-400">
            Want better results for a specific category? Dive deeper anytime.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h3 className="text-3xl font-bold mb-8">Supported Categories</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {["PC", "TV", "Laptop", "Phone", "Headphones"].map(cat => (
            <span
              key={cat}
              className="px-6 py-2 bg-slate-700 rounded-full text-gray-200"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="py-12 text-center border-t border-slate-700">
        <p className="text-gray-400 mb-4">
          Make confident buying decisions.
        </p>
        <button
          onClick={onStart}
          className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition"
        >
          Start Now
        </button>
      </footer>
    </div>
  );
}
