import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import successIcon from '../assets/icons/success.png'

interface SuccessSectionProps {
  onViewStatistics: () => void
  onAddMore: () => void
  title?: string
  message?: string
}

export function SuccessSection({
  onViewStatistics,
  onAddMore,
  title = "Data Berhasil Di kirim",
  message = "Tinjau kembali informasi yang telah diisi. Jika sudah benar, kirim pesan untuk menerima penawaran dalam 24-48 jam."
}: SuccessSectionProps) {
  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
      <CardContent className="p-12 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Main success icon */}
            <div className="relative w-25 h-25 flex items-center justify-center">
              <img src={successIcon} alt="Success"  />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-600 leading-relaxed mb-12 max-w-md mx-auto">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={onViewStatistics}
            size="xl"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-12"
          >
            Tinjau Statistik
          </Button>

          <div>
            <Button
              onClick={onAddMore}
              variant="ghost"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 underline underline-offset-4"
            >
              Tambah Data Lagi
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
