import React, { useState } from "react";
import { Route } from "react-router-dom";

//Service
import Toastcontainer from "../ToastContainer";

const PublicLayout = ({ children }) => {
  const [settingsData] = useState({});
  const { portalName } = settingsData;
  //Set PortalName
  let name = document.getElementById("portalName");
  if (portalName) {
    name.innerHTML = portalName;
  }

  return (
    <>
      <Toastcontainer />
      {children}
    </>
  );
};

const PublicPageLayoutRoute = ({ component: Component, settings, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <PublicLayout {...matchProps} {...settings}>
          <Component {...settings} {...matchProps} />
        </PublicLayout>
      )}
    />
  );
};

export default PublicPageLayoutRoute;
