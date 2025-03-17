export const ProgressManager = {
  saveCompletedExercise: (lessonId: string, exerciseType: string) => {
    let progress = JSON.parse(
      localStorage.getItem("completedExercises") || "{}",
    );
    if (!progress[lessonId]) progress[lessonId] = [];
    if (!progress[lessonId].includes(exerciseType)) {
      progress[lessonId].push(exerciseType);
      localStorage.setItem("completedExercises", JSON.stringify(progress));
    }
  },

  getCompletedExercises: (lessonId: string) => {
    let progress = JSON.parse(
      localStorage.getItem("completedExercises") || "{}",
    );
    return progress[lessonId] || [];
  },
};
