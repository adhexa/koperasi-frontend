export const API_ENDPOINTS = {
  provinces: '/provinces.geojson',
  regencies: '/kab_kota.geojson'
} as const

export const MAP_CONFIG = {
  center: [-2.5, 118] as [number, number],
  zoom: 5,
  defaultHeight: '500px'
} as const

export const UI_TEXT = {
  titles: {
    provinces: 'Provinsi Indonesia',
    regencies: (province: string) => `${province} - Kabupaten & Kota`
  },
  instructions: {
    provinces: 'Klik pada provinsi untuk melihat kabupaten dan kota',
    regencies: 'Klik pada kabupaten atau kota untuk melihat detail informasi'
  },
  infoPlaceholder: {
    provinces: 'Klik pada provinsi untuk melihat detail dan menuju kabupaten/kota',
    regencies: 'Klik pada kabupaten atau kota untuk melihat detail informasi'
  }
} as const
