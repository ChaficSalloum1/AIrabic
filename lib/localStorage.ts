
const STORAGE_KEY = 'lebanese_arabic_progress';

interface LessonProgress {
  id: string;
  completed: boolean;
  score: number;
}

export const ProgressManager = {
  getProgress: (): LessonProgress[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveProgress: (lessonId: string, score: number) => {
    if (typeof window === 'undefined') return;
    const progress = ProgressManager.getProgress();
    const existingIndex = progress.findIndex(p => p.id === lessonId);
    
    if (existingIndex >= 0) {
      progress[existingIndex] = { id: lessonId, completed: true, score };
    } else {
      progress.push({ id: lessonId, completed: true, score });
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  },

  isLessonCompleted: (lessonId: string): boolean => {
    const progress = ProgressManager.getProgress();
    return progress.some(p => p.id === lessonId && p.completed);
  }
};
