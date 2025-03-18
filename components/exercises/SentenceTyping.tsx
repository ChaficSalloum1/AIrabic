
import React, { useState, useRef, useEffect } from 'react';
import styles from './Exercise.module.css';

interface SentenceTypingProps {
  prompt: string;
  answer: string;
  hint?: string;
  onCorrect: () => void;
}

export const SentenceTyping: React.FC<SentenceTypingProps> = ({
  prompt,
  answer,
  hint,
  onCorrect,
}) => {
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === answer.trim()) {
      setIsCorrect(true);
      onCorrect();
    } else {
      setAttempts(prev => prev + 1);
      if (attempts + 1 >= 2 && hint) {
        setShowHint(true);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h3 className="text-lg font-semibold mb-4 text-right">{prompt}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`w-full p-4 text-xl text-right rounded border ${
            isCorrect ? 'border-green-500 bg-green-50' : 'border-gray-300'
          }`}
          dir="rtl"
          placeholder="Type your answer here..."
        />
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Check Answer
        </button>
      </form>
      {showHint && hint && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-yellow-800">💡 Hint: {hint}</p>
        </div>
      )}
    </div>
  );
};
