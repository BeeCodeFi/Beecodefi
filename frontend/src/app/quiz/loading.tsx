import { QuizCardSkeleton } from "@/components/ui/Skeleton";

export default function QuizLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-12 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-8" />
        <QuizCardSkeleton />
      </div>
    </div>
  );
}
