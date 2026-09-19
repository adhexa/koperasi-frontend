import { ArrowLeft, Home } from 'lucide-react'
import type { MapLevel } from '../../types/map.types'

interface NavigationButtonsProps {
  mapLevel: MapLevel
  onBackToProvinces: () => void
  onBackToRegencies: () => void
}

export function NavigationButtons({ mapLevel, onBackToProvinces, onBackToRegencies }: NavigationButtonsProps) {
  if (mapLevel.type === 'provinces') return null

  return (
    <div className="flex items-center gap-2">
      {mapLevel.type === 'regencies' && (
        <button
          onClick={onBackToProvinces}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Provinsi
        </button>
      )}
    </div>
  )
}
