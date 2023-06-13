import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, CardText, Col, Row } from "reactstrap";
import NoRecordsFound from "../../components/NoRecordsFound";

const QuickCardData = (props) => {
  const { data } = props;

  return (
    <div className="mt-4">
      <Row>
        {data &&
          data.map((value) => (
            <Col sm="3">
              <Card className="my-2" color="info" outline>
                <CardHeader>{value.header}</CardHeader>
                <CardBody style={{ minHeight: "325px" }}>
                  {value && value.text && value.text.length ? (
                    value.text.map((el) => (
                      <CardText>
                        {" "}
                        {el.name}
                        <span className="float-right">
                          <Link to={`${value.redirectTo}`}>View</Link>
                        </span>
                        <hr></hr>
                      </CardText>
                    ))
                  ) : (
                    <NoRecordsFound
                      showMessage={true}
                      hideCard={true}
                      message="No Records Found"
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default QuickCardData;
