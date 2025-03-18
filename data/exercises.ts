import { Lesson } from './lessons';

export type ExerciseType = 'recognition' | 'fillBlank' | 'arrangement' | 'construction';

export interface Exercise {
  id: string;
  lessonId: string;
  type: ExerciseType;
  title: string;
  prompt: string;
  options?: string[];
  answer: string;
  hint?: string;
  order: number;
}

export const exercises: Exercise[] = [
  // Lesson 1 Exercises
  {
    id: "1.1",
    lessonId: "1",
    type: "recognition",
    title: "Choose the Correct Order",
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