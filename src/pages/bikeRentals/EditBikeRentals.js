import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardText,
  CardTitle,
} from "reactstrap";
import Loader from "../../components/Loader";
import { apiClient } from "../../apiClient";
import { endpoints } from "../../configs";
import { FwForm } from "@freshworks/crayons/react";

const EditBikeRentals = (props) => {
  // Get id from URL
  let id = props.match.params.id;


  // Use ref
  const rentalFormRef = useRef();

  const [rentalDetails, setRentalDetails] = useState({});
  // const [vehicleDetails, setVehicleDetails] = useState({});
  const [customerDetails, setCustomerDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleOption, setVehicleOptions] = useState([]);

  // Get rental details initially
  useEffect(() => {
    getRentalDetails(id);
    getVehicleList();
  }, [id]);

  // Get vehicle and customer details after getting rental details
  useEffect(() => {
    // getVehicleDetails(rentalDetails && rentalDetails.vehicle_id);
    getCustomerDetails(rentalDetails && rentalDetails.customer_id);
  }, [rentalDetails]);

  // Get Rental details
  const getRentalDetails = async (id) => {
    setIsLoading(true);
    try {
      await apiClient
        .get(`${endpoints().bikeRentalsAPI}/${id}`)
        .then((response) => {
          setRentalDetails(response && response.data);
        });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  // Get Vehicle details
  // const getVehicleDetails = async (id) => {
  //   setIsLoading(true);
  //   try {
  //     await apiClient
  //       .get(`${endpoints().vehiclesAPI}/${id}`)
  //       .then((response) => {
  //         // setVehicleDetails(response && response.data);
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setIsLoading(false);
  // };

  // Get Customer details
  const getCustomerDetails = async (id) => {
    setIsLoading(true);
    try {
      await apiClient
        .get(`${endpoints().customersAPI}/${id}`)
        .then((response) => {
          setCustomerDetails(response && response.data);
        });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

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
              vehicleOptions.push({
                value: vehicleData.id,
                text: vehicleData.name,
              });
            });
          setVehicleOptions(vehicleOptions);
        }
      });
    return data;
  };

  // Initial Values
  const initialValues = {
    address: customerDetails ? customerDetails.address : "",
    alternate_no: customerDetails ? customerDetails.alternate_no : "",
    customer_name: customerDetails ? customerDetails.name : "",
    proof_no: customerDetails ? customerDetails.proof_number : "",
    mobile_no: customerDetails ? customerDetails.mobile_no : "",
    proof_given: rentalDetails ? rentalDetails.proof_given : "",
    vehicle: rentalDetails ? rentalDetails.vehicle_id : "",
  };

  // Proof Options
  const proofOptions = [
    { value: "aadharCard", text: "Aadhar" },
    { value: "panCard", text: "Pan Card" },
    { value: "rationCard", text: "Ration Card" },
    { value: "drivingLicense", text: "Driving License" },
    { value: "rcCard", text: "RC book" },
    { value: "collegeId", text: "College ID" },
    { value: "workId", text: "Work ID" },
  ];

  // Added by Options
  const addedByOptions = [
    { value: "kannan", text: "Kannan" },
    { value: "krishnan", text: "Krishnan" },
    { value: "bala", text: "Bala" },
  ];

  // Payment method Options
  const paymentOptions = [
    { value: "cash", text: "Cash" },
    { value: "paytm", text: "Paytm" },
  ];

  // Rental form Schema
  const rentalFormSchema = {
    fields: [
      {
        id: "customer_name",
        name: "customer_name",
        label: "Customer Name",
        type: "TEXT",
        position: 3,
        required: true,
        placeholder: "Enter Customer Name",
        choices: [],
      },
      {
        id: "mobile_no",
        name: "mobile_no",
        label: "Mobile Number",
        type: "NUMBER",
        position: 3,
        required: true,
        placeholder: "Enter Mobile Number",
        choices: [],
      },
      {
        id: "alternate_no",
        name: "alternate_no",
        label: "Alternate Number",
        type: "NUMBER",
        position: 3,
        required: true,
        placeholder: "Enter Alternate Number",
        choices: [],
      },
      {
        id: "address",
        name: "address",
        label: "Address",
        type: "TEXT",
        position: 3,
        required: true,
        placeholder: "Enter Address",
        choices: [],
      },
      {
        id: "proof_no",
        name: "proof_no",
        label: "Proof Number",
        type: "TEXT",
        position: 3,
        required: true,
        placeholder: "Enter Proof Number",
        choices: [],
      },
      {
        id: "proof_given",
        name: "proof_given",
        label: "Proof Given",
        type: "MULTI_SELECT",
        position: 3,
        required: true,
        placeholder: "Select Proof Given",
        choices: proofOptions,
      },
      {
        id: "vehicle",
        name: "vehicle",
        label: "Vehicle",
        type: "DROPDOWN",
        position: 3,
        required: true,
        placeholder: "Select Vehicle",
        choices: vehicleOption,
      },
      {
        id: "start_date",
        name: "start_date",
        label: "Start Date",
        type: "DATE_TIME",
        position: 3,
        placeholder: "Select Start Date",
        choices: [],
      },
      {
        id: "expected_delivery",
        name: "expected_delivery",
        label: "Expected Delivery",
        type: "NUMBER",
        position: 3,
        required: true,
        placeholder: "Enter Expected Delivery",
        choices: [],
      },
      {
        id: "advance_amount",
        name: "advance_amount",
        label: "Advance Amount",
        type: "NUMBER",
        position: 3,
        required: true,
        placeholder: "Enter Advance Amount",
        choices: [],
      },
      {
        id: "per_day_rent",
        name: "per_day_rent",
        label: "Per day rent",
        type: "NUMBER",
        position: 3,
        required: true,
        placeholder: "Enter Per day rent",
        choices: [],
      },
      {
        id: "starting_km",
        name: "starting_km",
        label: "Starting Km",
        type: "NUMBER",
        position: 3,
        required: true,
        placeholder: "Enter Starting Km",
        choices: [],
      },
      {
        id: "payment_mode",
        name: "payment_mode",
        label: "Payment Method",
        type: "DROPDOWN",
        position: 3,
        required: true,
        placeholder: "Start Payment Method",
        choices: paymentOptions,
      },
      {
        id: "added_by",
        name: "added_by",
        label: "Added By",
        type: "DROPDOWN",
        position: 3,
        required: true,
        placeholder: "Enter Added By",
        choices: addedByOptions,
      },
    ],
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Card body>
        <CardTitle tag="h5">Edit Rentals</CardTitle>
        <CardText>
          <FwForm
            formSchema={rentalFormSchema}
            initialValues={initialValues}
            ref={rentalFormRef}></FwForm>
        </CardText>
      </Card>
    </div>
  );
};

export default EditBikeRentals;
