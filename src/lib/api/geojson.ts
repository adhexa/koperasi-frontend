import type {
  FeatureCodes,
  GeoJsonData,
  GeoJsonFeature,
  MapLevel,
  MapLevelType
} from '../../types/map.types'
import { API_ENDPOINTS } from '../constants/map.constants'

export class GeoJsonService {
  /**
   * Fetch GeoJSON data from a given endpoint
   */
  static async fetchGeoJsonData(endpoint: string): Promise<GeoJsonData> {
    const response = await fetch(endpoint)
    if (!response.ok) {
      throw new Error(`Gagal memuat data dari ${endpoint}`)
    }
    return response.json()
  }

  /**
   * Get the display name for a feature based on map type
   */
  static getFeatureName(feature: GeoJsonFeature, mapType: MapLevelType): string {
    const { properties } = feature

    switch (mapType) {
      case 'provinces':
                return properties.province_kemendagri_name ||
               properties.province_bps_name ||
               'Provinsi Tidak Diketahui'

      case 'regencies':
                return properties.regency_kemendagri_name ||
               properties.regency_bps_name ||
               'Kabupaten/Kota Tidak Diketahui'

      default:
        return 'Tidak Diketahui'
    }
  }

  /**
   * Extract code and name for a feature
   */
  static getFeatureCodes(feature: GeoJsonFeature, type: 'province' | 'regency'): FeatureCodes {
    const { properties } = feature

    if (type === 'province') {
      return {
        code: properties.province_kemendagri_code || properties.province_bps_code,
        name: properties.province_kemendagri_name || properties.province_bps_name
      }
    }

    return {
      code: properties.regency_kemendagri_code || properties.regency_bps_code,
      name: properties.regency_kemendagri_name || properties.regency_bps_name
    }
  }

  /**
   * Filter features by province
   */
  static filterByProvince(features: GeoJsonFeature[], level: MapLevel): GeoJsonFeature[] {
    return features.filter(feature => {
      const { properties } = feature
      return properties.province_kemendagri_name === level.parentProvince ||
             properties.province_bps_name === level.parentProvince ||
             properties.province_kemendagri_code === level.parentProvinceCode ||
             properties.province_bps_code === level.parentProvinceCode
    })
  }

  /**
   * Filter features by regency (includes province filtering for uniqueness)
   */
  static filterByRegency(features: GeoJsonFeature[], level: MapLevel): GeoJsonFeature[] {
    return features.filter(feature => {
      const { properties } = feature
      const matchesRegencyCode = properties.regency_kemendagri_code === level.parentRegencyCode
      const matchesProvinceCode = properties.province_kemendagri_code === level.parentProvinceCode ||
                                  properties.province_bps_code === level.parentProvinceCode
      return matchesRegencyCode && matchesProvinceCode
    })
  }

  /**
   * Load data for provinces
   */
  static async loadProvincesData(): Promise<{ data: GeoJsonData; background: null }> {
    const data = await this.fetchGeoJsonData(API_ENDPOINTS.provinces)
    return { data, background: null }
  }

  /**
   * Load data for regencies with province background
   */
  static async loadRegenciesData(level: MapLevel): Promise<{ data: GeoJsonData; background: GeoJsonData }> {
    const [regenciesData, provincesData] = await Promise.all([
      this.fetchGeoJsonData(API_ENDPOINTS.regencies),
      this.fetchGeoJsonData(API_ENDPOINTS.provinces)
    ])

    const filteredFeatures = this.filterByProvince(regenciesData.features, level)

    return {
      data: { ...regenciesData, features: filteredFeatures },
      background: provincesData
    }
  }


}
