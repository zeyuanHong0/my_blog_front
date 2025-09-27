import React from "react";
import { Outlet } from "react-router-dom";

import ProgressBar from "@/components/ProgressBar";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";

const Layout = () => {
  return (
    <div className="h-full w-full">
      <ProgressBar />
      <Header />
      {/* 内容区域 */}
      <main className="min-h-[calc(100vh-190px)]">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
