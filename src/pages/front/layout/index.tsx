import React from "react";
import { Outlet } from "react-router-dom";

import Header from "@/components/header";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";

const Layout = () => {
  return (
    <div className="h-full w-full">
      <Header />
      {/* 内容区域 */}
      <div className="relative grid h-[calc(100vh-64px)] place-content-center">
        <Outlet />
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
