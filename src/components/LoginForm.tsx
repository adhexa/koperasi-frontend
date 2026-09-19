import { useState } from "react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Eye, EyeOff } from "lucide-react"
import indonesiaBanner from "../assets/indonesia-banner.svg"

interface LoginFormProps {
  onSubmit?: (data: { emailOrUsername: string; password: string; recaptchaToken: string }) => void
  isLoading?: boolean
  className?: string
}

export function LoginForm({ onSubmit, isLoading = false, className }: LoginFormProps) {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [recaptchaToken] = useState<string>("test") // Static for now since reCAPTCHA is commented out

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA verification")
      return
    }
    onSubmit?.({ ...formData, recaptchaToken })
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-no-repeat bg-center bg-cover font-sans ${className || ""}`}
      style={{
        fontFamily: 'Poppins, sans-serif',
        backgroundImage: `url(${indonesiaBanner})`,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
      }}
    >
      <Card className="w-full max-w-md mx-4 bg-white shadow-2xl">
        <CardHeader className="text-center pb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Masuk</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email or Username Field */}
            <div className="space-y-2">
              <Label htmlFor="emailOrUsername" className="text-gray-600">
                Email atau Username
              </Label>
              <Input
                id="emailOrUsername"
                type="text"
                placeholder="jimy@"
                value={formData.emailOrUsername}
                onChange={(e) => handleInputChange("emailOrUsername", e.target.value)}
                className="border-gray-300"
                style={{
                  borderColor: 'var(--koperasi-text-secondary)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--koperasi-primary-dark)';
                  e.target.style.boxShadow = '0 0 0 1px var(--koperasi-primary-dark)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--koperasi-text-secondary)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-600">
                  Kata Sandi
                </Label>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  Sembunyikan
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="123456"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="border-gray-300"
                  style={{
                    borderColor: 'var(--koperasi-text-secondary)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--koperasi-primary-dark)';
                    e.target.style.boxShadow = '0 0 0 1px var(--koperasi-primary-dark)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--koperasi-text-secondary)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div className="text-right">
                                <button
                  type="button"
                  className="text-sm underline transition-colors"
                  style={{
                    color: 'var(--koperasi-primary-dark)'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.color = 'var(--koperasi-primary-medium)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.color = 'var(--koperasi-primary-dark)';
                  }}
                >
                  Lupa Kata Sandi
                </button>
              </div>
            </div>

            {/* Google reCAPTCHA */}
            {/* <div className="space-y-2">
              <p className="text-center text-sm text-gray-600">
                Untuk keamanan, <span className="underline">lengkapi verifikasi reCAPTCHA</span>
              </p>
              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeK4VIrAAAAAILAO2VraP7mRr4yDD8WpIIk13Lf"
                  onChange={handleRecaptchaChange}
                  theme="light"
                />
              </div>
            </div> */}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-white font-medium py-3 rounded-lg transition-colors"
              style={{
                backgroundColor: isLoading ? 'var(--koperasi-text-secondary)' : 'var(--koperasi-primary-dark)',
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  (e.target as HTMLButtonElement).style.backgroundColor = 'var(--koperasi-primary-medium)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  (e.target as HTMLButtonElement).style.backgroundColor = 'var(--koperasi-primary-dark)';
                }
              }}
            >
              {isLoading ? "Logging in..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
