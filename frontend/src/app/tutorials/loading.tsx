import { TutorialCardSkeleton } from "@/components/ui/Skeleton";

export default function TutorialsLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="mb-12">
          <div className="h-12 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-4" />
          <div className="h-6 w-96 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <TutorialCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
