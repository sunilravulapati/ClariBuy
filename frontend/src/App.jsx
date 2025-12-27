import { useState } from "react";
import Hero from "./pages/Hero";
import CoreQuiz from "./pages/CoreQuiz";
import Overview from "./pages/Overview";
import CategoryQuiz from "./pages/CategoryQuiz";
import Results from "./pages/Results";
import Layout from "./components/Layout";
import "./index.css";

function App() {
  const [step, setStep] = useState("hero");
  const [category, setCategory] = useState(null);
  const [results, setResults] = useState([]);
  const [coreProfile, setCoreProfile] = useState(null);
  const [history, setHistory] = useState([]);

  // ---------- Navigation helpers ----------
  function goTo(nextStep) {
    setHistory(prev => [...prev, step]);
    setStep(nextStep);
  }

  function goBack() {
    setHistory(prev => {
      const copy = [...prev];
      const last = copy.pop();
      setStep(last || "hero");
      return copy;
    });
  }

  // ---------- Pages ----------
  if (step === "hero") {
    return (
      <Layout showBack={false}>
        <Hero onStart={() => goTo("core")} />
      </Layout>
    );
  }

  if (step === "core") {
    return (
      <Layout showBack onBack={goBack}>
        <CoreQuiz
          onDone={(profile) => {
            setCoreProfile(profile);
            goTo("overview");
          }}
        />
      </Layout>
    );
  }

  if (step === "overview") {
    return (
      <Layout showBack onBack={goBack}>
        <Overview
          onSelect={(cat) => {
            setCategory(cat);
            goTo("category");
          }}
        />
      </Layout>
    );
  }

  if (step === "category") {
    return (
      <Layout showBack onBack={goBack}>
        <CategoryQuiz
          category={category}
          onDone={(res) => {
            setResults(res);
            goTo("results");
          }}
        />
      </Layout>
    );
  }

  if (step === "results") {
    return (
      <Layout showBack onBack={goBack}>
        <Results
          category={category}
          results={results}
          profile={coreProfile}
          onRestart={() => {
            setHistory([]);
            setStep("hero");
          }}
        />
      </Layout>
    );
  }

  return null;
}

export default App;
