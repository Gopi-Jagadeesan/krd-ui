import React, { useEffect, useState } from "react";
import { endpoints } from "../../configs";
import { apiClient } from "../../apiClient";
import Loader from "../../components/Loader";
import { Card, CardBody, CardHeader, CardText, Col, Row } from "reactstrap";
import cashImage from "../../assets/img/Paytm.jpg";
import PageTitle from "../../components/PageTitle";
const RentalDetails = (props) => {
  // Get id from URL
  let id = props.match.params.id;

  const { history } = props;

  const [rentalDetails, setRentalDetails] = useState({});
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [customerDetails, setCustomerDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log("rentalDetails ----->", rentalDetails);
  console.log("vehicleDetails ----->", vehicleDetails);
  console.log("customerDetails ----->", customerDetails);

  // Get rental details initially
  useEffect(() => {
    getRentalDetails(id);
  }, [id]);

  // Get vehicle and customer details after getting rental details
  useEffect(() => {
    getVehicleDetails(rentalDetails && rentalDetails.vehicle_id);
    getCustomerDetails(rentalDetails && rentalDetails.customer_id);
  }, [rentalDetails]);

  // Get Rental details
  const getRentalDetails = async (id) => {
    setIsLoading(true);
    try {
      await apiClient
        .get(`${endpoints().rentalsAPI}/${id}`)
        .then((response) => {
          setRentalDetails(response && response.data);
        });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  // Get Vehicle details
  const getVehicleDetails = async (id) => {
    setIsLoading(true);
    try {
      await apiClient
        .get(`${endpoints().vehiclesAPI}/${id}`)
        .then((response) => {
          setVehicleDetails(response && response.data);
        });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <PageTitle
        label="Rentals Details"
        normalButton
        // buttonHandler={() => {
        //   history.push(`/edit-rental/${id}`);
        // }}
        // buttonLabel="Edit"
      />
      <Row>
        <Col sm="7">
          <Card className="my-2" color="info" outline>
            <CardHeader>Rental Details</CardHeader>
            <CardBody style={{ minHeight: "325px" }}>
              <CardText>
                <div>
                  Started at :{" "}
                  <span className="font-weight-bold">
                    {rentalDetails.start_date}
                  </span>
                </div>
                <div className="mt-2">
                  Expected at :{" "}
                  <span className="font-weight-bold">
                    {rentalDetails.expected_delivery}
                  </span>
                </div>
                <div className="mt-2">
                  Advance :{" "}
                  <span className="font-weight-bold">
                    {rentalDetails.advance_amount}
                  </span>
                </div>
                <div className="mt-2">
                  Per day rent :{" "}
                  <span className="font-weight-bold">
                    {rentalDetails.per_day_rent}
                  </span>
                </div>
                <div className="mt-2">
                  Starting Km :{" "}
                  <span className="font-weight-bold">
                    {rentalDetails.starting_km}
                  </span>
                </div>
                <div className="mt-2">
                  Payment method :{" "}
                  {rentalDetails.payment_mode == "cash" ? (
                    <>
                      <span className="font-weight-bold"> Cash </span>
                    </>
                  ) : rentalDetails.payment_mode == "paytm" ? (
                    <span className="font-weight-bold">Paytm</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mt-2">
                  Added by :{" "}
                  {rentalDetails.added_by == "bala" ? (
                    <span className="font-weight-bold"> Bala</span>
                  ) : rentalDetails.added_by == "kannan" ? (
                    <span className="font-weight-bold">Kannan</span>
                  ) : rentalDetails.added_by == "krishnan" ? (
                    <span className="font-weight-bold">Krishnan</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mt-2">
                  Ending Km :{" "}
                  <span className="font-weight-bold">
                    {rentalDetails.ending_km}
                  </span>
                </div>
                <div className="mt-2">
                  Closed by :{" "}
                  <span className="font-weight-bold">
                    {rentalDetails.closed_by}
                  </span>
                </div>
                <div className="mt-2">
                  End date :
                  <span className="font-weight-bold">
                    {rentalDetails.end_date}
                  </span>
                </div>
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col sm="5">
          <Card className="my-2" color="info" outline>
            <CardHeader>Customer Details</CardHeader>
            <CardBody style={{ minHeight: "325px" }}>
              <CardText>
                <div>
                  Name :{" "}
                  <span className="font-weight-bold">
                    {customerDetails.name}
                  </span>
                </div>
                <div className="mt-2">
                  Mobile No :{" "}
                  <span className="font-weight-bold">
                    {customerDetails.mobile_no}
                  </span>
                </div>
                <div className="mt-2">
                  Alternate No :{" "}
                  <span className="font-weight-bold">
                    {customerDetails.alternate_no}
                  </span>
                </div>
                <div className="mt-2">
                  Proof No :{" "}
                  <span className="font-weight-bold">
                    {customerDetails.proof_number}
                  </span>
                </div>
                <div className="mt-2">
                  Address :{" "}
                  <span className="font-weight-bold">
                    {customerDetails.address}
                  </span>
                </div>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Card className="my-2" color="info" outline>
        <CardHeader>Vehicle Details</CardHeader>
        <CardBody>
          <CardText>
            <Row>
              <Col sm="3">
                <div>
                  Name :{" "}
                  <span className="font-weight-bold">
                    {vehicleDetails.name}
                  </span>
                </div>
              </Col>
              <Col sm="3">
                <div className="mt-2">
                  Reg No :{" "}
                  <span className="font-weight-bold">
                    {vehicleDetails.reg_no}
                  </span>
                </div>
              </Col>
              <Col sm="3">
                <div className="mt-2">
                  Color :{" "}
                  <span className="font-weight-bold">
                    {vehicleDetails.color}
                  </span>
                </div>
              </Col>
              <Col sm="3">
                <div className="mt-2">
                  Notes :{" "}
                  <span className="font-weight-bold">
                    {vehicleDetails.notes}
                  </span>
                </div>
              </Col>
            </Row>
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default RentalDetails;
