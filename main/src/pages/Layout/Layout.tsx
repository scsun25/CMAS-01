import { Menubar } from "primereact/menubar";
import { Outlet } from "react-router-dom";
import { menuItems } from "./layoutConfig";
import { useAuth } from "../../context/authProvider";
import LayoutSideBar from "./LayoutSideBar";
import React from "react";

const Layout = () => {
  const { user } = useAuth();

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Menubar
        start={user ? <></> : <p>Welcome to CMAS</p>}
        model={user ? menuItems : []}
        end={<LayoutSideBar />}
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 200,
        }}
      />
      <div style={{ flex: 1, overflow: "auto" }}>
        <Outlet />
      </div>
      <footer
        style={{
          textAlign: "center",
          padding: "1rem 0",
          color: "#888",
          background: "#fafafa",
          position: "sticky",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
        }}
      >
        © 2025 CMAS Powered by Therapilot and Supabase
      </footer>
    </div>
  );
};

export default React.memo(Layout);
