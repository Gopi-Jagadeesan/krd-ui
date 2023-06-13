import React, { useEffect, useState } from "react";
import InsightCard from "./inner-components/InsightCard";
import QuickCardData from "./inner-components/QuickCardData";
import { endpoints } from "../configs";
import { apiClient } from "../apiClient";

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({});

  console.log("dashboardData ----->", dashboardData);
  useEffect(() => {
    getDashboardData();
  }, [props]);

  const getDashboardData = async () => {
    setIsLoading(true);
    try {
      await apiClient.get(`${endpoints().dashboardAPI}`).then((response) => {
        setDashboardData(response.data);
      });
    } catch (error) {
      console.log("error in getting dashboard data ----->", error);
    }
    setIsLoading(false);
  };

  // Quick card data
  const quickCardData = [
    {
      header: "Vehicles In",
      text:
        dashboardData &&
        dashboardData.vehiclesData &&
        dashboardData.vehiclesData.slice(0, 5).reverse(),
      redirectTo: "/vehicles",
    },
    {
      header: "Vehicles Out",
      text:
        dashboardData &&
        dashboardData.vehiclesData &&
        dashboardData.vehiclesData.slice(0, 5).reverse(),
      redirectTo: "/vehicles",
    },
    {
      header: "Overdue Vehicles",
      text:
        dashboardData &&
        dashboardData.overdueData &&
        dashboardData.overdueData.slice(0, 5).reverse(),
      redirectTo: "/rentals",
    },
    {
      header: "Recent Customers",
      text:
        dashboardData &&
        dashboardData &&
        dashboardData.customersData &&
        dashboardData.customersData.slice(0, 5).reverse(),
      redirectTo: "/customers",
    },
  ];
  return (
    <>
      <InsightCard dashboardData={dashboardData} />
      <QuickCardData data={quickCardData} />
    </>
  );
};

export default Dashboard;
