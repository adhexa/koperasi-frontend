import logoImage from "../../assets/@logo.png";

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--koperasi-primary-dark)' }} className="text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
          {/* Left Side - Powered by */}
          <div className="flex flex-col items-center gap-2 lg:items-start">
            <span className="text-sm" style={{ color: 'var(--koperasi-text-secondary)' }}>
              Powered by
            </span>
            <img
              src={logoImage}
              alt="Logo Koperasi Merah Putih"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Right Side - Contact Information */}
          <div className="text-sm leading-relaxed" style={{ color: 'var(--koperasi-text-secondary)' }}>
            <div className="mb-2 text-lg font-semibold" style={{ color: 'var(--koperasi-text-primary)' }}>
              Kementerian Dalam Negeri Pusdatin
            </div>
            <div>Gedung B, Lantai 10</div>
            <div>Kantor Pusat Kementerian Dalam Negeri</div>
            <div>Jalan Medan Merdeka Utara No. 7</div>
            <div>Gambir, Jakarta Pusat 10110</div>
            <div>DKI Jakarta, Indonesia</div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{ backgroundColor: 'var(--koperasi-primary-medium)' }} className="py-3">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm" style={{ color: 'var(--koperasi-text-primary)' }}>
            Hak cipta © 2025, Kementerian Dalam Negeri Republik Indonesia |{" "}
            <a
              href="#"
              className="hover:underline transition-colors"
              style={{ color: 'var(--koperasi-text-primary)' }}
            >
              Syarat dan Ketentuan
            </a>{" "}
            |{" "}
            <a
              href="#"
              className="hover:underline transition-colors"
              style={{ color: 'var(--koperasi-text-primary)' }}
            >
              Petunjuk Penggunaan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
