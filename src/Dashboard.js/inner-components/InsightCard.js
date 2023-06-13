import { FwIcon } from "@freshworks/crayons/react";
import React from "react";
import { Link } from "react-router-dom";

const InsightCard = (props) => {
  const { dashboardData } = props;
  return (
    <div>
      <div className="ag-format-container">
        <div className="ag-courses_box">
          <div className="ag-courses_item">
            <a href="#" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <Link
                to={`/applications`}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}>
                <div className="ag-courses-item_title">
                  <FwIcon
                    className="float-right"
                    name="browser"
                    size="40"
                    color="white"></FwIcon>
                  <div
                    style={{ fontSize: "27px" }}
                    className="ml-2 font-weight-bold text-white">
                    {" "}
                    Vehicles In
                  </div>
                </div>
                <div className="ag-courses-item_date-box">
                  <div className="text-white" style={{ fontSize: "60px" }}>
                    {dashboardData &&
                    dashboardData.vehiclesData &&
                    dashboardData.vehiclesData.length
                      ? dashboardData.vehiclesData.length
                      : 0}
                  </div>
                </div>
              </Link>
            </a>
          </div>
          <div className="ag-courses_item">
            <a href="#" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <Link
                to={`/customers`}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}>
                <div className="ag-courses-item_title">
                  <FwIcon
                    className="float-right"
                    name="company"
                    size="40"
                    color="white"></FwIcon>
                  <div
                    style={{ fontSize: "27px" }}
                    className="ml-2 font-weight-bold text-white">
                    {" "}
                    Vehicles Out
                  </div>
                </div>
                <div className="ag-courses-item_date-box">
                  <div className="text-white" style={{ fontSize: "60px" }}>
                    {dashboardData &&
                    dashboardData.vehiclesData &&
                    dashboardData.vehiclesData.length
                      ? dashboardData.vehiclesData.length
                      : 0}
                  </div>
                </div>
              </Link>
            </a>
          </div>
          <div className="ag-courses_item">
            <a href="#" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <Link
                to={`/servers`}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}>
                <div className="ag-courses-item_title">
                  <FwIcon
                    className="float-right"
                    name="products"
                    size="40"
                    color="white"></FwIcon>
                  <div
                    style={{ fontSize: "27px" }}
                    className="ml-2 font-weight-bold text-white">
                    {" "}
                    Overdue
                  </div>
                </div>
                <div className="ag-courses-item_date-box">
                  <div className="text-white" style={{ fontSize: "60px" }}>
                    {dashboardData &&
                    dashboardData.overdueData &&
                    dashboardData.overdueData.length
                      ? dashboardData.overdueData.length
                      : 0}
                  </div>
                </div>
              </Link>
            </a>
          </div>
          <div className="ag-courses_item">
            <a href="#" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <Link
                to={`/users`}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}>
                <div className="ag-courses-item_title">
                  <FwIcon
                    className="float-right"
                    name="groups"
                    size="40"
                    color="white"></FwIcon>
                  <div
                    style={{ fontSize: "27px" }}
                    className="ml-2 font-weight-bold text-white">
                    {" "}
                    Customers
                  </div>
                </div>
                <div className="ag-courses-item_date-box">
                  <div className="text-white" style={{ fontSize: "60px" }}>
                    {dashboardData &&
                    dashboardData.customersData &&
                    dashboardData.customersData.length
                      ? dashboardData.customersData.length
                      : 0}
                  </div>
                </div>
              </Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
