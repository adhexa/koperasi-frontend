import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Layout } from '../components/layout/Layout'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Input } from '../components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs'
import { DatePicker } from '../components/ui/datepicker'
import { SuccessSection } from '../components/SuccessSection'
import { ComparisonDialog } from '../components/ComparisonDialog'
import { PageHeader } from '../features/statistics'
import { CalendarDays, Building2, CheckCircle, FileText, X, Upload } from 'lucide-react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import uploadIcon from '../assets/icons/upload.png'

// Type definitions
const formSchema = z.object({
  kodeProvinsi: z.string().min(1, "Kode provinsi wajib diisi."),
  kodeKobkot: z.string().min(1, "Kode kabupaten/kota wajib diisi."),
  kodeKecamatan: z.string().min(1, "Kode kecamatan wajib diisi."),
  kodeDesa: z.string().min(1, "Kode desa wajib diisi."),
  namaKoperasi: z.string().min(1, "Nama koperasi wajib diisi."),
  tanggalRegistrasi: z.string().min(1, "Tanggal registrasi wajib dipilih."),
  alamat: z.string().min(1, "Alamat wajib diisi."),
  pic: z.string().min(1, "PIC wajib diisi."),
  status: z.object({
    sosialisasi: z.boolean(),
    terbentuk: z.boolean(),
    dalamProsesPembuatanAkta: z.boolean(),
    sudahBerbadanHukum: z.boolean(),
  }).refine((data) => Object.values(data).some(Boolean), "Minimal satu status harus dipilih."),
})

type FormData = z.infer<typeof formSchema>
type StatusKeys = keyof FormData['status']

// Interface definitions for component props
interface LocationOption {
  value: string
  label: string
}

interface StatusStep {
  key: StatusKeys
  label: string
  color: string
  number: number
}

interface LocationSelectProps {
  name: keyof Omit<FormData, 'status'>
  label: string
  options: LocationOption[]
  form: ReturnType<typeof useForm<FormData>>
}

interface StatusCheckboxProps {
  step: StatusStep
  isChecked: boolean
  onChange: (checked: boolean) => void
}

// Constants
const STATUS_STEPS: StatusStep[] = [
  { key: 'sosialisasi', label: 'Sosialisasi', color: 'blue', number: 1 },
  { key: 'terbentuk', label: 'Terbentuk', color: 'green', number: 2 },
  { key: 'dalamProsesPembuatanAkta', label: 'Dalam Proses Pembuatan Akta', color: 'orange', number: 3 },
  { key: 'sudahBerbadanHukum', label: 'Sudah Berbadan Hukum', color: 'purple', number: 4 },
]

const LOCATION_OPTIONS = {
  provinsi: [{ value: 'Gorontalo', label: 'Gorontalo' }, { value: 'Aceh', label: 'Aceh' }],
  kabkot: [{ value: 'Kabupaten Boalemo', label: 'Kabupaten Boalemo' }, { value: 'Kabupaten Gorontalo', label: 'Kabupaten Gorontalo' }],
  kecamatan: [{ value: 'Telaga', label: 'Telaga' }, { value: 'Bone', label: 'Bone' }],
  desa: [{ value: 'Bulota', label: 'Bulota' }, { value: 'Pentadio', label: 'Pentadio' }]
}

