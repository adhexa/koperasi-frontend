import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  User,
  LogOut,
  ChevronDown,
  Home,
  FileText,
  Users,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import logoImage from "../../assets/@logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// Header color constants using CSS variables
const HEADER_COLORS = {
  topBg: 'var(--koperasi-primary-dark)',
  menuBg: 'var(--koperasi-primary-medium)',
  infoBg: 'var(--koperasi-accent-gold)',
  hoverBg: 'var(--koperasi-primary-light)',
  activeBorder: 'var(--koperasi-accent-blue)',
  textPrimary: 'var(--koperasi-text-primary)',
  textSecondary: 'var(--koperasi-text-secondary)',
  infoText: 'var(--koperasi-text-dark)'
} as const;

interface HeaderProps {
  user?: {
    name: string;
    email: string;
  };
  onLogout?: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Reusable navigation item component to reduce redundancy
  const NavItem = ({ to, icon: Icon, label, isActive, onClick }: NavItemProps) => (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
        isActive ? "border-b-2 md:border-b-2 md:border-l-0" : ""
      } md:border-l-0 hover:bg-opacity-20`}
      style={{
        color: isActive ? HEADER_COLORS.textPrimary : HEADER_COLORS.textSecondary,
        backgroundColor: isActive ? HEADER_COLORS.hoverBg : 'transparent',
        borderBottomColor: isActive ? HEADER_COLORS.activeBorder : 'transparent'
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = HEADER_COLORS.textPrimary;
          e.currentTarget.style.backgroundColor = HEADER_COLORS.hoverBg;
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = HEADER_COLORS.textSecondary;
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );

  const navigationItems = [
    { to: "/home", icon: Home, label: "Beranda" },
    { to: "/news", icon: FileText, label: "Berita" },
    { to: "/statistics", icon: BarChart3, label: "Statistik" },
    { to: "/socialization", icon: Users, label: "Sosialisasi" },
  ];

  return (
    <header className="shadow-lg" style={{ backgroundColor: HEADER_COLORS.topBg }}>
      {/* Top Row - Logo and User Actions */}
      <div className="border-b" style={{ borderColor: HEADER_COLORS.hoverBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/home"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img
                src={logoImage}
                alt="Logo"
                className="h-12 md:h-20 w-auto"
              />
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="flex items-center gap-1 px-2 py-1 rounded-md transition-colors cursor-pointer outline-none"
                      style={{ color: HEADER_COLORS.textPrimary }}
                    >
                      <User className="h-4 w-4" />
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48" align="end">
                    <DropdownMenuLabel className="font-medium">
                      {user.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                      onClick={onLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : !isLoginPage ? (
                <Link to="/login">
                  <button
                    className="px-3 py-1 text-xs font-medium rounded-md border transition-colors"
                    style={{
                      backgroundColor: HEADER_COLORS.textPrimary,
                      color: HEADER_COLORS.topBg,
                      borderColor: HEADER_COLORS.textPrimary
                    }}
                  >
                    Masuk
                  </button>
                </Link>
              ) : null}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md transition-colors"
                style={{ color: HEADER_COLORS.textPrimary }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = HEADER_COLORS.hoverBg}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer outline-none"
                      style={{ color: HEADER_COLORS.textPrimary }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = HEADER_COLORS.hoverBg}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <User className="h-4 w-4" />
                      <span className="text-sm font-medium">{user.name}</span>
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48" align="end">
                    <DropdownMenuLabel className="font-medium">
                      {user.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                      onClick={onLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : !isLoginPage ? (
                <Link to="/login">
                  <button
                    className="px-5 py-2 text-sm font-medium rounded-md border transition-colors"
                    style={{
                      backgroundColor: HEADER_COLORS.textPrimary,
                      color: HEADER_COLORS.topBg,
                      borderColor: HEADER_COLORS.textPrimary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = HEADER_COLORS.textPrimary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = HEADER_COLORS.textPrimary;
                      e.currentTarget.style.color = HEADER_COLORS.topBg;
                    }}
                  >
                    Masuk
                  </button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Menu */}
      <div className="hidden md:block" style={{ backgroundColor: HEADER_COLORS.menuBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center space-x-8">
            {navigationItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.to}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" style={{ backgroundColor: HEADER_COLORS.menuBg }}>
          <nav className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.to}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </nav>
        </div>
      )}

      {/* Information Banner */}
      <div
        className="text-center py-2 px-4"
        style={{
          backgroundColor: HEADER_COLORS.infoBg,
          color: HEADER_COLORS.infoText
        }}
      >
        <p className="text-xs md:text-sm font-medium">
          Butuh bantuan? Tim support kami siap membantu Anda -{" "}
          <button
            className="underline hover:no-underline font-semibold transition-all"
            style={{ color: HEADER_COLORS.infoText }}
            onClick={() => {
              // You can replace this with actual contact logic
              window.open('mailto:admin@koperasi.com', '_blank');
            }}
          >
            hubungi kami sekarang
          </button>
        </p>
      </div>
    </header>
  );
}
