import React from "react";
import { Navbar } from "reactstrap";

import UserNavDropdown from "./UserNavDropdown";

// Assets
import Logo from "../Logo";

const DashboardNavigation = ({ allowAccess, id, avatar, portalName }) => {
  return (
    <>
      <Navbar
        className={`navbar navbar-expand-lg `}
        style={{
          height: "4rem",
        }}>
        <div className="container " style={{ maxWidth: "100%" }}>
          <div
            className={`d-flex align-items-center dropdown-wrapper`}>
            <div id="menu"></div>

            <Logo link="/dashboard" altText={portalName} label={portalName} />
          </div>

          <div>
            <UserNavDropdown id={id} avatar={avatar} enable={allowAccess} />
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default DashboardNavigation;
