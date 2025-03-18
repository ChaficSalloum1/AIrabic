import React, { useState, useRef, useEffect } from "react";
import styles from "./Exercise.module.css";

interface SentenceTypingProps {
  prompt: string;
  answer: string;
  hint?: string;
  onCorrect: () => void;
}

const SentenceTyping: React.FC<SentenceTypingProps> = ({ prompt, answer, hint, onCorrect }) => {
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (input.trim() === answer.trim()) {
      setIsCorrect(true);
      onCorrect();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h3 className="text-lg font-semibold mb-4 text-right">{prompt}</h3>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.textInput}
        dir="rtl"
        placeholder="اكتب الجملة هنا..."
      />
      <button onClick={handleSubmit} className={styles.primaryButton}>
        {isCorrect ? "✅ Correct!" : "Check Answer"}
      </button>
      {hint && <p className={styles.hint}>💡 Hint: {hint}</p>}
    </div>
  );
};

export default SentenceTyping;
