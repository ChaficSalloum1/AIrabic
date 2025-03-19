import { Exercise, getExercisesByLessonId } from './exercises';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
  examples: string[];
  nextLessonId?: string;
  exercises: Exercise[];
}

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Basic Sentence Structure",
    description: "Learn the fundamental word order in Lebanese Arabic sentences",
    content: `In Lebanese Arabic, sentences typically follow Subject-Verb-Object (SVO) order, similar to English. This makes it easier for English speakers to understand and construct basic sentences.

Key points:
- Subject comes first (أنا، إنت، هي)
- Verb follows the subject (بحب، بشرب)
- Object comes last (قهوة، شاي)`,
    order: 1,
    examples: [
      "أنا بحب القهوة (I love coffee)",
      "هي بتشرب شاي (She drinks tea)",
      "إنت بتاكل خبز (You eat bread)"
    ],
    nextLessonId: "2",
    exercises: getExercisesByLessonId("1")
  },
  {
    id: "2",
    title: "Negation & Questions",
    description: "Learn how to form negative sentences and questions",
    content: `Lebanese Arabic uses a unique negation structure with ما...ش around the verb. Questions can be formed by changing intonation or using question words.

Key points:
- Negation: ما + verb + ش
- Questions can use rising intonation
- Question words come at the start`,
    order: 2,
    examples: [
      "ما بحبش القهوة (I don't love coffee)",
      "بتحب القهوة؟ (Do you like coffee?)",
      "شو بتشرب؟ (What do you drink?)"
    ],
    nextLessonId: "3",
    exercises: getExercisesByLessonId("2")
  },
  {
    id: "3",
    title: "Present Tense Verbs",
    description: "Master the present tense in Lebanese Arabic",
    content: `Present tense in Lebanese Arabic uses the ب prefix before verbs. This makes it easy to identify and form present tense sentences.

Key points:
- ب prefix indicates present tense
- Conjugation changes based on subject
- Regular patterns make learning easier`,
    order: 3,
    examples: [
      "بكتب (I write)",
      "بتكتب (You write)",
      "بيكتب (He writes)"
    ],
    nextLessonId: "4",
    exercises: getExercisesByLessonId("3")
  },
  {
    id: "4",
    title: "Future & Past Tense",
    description: "Learn to express actions in the future and past",
    content: `Lebanese Arabic marks future tense with رح and past tense with verb conjugation. Understanding these tenses helps express time clearly.

Key points:
- Future: رح + present tense verb
- Past: special verb conjugation
- Time expressions help clarify meaning`,
    order: 4,
    examples: [
      "رح روح (I will go)",
      "رحت (I went)",
      "بكرا رح اجي (Tomorrow I will come)"
    ],
    exercises: getExercisesByLessonId("4")
  }
];

export const getLessonById = (id: string): Lesson | undefined => {
  return lessons.find(lesson => lesson.id === id);
};

export const getAllLessons = (): Lesson[] => {
  return lessons.sort((a, b) => a.order - b.order);
};