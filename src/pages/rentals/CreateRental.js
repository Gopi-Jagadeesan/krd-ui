import {
  FwButton,
  FwForm,
  FwModal,
  ToastController,
} from "@freshworks/crayons/react";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardText, CardTitle } from "reactstrap";
//Config
import { endpoints } from "../../configs";
import { apiClient } from "../../apiClient";

import Webcam from "react-webcam";
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

// Actions
import * as API from "./Action";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import axios from "axios";
import Form from "../../components/Form";
import Text from "../../components/Text";
import Number from "../../components/Number";
import Select from "../../components/Select";
import MultiSelect from "../../components/Multiselect";
import CreatableDropdown from "../../components/CreatableDropdown";

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

  // Use Ref
  const mobileFormRef = useRef();
  const otpFormRef = useRef();

  // dispatch
  const dispatch = useDispatch();

  // Get Vehicles List
  useEffect(() => {
    getVehicleList();
  }, [props]);

  // Proof Options
  const proofOptions = [
    { value: "aadharCard", label: "Aadhar" },
    { value: "panCard", label: "Pan Card" },
    { value: "rationCard", label: "Ration Card" },
    { value: "drivingLicense", label: "Driving License" },
    { value: "rcCard", label: "RC book" },
    { value: "collegeId", label: "College ID" },
    { value: "workId", label: "Work ID" },
    { value: "voterId", label: "Voter ID" },
    { value: "passport", label: "Passport" },
  ];

  // Added by Options
  const addedByOptions = [
    { value: "kannan", label: "Kannan" },
    { value: "krishnan", label: "Krishnan" },
    { value: "bala", label: "Bala" },
  ];

  // Payment method Options
  const paymentOptions = [
    { value: "cash", label: "Cash" },
    { value: "paytm", label: "Paytm" },
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

  // Pictures code
  const [picture, setPicture] = useState("");
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  });

  // Customer Initial Values
  const initialValues = {
    address: existingCustomer ? existingCustomer.address : "",
    alternate_no: existingCustomer ? existingCustomer.alternate_no : "",
    customer_name: existingCustomer ? existingCustomer.name : "",
    proof_no: existingCustomer ? existingCustomer.proof_number : "",
  };

  // Create Rental data
  const handleSave = (values) => {
    setIsLoading(true);
    const data = new FormData();
    if (picture) {
      data.append("picture", picture ? picture : "");
    }
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
    // Update proof given
    let proofGiven = [];
    values &&
      values.proof_given &&
      values.proof_given.length >= 0 &&
      values.proof_given.forEach((data) => {
        if (data) {
          proofGiven.push({ id: data.value, name: data.label });
        }
      });

    const proofs = proofGiven.map((item) => item.name);

    let proof = proofs.join(", ");
    data.append("proof_given", proof ? proof : "");
    if (values && values.proof_no !== undefined) {
      data.append("proof_no", values && values.proof_no);
    }
    if (values && values.start_date !== undefined) {
      data.append("start_date", values && values.start_date);
    }
    if (
      values &&
      values.vehicle &&
      values.vehicle.value == values.vehicle.label
    ) {
      data.append("new_vehicle", values.vehicle.value);
    } else {
      data.append("vehicle", values.vehicle.value);
    }
    if (mobileNumber) {
      data.append("mobileNumber", mobileNumber);
    }
    if (values && values.payment_mode !== undefined) {
      data.append(
        "payment_mode",
        values && values.payment_mode && values.payment_mode.value
      );
    }
    if (values && values.starting_km !== undefined) {
      data.append("starting_km", values && values.starting_km);
    }
    if (values && values.added_by !== undefined) {
      data.append(
        "added_by",
        values && values.added_by && values.added_by.value
      );
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
              {/* <FwForm
                // formSchema={rentalFormSchema}
                initialValues={customerInitialValues}
                ref={customerFormRef}>
                <FwFormControl
                  type="TEXT"
                  name="customer_name"
                  required
                  label="Customer Name"
                  placeholder="Enter Customer Name"></FwFormControl>
                <FwFormControl
                  type="NUMBER"
                  name="alternate_no"
                  required
                  label="Alternate Number"
                  placeholder="Enter Alternate Number"></FwFormControl>
                <FwFormControl
                  type="TEXT"
                  name="address"
                  required
                  label="Address"
                  placeholder="Enter Address"></FwFormControl>
                <FwFormControl
                  type="TEXT"
                  name="proof_no"
                  required
                  label="Proof Number"
                  placeholder="Enter Proof Number"></FwFormControl>
                <FwFormControl
                  type="MULTI_SELECT"
                  name="proof_given"
                  required
                  label="Proof Given"
                  placeholder="Enter Proof Given"
                  choices={proofOptions}></FwFormControl>
                <FwFormControl
                  type="DROPDOWN"
                  name="vehicle"
                  required
                  label="Vehicle"
                  placeholder="Select Vehicle"
                  choices={vehicleOption}></FwFormControl>
                <FwFormControl
                  type="DATE_TIME"
                  name="start_date"
                  // required
                  label="Start Date"
                  placeholder="Select Start Date"></FwFormControl>
                <FwFormControl
                  type="NUMBER"
                  name="expected_delivery"
                  required
                  label="Expected Delivery"
                  placeholder="Enter Expected Delivery"></FwFormControl>
                <FwFormControl
                  type="NUMBER"
                  name="advance_amount"
                  required
                  label="Advance Amount"
                  placeholder="Enter Advance Amount"></FwFormControl>
                <FwFormControl
                  type="NUMBER"
                  name="per_day_rent"
                  required
                  label="Per day rent"
                  placeholder="Enter Per day rent"></FwFormControl>
                <FwFormControl
                  type="NUMBER"
                  name="starting_km"
                  required
                  label="Starting Km"
                  placeholder="Enter Starting Km"></FwFormControl>
                <FwFormControl
                  type="DROPDOWN"
                  name="payment_mode"
                  required
                  label="Payment mode"
                  placeholder="Select Payment mode"
                  choices={paymentOptions}></FwFormControl>
                <FwFormControl
                  type="DROPDOWN"
                  name="added_by"
                  required
                  label="Added By"
                  placeholder="Select Added By"
                  choices={addedByOptions}></FwFormControl>
              </FwForm>
              <FwButton
                className="ml-2"
                color="primary"
                onClick={handleCustomerFormSubmit}>
                Save
              </FwButton>
              <FwSelect
                label="House Name"
                required
                value="1"
                placeholder="Your choice"
                hintText="Select singluar option">
                <FwSelectOption value="1">Starks</FwSelectOption>
                <FwSelectOption value="2">Lannisters</FwSelectOption>
              </FwSelect> */}
              <div>
                {picture == "" ? (
                  <Webcam
                    audio={false}
                    height={400}
                    ref={webcamRef}
                    width={400}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                ) : (
                  <img alt="userPic" src={picture} />
                )}
              </div>
              <div>
                {picture != "" ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setPicture("");
                    }}
                    className="btn btn-primary">
                    Retake
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      capture();
                    }}
                    className="btn btn-danger">
                    Capture
                  </button>
                )}
              </div>
              <Form
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={(values) => {
                  handleSave(values);
                }}>
                <div className="form-group mt-2 mb-3">
                  <div>
                    <Text
                      name="customer_name"
                      label="Customer Name"
                      placeholder="Enter Customer Name..."
                      required={true}
                    />
                  </div>
                  <div>
                    <Text
                      name="alternate_no"
                      label="Alternate Number"
                      placeholder="Enter Alternate Number..."
                      required={true}
                    />
                  </div>
                  <div>
                    <Text
                      name="address"
                      label="Address"
                      placeholder="Enter Address..."
                      required={true}
                    />
                  </div>
                  <div>
                    <Text
                      name="proof_no"
                      label="Proof Number"
                      placeholder="Enter Proof Number..."
                      required={true}
                    />
                  </div>
                  <div>
                    <MultiSelect
                      name="proof_given"
                      label="Proof Given"
                      placeholder="Select Proof Given..."
                      error="proof given is required"
                      options={proofOptions}
                      required={true}
                      isMulti
                    />
                  </div>
                  {/* <div>
                    <Select
                      name="vehicle"
                      label="Vehicle"
                      placeholder="Select Vehicle..."
                      isSearchable
                      isClearable={true}
                      required={true}
                      options={vehicleOption}
                    />
                  </div> */}
                  <div>
                    <CreatableDropdown
                      isSingleSelect
                      name="vehicle"
                      label="Vehicle"
                      placeholder="Select Vehicle..."
                      isSearchable
                      isClearable={true}
                      required={true}
                      options={vehicleOption}
                    />
                  </div>

                  {/* <div>
                    <Text
                      name="start_date"
                      label="Start Date"
                      placeholder="Select Start Date..."
                      
                      required={true}
                      
                    />
                  </div> */}
                  <div>
                    <Number
                      name="expected_delivery"
                      label="Expected Delivery"
                      placeholder="Enter Expected Delivery..."
                      required={true}
                    />
                  </div>
                  <div>
                    <Number
                      name="advance_amount"
                      label="Advance Amount"
                      placeholder="Enter Advance Amount..."
                      required={true}
                    />
                  </div>
                  <div>
                    <Number
                      name="per_day_rent"
                      label="Per day rent"
                      placeholder="Enter Per day rent..."
                      required={true}
                    />
                  </div>
                  <div>
                    <Number
                      name="starting_km"
                      label="Starting Km"
                      placeholder="Enter Starting Km..."
                      required={true}
                    />
                  </div>
                  <div>
                    <Select
                      name="payment_mode"
                      label="Payment mode"
                      placeholder="Select Payment mode..."
                      required={true}
                      options={paymentOptions}
                    />
                  </div>
                  <div>
                    <Select
                      name="added_by"
                      label="Added By"
                      placeholder="Select Added By..."
                      required={true}
                      options={addedByOptions}
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
            </>
          )}
        </CardText>
      </Card>
    </>
  );
};

export default CreateRental;
