import type { MapError } from '../../types/map.types'

interface ErrorDisplayProps {
  error: MapError
  onRetry: () => void
  className?: string
  height: string
}

export function ErrorDisplay({ error, onRetry, className, height }: ErrorDisplayProps) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ height }}>
      <div className="text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Kesalahan: {error.message}
        </div>
        <button
          onClick={onRetry}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  )
}
