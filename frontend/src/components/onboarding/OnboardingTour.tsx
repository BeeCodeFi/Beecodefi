"use client";

import { useState, useEffect } from "react";
import Joyride, { Step, CallBackProps, STATUS, ACTIONS, EVENTS } from "react-joyride";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function OnboardingTour() {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    // Only show tour for logged-in users on homepage who haven't seen it
    if (user && pathname === "/" && typeof window !== "undefined") {
      const hasSeenTour = localStorage.getItem("hasSeenOnboardingTour");
      if (!hasSeenTour) {
        // Delay to ensure DOM is ready
        setTimeout(() => setRun(true), 1000);
      }
    }
  }, [user, pathname]);

  const steps: Step[] = [
    {
      target: "body",
      content: (
        <div>
          <h2 className="text-xl font-bold mb-2">Welcome to BeeCodeFi! 🎉</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Let's take a quick tour to help you get started with your learning journey.
          </p>
        </div>
      ),
      placement: "center",
      disableBeacon: true,
    },
    {
      target: '[href="/tutorials"]',
      content: (
        <div>
          <h3 className="font-bold mb-1">📚 Interactive Tutorials</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Start here! Learn HTML, CSS, and JavaScript with hands-on lessons and live code examples.
          </p>
        </div>
      ),
      placement: "bottom",
    },
    {
      target: '[href="/courses"]',
      content: (
        <div>
          <h3 className="font-bold mb-1">🎥 Video Courses</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Watch comprehensive video courses to deepen your understanding of web development.
          </p>
        </div>
      ),
      placement: "bottom",
    },
    {
      target: '[href="/quiz"]',
      content: (
        <div>
          <h3 className="font-bold mb-1">🎯 Test Your Knowledge</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Take quizzes after each tutorial section to reinforce what you've learned.
          </p>
        </div>
      ),
      placement: "bottom",
    },
    {
      target: '[href="/leaderboard"]',
      content: (
        <div>
          <h3 className="font-bold mb-1">🏆 Leaderboard</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Compete with other learners! Earn points by completing quizzes and lessons.
          </p>
        </div>
      ),
      placement: "bottom",
    },
    {
      target: '[data-tour="search"]',
      content: (
        <div>
          <h3 className="font-bold mb-1">🔍 Quick Search</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">/</kbd> to quickly search for any lesson or topic.
          </p>
        </div>
      ),
      placement: "bottom",
    },
    {
      target: '[data-tour="user-menu"]',
      content: (
        <div>
          <h3 className="font-bold mb-1">👤 Your Profile</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Access your dashboard, track progress, view bookmarks, and manage your account here.
          </p>
        </div>
      ),
      placement: "bottom",
    },
    {
      target: "body",
      content: (
        <div>
          <h2 className="text-xl font-bold mb-2">You're All Set! 🚀</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Start learning by clicking on "Tutorials" and pick your first lesson. Good luck!
          </p>
          <p className="text-xs text-gray-500">
            Tip: Complete lessons daily to maintain your streak and unlock badges! 🔥
          </p>
        </div>
      ),
      placement: "center",
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action, index, type } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as any)) {
      // Mark tour as completed
      localStorage.setItem("hasSeenOnboardingTour", "true");
      setRun(false);
      setStepIndex(0);
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
      setStepIndex(nextStepIndex);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: "#6366f1",
          textColor: "#374151",
          backgroundColor: "#ffffff",
          arrowColor: "#ffffff",
          zIndex: 10000,
        },
        buttonNext: {
          backgroundColor: "#6366f1",
          borderRadius: "0.75rem",
          padding: "0.625rem 1.25rem",
          fontSize: "0.875rem",
          fontWeight: 600,
        },
        buttonBack: {
          color: "#6b7280",
          marginRight: "0.5rem",
        },
        buttonSkip: {
          color: "#9ca3af",
        },
        tooltip: {
          borderRadius: "1rem",
          padding: "1.25rem",
        },
        tooltipContent: {
          padding: "0.5rem 0",
        },
      }}
      locale={{
        back: "Back",
        close: "Close",
        last: "Finish",
        next: "Next",
        skip: "Skip Tour",
      }}
    />
  );
}
