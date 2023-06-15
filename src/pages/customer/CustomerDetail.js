import React, { useEffect, useState } from "react";
import { endpoints } from "../../configs";
import { apiClient } from "../../apiClient";
import Loader from "../../components/Loader";
import { Card, CardBody, CardHeader, CardText, Col, Row } from "reactstrap";
import cashImage from "../../assets/img/Paytm.jpg";
import PageTitle from "../../components/PageTitle";
const CustomerDetail = (props) => {
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
    getCustomerDetails(id);
  }, [id]);

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
        label="Customer Details"
        normalButton
        // buttonHandler={() => {
        //   history.push(`/edit-rental/${id}`);
        // }}
        // buttonLabel="Edit"
      />

      <Card className="my-2" color="info" outline>
        <CardHeader>Customer Details</CardHeader>
        <CardBody style={{ minHeight: "325px" }}>
          <CardText>
            <div>
              Name :{" "}
              <span className="font-weight-bold">{customerDetails.name}</span>
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
    </div>
  );
};

export default CustomerDetail;
