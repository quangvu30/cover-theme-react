import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { signIn, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";

//import Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import RightSidebar from "../Components/Common/RightSidebar";

import { layoutModeTypes, layoutTypes } from "@/Components/constants/layout";

const Layout = (props) => {
  const [headerClass, setHeaderClass] = useState("");
  const { status } = useSession();
  const router = useRouter();
  // class add remove in header
  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
    if (
      status === "unauthenticated" &&
      !router.pathname.includes("Authentication")
    ) {
      Router.replace("/Authentication/Login");
    }
  });
  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setHeaderClass("topbar-shadow");
    } else {
      setHeaderClass("");
    }
  }

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header
          headerClass={headerClass}
          layoutModeType={layoutModeTypes.DARKMODE}
        />
        <Sidebar />
        <div className="main-content">
          {props.children}
          <Footer />
        </div>
      </div>
      {/* <RightSidebar /> */}
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
};

export default Layout;
