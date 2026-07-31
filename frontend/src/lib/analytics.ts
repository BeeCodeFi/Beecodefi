// Analytics event tracking utilities

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

/**
 * Track a custom event in Google Analytics
 * @param action - The action being taken (e.g., 'click', 'submit', 'complete')
 * @param category - The category of the event (e.g., 'Quiz', 'Lesson', 'Video')
 * @param label - Optional label for additional context
 * @param value - Optional numeric value
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

/**
 * Track lesson completion
 */
export const trackLessonComplete = (lessonTitle: string, tutorialSlug: string) => {
  trackEvent("lesson_complete", "Lesson", `${tutorialSlug}:${lessonTitle}`);
};

/**
 * Track quiz completion
 */
export const trackQuizComplete = (
  quizTopic: string,
  score: number,
  totalQuestions: number
) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  trackEvent("quiz_complete", "Quiz", quizTopic, percentage);
};

/**
 * Track video start
 */
export const trackVideoStart = (videoTitle: string, courseSlug: string) => {
  trackEvent("video_start", "Video", `${courseSlug}:${videoTitle}`);
};

/**
 * Track video completion
 */
export const trackVideoComplete = (videoTitle: string, courseSlug: string) => {
  trackEvent("video_complete", "Video", `${courseSlug}:${videoTitle}`);
};

/**
 * Track user registration
 */
export const trackUserSignup = (method: string = "email") => {
  trackEvent("sign_up", "User", method);
};

/**
 * Track user login
 */
export const trackUserLogin = (method: string = "email") => {
  trackEvent("login", "User", method);
};

/**
 * Track search queries
 */
export const trackSearch = (query: string) => {
  trackEvent("search", "Search", query);
};

/**
 * Track CTA button clicks
 */
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent("cta_click", "CTA", `${location}:${ctaName}`);
};

/**
 * Track badge unlocks
 */
export const trackBadgeUnlock = (badgeName: string) => {
  trackEvent("badge_unlock", "Badge", badgeName);
};

/**
 * Track onboarding tour completion
 */
export const trackOnboardingComplete = () => {
  trackEvent("onboarding_complete", "Onboarding");
};

/**
 * Track feedback submissions
 */
export const trackFeedback = (type: "yes" | "no", lessonSlug: string) => {
  trackEvent("feedback", "Lesson", `${lessonSlug}:${type}`);
};
