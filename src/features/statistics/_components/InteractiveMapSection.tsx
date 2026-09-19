import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { MapPin, Filter, BarChart3 } from 'lucide-react'
import { InteractiveMap } from '../../../components/InteractiveMap'
import { getStatusColors, type StatusType } from '../../../lib/constants/colors'

interface InteractiveMapSectionProps {
  onProvinceClick: (provinceCode: string, provinceName: string) => void
  selectedStatus: StatusType
  resetToProvinces?: boolean
  statisticsData?: Array<{
    kode_provinsi: string
    nama_provinsi: string
    sosialisasi: number
    terbentuk: number
    berbadan_hukum: number
  }>
}

export function InteractiveMapSection({
  onProvinceClick,
  selectedStatus,
  resetToProvinces = false,
  statisticsData = []
}: InteractiveMapSectionProps) {
  // Get colors based on selected status
  const statusColors = getStatusColors(selectedStatus)

  // Calculate min/max values for legend
  const { minValue, maxValue, hasData } = useMemo(() => {
    if (!statisticsData || statisticsData.length === 0) {
      return { minValue: 0, maxValue: 0, hasData: false }
    }

    const values = statisticsData.map(province => {
      switch(selectedStatus) {
        case 'pembentukan':
          return province.terbentuk
        case 'sudahBerbadanHukum':
          return province.berbadan_hukum
        default:
          return province.terbentuk
      }
    })

    return {
      minValue: Math.min(...values),
      maxValue: Math.max(...values),
      hasData: true
    }
  }, [statisticsData, selectedStatus])

  // Memoize map title to prevent unnecessary recalculations
  const mapTitle = useMemo(() => {
    switch(selectedStatus) {
      case 'pembentukan':
        return 'Peta Interaktif - Koperasi Pembentukan'
      case 'pembentukanAkta':
        return 'Peta Interaktif - Koperasi Pembentukan Akta'
      case 'sudahBerbadanHukum':
        return 'Peta Interaktif - Koperasi Berbadan Hukum'
      default:
        return 'Peta Interaktif Indonesia'
    }
  }, [selectedStatus])

  // Memoize status description to prevent unnecessary recalculations
  const statusDescription = useMemo(() => {
    switch(selectedStatus) {
      case 'pembentukan':
        return 'Klik pada provinsi untuk melihat detail pembentukan koperasi'
      case 'pembentukanAkta':
        return 'Klik pada provinsi untuk melihat detail pembentukan akta koperasi'
      case 'sudahBerbadanHukum':
        return 'Klik pada provinsi untuk melihat detail koperasi berbadan hukum'
      default:
        return 'Klik pada provinsi untuk melihat statistik detail'
    }
  }, [selectedStatus])

  // Memoize current date string to prevent unnecessary recalculations
  const currentDateString = useMemo(() => {
    return new Date().toLocaleDateString('id-ID')
  }, [])

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
      <CardHeader className={`bg-gradient-to-r ${statusColors.gradient} border-b`}>
        <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
          <MapPin className={`h-5 w-5 ${statusColors.text}`} />
          {mapTitle}
        </CardTitle>
        <div className="flex justify-between items-center">
          <p className="text-gray-600 text-sm">
            {statusDescription}
          </p>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <div className="text-sm text-gray-600">Klik kartu status untuk melihat data</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <InteractiveMap
          onProvinceClick={onProvinceClick}
          height="600px"
          showSidebar={false}
          className="w-full"
          selectedStatus={selectedStatus}
          resetToProvinces={resetToProvinces}
          statisticsData={statisticsData}
        />
        <div className={`p-4 border-t ${statusColors.bg}`}>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded opacity-80"
                  style={{ backgroundColor: statusColors.primary }}
                ></div>
                <span>Provinsi Indonesia</span>
              </div>
              {/* Data visualization legend */}
              {hasData && minValue !== maxValue && (
                <div className="flex items-center gap-2 ml-6">
                  <BarChart3 className="h-4 w-4 text-gray-500" />
                  <span className="text-xs text-gray-500">Intensitas warna:</span>
                  <div className="flex items-center gap-1">
                    <div
                      className="w-3 h-3 rounded-sm border border-gray-300"
                      style={{
                        backgroundColor: statusColors.primary,
                        opacity: 0.3
                      }}
                    ></div>
                    <span className="text-xs text-gray-500">{minValue.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 mx-1">—</span>
                    <div
                      className="w-3 h-3 rounded-sm border border-gray-300"
                      style={{
                        backgroundColor: statusColors.primary,
                        opacity: 0.9
                      }}
                    ></div>
                    <span className="text-xs text-gray-500">{maxValue.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
            <span className="text-xs">Data per {currentDateString}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
