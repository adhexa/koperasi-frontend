import type { KoperasiStatistics } from '../../../lib/api/types'
import type { StatusType as ColorStatusType } from '../../../lib/constants/colors'

export type StatusType = ColorStatusType

export interface StatisticsSummary {
  pembentukan: number
  sudahBerbadanHukum: number
}

export interface StatisticsTotals {
  sosialisasi: number
  terbentuk: number
  berbadan_hukum: number
}

export interface ProgressionRates {
  overall_completion: number
}

export interface StatisticsCardProps {
  title: string
  status: StatusType
  value: number
  description?: string
  completionRate?: number
  selectedStatus: StatusType
  onStatusChange: (status: StatusType) => void
}

export interface StatisticsHeaderProps {
  title: string
  description: string
}

// Detail view types
export interface DetailViewState {
  isDetailView: boolean
  provinceCode: string | null
  provinceName: string | null
}

export { type KoperasiStatistics }
