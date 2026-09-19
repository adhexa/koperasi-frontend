import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Use the consistent auth-storage key that Zustand uses
    localStorage.removeItem("auth-storage");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expired_at");

    setOpenDialog(false);
    navigate("/login"); // Navigate to login instead of home
  };

  return {
    openDialog,
    setOpenDialog,
    handleLogout,
  };
}
