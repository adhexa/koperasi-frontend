import { useCallback, useState } from 'react'
import { GeoJsonService } from '../lib/api/geojson'
import type { GeoJsonFeature, MapLevel } from '../types/map.types'

export function useMapNavigation(onProvinceClick?: (code: string, name: string) => void) {
  const [mapLevel, setMapLevel] = useState<MapLevel>({ type: 'provinces' })
  const [selectedFeature, setSelectedFeature] = useState<GeoJsonFeature | null>(null)

  const navigateToProvinces = useCallback(() => {
    setMapLevel({ type: 'provinces' })
    setSelectedFeature(null)
  }, [])

  const navigateToRegencies = useCallback(() => {
    setMapLevel({
      type: 'regencies',
      parentProvince: mapLevel.parentProvince,
      parentProvinceCode: mapLevel.parentProvinceCode
    })
    setSelectedFeature(null)
  }, [mapLevel.parentProvince, mapLevel.parentProvinceCode])

  const handleFeatureClick = useCallback((feature: GeoJsonFeature) => {
    setSelectedFeature(feature)

    switch (mapLevel.type) {
      case 'provinces': {
        const { code, name } = GeoJsonService.getFeatureCodes(feature, 'province')

        onProvinceClick?.(code!, name!)

        setMapLevel({
          type: 'regencies',
          parentProvince: name,
          parentProvinceCode: code
        })
        setSelectedFeature(null)
        break
      }

      case 'regencies': {
        // Stop at regencies level - navigation ends here
        console.log('Regency/Kabupaten clicked:', feature.properties)
        // The feature remains selected but no further navigation occurs
        break
      }

      default:
        console.warn(`Tipe level peta tidak diketahui: ${mapLevel.type}`)
    }
  }, [mapLevel, onProvinceClick])

  return {
    mapLevel,
    selectedFeature,
    navigateToProvinces,
    navigateToRegencies,
    handleFeatureClick,
    setSelectedFeature
  }
}
