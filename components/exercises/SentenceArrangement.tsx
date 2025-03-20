import React, { useState, useEffect } from "react";
import styles from "./Exercise.module.css";

interface SentenceArrangementProps {
  words: string[];
  correctAnswer: string;
  onCorrect: () => void;
}

export const SentenceArrangement: React.FC<SentenceArrangementProps> = ({
  words,
  correctAnswer,
  onCorrect,
}) => {
  // Available words that haven't been selected yet
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  // Words that have been selected by the user in their current order
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  // Track if answer is correct
  const [isCorrect, setIsCorrect] = useState(false);

  // Initialize with shuffled words
  useEffect(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
  }, [words]);

  // Handle selecting a word
  const handleSelectWord = (word: string) => {
    if (isCorrect) return;

    // Add to selected, remove from available
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter((w) => w !== word));

    // Check if complete automatically when last word is added
    const newSelected = [...selectedWords, word];
    if (newSelected.length === words.length) {
      checkAnswer(newSelected);
    }
  };

  // Handle removing a word
  const handleRemoveWord = (index: number) => {
    if (isCorrect) return;

    const word = selectedWords[index];
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);

    setSelectedWords(newSelected);
    setAvailableWords([...availableWords, word]);
  };

  // Check the answer
  const checkAnswer = (selectedWordsToCheck = selectedWords) => {
    if (selectedWordsToCheck.length !== words.length) return;

    const isAnswerCorrect = selectedWordsToCheck.join(" ") === correctAnswer;

    if (isAnswerCorrect) {
      setIsCorrect(true);
      // Using exactly 1000ms delay like in MultipleChoice component
      setTimeout(() => {
        onCorrect();
      }, 1000);
    }
  };

  // Reset the exercise
  const resetExercise = () => {
    setAvailableWords(
      [...availableWords, ...selectedWords].sort(() => Math.random() - 0.5),
    );
    setSelectedWords([]);
    setIsCorrect(false);
  };

  return (
    <div className={styles.exercise || "exercise-container"}>
      <h3 className="text-lg font-semibold mb-2 text-right">
        :Arrange the words in the correct order
      </h3>

      {/* Selected words area */}
      <div
        className={`border-2 ${isCorrect ? 'border-green-500 bg-green-50' : 'border-gray-200'} rounded-lg p-4 mb-4 min-h-16 bg-white`}
        dir="rtl"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {selectedWords.length === 0 ? (
            <div className="text-gray-400 w-full text-center">
              Tap words below to arrange them
            </div>
          ) : (
            selectedWords.map((word, index) => (
              <div
                key={index}
                onClick={() => handleRemoveWord(index)}
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  margin: "4px",
                  fontSize: "18px",
                  fontWeight: "500",
                  backgroundColor: isCorrect ? "#22c55e" : "white",
                  color: isCorrect ? "white" : "black",
                  border: `2px solid ${isCorrect ? "#16a34a" : "#60a5fa"}`,
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                  cursor: "pointer",
                }}
              >
                {word}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Available words */}
      <div className={`border rounded-lg p-4 ${isCorrect ? 'bg-gray-50 opacity-50' : 'bg-gray-100'}`} dir="rtl">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {availableWords.map((word, index) => (
            <div
              key={index}
              onClick={() => handleSelectWord(word)}
              style={{
                display: "inline-block",
                padding: "8px 16px",
                margin: "4px",
                fontSize: "18px",
                fontWeight: "500",
                backgroundColor: "white",
                border: "2px solid #d1d5db",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                cursor: isCorrect ? "default" : "pointer",
                opacity: isCorrect ? "0.7" : "1",
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Feedback message - Using the same style as MultipleChoice */}
      {isCorrect && (
        <div className={`${styles.feedback || "mt-4 p-3 rounded"} ${styles.correct || "bg-green-100 text-green-700 border border-green-200"}`}>
          ✅ Correct!
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-center gap-2 mt-4">
        {selectedWords.length > 0 && (
          <button
            onClick={() => checkAnswer()}
            disabled={isCorrect || selectedWords.length !== words.length}
            style={{
              padding: "8px 16px",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: isCorrect
                ? "#22c55e"
                : selectedWords.length === words.length
                ? "#2563eb"
                : "#d1d5db",
              color:
                isCorrect || selectedWords.length === words.length
                  ? "white"
                  : "#6b7280",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
              cursor:
                selectedWords.length === words.length && !isCorrect
                  ? "pointer"
                  : "default",
            }}
          >
            {isCorrect ? "Correct! ✓" : "Check Answer"}
          </button>
        )}

        {selectedWords.length > 0 && !isCorrect && (
          <button
            onClick={resetExercise}
            style={{
              padding: "8px 16px",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#e5e7eb",
              color: "#4b5563",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default SentenceArrangement;