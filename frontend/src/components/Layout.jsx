import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Layout({
  children,
  user,
  onBack,
  showBack,
  onStartHero,
}) {
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-800/50 bg-[#0a0f1c]/80 backdrop-blur-md sticky top-0 z-50">
        {/* Logo */}
        <h1
          onClick={() => window.location.assign("/")}
          className="text-2xl font-bold cursor-pointer hover:text-indigo-400 transition tracking-tight"
        >
          ClariBuy<span className="text-indigo-500">.</span>
        </h1>

        <div className="flex items-center gap-4">
          {/* Back Button */}
          {showBack && (
            <button
              onClick={onBack}
              className="text-sm text-gray-400 hover:text-white transition"
            >
              ← Back
            </button>
          )}

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">
                {user.email || "Signed in"}
              </span>

              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full border border-indigo-500"
                />
              )}

              <button
                onClick={handleLogout}
                className="text-xs text-red-400 hover:text-red-300 hover:underline transition"
              >
                Logout
              </button>
            </div>
          ) : !showBack && onStartHero ? (
            <button
              onClick={onStartHero}
              className="px-4 py-1.5 bg-white text-black text-sm font-medium rounded hover:bg-gray-200 transition"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-500 transition"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-6">{children}</main>
    </div>
  );
}
