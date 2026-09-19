import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryProvider } from "@/providers/QueryProvider";
import {
  LoginPage,
  HomePage,
  SocializationPage,
  StatisticsPage,
} from "./pages";
import { adminRoutes } from "./routes/admin.routes";

function App() {
  return (
    <QueryProvider>
      <Router>
        <Routes>
          {/* Redirect root to home page */}

          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Public pages */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/socialization" element={<SocializationPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />


          {/* ✅ Admin routes sebagai elemen langsung */}
          {adminRoutes}

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </QueryProvider>
  );
}

export default App;
