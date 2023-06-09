import React, { useEffect, useState } from "react";
import { endpoints } from "../../configs";
import { apiClient } from "../../apiClient";
import Loader from "../../components/Loader";
import { Card, CardBody, CardHeader, CardText, Col, Row } from "reactstrap";
import PageTitle from "../../components/PageTitle";

const RentalDetails = (props) => {
  // Get id from URL
  let id = props.match.params.id;

  const [rentalDetails, setRentalDetails] = useState({});
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [customerDetails, setCustomerDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
      <PageTitle label="Rentals Details" normalButton />
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
                  End date :{" "}
                  <span className="font-weight-bold">
                    {rentalDetails.end_date}
                  </span>
                </div>
                <div className="mt-2">
                  Proof Given :{" "}
                  <span className="font-weight-bold">
                    {rentalDetails.proof_given}
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
                <Row>
                  <Col sm="7">
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
                  </Col>
                  <Col sm="5">
                    <img
                      width={"200"}
                      height={"200"}
                      alt="userPic"
                      src={
                        customerDetails && customerDetails.picture
                          ? customerDetails.picture
                          : ""
                      }
                    />
                  </Col>
                </Row>
                <hr></hr>
                <h5>Vehicle Details</h5>
                <div>
                  Name :{" "}
                  <span className="font-weight-bold">
                    {vehicleDetails.name}
                  </span>
                </div>
                <div className="mt-2">
                  Reg No :{" "}
                  <span className="font-weight-bold">
                    {vehicleDetails.reg_no}
                  </span>
                </div>
                <div className="mt-2">
                  Color :{" "}
                  <span className="font-weight-bold">
                    {vehicleDetails.color}
                  </span>
                </div>
                <div className="mt-2">
                  Notes :{" "}
                  <span className="font-weight-bold">
                    {vehicleDetails.notes}
                  </span>
                </div>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Card className="my-2" color="info" outline>
        <CardHeader>Customer Memorandum of Understanding</CardHeader>
        <CardBody>
          <CardText>
            <div>
              1. The symbol should be checked and fed in the vehicle{" "}
              <span className="font-weight-bold"> engine temperature</span> With
              this the vehicle driver is responsible for any fault in the
              vehicle.
            </div>
            <div>
              2. The driver is solely responsible for carrying any illegal items
              in the vahicle, or engaging in illegal activities.
            </div>
            <div>
              3. The driver shall be responsible for all costs and consequences
              of any accident/damage while traveling in the vehicle.
            </div>
            <div>
              4. The rental contract of the vehicle is limited to 24 hours. If
              it goes beyond that, the driver will have to pay the next 24 hours
              of rent.
            </div>
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default RentalDetails;
