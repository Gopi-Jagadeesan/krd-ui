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

// Action
import * as API from "./Action";

//Config
import { endpoints } from "../../configs";

const CustomerList = (props) => {
  const { history } = props;
  const [currentDeleteData, setCurrentDeleteData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

  // Dispach
  const dispatch = useDispatch();

  // Toggle delete modal
  const deleteToggle = () => {
    setDeleteModal(!deleteModal);
  };

  // Sort by options
  const sortByOption = [
    {
      value: "name:ASC",
      text: "Name",
    },
    {
      value: "createdAt:DESC",
      text: "Most Recent",
    },
  ];

  // Customer delete function
  const userDelete = () => {
    dispatch(API.deleteCustomer(currentDeleteData.id, {}));
    setDeleteModal(false);
    setCurrentDeleteData("");
  };

  return (
    <>
      {/* Delete Customer Modal Starts */}
      <FwModal
        id="composition"
        size="small"
        submit-color="danger"
        submit-text="Delete"
        submit={userDelete}
        onFwClose={deleteToggle}
        isOpen={deleteModal}>
        <FwModalTitle>
          <span>Delete Customer</span>
        </FwModalTitle>
        <FwModalContent>
          <span>
            Are you sure you want to delete{" "}
            {currentDeleteData && currentDeleteData.companyName}?
          </span>
        </FwModalContent>
      </FwModal>
      {/* Delete Customer Modal Ends */}

      {/*Redux table  */}
      <PageTitle label="Customers" />

      <div className="mt-4 mb-5">
        <ReduxTable
          onScroll
          id="customer"
          showHeader
          searchPlaceholder="Search Customers"
          apiURL={`${endpoints().customersAPI}/search`}
          newTableHeading
          sortByOptions={sortByOption}
          disableColumnSort={true}
          onRowClick={(row) => {
            console.log("row ------->", row);
            history.push(`/customers/details/${row.id}`);
          }}>
          <ReduxColumn
            minWidth="100px"
            field="name"
            isClickable={"true"}
            sortBy="name"
            type="link">
            Name
          </ReduxColumn>
          <ReduxColumn minWidth="100px" field="mobile_no">
            Mobile Number
          </ReduxColumn>
          <ReduxColumn minWidth="150px" field="address">
            Address
          </ReduxColumn>
          <ReduxColumn minWidth="100px" field="proof_number">
            Proof
          </ReduxColumn>
          <ReduxColumn
            minWidth="70px"
            field="Action"
            className="action-column"
            disableOnClick
            renderField={(row) => (
              <div className="text-center">
                {row.role !== "Super Admin" && (
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
                )}
              </div>
            )}>
            Action
          </ReduxColumn>
        </ReduxTable>
      </div>
    </>
  );
};
export default CustomerList;
