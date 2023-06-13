import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FwButton,
  FwForm,
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

const Rental = (props) => {
  const { history } = props;
  const [currentDeleteData, setCurrentDeleteData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentRowData, setCurrentRowData] = useState();
  const [closeRentalModal, setCloseRentalModal] = useState(false);

  console.log("currentRowData ----->", currentRowData);
  // Dispach
  const dispatch = useDispatch();

  //useRef
  const closeRentalFormRef = useRef();

  // Closed by Options
  const closedByOptions = [
    { value: "kannan", text: "Kannan" },
    { value: "krishnan", text: "Krishnan" },
    { value: "bala", text: "Bala" },
  ];

  // Toggle delete modal
  const deleteToggle = () => {
    setDeleteModal(!deleteModal);
  };

  // Toggle Close rental modal
  const toggleCloseRental = () => {
    setCloseRentalModal(!closeRentalModal);
  };

  // Sort by options
  const sortByOption = [
    {
      value: "createdAt:DESC",
      text: "Most Recent",
    },
  ];

  /**
   * Close Rental
   *
   * @param values
   */
  const handleSave = (values) => {
    const data = new FormData();
    if (currentRowData) {
      data.append("id", currentRowData && currentRowData.id);
    }
    if (values && values.closed_by !== undefined) {
      data.append("closed_by", values && values.closed_by);
    }
    if (values && values.ending_km !== undefined) {
      data.append("ending_km", values && values.ending_km);
    }
    dispatch(API.closeRentals(data, history, {}));
    toggleCloseRental();
  };

  // Rental delete function
  const userDelete = () => {
    dispatch(API.deleteRentals(currentDeleteData.id, {}));
    setDeleteModal(false);
    setCurrentDeleteData("");
  };

  // Form submit function
  const handleCloseRentalSubmit = async (e) => {
    const { values, isValid } = await closeRentalFormRef.current.doSubmit(e);

    if (isValid) {
      console.log("values ----->", values);
      handleSave(values);
    }
  };

  // Close rental form
  const closeRentalFormSchema = {
    fields: [
      {
        id: "ending_km",
        name: "ending_km",
        label: "Ending Km",
        type: "NUMBER",
        position: 3,
        required: true,
        placeholder: "Enter Ending Km",
        choices: [],
      },
      {
        id: "closed_by",
        name: "closed_by",
        label: "Closed By",
        type: "DROPDOWN",
        position: 3,
        required: true,
        placeholder: "Select Closed By",
        choices: closedByOptions,
      },
    ],
  };

  return (
    <>
      {/* Close Rental Modal Starts */}
      <FwModal
        id="close-rental"
        submitText="submitText"
        hideFooter
        onFwClose={toggleCloseRental}
        isOpen={closeRentalModal}
        titleText={"Close Rental"}>
        <div>
          <FwForm
            formSchema={closeRentalFormSchema}
            ref={closeRentalFormRef}></FwForm>
          <FwButton color="secondary" onClick={toggleCloseRental}>
            Cancel
          </FwButton>
          <FwButton
            className="ml-2"
            color="primary"
            onClick={handleCloseRentalSubmit}>
            Close Rental
          </FwButton>
        </div>
      </FwModal>
      {/* Close Rental Modal Ends */}

      {/* Delete Rental Modal Starts */}
      <FwModal
        id="composition"
        size="small"
        submit-color="danger"
        submit-text="Delete"
        submit={userDelete}
        onFwClose={deleteToggle}
        isOpen={deleteModal}>
        <FwModalTitle>
          <span>Delete Rental</span>
        </FwModalTitle>
        <FwModalContent>
          <span>
            Are you sure you want to delete{" "}
            {currentDeleteData && currentDeleteData.companyName}?
          </span>
        </FwModalContent>
      </FwModal>
      {/* Delete Rental Modal Ends */}

      {/*Redux table  */}
      <PageTitle
        label="Rentals"
        buttonHandler={() => {
          history.push(`/rentals/create`);
        }}
        buttonLabel="Add New"
      />

      <div className="mt-4 mb-5">
        <ReduxTable
          onScroll
          id="rentals"
          showHeader
          searchPlaceholder="Search Rentals"
          apiURL={`${endpoints().rentalsAPI}/search`}
          newTableHeading
          sortByOptions={sortByOption}
          disableColumnSort={true}
          onRowClick={(row) => {
            console.log("row ------>", row);
            history.push(`/rentals/details/${row.id}`);
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
          <ReduxColumn minWidth="100px" field="expected_delivery">
            Expected At
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
          <ReduxColumn
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
                    {/* <span
                      className="text-danger cursor-pointer mr-2"
                      onClick={() => {
                        history.push(`/edit-rental/${row.id}`);
                      }}>
                      <FwButton size="icon">
                        <FwIcon name="edit" color="white"></FwIcon>
                      </FwButton>
                    </span> */}
                    {/* <span
                      className="text-danger cursor-pointer"
                      onClick={() => {
                        setCurrentDeleteData(row);
                        setDeleteModal(true);
                      }}>
                      <FwButton size="icon">
                        <FwIcon name="delete" color="white"></FwIcon>
                      </FwButton>
                    </span> */}
                  </>
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
export default Rental;
