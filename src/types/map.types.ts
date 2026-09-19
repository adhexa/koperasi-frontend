export type MapLevelType = 'provinces' | 'regencies'

export interface GeoJsonProperties {
  // Province properties
  province_kemendagri_code?: string
  province_kemendagri_name?: string
  province_bps_code?: string
  province_bps_name?: string

  // Regency properties
  regency_kemendagri_code?: string
  regency_kemendagri_name?: string
  regency_bps_code?: string
  regency_bps_name?: string


}

export interface GeoJsonGeometry {
  type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon' | 'GeometryCollection'
  coordinates: number[] | number[][] | number[][][] | number[][][][]
}

export interface GeoJsonFeature {
  type: 'Feature'
  properties: GeoJsonProperties
  geometry: GeoJsonGeometry
}

export interface GeoJsonData {
  type: 'FeatureCollection'
  features: GeoJsonFeature[]
}

export interface MapLevel {
  type: MapLevelType
  parentProvince?: string
  parentProvinceCode?: string
  parentRegency?: string
  parentRegencyCode?: string
}

export interface MapError {
  message: string
  type: 'fetch' | 'parse' | 'unknown'
}

export interface InteractiveMapProps {
  onProvinceClick?: (provinceCode: string, provinceName: string) => void
  className?: string
  height?: string
  showSidebar?: boolean
  selectedStatus?: import('../lib/constants/colors').StatusType
  resetToProvinces?: boolean // Add prop to trigger reset to provinces view
  statisticsData?: Array<{
    kode_provinsi: string
    nama_provinsi: string
    sosialisasi: number
    terbentuk: number
    berbadan_hukum: number
  }>
}

export interface FeatureCodes {
  code?: string
  name?: string
}
