import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FwButton,
  FwForm,
  FwFormControl,
  FwIcon,
  FwModal,
  FwModalContent,
  FwModalTitle,
} from "@freshworks/crayons/react";
import "react-datepicker/dist/react-datepicker.css";

// Components
import ReduxTable, { ReduxColumn } from "../../components/ReduxTable";
import PageTitle from "../../components/PageTitle";

//Config
import { endpoints } from "../../configs";
import { Col, Row } from "reactstrap";

const RentalHistory = (props) => {
  const { history } = props;
  const status = "closed";
  // Sort by options
  const sortByOption = [
    {
      value: "createdAt:DESC",
      text: "Most Recent",
    },
  ];

  return (
    <>
      {/*Redux table  */}
      <PageTitle label="Rental History" />

      <div className="mt-4 mb-5">
        <ReduxTable
          onScroll
          id="rentals"
          showHeader
          searchPlaceholder="Search Rentals"
          apiURL={`${endpoints().rentalsAPI}/search/${status}`}
          newTableHeading
          sortByOptions={sortByOption}
          disableColumnSort={true}
          onRowClick={(row) => {
            console.log("row ------>", row);
            // history.push(`/customers/details/${row.id}`);
          }}>
          <ReduxColumn
            minWidth="150px"
            field="vehicle_name"
            isClickable={"true"}
            sortBy="vehicle_name"
            type="link">
            Vehicle
          </ReduxColumn>
          <ReduxColumn minWidth="150px" field="customer_name" type="link">
            Customer
          </ReduxColumn>
          <ReduxColumn minWidth="100px" field="reg_no">
            Reg No
          </ReduxColumn>
          <ReduxColumn minWidth="100px" field="status">
            Status
          </ReduxColumn>
          <ReduxColumn minWidth="100px" field="start_date">
            Started At
          </ReduxColumn>
          <ReduxColumn minWidth="100px" field="end_date">
            Closed At
          </ReduxColumn>
          <ReduxColumn minWidth="70px" field="advance_amount">
            Advance
          </ReduxColumn>
          <ReduxColumn minWidth="70px" field="per_day_rent">
            Rent/day
          </ReduxColumn>
          <ReduxColumn minWidth="70px" field="added_by">
            Added By
          </ReduxColumn>
          <ReduxColumn minWidth="70px" field="payment_mode">
            Payment mode
          </ReduxColumn>
          {/* <ReduxColumn
            minWidth="100px"
            field="Action"
            className="action-column"
            disableOnClick
            renderField={(row) => (
              <div className="text-center">
                {row.role !== "Super Admin" && (
                  <>
                    <span
                      className="text-danger cursor-pointer mr-2"
                      onClick={() => {
                        setCurrentRowData(row);
                        setCloseRentalModal(true);
                      }}>
                      <FwButton size="icon">
                        <FwIcon name="close" color="white"></FwIcon>
                      </FwButton>
                    </span>
                    <span
                      className="text-danger cursor-pointer mr-2"
                      onClick={() => {
                        history.push(`/edit-rental/${row.id}`);
                      }}>
                      <FwButton size="icon">
                        <FwIcon name="edit" color="white"></FwIcon>
                      </FwButton>
                    </span>
                    <span
                      className="text-danger cursor-pointer"
                      onClick={() => {
                        setCurrentDeleteData(row);
                        setDeleteModal(true);
                      }}>
                      <FwButton size="icon">
                        <FwIcon name="delete" color="white"></FwIcon>
                      </FwButton>
                    </span>
                  </>
                )}
              </div>
            )}>
            Action
          </ReduxColumn> */}
        </ReduxTable>
      </div>
    </>
  );
};
export default RentalHistory;
