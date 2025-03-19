
export type ExerciseType = 'recognition' | 'fillBlank' | 'arrangement' | 'construction' | 'typing';

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

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
  examples: string[];
  nextLessonId?: string;
}
