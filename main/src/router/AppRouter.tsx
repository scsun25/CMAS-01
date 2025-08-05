import { Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import LoginPage from "../pages/Login/LoginPage";
import PatientPage from "../pages/Patient/PatientPage";
import { ProtectedRoute, RedirectSignInRoute } from "./ProtectedRoute";
import AppointmentPage from "../pages/Appointment/AppointmentPage";

const AppRouter: React.FC = () => (
  <>
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<div>Hello</div>} />
          <Route path="/patient" element={<PatientPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
        </Route>

        <Route element={<RedirectSignInRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Route>
    </Routes>
  </>
);

export default AppRouter;
