import { useCallback, useEffect, useState } from 'react'
import { GeoJsonService } from '../lib/api/geojson'
import type { GeoJsonData, MapError, MapLevel } from '../types/map.types'

export function useMapData(mapLevel: MapLevel) {
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonData | null>(null)
  const [backgroundData, setBackgroundData] = useState<GeoJsonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<MapError | null>(null)

  const loadData = useCallback(async (level: MapLevel) => {
    try {
      setLoading(true)
      setError(null)

      let result: { data: GeoJsonData; background: GeoJsonData | null }

      switch (level.type) {
        case 'provinces':
          result = await GeoJsonService.loadProvincesData()
          break

        case 'regencies':
          result = await GeoJsonService.loadRegenciesData(level)
          break

        default:
          throw new Error(`Tipe level peta tidak diketahui: ${level.type}`)
      }

      setGeoJsonData(result.data)
      setBackgroundData(result.background)
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui',
        type: err instanceof Error ? 'fetch' : 'unknown'
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData(mapLevel)
  }, [mapLevel, loadData])

  const refetch = useCallback(() => loadData(mapLevel), [mapLevel, loadData])

  return {
    geoJsonData,
    backgroundData,
    loading,
    error,
    refetch
  }
}
