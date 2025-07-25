import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <ToastContainer position="top-center" />
    </>
  );
};

export default MainLayout;
