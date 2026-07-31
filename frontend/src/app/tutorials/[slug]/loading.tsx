export default function TutorialLessonLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex">
      {/* Sidebar skeleton */}
      <aside className="hidden lg:block w-80 border-r border-gray-200 dark:border-gray-800 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
            <div className="h-4 w-32 bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse" />
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse" />

          {/* Lesson list */}
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-12 w-full bg-gray-100 dark:bg-gray-800/60 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </aside>

      {/* Main content skeleton */}
      <main className="flex-1 p-6 lg:p-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Title */}
          <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-8" />

          {/* Content blocks */}
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse" />
            <div className="h-4 w-11/12 bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse" />
            <div className="h-4 w-10/12 bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse" />
          </div>

          {/* Code block skeleton */}
          <div className="h-48 w-full bg-gray-900 dark:bg-gray-950 rounded-xl border border-gray-700 animate-pulse mt-8" />

          {/* More content */}
          <div className="space-y-4 mt-8">
            <div className="h-4 w-full bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse" />
            <div className="h-4 w-11/12 bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse" />
          </div>

          {/* Navigation buttons skeleton */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="h-11 w-32 bg-gray-100 dark:bg-gray-800/60 rounded-xl animate-pulse" />
            <div className="h-11 w-32 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  );
}
