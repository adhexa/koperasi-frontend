import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "./ui/alert-dialog"
import { AlertTriangle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

interface ComparisonData {
  id: string
  tanggalSosialisasi: string
  kabupatenKota: string
  kecamatan: string
  desaKelurahan: string
  status: string
  source: 'existing' | 'excel'
  isConflict?: boolean
}

interface SummaryData {
  kabupatenKota: string
  desa: number
  kelurahan: number
  total: number
  sosialisasi: number
  terbentuk: number
  pembuatanAkta: number
  berbadanHukum: number
}

interface ComparisonDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  existingData: ComparisonData[]
  excelData: ComparisonData[]
  onConfirm: () => void
  onCancel: () => void
}

export function ComparisonDialog({
  open,
  onOpenChange,
  existingData,
  excelData,
  onConfirm,
  onCancel,
}: ComparisonDialogProps) {
  // Create summary data by aggregating by kabupaten/kota
  const getSummaryData = (data: ComparisonData[]): SummaryData[] => {
    return data.reduce((acc, item) => {
      const existingKab = acc.find(k => k.kabupatenKota === item.kabupatenKota);
      if (existingKab) {
        existingKab.total += 1;
        existingKab.desa += 1; // Assuming all are desa for now
        if (item.status === 'pembentukan') {
          existingKab.sosialisasi += 1;
          existingKab.terbentuk += 1;
        }
        if (item.status === 'pembentukan-akta') existingKab.pembuatanAkta += 1;
        if (item.status === 'sudah-berbadan-hukum') existingKab.berbadanHukum += 1;
      } else {
        acc.push({
          kabupatenKota: item.kabupatenKota,
          desa: 1,
          kelurahan: 0,
          total: 1,
          sosialisasi: item.status === 'pembentukan' ? 1 : 0,
          terbentuk: item.status === 'pembentukan' ? 1 : 0,
          pembuatanAkta: item.status === 'pembentukan-akta' ? 1 : 0,
          berbadanHukum: item.status === 'sudah-berbadan-hukum' ? 1 : 0
        });
      }
      return acc;
    }, [] as SummaryData[]);
  };

  const existingSummaryData = getSummaryData(existingData);
  const newSummaryData = getSummaryData(excelData);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[98vw] max-h-[95vh] min-w-[1400px] min-h-[600px] flex flex-col comparison-dialog">
        <style>{`
          /* Disable ALL hover effects for table headers */
          .comparison-dialog th {
            background-color: inherit !important;
            cursor: default !important;
          }
          .comparison-dialog th:hover {
            background-color: inherit !important;
          }
          .comparison-dialog thead tr:hover th {
            background-color: inherit !important;
          }
          .comparison-dialog .bg-blue-500 {
            background-color: #3b82f6 !important;
          }
          .comparison-dialog .bg-blue-400 {
            background-color: #60a5fa !important;
          }
          .comparison-dialog .bg-green-500 {
            background-color: #22c55e !important;
          }
          .comparison-dialog .bg-green-400 {
            background-color: #4ade80 !important;
          }
          /* Main dialog scroll styling */
          .dialog-scroll-container {
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 #f1f5f9;
          }
          .dialog-scroll-container::-webkit-scrollbar {
            width: 12px;
          }
          .dialog-scroll-container::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 6px;
          }
          .dialog-scroll-container::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 6px;
          }
          .dialog-scroll-container::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}</style>

        <AlertDialogHeader className="flex-shrink-0">
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Perbandingan Data Sosialisasi
          </AlertDialogTitle>
          <AlertDialogDescription>
            Berikut adalah perbandingan antara data yang sudah ada dengan data dari file Excel yang baru diupload.
            Silakan tinjau perubahan sebelum melanjutkan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex-1 overflow-y-auto dialog-scroll-container">
          <div className="grid grid-cols-2 gap-4">
            {/* Existing Data Table */}
                <div className="bg-white rounded-lg border">
                  <div className="bg-blue-600 text-white p-4 text-center">
                    <h3 className="text-lg font-bold">REKAPITULASI</h3>
                    <h3 className="text-lg font-bold">PEMBENTUKAN KOPERASI DESA / KELURAHAN</h3>
                    <h3 className="text-lg font-bold">" MERAH PUTIH "</h3>
                <p className="text-sm opacity-90">DATA EXISTING ({existingData.length})</p>
                  </div>

                  <div className="overflow-x-auto">
                    <Table className="w-full comparison-table">
                      <TableHeader>
                        <TableRow className="bg-blue-500 text-white">
                          <TableHead
                            className="text-white text-center border-r border-blue-400"
                            colSpan={3}
                            style={{ backgroundColor: '#60a5fa' }}
                          >
                            Jumlah
                          </TableHead>
                          <TableHead
                            className="text-white text-center border-r border-blue-400"
                            colSpan={3}
                            style={{ backgroundColor: '#60a5fa' }}
                          >
                            Tahapan
                          </TableHead>
                          <TableHead
                            rowSpan={2}
                            className="text-white text-center align-middle"
                            style={{ verticalAlign: 'middle', backgroundColor: '#60a5fa' }}
                          >
                            Sudah Berbadan Hukum
                          </TableHead>
                        </TableRow>
                        <TableRow className="bg-blue-400 text-white">
                          <TableHead
                            className="text-white text-center border-r border-blue-300 min-w-[80px]"
                            style={{ backgroundColor: '#60a5fa' }}
                          >
                            Desa
                          </TableHead>
                          <TableHead
                            className="text-white text-center border-r border-blue-300 min-w-[80px]"
                            style={{ backgroundColor: '#60a5fa' }}
                          >
                            Kelurahan
                          </TableHead>
                          <TableHead
                            className="text-white text-center border-r border-blue-300 min-w-[80px]"
                            style={{ backgroundColor: '#60a5fa' }}
                          >
                            Total
                          </TableHead>
                          <TableHead
                            className="text-white text-center border-r border-blue-300 min-w-[100px]"
                            style={{ backgroundColor: '#60a5fa' }}
                          >
                            Sosialisasi
                          </TableHead>
                          <TableHead
                            className="text-white text-center border-r border-blue-300 min-w-[100px]"
                            style={{ backgroundColor: '#60a5fa' }}
                          >
                            Terbentuk
                          </TableHead>
                          <TableHead
                            className="text-white text-center border-r border-blue-300 min-w-[120px]"
                            style={{ backgroundColor: '#60a5fa' }}
                          >
                            Dalam Proses Pembuatan Akta
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                    {existingSummaryData.map((summary, index) => (
                          <TableRow key={index} className="hover:bg-blue-50">
                            <TableCell className="text-center border-r">{summary.desa}</TableCell>
                            <TableCell className="text-center border-r">{summary.kelurahan}</TableCell>
                            <TableCell className="text-center border-r font-bold text-blue-600">{summary.total}</TableCell>
                            <TableCell className="text-center border-r">{summary.sosialisasi}</TableCell>
                            <TableCell className="text-center border-r">{summary.terbentuk}</TableCell>
                            <TableCell className="text-center border-r">{summary.pembuatanAkta}</TableCell>
                            <TableCell className="text-center">{summary.berbadanHukum}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-blue-100 font-bold">
                          <TableCell className="text-center border-r font-bold">
                        {existingSummaryData.reduce((acc, item) => acc + item.desa, 0)}
                          </TableCell>
                          <TableCell className="text-center border-r font-bold">0</TableCell>
                          <TableCell className="text-center border-r font-bold text-blue-600">
                            {existingData.length}
                          </TableCell>
                          <TableCell className="text-center border-r font-bold">
                            {existingData.filter(item => item.status === 'pembentukan').length}
                          </TableCell>
                          <TableCell className="text-center border-r font-bold">
                            {existingData.filter(item => item.status === 'pembentukan').length}
                          </TableCell>
                          <TableCell className="text-center border-r font-bold">
                            {existingData.filter(item => item.status === 'pembentukan-akta').length}
                          </TableCell>
                      <TableCell className="text-center font-bold">
                            {existingData.filter(item => item.status === 'sudah-berbadan-hukum').length}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

            {/* New Data Table */}
                <div className="bg-white rounded-lg border">
                  <div className="bg-green-600 text-white p-4 text-center">
                    <h3 className="text-lg font-bold">REKAPITULASI</h3>
                    <h3 className="text-lg font-bold">PEMBENTUKAN KOPERASI DESA / KELURAHAN</h3>
                    <h3 className="text-lg font-bold">" MERAH PUTIH "</h3>
                <p className="text-sm opacity-90">DATA EXCEL ({excelData.length})</p>
                  </div>

                  <div className="overflow-x-auto">
                <Table className="w-full comparison-table">
                      <TableHeader>
                        <TableRow className="bg-green-500 text-white">
                          <TableHead
                            className="text-white text-center border-r border-green-400"
                            colSpan={3}
                            style={{ backgroundColor: '#4ade80' }}
                          >
                            Jumlah
                          </TableHead>
                          <TableHead
                            className="text-white text-center border-r border-green-400"
                            colSpan={3}
                            style={{ backgroundColor: '#4ade80' }}
                          >
                            Tahapan
                          </TableHead>
                          <TableHead
                            rowSpan={2}
                        className="text-white text-center align-middle"
                            style={{ verticalAlign: 'middle', backgroundColor: '#4ade80' }}
                          >
                            Sudah Berbadan Hukum
                          </TableHead>
                        </TableRow>
                        <TableRow className="bg-green-400 text-white">
                          <TableHead
                            className="text-white text-center border-r border-green-300 min-w-[80px]"
                            style={{ backgroundColor: '#4ade80' }}
                          >
                            Desa
                          </TableHead>
                          <TableHead
                            className="text-white text-center border-r border-green-300 min-w-[80px]"
                            style={{ backgroundColor: '#4ade80' }}
                          >
                            Kelurahan
                          </TableHead>
                          <TableHead
                            className="text-white text-center border-r border-green-300 min-w-[80px]"
                            style={{ backgroundColor: '#4ade80' }}
                          >
                            Total
                          </TableHead>
                          <TableHead
                            className="text-white text-center border-r border-green-300 min-w-[100px]"
                            style={{ backgroundColor: '#4ade80' }}
                          >
                            Sosialisasi
                          </TableHead>
                          <TableHead
                            className="text-white text-center border-r border-green-300 min-w-[100px]"
                            style={{ backgroundColor: '#4ade80' }}
                          >
                            Terbentuk
                          </TableHead>
                          <TableHead
                            className="text-white text-center border-r border-green-300 min-w-[120px]"
                            style={{ backgroundColor: '#4ade80' }}
                          >
                            Dalam Proses Pembuatan Akta
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                    {newSummaryData.map((summary, index) => (
                      <TableRow key={index} className="hover:bg-green-50">
                              <TableCell className="text-center border-r">{summary.desa}</TableCell>
                              <TableCell className="text-center border-r">{summary.kelurahan}</TableCell>
                              <TableCell className="text-center border-r font-bold text-green-600">{summary.total}</TableCell>
                              <TableCell className="text-center border-r">{summary.sosialisasi}</TableCell>
                              <TableCell className="text-center border-r">{summary.terbentuk}</TableCell>
                              <TableCell className="text-center border-r">{summary.pembuatanAkta}</TableCell>
                        <TableCell className="text-center">{summary.berbadanHukum}</TableCell>
                            </TableRow>
                    ))}
                        <TableRow className="bg-green-100 font-bold">
                          <TableCell className="text-center border-r font-bold">
                        {newSummaryData.reduce((acc, item) => acc + item.desa, 0)}
                          </TableCell>
                          <TableCell className="text-center border-r font-bold">0</TableCell>
                          <TableCell className="text-center border-r font-bold text-green-600">
                            {excelData.length}
                          </TableCell>
                          <TableCell className="text-center border-r font-bold">
                            {excelData.filter(item => item.status === 'pembentukan').length}
                          </TableCell>
                          <TableCell className="text-center border-r font-bold">
                            {excelData.filter(item => item.status === 'pembentukan').length}
                          </TableCell>
                          <TableCell className="text-center border-r font-bold">
                            {excelData.filter(item => item.status === 'pembentukan-akta').length}
                          </TableCell>
                      <TableCell className="text-center font-bold">
                            {excelData.filter(item => item.status === 'sudah-berbadan-hukum').length}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
            </div>
        </div>

        <AlertDialogFooter className="flex-shrink-0">
          <AlertDialogCancel onClick={onCancel}>
            Batalkan
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-blue-600 hover:bg-blue-700">
            Lanjutkan Import
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
