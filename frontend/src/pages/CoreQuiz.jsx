import { useState } from "react";
import QUESTION_POOL from "../data/adaptiveQuestions";
import { selectNextDimension } from "../utils/selectNextQuestion";
import { getNextQuestion } from "../utils/getNextQuestion";
import { getAnyRemainingQuestion } from "../utils/getAnyRemainingQuestion";


const INITIAL_PROFILE = {
  performance: 0,
  budget: 0,
  brand: 0,
  simplicity: 0,
  longevity: 0
};

const MAX_QUESTIONS = 5;

export default function CoreQuiz({ onDone }) {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [askedQuestions, setAskedQuestions] = useState(new Set());
  const [current, setCurrent] = useState(
    QUESTION_POOL.performance[0]
  );
  const [count, setCount] = useState(1);

  function handleAnswer(option) {
    // Update profile
    const updated = { ...profile };
    for (const key in option.weights) {
      updated[key] += option.weights[key];
    }
    setProfile(updated);

    // Mark current question as asked
    const updatedAsked = new Set(askedQuestions);
    updatedAsked.add(current.id);
    setAskedQuestions(updatedAsked);

    // Stop condition
    if (count >= MAX_QUESTIONS) {
      onDone(updated);
      return;
    }

    // Choose next dimension
    const nextDim = selectNextDimension(updated, updatedAsked);

    if (!nextDim || !QUESTION_POOL[nextDim]) {
      onDone(updated);
      return;
    }
    let nextQuestion = null;

  // Try preferred dimension first
  if (nextDim && QUESTION_POOL[nextDim]) {
    nextQuestion = getNextQuestion(
      QUESTION_POOL[nextDim],
      updatedAsked
    );
  }

  // Fallback: try ANY remaining question
  if (!nextQuestion) {
    nextQuestion = getAnyRemainingQuestion(
      QUESTION_POOL,
      updatedAsked
    );
  }

  // If still nothing left → truly done
  if (!nextQuestion) {
    onDone(updated);
    return;
  }

  setCurrent(nextQuestion);
  setCount(count + 1);
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-4">
      <div className="max-w-xl w-full">
        <p className="text-sm text-gray-400 mb-2">
          Question {count} of {MAX_QUESTIONS}
        </p>

        <h2 className="text-2xl font-semibold mb-6">
          {current.text}
        </h2>

        <div className="space-y-4">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className="w-full p-4 rounded-lg border border-slate-700 hover:bg-slate-800 transition text-left"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
