interface MapSkeletonProps {
  height?: string
  className?: string
  showSidebar?: boolean
}

export function MapSkeleton({
  height = "500px",
  className = "",
  showSidebar = true
}: MapSkeletonProps) {
  if (!showSidebar) {
    // Map only mode skeleton
    return (
      <div className={className}>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header skeleton */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>

          {/* Map skeleton */}
          <div
            className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden"
            style={{ height }}
          >
            {/* Animated map shapes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Indonesia-like shape mockup */}
                <div className="flex space-x-2">
                  <div className="w-16 h-12 bg-blue-200 rounded-lg animate-pulse opacity-70"></div>
                  <div className="w-20 h-8 bg-blue-200 rounded-lg animate-pulse opacity-60 mt-2"></div>
                  <div className="w-12 h-10 bg-blue-200 rounded-lg animate-pulse opacity-80 mt-1"></div>
                </div>
                <div className="flex space-x-1 mt-1">
                  <div className="w-8 h-6 bg-blue-200 rounded animate-pulse opacity-50"></div>
                  <div className="w-24 h-14 bg-blue-200 rounded-lg animate-pulse opacity-75"></div>
                  <div className="w-14 h-8 bg-blue-200 rounded animate-pulse opacity-65 mt-3"></div>
                  <div className="w-10 h-6 bg-blue-200 rounded animate-pulse opacity-70 mt-4"></div>
                </div>

                {/* Loading text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                      <span className="text-sm text-gray-600 font-medium">Loading map...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner controls skeleton */}
            <div className="absolute top-2 right-2 space-y-1">
              <div className="w-8 h-8 bg-white/80 rounded border animate-pulse"></div>
              <div className="w-8 h-8 bg-white/80 rounded border animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Full mode with sidebar skeleton
  return (
    <div className={className}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map section skeleton */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Header skeleton */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </div>

            {/* Map skeleton */}
            <div
              className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden"
              style={{ height }}
            >
              {/* Animated map shapes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Indonesia-like shape mockup */}
                  <div className="flex space-x-2">
                    <div className="w-20 h-16 bg-blue-200 rounded-xl animate-pulse opacity-70"></div>
                    <div className="w-24 h-12 bg-blue-200 rounded-xl animate-pulse opacity-60 mt-2"></div>
                    <div className="w-16 h-14 bg-blue-200 rounded-xl animate-pulse opacity-80 mt-1"></div>
                    <div className="w-12 h-8 bg-blue-200 rounded-lg animate-pulse opacity-65 mt-4"></div>
                  </div>
                  <div className="flex space-x-1 mt-2">
                    <div className="w-10 h-8 bg-blue-200 rounded-lg animate-pulse opacity-50"></div>
                    <div className="w-32 h-18 bg-blue-200 rounded-xl animate-pulse opacity-75"></div>
                    <div className="w-18 h-12 bg-blue-200 rounded-lg animate-pulse opacity-65 mt-2"></div>
                    <div className="w-14 h-10 bg-blue-200 rounded-lg animate-pulse opacity-70 mt-1"></div>
                    <div className="w-8 h-6 bg-blue-200 rounded animate-pulse opacity-60 mt-6"></div>
                  </div>

                  {/* Loading text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                        <span className="text-sm text-gray-700 font-medium">Loading geographical data...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner controls skeleton */}
              <div className="absolute top-3 right-3 space-y-1">
                <div className="w-9 h-9 bg-white/80 rounded border animate-pulse shadow-sm"></div>
                <div className="w-9 h-9 bg-white/80 rounded border animate-pulse shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="lg:w-80">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Sidebar header */}
            <div className="h-5 bg-gray-200 rounded w-32 animate-pulse mb-4"></div>

            {/* Info section */}
            <div className="space-y-4">
              <div className="text-center py-8">
                <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-3 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-36 mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Statistics section */}
            <div className="mt-6 pt-6 border-t">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse mb-3"></div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-8 animate-pulse"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
