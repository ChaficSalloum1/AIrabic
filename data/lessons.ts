
export interface Lesson {
  id: string;
  title: string;
  explanation: string;
  example: string;
  nextLessonId: string;
  exercises: string[];
}

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Basic Sentence Structure",
    explanation: "Lebanese Arabic follows Subject-Verb-Object (SVO) order.",
    example: "أنا بحكي لبناني (Ana beḥki lebnēni) – I speak Lebanese.",
    nextLessonId: "2",
    exercises: ["1.1"]
  },
  {
    id: "2",
    title: "Greetings",
    explanation: "Common Lebanese greetings are essential for daily conversations.",
    example: "مرحبا (Marhaba) – Hello",
    nextLessonId: "3",
    exercises: ["2.1"]
  }
];

export const getLessonById = (id: string): Lesson | undefined => {
  return lessons.find(lesson => lesson.id === id);
};
