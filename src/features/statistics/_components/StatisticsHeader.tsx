import { BarChart3, LucideIcon } from 'lucide-react'
import type { StatisticsHeaderProps } from '../types'

interface PageHeaderProps {
  title: string
  description: string
  icon?: LucideIcon
  showRealTimeIndicator?: boolean
  actions?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  icon: Icon = BarChart3,
}: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-2 md:p-3 rounded-xl shadow-lg" style={{ backgroundColor: 'var(--koperasi-primary-dark)' }}>
              <Icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 leading-tight" style={{ color: 'var(--koperasi-primary-dark)' }}>
                {title}
              </h1>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {description}
              </p>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

// Keep the original StatisticsHeader for backward compatibility
export function StatisticsHeader({ title, description }: StatisticsHeaderProps) {
  return (
    <PageHeader
      title={title}
      description={description}
      icon={BarChart3}
      showRealTimeIndicator={true}
    />
  )
}
