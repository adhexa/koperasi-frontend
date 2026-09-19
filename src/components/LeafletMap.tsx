import { useEffect, useState, useCallback, useRef } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { GeoJsonData, GeoJsonFeature, MapLevelType } from '../types/map.types'
import { getMapColors, type StatusType } from '../lib/constants/colors'

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: () => string })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface LeafletMapProps {
  geoJsonData?: GeoJsonData
  backgroundData?: GeoJsonData | null
  center?: [number, number]
  zoom?: number
  height?: string
  mapType: MapLevelType
  selectedStatus?: StatusType
  onFeatureClick?: (feature: GeoJsonFeature) => void
  onFeatureHover?: (feature: GeoJsonFeature | null) => void
  statisticsData?: Array<{
    kode_provinsi: string
    nama_provinsi: string
    sosialisasi: number
    terbentuk: number
    berbadan_hukum: number
  }>
}

// More restrictive Indonesia-only bounds
const INDONESIA_BOUNDS: L.LatLngBoundsExpression = [
  [-11, 95],   // Southwest corner - more restrictive
  [6, 141]     // Northeast corner - more restrictive
]

// Indonesia center coordinates
const INDONESIA_CENTER: [number, number] = [-2.5, 118]

export function LeafletMap({
  geoJsonData,
  backgroundData,
  height = '400px',
  selectedStatus = 'pembentukan',
  onFeatureClick,
  onFeatureHover,
  statisticsData = []
}: LeafletMapProps) {
  const [map, setMap] = useState<L.Map | null>(null)
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null)
  const backgroundLayerRef = useRef<L.GeoJSON | null>(null)

  // Get colors based on selected status
  const mapColors = getMapColors(selectedStatus)

  // Memoize the onFeatureHover callback to prevent unnecessary re-renders
  const memoizedOnFeatureHover = useCallback((feature: GeoJsonFeature | null) => {
    if (onFeatureHover) {
      onFeatureHover(feature)
    }
  }, [onFeatureHover])

  // Helper function to get statistics value for a province
  const getProvinceStatValue = useCallback((provinceName: string): number => {
    if (!statisticsData || statisticsData.length === 0) return 0

    // Find the province data by matching name
    const provinceData = statisticsData.find(
      province => province.nama_provinsi.toLowerCase() === provinceName.toLowerCase()
    )

    if (!provinceData) return 0

    // Return the value based on selected status
    switch (selectedStatus) {
      case 'pembentukan':
        return provinceData.terbentuk
      case 'sudahBerbadanHukum':
        return provinceData.berbadan_hukum
      default:
        return provinceData.terbentuk
    }
  }, [statisticsData, selectedStatus])

  // Helper function to get color intensity based on data value
  const getDataVisualizationColor = useCallback((provinceName: string) => {
    if (!statisticsData || statisticsData.length === 0) {
      // Fallback to default color if no data
      return {
        fillColor: mapColors.fillColor,
        fillOpacity: 0.7
      }
    }

    const value = getProvinceStatValue(provinceName)

    // Find min and max values for normalization
    const allValues = statisticsData.map(province => {
      switch (selectedStatus) {
        case 'pembentukan':
          return province.terbentuk
        case 'sudahBerbadanHukum':
          return province.berbadan_hukum
        default:
          return province.terbentuk
      }
    })

    const minValue = Math.min(...allValues)
    const maxValue = Math.max(...allValues)

    if (maxValue === minValue) {
      // All values are the same, use default opacity
      return {
        fillColor: mapColors.fillColor,
        fillOpacity: 0.7
      }
    }

    // Normalize value to 0-1 range
    const normalizedValue = (value - minValue) / (maxValue - minValue)

    // Map normalized value to opacity range (0.3 to 0.9)
    const opacity = 0.3 + (normalizedValue * 0.6)

    return {
      fillColor: mapColors.fillColor,
      fillOpacity: opacity
    }
  }, [statisticsData, selectedStatus, mapColors.fillColor, getProvinceStatValue])

  // Handle background data (Indonesia outline for regency view)
  useEffect(() => {
    if (!map) return

    // Clear existing background layer
    if (backgroundLayerRef.current) {
      map.removeLayer(backgroundLayerRef.current)
      backgroundLayerRef.current = null
      }

    if (!backgroundData) return

    console.log('LeafletMap: Adding background layer with', backgroundData.features?.length, 'features')

    // Create background layer (Indonesia provinces outline) - simple styling
    const newBackgroundLayer = L.geoJSON(backgroundData, {
      style: () => ({
        fillColor: 'transparent',
        weight: 1,
        opacity: 0.5,
        color: '#666666',
        dashArray: '3,3',
        fillOpacity: 0
      }),
      interactive: false
    })

    newBackgroundLayer.addTo(map)
    backgroundLayerRef.current = newBackgroundLayer
  }, [backgroundData, map])

  useEffect(() => {
    if (!geoJsonData || !map) return

    console.log('LeafletMap: Received GeoJSON data with', geoJsonData.features?.length, 'features')

    // Clear existing layer
    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current)
      geoJsonLayerRef.current = null
    }

    // Create new GeoJSON layer with data-driven styling
    const newLayer = L.geoJSON(geoJsonData, {
      style: (feature) => {
        // Get province name from feature properties
        const provinceName = feature?.properties?.province_kemendagri_name ||
                           feature?.properties?.province_bps_name ||
                           feature?.properties?.regency_kemendagri_name ||
                           feature?.properties?.regency_bps_name ||
                           'Unknown'

        // Get data-driven colors for provinces
        const dataColors = getDataVisualizationColor(provinceName)

        return {
          fillColor: dataColors.fillColor,
        weight: 1,
        opacity: 1,
        color: mapColors.strokeColor,
        dashArray: '',
          fillOpacity: dataColors.fillOpacity
        }
      },
      onEachFeature: (feature, layer) => {
        // Determine the name based on the feature properties
        const getFeatureName = () => {
          // Check for regency/city level (kab_kota.geojson)
          if (feature.properties?.regency_kemendagri_name) {
            return feature.properties.regency_kemendagri_name
          }
          if (feature.properties?.regency_bps_name) {
            return feature.properties.regency_bps_name
          }
          // Check for province level (provinces.geojson)
          if (feature.properties?.province_kemendagri_name) {
            return feature.properties.province_kemendagri_name
          }
          if (feature.properties?.province_bps_name) {
            return feature.properties.province_bps_name
          }
          return 'Unknown Region'
        }

        const getFeatureType = () => {
          // Check for regency/city level
          if (feature.properties?.regency_kemendagri_name || feature.properties?.regency_bps_name) {
            return 'Kabupaten/Kota'
          }
          // Check for province level
          if (feature.properties?.province_kemendagri_name || feature.properties?.province_bps_name) {
            return 'Provinsi'
          }
          return 'Region'
        }

        const featureName = getFeatureName()
        const featureType = getFeatureType()

        // Get statistics data for this province
        const statValue = getProvinceStatValue(featureName)
        const statusLabel = selectedStatus === 'pembentukan' ? 'Pembentukan' :
                           selectedStatus === 'sudahBerbadanHukum' ? 'Berbadan Hukum' : 'Koperasi'

        // Tooltip content for hover with statistics
        const tooltipContent = `
          <div style="padding: 6px 10px; font-weight: 500;">
            <div style="font-size: 14px; margin-bottom: 2px;">${featureName}</div>
            ${statValue > 0 ? `<div style="font-size: 12px; color: #666;">${statusLabel}: ${statValue.toLocaleString()}</div>` : ''}
          </div>
        `

        // Enhanced popup content for click with statistics data
        let popupContent = `
          <div style="padding: 12px; min-width: 180px;">
            <h3 style="margin: 0 0 6px 0; font-weight: bold; font-size: 16px;">${featureName}</h3>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">${featureType}</p>
        `

        // Add statistics data if available
        if (statValue > 0) {
          popupContent += `
            <div style="background: #f8f9fa; padding: 8px; border-radius: 4px; margin-bottom: 8px;">
              <div style="font-size: 13px; font-weight: 600; color: #333; margin-bottom: 4px;">Statistik Koperasi</div>
              <div style="font-size: 12px; color: #555;">${statusLabel}: <strong>${statValue.toLocaleString()}</strong></div>
            </div>
          `
        }

        // Add additional info based on feature type
        if (feature.properties?.regency_kemendagri_name || feature.properties?.regency_bps_name) {
          // Regency/city level
          popupContent += `
            <div style="font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 6px;">
              <div>Kode: ${feature.properties.regency_kemendagri_code || feature.properties.regency_bps_code || 'N/A'}</div>
              <div>Provinsi: ${feature.properties.province_kemendagri_name || feature.properties.province_bps_name || 'N/A'}</div>
            </div>
          `
        } else if (feature.properties?.province_kemendagri_name || feature.properties?.province_bps_name) {
          // Province level
          popupContent += `
            <div style="font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 6px;">
              <div>Kode: ${feature.properties.province_kemendagri_code || feature.properties.province_bps_code || 'N/A'}</div>
            </div>
          `
        }

        popupContent += `</div>`

        // Bind both tooltip (hover) and popup (click)
        layer.bindTooltip(tooltipContent, {
          permanent: false,
          direction: 'top',
          offset: [0, -10],
          className: 'custom-tooltip'
        })
        layer.bindPopup(popupContent)

        // Enhanced hover effects
        layer.on({
          mouseover: (e) => {
            const layer = e.target
            layer.setStyle({
              weight: 2,
              color: mapColors.hoverStrokeColor,
              fillColor: mapColors.hoverFillColor,
              fillOpacity: 0.9
            })
            layer.bringToFront()
            memoizedOnFeatureHover(feature as GeoJsonFeature)
          },
          mouseout: (e) => {
            newLayer.resetStyle(e.target)
            memoizedOnFeatureHover(null)
          },
          click: () => {
            console.log('LeafletMap: Feature clicked:', feature)
            if (onFeatureClick) {
              onFeatureClick(feature as GeoJsonFeature)
            }
          }
        })
      }
    })

    // Add layer to map
    newLayer.addTo(map)
    geoJsonLayerRef.current = newLayer

    // Simple bounds fitting
    try {
      const bounds = newLayer.getBounds()
      if (bounds.isValid()) {
        // Determine zoom level based on data type and background
        if (backgroundData && (geoJsonData.features?.[0]?.properties?.regency_kemendagri_name ||
                               geoJsonData.features?.[0]?.properties?.regency_bps_name)) {
          // Regency level - moderate zoom
          map.fitBounds(bounds, {
            padding: [20, 20],
            maxZoom: 9
          })
        } else {
          // Province level - lower zoom
          map.fitBounds(bounds, {
            padding: [10, 10],
            maxZoom: 7
          })
        }
      }
    } catch (error) {
      console.log('Could not fit bounds:', error)
      map.setView(INDONESIA_CENTER, 5)
    }
  }, [geoJsonData, map, backgroundData, onFeatureClick, memoizedOnFeatureHover, mapColors, getDataVisualizationColor, getProvinceStatValue, selectedStatus])

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (geoJsonLayerRef.current && map) {
        map.removeLayer(geoJsonLayerRef.current)
        geoJsonLayerRef.current = null
      }
      if (backgroundLayerRef.current && map) {
        map.removeLayer(backgroundLayerRef.current)
        backgroundLayerRef.current = null
      }
    }
  }, [map])

  // Simple map setup - just restrict to Indonesia bounds
  useEffect(() => {
    if (map) {
      map.setMaxBounds(INDONESIA_BOUNDS)
      map.setMinZoom(4)
      map.setMaxZoom(12)
    }
  }, [map])

  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer
        center={INDONESIA_CENTER}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        ref={setMap}
        maxBounds={INDONESIA_BOUNDS}
        maxBoundsViscosity={1.0}
        minZoom={4}
        maxZoom={12}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  )
}
