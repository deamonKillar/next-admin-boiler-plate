import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Script from "next/script";

const Layouts = ({ children, guestGuard }: any) => {
  const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;
  if (guestGuard === false) {
    return (
      <>
        <div className="page">
          <div className="page-main">
            <Sidebar />
            <div className="app-content main-content">
              <div className="side-app">
                <Header />
                {children} {/* Render children here */}
              </div>
            </div>
            <Footer />
          </div>
        </div>
        {/* Scripts */}
        <script
          src={`${BASE_URL}/assets/plugins/jquery/jquery-3.6.0.min.js`}
        ></script>
        <script
          src={`${BASE_URL}/assets/plugins/bootstrap-5.0.2/js/bootstrap.bundle.min.js`}
        ></script>
        <script
          src={`${BASE_URL}/assets/plugins/sidemenu/sidemenu.js`}
        ></script>
        <script
          src={`${BASE_URL}/assets/plugins/p-scrollbar/p-scrollbar.js`}
        ></script>
        <script
          src={`${BASE_URL}/assets/plugins/p-scrollbar/p-scroll.js`}
        ></script>
        <script
          src={`${BASE_URL}/assets/plugins/awselect/awselect-custom.js`}
        ></script>
        <script src={`${BASE_URL}/assets/js/awselect-theme.js`}></script>
        <script src={`${BASE_URL}/assets/js/custom.js`}></script>
      </>
    );
  } else {
    return (
      <>
        <div className="side-app">{children}</div>
      </>
    );
  }
};

export default Layouts;
