import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FwButton,
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
import Form from "../../components/Form";
import { Button } from "reactstrap";
import Select from "../../components/Select";
import Number from "../../components/Number";

const BikeRentals = (props) => {
  const { history } = props;
  const [currentDeleteData, setCurrentDeleteData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentRowData, setCurrentRowData] = useState();
  const [closeRentalModal, setCloseRentalModal] = useState(false);
  const [changeRentalModal, setChangeRentalModal] = useState(false);
  const [vehicleOption, setVehicleOptions] = useState([]);

  const status = "notClosed";

  // Dispach
  const dispatch = useDispatch();

  // Closed by Options
  const closedByOptions = [
    { value: "kannan", label: "Kannan" },
    { value: "krishnan", label: "Krishnan" },
    { value: "bala", label: "Bala" },
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
                  label: `${vehicleData.name ? vehicleData.name : ""} - ${
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
      data.append(
        "closed_by",
        values && values.closed_by && values.closed_by.value
      );
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
    const data = new FormData();
    if (currentRowData) {
      data.append("id", currentRowData && currentRowData.id);
    }
    if (values && values.vehicle_id !== undefined) {
      data.append(
        "vehicle_id",
        values && values.vehicle_id && values.vehicle_id.value
      );
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
          <Form
            enableReinitialize={true}
            initialValues={{}}
            onSubmit={(values) => {
              handleSave(values);
            }}>
            <div className="form-group mt-2 mb-3">
              <div>
                <Number
                  name="ending_km"
                  label="Ending Km"
                  placeholder="Enter Ending Km..."
                  error=""
                  required={true}
                  fontBolded
                />
              </div>
              <div>
                <Select
                  name="closed_by"
                  label="Closed By"
                  placeholder="Select Closed By..."
                  error=""
                  required={true}
                  fontBolded
                  options={closedByOptions}
                />
              </div>
            </div>

            <div className="container-fluid">
              <div className="col-sm-12 text-center">
                <Button type="submit" className="h6-5-important">
                  Save
                </Button>
              </div>
            </div>
          </Form>
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
          <Form
            enableReinitialize={true}
            initialValues={{}}
            onSubmit={(values) => {
              handleChangeRentalSave(values);
            }}>
            <div className="form-group mt-2 mb-3">
              <div>
                <Number
                  name="ending_km"
                  label="Ending Km"
                  placeholder="Enter Ending Km..."
                  error=""
                  required={true}
                  fontBolded
                />
              </div>
              <div>
                <Select
                  name="vehicle_id"
                  label="Vehicle"
                  placeholder="Select Vehicle..."
                  error=""
                  required={true}
                  isSearchable
                  fontBolded
                  options={vehicleOption}
                />
              </div>
            </div>

            <div className="container-fluid">
              <div className="col-sm-12 text-center">
                <Button type="submit" className="h6-5-important">
                  Save
                </Button>
              </div>
            </div>
          </Form>
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
        label="Bike Rentals"
        buttonHandler={() => {
          history.push(`/bike/rentals/create`);
        }}
        buttonLabel="Add New"
      />

      <div className="mt-4 mb-5">
        <ReduxTable
          onScroll
          id="bikeRentals"
          showHeader
          searchPlaceholder="Search Rentals"
          apiURL={`${endpoints().bikeRentalsAPI}/search/${status}`}
          newTableHeading
          sortByOptions={sortByOption}
          disableColumnSort={true}
          onRowClick={(row) => {
            history.push(`/bike/rentals/details/${row.id}`);
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
export default BikeRentals;
