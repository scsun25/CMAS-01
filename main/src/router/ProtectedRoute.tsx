import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import { useLoading } from "../context/loadingProvider";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { startLoading, stopLoading } = useLoading();
  const { user, authLoading } = useAuth();

  useEffect(() => {
    startLoading();
    if (!authLoading) {
      stopLoading();
    }
  }, [authLoading, stopLoading, startLoading]);

  if (authLoading) {
    return;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const RedirectSignInRoute = () => {
  const { startLoading, stopLoading } = useLoading();
  const { user, authLoading } = useAuth();

  useEffect(() => {
    startLoading();
    if (!authLoading) {
      stopLoading();
    }
  }, [authLoading, stopLoading, startLoading]);

  if (authLoading) {
    return;
  }
  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export { RedirectSignInRoute, ProtectedRoute };

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/login" replace />;
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }
//   return <Outlet />;
