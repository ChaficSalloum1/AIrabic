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

    // Check if complete
    const newSelected = [...selectedWords, word];
    if (newSelected.length === words.length) {
      if (newSelected.join(" ") === correctAnswer) {
        setIsCorrect(true);
        onCorrect();
      }
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
  const checkAnswer = () => {
    if (selectedWords.length !== words.length) return;

    const isAnswerCorrect = selectedWords.join(" ") === correctAnswer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      onCorrect();
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

  // Fallback styles if CSS modules aren't working
  const containerStyle = {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
  };

  const instructionStyle = {
    fontSize: "1.125rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    textAlign: "right" as const,
  };

  const selectedAreaStyle = {
    border: "2px solid #e2e8f0",
    borderRadius: "0.5rem",
    padding: "1rem",
    marginBottom: "1rem",
    minHeight: "4rem",
    backgroundColor: "white",
  };

  const wordsAreaStyle = {
    border: "1px solid #e2e8f0",
    borderRadius: "0.5rem",
    padding: "1rem",
    backgroundColor: "#f8fafc",
  };

  const flexWrapStyle = {
    display: "flex",
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: "0.5rem",
  };

  const wordStyle = {
    display: "inline-block",
    padding: "0.5rem 1rem",
    margin: "0.25rem",
    fontSize: "1.125rem",
    fontWeight: "500",
    backgroundColor: "white",
    border: "2px solid #d1d5db",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
    cursor: "pointer",
  };

  const selectedWordStyle = {
    ...wordStyle,
    border: isCorrect ? "2px solid #10b981" : "2px solid #60a5fa",
    backgroundColor: isCorrect ? "#d1fae5" : "white",
    color: isCorrect ? "#065f46" : "inherit",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    marginTop: "1rem",
  };

  const checkButtonStyle = {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    fontWeight: "bold",
    backgroundColor: isCorrect
      ? "#10b981"
      : selectedWords.length === words.length
      ? "#3b82f6"
      : "#d1d5db",
    color:
      isCorrect || selectedWords.length === words.length
        ? "white"
        : "#6b7280",
    borderRadius: "0.5rem",