import React, { useEffect, useRef, useState } from "react";
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
import { apiClient } from "../../apiClient";

const Rental = (props) => {
  const { history } = props;
  const [currentDeleteData, setCurrentDeleteData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentRowData, setCurrentRowData] = useState();
  const [closeRentalModal, setCloseRentalModal] = useState(false);
  const [changeRentalModal, setChangeRentalModal] = useState(false);
  const [vehicleOption, setVehicleOptions] = useState([]);

  const status = "notClosed";

  console.log("currentRowData ----->", currentRowData);
  // Dispach
  const dispatch = useDispatch();

  //useRef
  const closeRentalFormRef = useRef();
  const changeRentalFormRef = useRef();

  // Closed by Options
  const closedByOptions = [
    { value: "kannan", text: "Kannan" },
    { value: "krishnan", text: "Krishnan" },
    { value: "bala", text: "Bala" },
  ];

  // Get Vehicles List
  useEffect(() => {
    getVehicleList();
  }, [props]);

  // Get Vehicle options
  const getVehicleList = async () => {
    let data;
    await apiClient
      .get(`${endpoints().vehiclesAPI}/search`)
      .then((response) => {
        data = response.data.data;
        if (data && data.length > 0) {
          const vehicleOptions = [];
          data
            .sort((a, b) => parseFloat(a.sort) - parseFloat(b.sort))
            .forEach((vehicleData) => {
              if (vehicleData && vehicleData.status == "in") {
                vehicleOptions.push({
                  value: vehicleData.id,
                  text: `${vehicleData.name ? vehicleData.name : ""} - ${
                    vehicleData.reg_no
                  } ${vehicleData.color ? vehicleData.color : ""} ${
                    vehicleData.notes ? vehicleData.notes : ""
                  }`,
                });
              }
            });
          setVehicleOptions(vehicleOptions);
        }
      });
    return data;
  };

  // Toggle delete modal
  const deleteToggle = () => {
    setDeleteModal(!deleteModal);
  };

  // Toggle Close rental modal
  const toggleCloseRental = () => {
    setCloseRentalModal(!closeRentalModal);
  };

  // Toggle Close rental modal
  const toggleChangeRental = () => {
    setChangeRentalModal(!changeRentalModal);
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
    if (currentRowData) {
      data.append("vehicle_id", currentRowData.vehicle_id);
    }
    if (values && values.closed_by !== undefined) {
      data.append("closed_by", values && values.closed_by);
    }
    if (values && values.ending_km !== undefined) {
      data.append("ending_km", values && values.ending_km);
    }
    dispatch(API.closeRentals(data, {}));
    toggleCloseRental();
    // window.location.reload(false);
  };

  /**
   * Close Rental
   *
   * @param values
   */
  const handleChangeRentalSave = (values) => {
    console.log("values ------>", values);
    const data = new FormData();
    if (currentRowData) {
      data.append("id", currentRowData && currentRowData.id);
    }
    if (values && values.vehicle_id !== undefined) {
      data.append("vehicle_id", values && values.vehicle_id);
    }
    if (values && values.ending_km !== undefined) {
      data.append("ending_km", values && values.ending_km);
    }
    dispatch(API.updateRentals(data, {}));
    toggleChangeRental();
    // window.location.reload(false);
  };

  // Rental delete function
  const userDelete = () => {
    dispatch(API.deleteRentals(currentDeleteData.id, status, {}));
    setDeleteModal(false);
    setCurrentDeleteData("");
  };

  // Close rental Form submit function
  const handleCloseRentalSubmit = async (e) => {
    const { values, isValid } = await closeRentalFormRef.current.doSubmit(e);

    if (isValid) {
      handleSave(values);
    }
  };

  // Change rental form submit function
  const handleChangeRentalSubmit = async (e) => {
    const { values, isValid } = await changeRentalFormRef.current.doSubmit(e);

    if (isValid) {
      handleChangeRentalSave(values);
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

  // Change rental form
  const changeRentalFormSchema = {
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
        id: "vehicle_id",
        name: "vehicle_id",
        label: "Vehicle",
        type: "DROPDOWN",
        position: 3,
        required: true,
        placeholder: "Select Vehicle",
        choices: vehicleOption,
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

      {/* Change Rental Modal Starts */}
      <FwModal
        id="change-rental"
        submitText="submitText"
        hideFooter
        onFwClose={toggleChangeRental}
        isOpen={changeRentalModal}
        titleText={"Change Rental"}>
        <div>
          <FwForm
            formSchema={changeRentalFormSchema}
            ref={changeRentalFormRef}></FwForm>
          <FwButton color="secondary" onClick={toggleChangeRental}>
            Cancel
          </FwButton>
          <FwButton
            className="ml-2"
            color="primary"
            onClick={handleChangeRentalSubmit}>
            Change Rental
          </FwButton>
        </div>
      </FwModal>
      {/* Change Rental Modal Ends */}

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
          apiURL={`${endpoints().rentalsAPI}/search/${status}`}
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
            minWidth="130px"
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
                        setCurrentRowData(row);
                        setChangeRentalModal(true);
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
          </ReduxColumn>
        </ReduxTable>
      </div>
    </>
  );
};
export default Rental;
