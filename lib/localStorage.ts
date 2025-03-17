
const STORAGE_KEY = 'lebanese_arabic_progress';

interface ExerciseProgress {
  id: string;
  completed: boolean;
}

interface LessonProgress {
  id: string;
  exerciseProgress: ExerciseProgress[];
  completed: boolean;
}

export const ProgressManager = {
  getProgress: (): LessonProgress[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveExerciseProgress: (lessonId: string, exerciseId: string) => {
    if (typeof window === 'undefined') return;
    const progress = ProgressManager.getProgress();
    const lessonIndex = progress.findIndex(p => p.id === lessonId);
    
    if (lessonIndex >= 0) {
      const exerciseProgress = progress[lessonIndex].exerciseProgress || [];
      if (!exerciseProgress.some(ep => ep.id === exerciseId)) {
        exerciseProgress.push({ id: exerciseId, completed: true });
      }
      progress[lessonIndex].exerciseProgress = exerciseProgress;
      progress[lessonIndex].completed = ProgressManager.checkLessonCompleted(lessonId);
    } else {
      progress.push({
        id: lessonId,
        exerciseProgress: [{ id: exerciseId, completed: true }],
        completed: false
      });
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  },

  checkLessonCompleted: (lessonId: string): boolean => {
    const exercises = getExercisesByLessonId(lessonId);
    const progress = ProgressManager.getProgress();
    const lessonProgress = progress.find(p => p.id === lessonId);
    
    if (!lessonProgress?.exerciseProgress) return false;
    
    return exercises.every(exercise => 
      lessonProgress.exerciseProgress.some(ep => ep.id === exercise.id)
    );
  },

  isLessonCompleted: (lessonId: string): boolean => {
    const progress = ProgressManager.getProgress();
    return progress.some(p => p.id === lessonId && p.completed);
  }
};
