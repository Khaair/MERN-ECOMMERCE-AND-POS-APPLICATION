import React from "react";
import Menu from "./menu";
import TopHeader from "./top-header";
import Footer from "./footer";

const Layout = ({ children }: any) => {
  return (
    <React.Fragment>
      <TopHeader />
      <Menu />
      {children}
      <Footer />
    </React.Fragment>
  );
};
export default Layout;
