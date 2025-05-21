import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="ml-60 ">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
