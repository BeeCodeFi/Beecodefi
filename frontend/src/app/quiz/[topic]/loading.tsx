export default function QuizTopicLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-5 w-96 max-w-full bg-gray-100 dark:bg-gray-800/60 rounded mx-auto mb-6 animate-pulse" />
          <div className="flex items-center justify-center gap-8">
            <div className="h-4 w-24 bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse" />
          </div>
        </div>

        {/* Question card skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 mb-6">
          {/* Progress bar */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse" />
            <div className="h-5 w-16 bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse" />
          </div>

          {/* Question */}
          <div className="mb-8">
            <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded mb-3 animate-pulse" />
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          </div>

          {/* Answer options */}
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-14 w-full bg-gray-100 dark:bg-gray-800/60 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Button skeleton */}
        <div className="flex justify-end">
          <div className="h-11 w-32 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
