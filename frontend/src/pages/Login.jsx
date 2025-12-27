// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNeTTsNKlxphzv1iRePt6EreSn3IHX7X8",
  authDomain: "claribuy-c65c4.firebaseapp.com",
  projectId: "claribuy-c65c4",
  storageBucket: "claribuy-c65c4.firebasestorage.app",
  messagingSenderId: "930787133188",
  appId: "1:930787133188:web:030f884b1678e23e893251",
  measurementId: "G-WBBLPYFN9D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Login({ onUserUpdate }) {
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // Send user details to parent App.jsx
      onUserUpdate(result.user);
    } catch (error) {
      console.error("Auth Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-800/50 rounded-3xl border border-slate-700">
      <h3 className="text-xl font-bold mb-4">Save Your Buying DNA</h3>
      <p className="text-slate-400 text-sm mb-6 text-center">
        Sign in to track your psychometric profile and see how you compare to other shoppers.
      </p>
      <button 
        onClick={signIn}
        className="flex items-center gap-3 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all"
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-5 h-5" alt="G" />
        Sign in with Google
      </button>
    </div>
  );
}