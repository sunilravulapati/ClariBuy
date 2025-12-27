import { useState } from "react";
import Hero from "./pages/Hero";
import CoreQuiz from "./pages/CoreQuiz";
import Overview from "./pages/Overview";
import CategoryQuiz from "./pages/CategoryQuiz";
import Results from "./pages/Results";
import "./index.css";

function App() {
  const [step, setStep] = useState("hero");
  const [category, setCategory] = useState(null);
  const [results, setResults] = useState([]);
  const [coreProfile, setCoreProfile] = useState(null);


  if (step === "hero")
    return <Hero onStart={() => setStep("core")} />;


  if (step === "core")
    return (
      <CoreQuiz
        onDone={(profile) => {
          setCoreProfile(profile);
          setStep("overview");
        }}
      />
    );


  if (step === "overview")
    return (
      <Overview
        onSelect={cat => {
          setCategory(cat);
          setStep("category");
        }}
      />
    );

  if (step === "category")
    return (
      <CategoryQuiz
        category={category}
        onDone={res => {
          setResults(res);
          setStep("results");
        }}
      />
    );

  if (step === "results")
    return (
      <Results
        category={category}
        results={results}
        onRestart={() => setStep("hero")}
      />
    );

  return null;
}

export default App;
