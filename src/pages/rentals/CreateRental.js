import {
  FwButton,
  FwButtonGroup,
  FwForm,
  FwFormControl,
  FwModal,
  ToastController,
} from "@freshworks/crayons/react";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardText, CardTitle, Col, Row } from "reactstrap";
//Config
import { endpoints } from "../../configs";
import { apiClient } from "../../apiClient";

// Actions
import * as API from "./Action";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import axios from "axios";

// Initialize toast message
const toastMessage = ToastController({ position: "top-center" });

const CreateRental = (props) => {
  const { history } = props;
  const [otpSent, setOtpSent] = useState(false);
  const [otpValidated, setOtpValidated] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [vehicleOption, setVehicleOptions] = useState([]);
  const [existingCustomer, setCustomerData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");

  console.log("generatedOtp =====>", generatedOtp);
  // Use Ref
  const mobileFormRef = useRef();
  const otpFormRef = useRef();
  const customerFormRef = useRef();

  // dispatch
  const dispatch = useDispatch();

  // Get Vehicles List
  useEffect(() => {
    getVehicleList();
  }, [props]);

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

  // Validate Customer exist or not with mobile number
  const validateNumber = async (number) => {
    let data;
    await apiClient
      .get(`${endpoints().customersAPI}/search?search=${number}`)
      .then((response) => {
        data = response.data.data;
        if (data && data.length > 0) {
          let customerData;
          data
            .sort((a, b) => parseFloat(a.sort) - parseFloat(b.sort))
            .forEach((Customers) => {
              customerData = Customers;
            });
          setCustomerData(customerData);
          setOtpValidated(true);
        } else {
          var val = Math.floor(1000 + Math.random() * 9000);
          setGeneratedOtp(val);

          var config = {
            method: "get",
            url: `https://www.fast2sms.com/dev/bulkV2?authorization=TYIXHAsOfDGnVmdoMtJ5vK8QjFewLE6uqyCk1Rpb3rchxPWNz4x9tBHLKcwkMoC3EXsmnfIN7l6pz1Uy&variables_values=${val}&route=otp&numbers=${number}`,
            headers: {
              Cookie:
                "0soQJp4CzjlnO7f4ZpyM3WusQrdbQw7D1Uc9qRVo=eyJpdiI6IkcwQzJNeXZJU0h2bXNweUpjbWc0RlE9PSIsInZhbHVlIjoiU0g1R2VjVkR0d2NjTXZWdVdYS1pFd0NWSVF4WUVKbGdwZ1FTVE9cL3FzNEJTb1hIbUxqQ3JHSE5GWHZmVDV1NElDXC9oNUhYTXluYUVaXC9WYlBQejFYdHd2bml2WVZxUW5aODEwMEY5YTNKUjE5cGowRW4zOTU2T0FDeit0UCtlbE1sUzFERlwvdm9QOGtmSUxjVkZ0Vk5qQlpyXC9rZFZZN0diXC9MbXM0K0NWNXhjQk94WUlCWlZ2T3RQVThLZTBBeEZPOXNSeXRcL3U4WEE1S1JhTVVab09hRk04RVZTeDBCN2hqODNrM0dET2hiSHNIaGpFQ0Rqa21Gelk4c3UyVkl5RjZhQ0RaUG0wM0xIS3o5OVVcL1F2WXlwN3RoTW41VGpRTlllNG1cL2srUERqRHBITHNUaFBzVDdISUxESkk0ZUFtc1lmQUkzcjdcL0dCTEJyMXJrM00wdzlWbWpxY1FwSjRwM2RtcXhlQlM5VXROeDBJR2lFMXJOWkE5XC9SM1ZtYXBMR0MxWXJObnhFbnU4aVZXVXZDQTZlTFJKaE1vaXEwZVdCUDluMWpmd2E2MEJDZ1VMMURlaks2dFNHTExKMWxpenVhUkFEUmhkK3NvanpJcFo4UHFpNERMUWdtTnlTcHBsRWxhY1oyNzFuUnBQeDV1bVVIaURDc2JJdFRHSHA1QnhqaEg3WlZRYjNpRDdlRGRIYUdoQ1orTTdOcFdqSXJmMlEwYk82NDZES09aR1U9IiwibWFjIjoiMzI5NTlhZDMyM2M4M2YzNTIxMDc1OTA2ZjYwMGU5NGNjM2Y2NmY2MDBlZGI3ZDg2ZDJjZDMwNDIxYTQ4NDNhZCJ9; XSRF-TOKEN=eyJpdiI6Im1wYkRaMTFHbWNEd2lZQ1V0NWZuMnc9PSIsInZhbHVlIjoiZ1IwNWdpVFhyMDhISUtLa24rV2cyZzhLbEM1ZUZDTThBSnZaczNwNXZiaHFoZzNraVpPMTVIa2RXK3UxR2RRS0VoTWQzeEI4RnlPOGtyNzdlNlkrM2c9PSIsIm1hYyI6IjJkN2I3OWNiZDMwMzc2OTczZGZmZjAwYTQzZmNhNDk1NTdkODZlYmE5NmUzZDQ5ODYzMmZjYmZmMmYyZTgzMDkifQ%3D%3D; laravel_session=eyJpdiI6ImtqenZcLzJnUDFram1UQ1dxZ3VWem5nPT0iLCJ2YWx1ZSI6InJrVVhRVGhaT0ZZeWRMejl6N0V1TUZIeDhmRHdVTTVIVndhQ0VtQ0hFOGUzVWVXNkY1SGlFbVwvVGkzbHkrV0hieXBOVmlCM3VBdFh1MjFnTVlrS2RYQT09IiwibWFjIjoiMDZmMTY1NTFkMTA3OGZkMGUxNzlhZmUyMjg0ZTQwYWQ3YzExNGRiODgyNTAwMjJhNGViYjNmNDZlMmE0NGViMyJ9",
            },
          };

          axios(config)
            .then(function (response) {
              console.log("otp response", JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    return data;
  };
  // Handle Mobile Number Submit
  const handleMobileNoSubmit = async (e) => {
    const { values, isValid } = await mobileFormRef.current.doSubmit(e);

    if (isValid) {
      setOtpSent(true);
      setMobileNumber(values && values.mobile_no);
      validateNumber(values.mobile_no);
    }
  };

  // Handle OTP Submit
  const handleOtpSubmit = async (e) => {
    const { values, isValid } = await otpFormRef.current.doSubmit(e);
    if (isValid) {
      const valid = validateOtpValue(values && values.otp);
      if (valid == true) {
        setOtpValidated(true);
      } else {
        toastMessage.trigger({
          type: "error",
          content: "Please enter the correct OTP",
        });
        setOtpValidated(false);
      }
    }
  };

  const validateOtpValue = (otp) => {
    const data = generatedOtp == otp ? true : false;
    return data;
  };

  // Handle Customer Submit
  const handleCustomerFormSubmit = async (e) => {
    const { values, isValid } = await customerFormRef.current.doSubmit(e);

    if (isValid) {
      createRental(values);
    }
  };

  // Customer Initial Values
  const customerInitialValues = {
    address: existingCustomer ? existingCustomer.address : "",
    alternate_no: existingCustomer ? existingCustomer.alternate_no : "",
    customer_name: existingCustomer ? existingCustomer.name : "",
    proof_no: existingCustomer ? existingCustomer.proof_number : "",
  };

  // Create Rental data
  const createRental = (values) => {
    setIsLoading(true);
    const data = new FormData();

    if (existingCustomer) {
      data.append(
        "customer_id",
        existingCustomer && existingCustomer.id ? existingCustomer.id : ""
      );
    }
    if (values && values.address !== undefined) {
      data.append("address", values && values.address);
    }
    if (values && values.advance_amount !== undefined) {
      data.append("advance_amount", values && values.advance_amount);
    }
    if (values && values.per_day_rent !== undefined) {
      data.append("per_day_rent", values && values.per_day_rent);
    }
    if (values && values.alternate_no !== undefined) {
      data.append("alternate_no", values && values.alternate_no);
    }
    if (values && values.customer_name !== undefined) {
      data.append("customer_name", values && values.customer_name);
    }
    if (values && values.expected_delivery !== undefined) {
      data.append("expected_delivery", values && values.expected_delivery);
    }
    if (values && values.proof_given !== undefined) {
      data.append("proof_given", values && values.proof_given);
    }
    if (values && values.proof_no !== undefined) {
      data.append("proof_no", values && values.proof_no);
    }
    if (values && values.start_date !== undefined) {
      data.append("start_date", values && values.start_date);
    }
    if (values && values.vehicle !== undefined) {
      data.append("vehicle", values && values.vehicle);
    }
    if (mobileNumber) {
      data.append("mobileNumber", mobileNumber);
    }
    if (values && values.payment_mode !== undefined) {
      data.append("payment_mode", values && values.payment_mode);
    }
    if (values && values.starting_km !== undefined) {
      data.append("starting_km", values && values.starting_km);
    }
    if (values && values.added_by !== undefined) {
      data.append("added_by", values && values.added_by);
    }
    dispatch(API.addRentals(data, history, {}));
    setIsLoading(false);
    history.push(`/rentals`);
  };
  const mobileinitialValues = {
    mobile_no: mobileNumber ? mobileNumber : "",
  };

  // Mobile Number schema
  const mobileNoFormSchema = {
    fields: [
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
    ],
  };

  // OTP schema
  const otpFormSchema = {
    fields: [
      {
        id: "otp",
        name: "otp",
        label: "OTP",
        type: "NUMBER",
        position: 3,
        required: true,
        placeholder: "Enter OTP",
        choices: [],
      },
    ],
  };

  // Rental schema
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
    <>
      <Card body>
        <CardTitle tag="h5">Enter Customer Number and validate OTP</CardTitle>
        <CardText>
          <FwModal
            size="large"
            id="add-company"
            submitText="submitText"
            hideFooter
            isOpen={otpValidated == true ? false : true}
            titleText={"Add Rental"}>
            <div>
              <FwForm
                initialValues={mobileinitialValues}
                formSchema={mobileNoFormSchema}
                ref={mobileFormRef}></FwForm>
              {otpSent == false && (
                <>
                  <FwButton
                    className="ml-2"
                    color="primary"
                    onClick={handleMobileNoSubmit}>
                    Send OTP
                  </FwButton>
                </>
              )}
              {otpSent == true && otpValidated == false ? (
                <>
                  <FwForm formSchema={otpFormSchema} ref={otpFormRef}></FwForm>

                  <FwButton
                    className="ml-2"
                    color="primary"
                    onClick={handleOtpSubmit}>
                    Validate
                  </FwButton>
                </>
              ) : (
                otpValidated == true && <span>OTP Validated</span>
              )}
            </div>
          </FwModal>
          {otpValidated == true && (
            <>
              <div>
                <span className="font-weight-bold">Mobile Number:</span>{" "}
                {mobileNumber}
              </div>
              <div>OTP Validated &#10003; &#9989;</div>
              <FwForm
                formSchema={rentalFormSchema}
                initialValues={customerInitialValues}
                ref={customerFormRef}></FwForm>
              <FwButton
                className="ml-2"
                color="primary"
                onClick={handleCustomerFormSubmit}>
                Save
              </FwButton>
            </>
          )}
        </CardText>
      </Card>
    </>
  );
};

export default CreateRental;
