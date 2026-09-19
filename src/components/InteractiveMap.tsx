import { useMemo, useEffect } from 'react'
import { LeafletMap } from './LeafletMap'
import { MapSkeleton } from './MapSkeleton'
import { ErrorDisplay, NavigationButtons, Sidebar } from './map'
import { useMapData } from '../hooks/useMapData'
import { useMapNavigation } from '../hooks/useMapNavigation'
import type { InteractiveMapProps } from '../types/map.types'
import { UI_TEXT, MAP_CONFIG } from '../lib/constants/map.constants'

export function InteractiveMap({
  onProvinceClick,
  className = '',
  height = MAP_CONFIG.defaultHeight,
  showSidebar = true,
  selectedStatus = 'pembentukan',
  resetToProvinces = false,
  statisticsData = []
}: InteractiveMapProps) {
  // Custom hooks for state management
  const {
    mapLevel,
    selectedFeature,
    navigateToProvinces,
    navigateToRegencies,
    handleFeatureClick,
    setSelectedFeature
  } = useMapNavigation(onProvinceClick)

  const {
    geoJsonData,
    backgroundData,
    loading,
    error,
    refetch
  } = useMapData(mapLevel)

  // Reset map to provinces when resetToProvinces prop changes to true
  useEffect(() => {
    if (resetToProvinces) {
      navigateToProvinces()
    }
  }, [resetToProvinces, navigateToProvinces])

  // Memoized computed values
  const { title, instructionText, infoPlaceholder } = useMemo(() => {
    const { titles, instructions, infoPlaceholder: placeholders } = UI_TEXT

    switch (mapLevel.type) {
      case 'provinces':
        return {
          title: titles.provinces,
          instructionText: instructions.provinces,
          infoPlaceholder: placeholders.provinces
        }

      case 'regencies':
        return {
          title: titles.regencies(mapLevel.parentProvince || ''),
          instructionText: instructions.regencies,
          infoPlaceholder: placeholders.regencies
        }

      default:
        return {
          title: 'Level Tidak Diketahui',
          instructionText: '',
          infoPlaceholder: ''
        }
    }
  }, [mapLevel])

  // Render different states
  if (loading) {
    return <MapSkeleton height={height} className={className} />
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={refetch}
        className={className}
        height={height}
      />
    )
  }

  if (!geoJsonData) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ height }}>
        <p className="text-gray-500">Data tidak tersedia</p>
      </div>
    )
  }

  return (
    <div className={`flex bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
      {/* Main Map Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-800">{title}</h1>
              <NavigationButtons
                mapLevel={mapLevel}
                onBackToProvinces={navigateToProvinces}
                onBackToRegencies={navigateToRegencies}
              />
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <LeafletMap
            geoJsonData={geoJsonData}
            backgroundData={backgroundData}
            onFeatureClick={handleFeatureClick}
            onFeatureHover={setSelectedFeature}
            center={MAP_CONFIG.center}
            zoom={MAP_CONFIG.zoom}
            height={height}
            mapType={mapLevel.type}
            selectedStatus={selectedStatus}
            statisticsData={statisticsData}
          />
        </div>
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <Sidebar
          mapLevel={mapLevel}
          selectedFeature={selectedFeature}
          instructionText={instructionText}
          infoPlaceholder={infoPlaceholder}
        />
      )}
    </div>
  )
}
