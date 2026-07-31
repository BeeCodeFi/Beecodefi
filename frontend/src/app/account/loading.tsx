export default function AccountLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-10 w-56 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-2" />
          <div className="h-5 w-72 bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse" />
        </div>

        {/* Profile card skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 mb-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              <div className="h-4 w-64 bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse" />
            </div>
          </div>

          {/* Form fields skeleton */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2" />
                <div className="h-11 w-full bg-gray-100 dark:bg-gray-800/60 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>

          {/* Button skeleton */}
          <div className="mt-8 h-11 w-32 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl animate-pulse" />
        </div>

        {/* Stats cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-3" />
              <div className="h-8 w-12 bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