// Reusable Components
const LocationSelect = ({ name, label, options, form }: LocationSelectProps) => (
  <FormField control={form.control} name={name} render={({ field }) => (
    <FormItem>
      <FormLabel className="text-gray-700 font-medium">{label}</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500">
            <SelectValue placeholder={`Pilih ${label}`} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((option: LocationOption) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )} />
)

const StatusCheckbox = ({ step, isChecked, onChange }: StatusCheckboxProps) => {
  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors bg-white">
      <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
        isChecked ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
      }`}>
        {step.number}
      </div>

      <FormControl>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </FormControl>

      <div className="flex-1">
        <FormLabel className="text-sm font-medium text-gray-700 cursor-pointer">
          {step.label}
        </FormLabel>
        {isChecked && (
          <p className="text-xs text-blue-600 mt-1">✓ Status tercapai</p>
        )}
      </div>
    </div>
  )
}

export function SocializationPage() {
  const navigate = useNavigate()
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showComparisonDialog, setShowComparisonDialog] = React.useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kodeProvinsi: "", kodeKobkot: "", kodeKecamatan: "", kodeDesa: "",
      namaKoperasi: "", tanggalRegistrasi: "", alamat: "", pic: "",
      status: { sosialisasi: false, terbentuk: false, dalamProsesPembuatanAkta: false, sudahBerbadanHukum: false },
    },
  })

  const handleStatusChange = (statusKey: StatusKeys, checked: boolean) => {
    const statusOrder: StatusKeys[] = ['sosialisasi', 'terbentuk', 'dalamProsesPembuatanAkta', 'sudahBerbadanHukum']
    const currentIndex = statusOrder.indexOf(statusKey)
    const currentStatus = form.getValues('status')
    const newStatus = { ...currentStatus }

    if (checked) {
      for (let i = 0; i <= currentIndex; i++) {
        newStatus[statusOrder[i]] = true
      }
    } else {
      for (let i = currentIndex; i < statusOrder.length; i++) {
        newStatus[statusOrder[i]] = false
      }
    }

    form.setValue('status', newStatus, { shouldValidate: true })
  }

  const onSubmit = (values: FormData) => {
    const statusOrder: StatusKeys[] = ['sosialisasi', 'terbentuk', 'dalamProsesPembuatanAkta', 'sudahBerbadanHukum']
    const highestStatus = statusOrder.reverse().find(key => values.status[key]) || ''

    console.log('Submitted:', { ...values, status: highestStatus })
    setShowSuccess(true)
    form.reset()
  }

  const handleFileUpload = (files: FileList | null) => {
    if (files?.[0] && (files[0].name.endsWith('.xlsx') || files[0].name.endsWith('.xls'))) {
      setUploadedFile(files[0])
    } else {
      alert('Hanya file Excel (.xlsx, .xls) yang diperbolehkan')
    }
  }

  const dragHandlers = {
    onDragOver: (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true) },
    onDragLeave: (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false) },
    onDrop: (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); handleFileUpload(e.dataTransfer.files) }
  }

  if (showSuccess) {
    return (
      <Layout>
        <SuccessSection
          onViewStatistics={() => navigate('/statistics')}
          onAddMore={() => { setShowSuccess(false); form.reset() }}
        />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <PageHeader
          title="Dokumen Sosialisasi"
          description="Upload dokumen anda atau drag di bawah sini"
          icon={Upload}
          showRealTimeIndicator={false}

        />

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
            <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <CardTitle className="text-2xl text-gray-800 mb-2">
                <CalendarDays className="inline-block mr-2 h-6 w-6 text-blue-600" />
                Form Sosialisasi
              </CardTitle>
              <p className="text-gray-600">Pilih metode pengisian data sosialisasi</p>
            </CardHeader>

            <CardContent className="p-8">
              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="manual" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Input Manual
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <img src={uploadIcon} alt="Upload" className="h-4 w-4" />
                    Upload Excel
                  </TabsTrigger>
                </TabsList>

                {/* Manual Input Tab */}
                <TabsContent value="manual">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                      {/* Status Selection */}
                      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                        <div className="flex items-center gap-2 mb-4">
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                          <h3 className="text-lg font-semibold text-gray-800">Status Koperasi</h3>
                        </div>

                        <p className="text-sm text-gray-600 mb-6">
                          Pilih status tertinggi yang telah dicapai. Status sebelumnya akan otomatis tercentang.
                        </p>

                        <div className="space-y-3">
                          {STATUS_STEPS.map((step) => {
                            const currentStatus = form.watch('status')
                            return (
                              <StatusCheckbox
                                key={step.key}
                                step={step}
                                isChecked={currentStatus[step.key]}
                                onChange={(checked) => handleStatusChange(step.key, checked)}
                              />
                            )
                          })}
                        </div>

                        {/* Progress Indicator */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress:</span>
                            <span className="font-medium text-blue-600">
                              {Object.values(form.watch('status') || {}).filter(Boolean).length} / {STATUS_STEPS.length} tahap
                            </span>
                          </div>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${(Object.values(form.watch('status') || {}).filter(Boolean).length / STATUS_STEPS.length) * 100}%`
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Basic Info */}
                      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                        <div className="flex items-center gap-2 mb-6">
                          <Building2 className="h-5 w-5 text-blue-600" />
                          <h3 className="text-lg font-semibold text-gray-800">Tambah Koperasi</h3>
                        </div>

                        <div className="space-y-6">
                          {/* <LocationSelect name="kodeProvinsi" label="Provinsi" options={LOCATION_OPTIONS.provinsi} form={form} />
                          <LocationSelect name="kodeKobkot" label="Kabupaten/Kota" options={LOCATION_OPTIONS.kabkot} form={form} />
                          <LocationSelect name="kodeKecamatan" label="Kecamatan" options={LOCATION_OPTIONS.kecamatan} form={form} /> */}
                          <LocationSelect name="kodeDesa" label="Desa/Kelurahan" options={LOCATION_OPTIONS.desa} form={form} />

                          <FormField control={form.control} name="namaKoperasi" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">Nama Koperasi</FormLabel>
                              <FormControl>
                                <Input placeholder="Nama Koperasi" {...field} className="bg-white border-gray-300 focus:border-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />

                          <FormField control={form.control} name="tanggalRegistrasi" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">Tanggal Registrasi</FormLabel>
                              <FormControl>
                                <DatePicker
                                  value={field.value ? new Date(field.value) : undefined}
                                  onChange={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                                  placeholder="Pilih tanggal registrasi"
                                  disabled={(date) => date > new Date()}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />

                          <FormField control={form.control} name="alamat" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">Alamat</FormLabel>
                              <FormControl>
                                <Input placeholder="Masukkan alamat lengkap" {...field} className="bg-white border-gray-300 focus:border-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />

                          <FormField control={form.control} name="pic" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">PIC (Person In Charge)</FormLabel>
                              <FormControl>
                                <Input placeholder="Masukkan nama PIC" {...field} className="bg-white border-gray-300 focus:border-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end pt-4">
                        <Button type="submit" size="xl" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200" disabled={form.formState.isSubmitting}>
                          {form.formState.isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Mengirim...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-5 w-5" />
                              Kirim Data
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </TabsContent>

                {/* File Upload Tab */}
                <TabsContent value="upload">
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                      <div className="flex items-center gap-2 mb-6">
                        <img src={uploadIcon} alt="Upload" className="h-5 w-5" />
                        <h3 className="text-lg font-semibold text-gray-800">Media Unggah</h3>
                        <Button type="button" variant="ghost" size="sm" className="ml-auto" onClick={() => setUploadedFile(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">Tambahkan file datamu di sini, Maksimal 20Mb</p>

                      {!uploadedFile ? (
                        <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`} {...dragHandlers}>
                          <div className="flex flex-col items-center space-y-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                              <img src={uploadIcon} alt="Upload" className="h-8 w-8" />
                            </div>
                            <div>
                              <p className="text-gray-700 font-medium mb-1">Drag your file(s) to start uploading</p>
                              <p className="text-gray-500 text-sm mb-4">OR</p>
                              <input type="file" accept=".xlsx,.xls" onChange={(e) => handleFileUpload(e.target.files)} className="hidden" id="file-upload" />
                              <label htmlFor="file-upload">
                                <Button type="button" variant="outline" className="cursor-pointer" asChild>
                                  <span>Browse files</span>
                                </Button>
                              </label>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-green-100 rounded">
                                <FileText className="h-6 w-6 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                                <p className="text-sm text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                            </div>
                            <Button type="button" variant="ghost" size="sm" onClick={() => setUploadedFile(null)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-gray-500 mt-4">Hanya mendukung file .xlsx (excel)</p>
                    </div>

                    <div className="flex justify-end pt-4">
                      <div className="flex gap-3">
                        <Button type="button" variant="outline" size="xl" className="border-gray-300 hover:bg-gray-50">
                          Batalkan
                        </Button>
                        <Button type="button" size="xl" onClick={() => uploadedFile && setShowComparisonDialog(true)} disabled={!uploadedFile} className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50">
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Berikutnya
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <ComparisonDialog
        open={showComparisonDialog}
        onOpenChange={setShowComparisonDialog}
        existingData={[]}
        excelData={[]}
        onConfirm={() => { setShowComparisonDialog(false); setShowSuccess(true); setUploadedFile(null) }}
        onCancel={() => { setShowComparisonDialog(false); setUploadedFile(null) }}
      />
    </Layout>
  )
}