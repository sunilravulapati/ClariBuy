export default function Layout({ children, onBack, showBack, onStartHero }) {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      {/* Top bar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-800/50 bg-[#0a0f1c]/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-xl font-bold tracking-tight">ClariBuy</h1>

        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={onBack}
              className="text-sm text-gray-400 hover:text-white transition"
            >
              ← Back
            </button>
          )}
          
          {/* Show 'Get Started' in Nav only if we are on Hero (no back button) */}
          {!showBack && onStartHero && (
             <button
              onClick={onStartHero}
              className="px-4 py-1.5 bg-white text-black text-sm font-medium rounded hover:bg-gray-200 transition"
            >
              Get Started
            </button>
          )}
        </div>
      </nav>

      {/* Page content */}
      <main className="px-6">
        {children}
      </main>
    </div>
  );
}