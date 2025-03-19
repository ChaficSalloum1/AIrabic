// data/exercises.ts
import React from 'react'; // Need to import React when using JSX
import { Exercise } from '../lib/types';
import { MultipleChoice } from '../components/exercises/MultipleChoice';
import { FillBlank } from '../components/exercises/FillBlank';
import { SentenceArrangement } from '../components/exercises/SentenceArrangement';

export type ExerciseType = 'recognition' | 'fillBlank' | 'arrangement' | 'construction';

// Your Exercise interface should be imported from lib/types, not redefined here
// If you need to define it here, make sure it doesn't conflict with the imported one

export const exercises: Exercise[] = [
  // Lesson 1: Basic Sentence Structure
  {
    id: "1.1",
    lessonId: "1",
    type: "recognition",
    title: "Word Order",
    prompt: "Which sentence follows Lebanese Arabic word order?",
    options: [
      "أنا بحب القهوة (I love coffee)",
      "القهوة أنا بحب (Coffee I love)",
      "بحب أنا القهوة (Love I coffee)"
    ],
    answer: "أنا بحب القهوة (I love coffee)",
    order: 1
  },
  {
    id: "1.2",
    lessonId: "1",
    type: "fillBlank",
    title: "Complete the Sentence",
    prompt: "___ بحب القهوة",
    options: ["أنا", "إنت", "هي"],
    answer: "أنا",
    hint: "Which word means 'I'?",
    order: 2
  },
  {
    id: "1.3",
    lessonId: "1",
    type: "arrangement",
    title: "Arrange the Sentence",
    prompt: "Arrange these words to form 'I drink coffee'",
    options: ["القهوة", "أنا", "بشرب"],
    answer: "أنا بشرب القهوة",
    order: 3
  },
  // Lesson 2 Exercises
  {
    id: "2.1",
    lessonId: "2",
    type: "recognition",
    title: "Identify Present Tense",
    prompt: "Which word shows the 'b-' prefix for present tense?",
    options: [
      "بكتب (I write)",
      "كتبت (I wrote)",
      "كتاب (book)"
    ],
    answer: "بكتب (I write)",
    order: 1
  },
  // Lesson 3 Exercises
  {
    id: "3.1",
    lessonId: "3",
    type: "recognition",
    title: "Identify Negation",
    prompt: "Which sentence uses the ma...š negation?",
    options: [
      "ما بحبش (I don't love)",
      "بحب (I love)",
      "حب (love)"
    ],
    answer: "ما بحبش (I don't love)",
    order: 1
  }
];

export const getExercisesByLessonId = (lessonId: string): Exercise[] => {
  return exercises
    .filter(exercise => exercise.lessonId === lessonId)
    .sort((a, b) => a.order - b.order);
};

export const getExerciseById = (id: string): Exercise | undefined => {
  return exercises.find(exercise => exercise.id === id);
};