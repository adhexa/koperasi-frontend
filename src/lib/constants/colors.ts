// Color constants for synchronized UI components
export const STATUS_COLORS = {
  pembentukan: {
    primary: '#3B82F6', // blue-500
    light: '#EFF6FF', // blue-50
    medium: '#DBEAFE', // blue-100
    dark: '#1E40AF', // blue-700
    ring: 'ring-blue-500',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-50',
    iconColor: 'bg-blue-500',
    text: 'text-blue-600',
    textDark: 'text-blue-700',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-100',
    gradient: 'from-blue-50 to-blue-100'
  },
  pembentukanAkta: {
    primary: '#10B981', // green-500
    light: '#ECFDF5', // green-50
    medium: '#D1FAE5', // green-100
    dark: '#047857', // green-700
    ring: 'ring-green-500',
    bg: 'bg-green-50',
    iconBg: 'bg-green-50',
    iconColor: 'bg-green-500',
    text: 'text-green-600',
    textDark: 'text-green-700',
    border: 'border-green-200',
    hover: 'hover:bg-green-100',
    gradient: 'from-green-50 to-green-100'
  },
  sudahBerbadanHukum: {
    primary: '#F59E0B', // orange-500
    light: '#FFFBEB', // orange-50
    medium: '#FEF3C7', // orange-100
    dark: '#D97706', // orange-700
    ring: 'ring-orange-500',
    bg: 'bg-orange-50',
    iconBg: 'bg-orange-50',
    iconColor: 'bg-orange-500',
    text: 'text-orange-600',
    textDark: 'text-orange-700',
    border: 'border-orange-200',
    hover: 'hover:bg-orange-100',
    gradient: 'from-orange-50 to-orange-100'
  }
} as const

export type StatusType = keyof typeof STATUS_COLORS

// Map status to color scheme
export const getStatusColors = (status: StatusType) => {
  return STATUS_COLORS[status] || STATUS_COLORS.pembentukan
}

// Leaflet map colors based on status
export const getMapColors = (status: StatusType) => {
  const colors = getStatusColors(status)
  return {
    fillColor: colors.primary,
    strokeColor: colors.dark,
    hoverFillColor: colors.medium,
    hoverStrokeColor: colors.dark
  }
}
