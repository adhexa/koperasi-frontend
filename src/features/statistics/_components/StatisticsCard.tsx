import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import type { StatisticsCardProps } from '../types'
import { getStatusColors } from '../../../lib/constants/colors'

export function StatisticsCard({
  title,
  status,
  value,
  description,
  completionRate,
  selectedStatus,
  onStatusChange
}: StatisticsCardProps) {
  const isSelected = selectedStatus === status
  const colors = getStatusColors(status)

  return (
    <Card
      className={`shadow-lg border-0 bg-white/90 backdrop-blur cursor-pointer transition-all ${
        isSelected ? `ring-2 ${colors.ring}` : 'hover:shadow-xl'
      }`}
      onClick={() => onStatusChange(status)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className={`h-8 w-8 ${colors.iconBg} rounded-lg flex items-center justify-center`}>
          <div className={`h-4 w-4 ${colors.iconColor} rounded-full`}></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {value.toLocaleString()}
        </div>
        {description && (
          <p className="text-xs text-gray-600 font-medium">
            {description}
          </p>
        )}
        {completionRate !== undefined && (
          <p className="text-xs text-gray-600 font-medium">
            {completionRate}% dari tahap 1
          </p>
        )}
      </CardContent>
    </Card>
  )
}
