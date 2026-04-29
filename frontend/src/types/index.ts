export interface User {
  id: number;
  name: string;
  email: string;
  profileImageUrl?: string | null;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface AccountStats {
  totalQuizAttempts: number;
  totalLessonsCompleted: number;
  averageQuizScore: number;
  memberSince: string;
}

export interface QuizTopic {
  id: number;
  title: string;
  topic: string;
  description: string;
  difficulty: string;
  questionCount: number;
  bestScore: number | null;
}

export interface QuizQuestion {
  id: number;
  text: string;
  codeSnippet: string | null;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  id: number;
  text: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  results: QuestionResult[];
}

export interface QuestionResult {
  questionId: number;
  questionText: string;
  isCorrect: boolean;
  correctAnswer: string;
  userAnswer: string | null;
}

export interface QuizAttempt {
  id: number;
  quizTitle: string;
  topic: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface TutorialCategory {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalLessons?: number;
  estimatedHours?: number;
  lessons: TutorialLesson[];
}

export interface TutorialLesson {
  slug: string;
  title: string;
  content: string;
  codeExamples: CodeExample[];
  difficulty?: "beginner" | "intermediate" | "advanced";
  estimatedMinutes?: number;
  keyTakeaways?: string[];
  interactiveExercises?: InteractiveExercise[];
  mdnReference?: string;
}

export interface CodeExample {
  language: string;
  code: string;
  title?: string;
  description?: string;
  livePreview?: boolean;
}

export interface InteractiveExercise {
  id: string;
  title: string;
  instruction: string;
  startingCode: string;
  expectedOutput?: string;
  hints?: string[];
}

export interface CodingTip {
  id: number;
  title: string;
  tip: string;
  language: string;
  code: string;
}
