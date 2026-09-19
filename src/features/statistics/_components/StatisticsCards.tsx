import { StatisticsCard } from './StatisticsCard'
import type { StatisticsSummary, ProgressionRates } from '../types'
import type { StatusType } from '../../../lib/constants/colors'

interface StatisticsCardsProps {
  statusSummary: StatisticsSummary
  progressionRates: ProgressionRates
  selectedStatus: StatusType
  onStatusChange: (status: StatusType) => void
}

export function StatisticsCards({
  statusSummary,
  progressionRates,
  selectedStatus,
  onStatusChange
}: StatisticsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatisticsCard
        title="Tahap 1: Pembentukan"
        status="pembentukan"
        value={statusSummary.pembentukan}
        description="Tahap awal pengembangan"
        selectedStatus={selectedStatus}
        onStatusChange={onStatusChange}
      />

      <StatisticsCard
        title="Tahap 2: Pembentukan Akta"
        status="pembentukanAkta"
        value={statusSummary.pembentukan}
        selectedStatus={selectedStatus}
        onStatusChange={onStatusChange}
      />

      <StatisticsCard
        title="Tahap 3: Berbadan Hukum"
        status="sudahBerbadanHukum"
        value={statusSummary.sudahBerbadanHukum}
        completionRate={progressionRates.overall_completion}
        selectedStatus={selectedStatus}
        onStatusChange={onStatusChange}
      />
    </div>
  )
}
