import { Menubar } from "primereact/menubar";
import { Outlet } from "react-router-dom";
import { menuItems } from "./layoutConfig";
import { useAuth } from "../../context/authProvider";
import LayoutSideBar from "./LayoutSideBar";
import React from "react";

const Layout = () => {
  const { user } = useAuth();

  return (
    <>
      <Menubar
        start={user ? <></> : <p>Welcome to CMAS</p>}
        model={user ? menuItems : []}
        end={<LayoutSideBar />}
      />
      <Outlet />
    </>
  );
};

export default React.memo(Layout);
