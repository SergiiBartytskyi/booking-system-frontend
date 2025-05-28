import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>
        <div className="flex">
          <Sidebar />
          <div className="ml-60 flex flex-col gap-5 p-5 mt-20">{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
