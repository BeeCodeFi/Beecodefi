import api from "@/lib/api";
import { QuizTopic } from "@/types";
import { tutorials } from "@/data/tutorials";
import { lessonQuizzes } from "@/data/lesson-quizzes";
import { quizCategories } from "@/data/quiz-categories";

export async function fetchMergedQuizTopics(): Promise<QuizTopic[]> {
  const { data } = await api.get<QuizTopic[]>("/quiz/topics");
  const backendTopics = Array.isArray(data) ? data : [];

  const lessonQuizTopics: QuizTopic[] = [];

  tutorials.forEach((tutorial) => {
    tutorial.lessons.forEach((lesson) => {
      const quizKey = `${tutorial.slug}/${lesson.slug}`;
      const questions =
        lesson.quickQuiz && lesson.quickQuiz.length > 0
          ? lesson.quickQuiz
          : lessonQuizzes[quizKey];

      if (!questions || questions.length === 0) return;

      const categoryMeta = quizCategories.find(
        (cat) => cat.tutorialSlug === tutorial.slug,
      );

      lessonQuizTopics.push({
        id: -(lessonQuizTopics.length + 1),
        title: `${tutorial.title} • ${lesson.title}`,
        topic: quizKey,
        category: categoryMeta?.categoryName || tutorial.title,
        description: `Lesson quiz for ${lesson.title}`,
        difficulty: lesson.difficulty
          ? lesson.difficulty.charAt(0).toUpperCase() +
            lesson.difficulty.slice(1)
          : "Beginner",
        questionCount: questions.length,
        bestScore: null,
      });
    });
  });

  return [...backendTopics, ...lessonQuizTopics];
}

export async function fetchMergedQuizTotals() {
  const topics = await fetchMergedQuizTopics();
  return {
    totalQuizzes: topics.length,
    totalQuestions: topics.reduce((sum, topic) => sum + topic.questionCount, 0),
  };
}
