import { Info } from 'lucide-react'
import type { GeoJsonFeature, MapLevel } from '../../types/map.types'
import { GeoJsonService } from '../../lib/api/geojson'

interface SidebarProps {
  mapLevel: MapLevel
  selectedFeature: GeoJsonFeature | null
  instructionText: string
  infoPlaceholder: string
}

export function Sidebar({ mapLevel, selectedFeature, instructionText, infoPlaceholder }: SidebarProps) {
  const renderFeatureInfo = () => {
    if (!selectedFeature) {
      return <p className="text-gray-600">{infoPlaceholder}</p>
    }

    const { properties } = selectedFeature
    const featureName = GeoJsonService.getFeatureName(selectedFeature, mapLevel.type)

    const getDisplayProperties = () => {
      switch (mapLevel.type) {
        case 'provinces':
          return [
            { label: 'Provinsi', value: featureName },
            { label: 'Kode Kemendagri', value: properties.province_kemendagri_code },
            { label: 'Kode BPS', value: properties.province_bps_code }
          ]

        case 'regencies':
          return [
            { label: 'Kabupaten/Kota', value: featureName },
            { label: 'Provinsi', value: properties.province_kemendagri_name || properties.province_bps_name },
            { label: 'Kode Kemendagri', value: properties.regency_kemendagri_code },
            { label: 'Kode BPS', value: properties.regency_bps_code }
          ]

        default:
          return []
      }
    }

    return (
      <div className="space-y-3">
        <h3 className="font-bold text-gray-800">{featureName}</h3>
        <div className="space-y-2">
          {getDisplayProperties().map(({ label, value }, index) => (
            value && (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600 text-sm">{label}:</span>
                <span className="text-gray-800 text-sm font-medium">{value}</span>
              </div>
            )
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Petunjuk</h2>
          <p className="text-sm text-gray-600">{instructionText}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-800">Detail</h2>
          </div>
          {renderFeatureInfo()}
        </div>
      </div>
    </div>
  )
}
