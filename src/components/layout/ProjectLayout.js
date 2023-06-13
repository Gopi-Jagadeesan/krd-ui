import React, { useEffect, useState } from "react";
//Service
import { getSettingsValue } from "../../pages/settings/generalTab/service";
//API
import { apiClient } from "../../apiClient";
//Defatult Icon
import dashboardIcon from "../../assets/icons/dashboard-icon.svg";
import usersIcon from "../../assets/icons/icon-user.svg";
import userIcon from "../../assets/icons/user.svg";
import typeIcon from "../../assets/icons/type.svg";
import paymentModeIcon from "../../assets/icons/payment-mode.svg";
import overdueIcon from "../../assets/icons/overdue.svg";
import roleIcon from "../../assets/icons/roles.svg";
import reportIcon from "../../assets/icons/activity.svg";
import loanIcon from "../../assets/icons/ticket.svg";

//Common
import { endpoints } from "../../configs";
//Context
import UserProvider from "../../context/userContext/UserProvider";
//Helpers
import { isNotEmpty } from "../../lib/helper";
//Components
import Toastcontainer from "../ToastContainer";
import Footer from "../Footer";
import Header from "../header";
import SideBarNavigation from "./sidebarNavigation";

const ProjectLayout = (props) => {
  const { history } = props;

  const [settingsData, setSettingData] = useState({});
  const [userDetails, setUserDetails] = useState({});

  const getSetting = async (settings) => {
    const data = await getSettingsValue(settings.settings);
    setSettingData(data);
  };

  useEffect(() => {
    if (isNotEmpty(props.settings)) {
      getSetting(props.settings);
      getUserDetails();
    }
  }, [props.settings]);

  // Get user details
  const getUserDetails = async () => {
    let data;
    await apiClient
      .get(`${endpoints().userAPI}`)
      .then((response) => {
        data = response.data;
        setUserDetails(data);
      })
      .catch((error) => {
        toastMessage.trigger({
          type: "error",
          content: error.response,
        });
      });
  };

  const { portalName } = settingsData;

  //Set PortalName
  let name = document.getElementById("portalName");
  if (portalName) {
    name.innerHTML = portalName;
  }

  // Project Nav List
  const navList = () => {
    let arrayList = [];
    arrayList = arrayList.concat({
      name: "Dashboard",
      url: `/dashboard`,
      icon: dashboardIcon,
    });
    arrayList = arrayList.concat({
      name: "Rentals",
      url: `/rentals`,
      icon: usersIcon,
    });
    arrayList = arrayList.concat({
      name: "Customers",
      url: `/customers`,
      icon: usersIcon,
    });
    arrayList = arrayList.concat({
      name: "Vehicles",
      url: "/vehicles",
      icon: typeIcon,
    });
    arrayList = arrayList.concat({
      name: "Rental History",
      url: "/rental-history",
      icon: paymentModeIcon,
    });
    arrayList = arrayList.concat({
      name: "Users",
      url: "/users",
      icon: userIcon,
    });

    return arrayList;
  };

  return (
    <div className="app">
      <UserProvider>
        <div className="app-body">
          <Toastcontainer />
          <main
            className="main drawer-container"
            style={{ position: "relative" }}>
            <Header userDetails={userDetails} portalName={portalName} />
            <SideBarNavigation
              history={history}
              navList={navList}
              settings={settingsData}
            />
          </main>
        </div>
        <div className="mt-5">
          <Footer />
        </div>
      </UserProvider>
    </div>
  );
};

export default ProjectLayout;
