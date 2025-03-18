export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  examples: string[];
  exercises: Exercise[];
  nextLessonId?: string;
}

export interface Exercise {
  type:
    | "Recognition"
    | "FillBlank"
    | "SentenceArrangement"
    | "SentenceConstruction";
  prompt: string;
  options?: string[];
  answer: string;
  hint?: string;
}

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Basic Sentence Structure",
    description: "Learn how to form simple sentences in Lebanese Arabic",
    content: "Lebanese Arabic follows Subject-Verb-Object (SVO) order...",
    examples: ["أنا بحب القهوة - Ana bḥeb l-ahwe (I love coffee)"],
    exercises: [
      {
        type: "Recognition",
        prompt:
          "Which sentence follows the correct Lebanese Arabic word order?",
        options: ["أنا بحب القهوة", "القهوة أنا بحب", "بحب أنا القهوة"],
        answer: "أنا بحب القهوة",
      },
      {
        type: "FillBlank",
        prompt: "Complete the sentence: ___ بحب القهوة",
        options: ["أنا", "نحن", "هي"],
        answer: "أنا",
        hint: "This word means 'I' in Lebanese Arabic",
      },
      {
        type: "SentenceArrangement",
        prompt: "Arrange the words in the correct order:",
        options: ["القهوة", "بحب", "أنا"],
        answer: "أنا بحب القهوة",
      },
    ],
    nextLessonId: "2",
  },
];

export const getLessonById = (id: string): Lesson | undefined => {
  return lessons.find((lesson) => lesson.id === id);
};
