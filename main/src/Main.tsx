import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "./main.css";

import { PrimeReactProvider } from "primereact/api";
import { ProgressSpinner } from "primereact/progressspinner";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { AuthgProvider, useAuth } from "./context/authProvider";
import { LoadingProvider, useLoading } from "./context/loadingProvider";
import AppRouter from "./router/AppRouter";

const Main = () => {
  // Hook
  const { loading } = useLoading();
  const { user } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [JSON.stringify(user)]);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(255,255,255,1)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ProgressSpinner style={{ width: 80, height: 80 }} strokeWidth="4" />
        </div>
      )}
      <AppRouter />
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <PrimeReactProvider>
        <AuthgProvider>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </AuthgProvider>
      </PrimeReactProvider>
    </LoadingProvider>
  </StrictMode>
);
