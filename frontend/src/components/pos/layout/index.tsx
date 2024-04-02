import React from "react";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }: any) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
