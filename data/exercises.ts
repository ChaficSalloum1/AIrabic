
import { Lesson } from './lessons';

export type ExerciseType = 'multipleChoice' | 'fillBlank' | 'arrangement' | 'construction';

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  answer: string;
  options?: string[];
  hint?: string;
  lessonId: string;
  attempts?: number;
}

export const exercises: Exercise[] = [
  {
    id: "1.1",
    type: "fillBlank",
    prompt: "أنا ___ لبناني",
    answer: "بحكي",
    options: ["بحكي", "بتحكي", "بيحكي"],
    hint: "The verb starts with 'b-' in present tense.",
    lessonId: "1"
  },
  {
    id: "1.2",
    type: "multipleChoice",
    prompt: "How do you say 'I speak' in Lebanese Arabic?",
    answer: "أنا بحكي",
    options: ["أنا بحكي", "انت بتحكي", "هو بيحكي"],
    lessonId: "1"
  }
];

export const getExerciseById = (id: string): Exercise | undefined => {
  return exercises.find(exercise => exercise.id === id);
};

export const getExercisesByLessonId = (lessonId: string): Exercise[] => {
  return exercises.filter(exercise => exercise.lessonId === lessonId);
};
