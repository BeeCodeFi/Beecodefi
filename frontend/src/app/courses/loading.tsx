export default function CoursesLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header skeleton */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-8 w-48 bg-blue-200 dark:bg-blue-900/40 rounded-full mx-auto mb-6 animate-pulse" />
          <div className="h-12 w-96 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-[600px] max-w-full bg-gray-100 dark:bg-gray-800/60 rounded mx-auto animate-pulse" />
        </div>
      </section>

      {/* Course cards skeleton */}
      <section className="py-16 -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 animate-pulse"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-800" />
                  <div className="flex-1">
                    <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
                    <div className="h-4 w-32 bg-gray-100 dark:bg-gray-800/60 rounded" />
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-800/60 rounded" />
                  <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-800/60 rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 bg-gray-100 dark:bg-gray-800/60 rounded" />
                  <div className="h-10 w-28 bg-blue-100 dark:bg-blue-900/40 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
