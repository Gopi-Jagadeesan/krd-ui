import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle";
import {
  Nav,
  NavItem,
  TabContent,
  TabPane,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import {
  APPLICATIONS_LOANS_TAB,
  APPLICATIONS_GENERAL_TAB,
  APPLICATIONS_PAYMENTS_TAB,
} from "./Constant";
import { endpoints } from "../../configs";
import { apiClient } from "../../apiClient";
import { ToastController } from "@freshworks/crayons";
import {
  FwButton,
  FwForm,
  FwFormControl,
  FwIcon,
  FwModal,
  FwModalContent,
  FwModalTitle,
} from "@freshworks/crayons/react";
import LoanList from "../loans/LoanList";
import ReduxTable, { ReduxColumn } from "../../components/ReduxTable";
import { useDispatch } from "react-redux";

// Initialize toast message
const toastMessage = ToastController({ position: "top-center" });

const CustomerDetail = (props) => {
  const [activeTab, setActiveTab] = useState(APPLICATIONS_GENERAL_TAB);
  const [customerDetails, setCustomerDetails] = useState("");
  const [addModalOpen, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentDeleteData, setCurrentDeleteData] = useState();
  const [loanTypes, setLoanType] = useState([]);
  const [loanSubTypes, setLoanSubType] = useState([]);

  const id = props.match.params.id;

  // Sort by options
  const sortByOption = [
    {
      value: "name:ASC",
      text: "Name",
    },
    {
      value: "createdAt:DESC",
      text: "Most Recent",
    },
  ];

  // Gender options
  const genderOptions = [
    { value: "male", text: "Male" },
    { value: "female", text: "Female" },
  ];

  // Status options
  const statusOptions = [
    { value: "active", text: "Active" },
    { value: "inActive", text: "In Active" },
  ];

  const initialValues =
    customerDetails && customerDetails ? customerDetails : "";

  // Dispach
  const dispatch = useDispatch();

  useEffect(() => {
    getCustomerDetails(id);
    getLoanType();
  }, [id]);

  //useRef
  const customerformRef = useRef();

  // UseRef
  const loanformRef = useRef();

  // Tabs toggle
  const tabToggle = (tab) => {
    setActiveTab(tab);
  };

  // Get Loan Types
  const getLoanType = async () => {
    let data;
    await apiClient
      .get(`${endpoints().loanTypeAPI}/search`)
      .then((response) => {
        data = response.data.data;
        if (data && data.length > 0) {
          const loanType = [];
          data
            .sort((a, b) => parseFloat(a.sort) - parseFloat(b.sort))
            .forEach((loanTypeData) => {
              loanType.push({
                value: loanTypeData.id,
                id: loanTypeData.id,
                text: loanTypeData.name,
              });
            });
          setLoanType(loanType);
        }
      });
    return data;
  };

  // Get loan sub types
  const getLoanSubTypes = async (id) => {
    let data;
    await apiClient
      .get(`${endpoints().loanSubTypeAPI}/search/${id}`)
      .then((response) => {
        data = response.data.data;
        if (data && data.length > 0) {
          const loanSubType = [];
          data
            .sort((a, b) => parseFloat(a.sort) - parseFloat(b.sort))
            .forEach((loanSubTypeData) => {
              loanSubType.push({
                value: loanSubTypeData.id,
                id: loanSubTypeData.id,
                text: loanSubTypeData.name,
              });
            });
          setLoanSubType(loanSubType);
        }
      });
    return data;
  };

  // Get customer details
  const getCustomerDetails = async (id) => {
    let data;
    await apiClient
      .get(`${endpoints().customerAPI}/${id}`)
      .then((response) => {
        data = response.data;
        setCustomerDetails(data);
      })
      .catch((error) => {
        toastMessage.trigger({
          type: "error",
          content: error.response,
        });
      });
  };

  // Form submit function for customer
  const handleFormSubmit = async (e) => {
    const { values, isValid } = await customerformRef.current.doSubmit(e);
    if (isValid) {
      // handleSave(values);
    }
  };

  // Form submit function for loan
  const handleLoanFormSubmit = async (e) => {
    const { values } = await loanformRef.current.doSubmit(e);

    let isValid = !values.loan_amount
      ? loanformRef.current.setFieldErrors({
          loan_amount: "Loan amount is required",
        }) & false
      : !values.loan_type_id
      ? loanformRef.current.setFieldErrors({
          loan_type_id: "Loan type is required",
        }) & false
      : !values.loan_sub_type_id
      ? loanformRef.current.setFieldErrors({
          loan_sub_type_id: "Loan sub type is required",
        }) & false
      : !values.interest_rate
      ? loanformRef.current.setFieldErrors({
          interest_rate: "Interest rate is required",
        }) & false
      : !values.duration
      ? loanformRef.current.setFieldErrors({
          duration: "Duration is required",
        }) & false
      : !values.start_date
      ? loanformRef.current.setFieldErrors({
          start_date: "Start date is required",
        }) & false
      : !values.due_duration
      ? loanformRef.current.setFieldErrors({
          due_duration: "Due duration is required",
        }) & false
      : !values.next_due_date
      ? loanformRef.current.setFieldErrors({
          next_due_date: "Next due date is required",
        }) & false
      : true;

    if (isValid) {
      // handleSave(values);
    }
  };

  // Toggle add modal
  const toggleLoanModal = () => {
    setAddModal(!addModalOpen);
  };

  // Loans delete function
  const loanTypeDelete = () => {
    dispatch(API.deleteCustomer(currentDeleteData.id, {}));
    setDeleteModal(false);
    setCurrentDeleteData("");
  };

  // Toggle delete modal
  const deleteToggle = () => {
    setDeleteModal(!deleteModal);
  };

  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = image;
    downloadLink.download = "image.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      {/* Add Loan Modal Starts */}
      <FwModal
        size="large"
        id="add-loans"
        submitText="submitText"
        hideFooter
        onFwClose={toggleLoanModal}
        isOpen={addModalOpen}
        titleText={"Add Loan"}>
        <div>
          <FwForm ref={loanformRef}>
            <Row>
              <Col sm="6">
                <FwFormControl
                  type="DROPDOWN"
                  name="loan_type_id"
                  required
                  label="Loan Type"
                  placeholder="Select Loan Type"
                  choices={loanTypes}
                  onFwChange={(e) => {
                    getLoanSubTypes(e && e.detail && e.detail.value);
                  }}></FwFormControl>
                <FwFormControl
                  type="DROPDOWN"
                  name="loan_sub_type_id"
                  required
                  label="Loan Sub Type"
                  placeholder="Select Loan Sub Type"
                  choices={loanSubTypes}></FwFormControl>
                <FwFormControl
                  type="TEXT"
                  name="loan_amount"
                  required
                  label="Loan Amount"
                  placeholder="Enter Loan Amount"></FwFormControl>
                <FwFormControl
                  type="TEXT"
                  name="interest_rate"
                  required
                  label="Interest Rate"
                  placeholder="Enter Interest Rate"></FwFormControl>
                <FwFormControl
                  type="TEXT"
                  name="duration"
                  required
                  label="Duration in months"
                  placeholder="Enter Duration in months"></FwFormControl>
              </Col>
              <Col sm="6">
                <FwFormControl
                  type="DATE"
                  name="start_date"
                  required
                  label="Start Date"
                  placeholder="Select Start Date"></FwFormControl>
                <FwFormControl
                  type="DATE"
                  name="due_duration"
                  required
                  label="Due duration in days"
                  placeholder="Select Due duration in days"
                  choices={statusOptions}></FwFormControl>
                <FwFormControl
                  type="DATE"
                  name="next_due_date"
                  required
                  label="Next due on"
                  placeholder="Enter Next due on"></FwFormControl>
              </Col>
            </Row>
          </FwForm>
          <div>
            <input type="file" onChange={handleImageChange} />
            {image && (
              <div>
                <img src={image} alt="uploaded" width="200" height="200" />
                <button onClick={handleDownload}>Download</button>
              </div>
            )}
          </div>
          <FwButton color="secondary" onClick={toggleLoanModal}>
            Cancel
          </FwButton>
          <FwButton
            className="ml-2"
            color="primary"
            onClick={handleLoanFormSubmit}>
            Add Loan
          </FwButton>
        </div>
      </FwModal>
      {/* Add Loan Modal Ends */}
      <PageTitle
        showBreadcrumb
        label="Application Details"
        buttonLabel="Add Loan"
        buttonHandler={
          activeTab === APPLICATIONS_LOANS_TAB
            ? () => {
                toggleLoanModal();
              }
            : ""
        }
      />
      <div className="row links text-center table-filter ml-1 mt-3 mr-3">
        <Nav tabs className="admin-tabs">
          {/* General Tab */}
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === APPLICATIONS_GENERAL_TAB,
              })}
              onClick={() => {
                tabToggle(APPLICATIONS_GENERAL_TAB);
              }}>
              {APPLICATIONS_GENERAL_TAB}
            </NavLink>
          </NavItem>

          {/* Attachments */}
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === APPLICATIONS_LOANS_TAB,
              })}
              onClick={() => {
                tabToggle(APPLICATIONS_LOANS_TAB);
              }}>
              {APPLICATIONS_LOANS_TAB}
            </NavLink>
          </NavItem>
          {/* Applications */}
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === APPLICATIONS_PAYMENTS_TAB,
              })}
              onClick={() => {
                tabToggle(APPLICATIONS_PAYMENTS_TAB);
              }}>
              {APPLICATIONS_PAYMENTS_TAB}
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <div className=" mt-2 mb-4">
        <TabContent activeTab={activeTab}>
          <TabPane tabId={APPLICATIONS_GENERAL_TAB} className="w-100">
            <FwForm initialValues={initialValues} ref={customerformRef}>
              <Row>
                <Col sm="6">
                  <FwFormControl
                    type="TEXT"
                    name="name"
                    required
                    label="Customer Name"
                    placeholder="Enter Customer Name"></FwFormControl>
                  <FwFormControl
                    type="TEXT"
                    name="whatsapp_number"
                    required
                    label="Whatsapp Number"
                    placeholder="Enter Whatsapp Number"></FwFormControl>
                  <FwFormControl
                    type="TEXT"
                    name="address_line_1"
                    required
                    label="Address Line 1"
                    placeholder="Enter Address Line 1"></FwFormControl>
                  <FwFormControl
                    type="TEXT"
                    name="address_line_2"
                    required
                    label="Address Line 2"
                    placeholder="Enter Address Line 2"></FwFormControl>

                  <FwFormControl
                    type="TEXT"
                    name="state"
                    required
                    label="State"
                    placeholder="Enter State"></FwFormControl>
                  <FwFormControl
                    type="TEXT"
                    name="country"
                    required
                    label="Country"
                    placeholder="Enter Country"></FwFormControl>
                </Col>{" "}
                <Col sm="6">
                  <FwFormControl
                    type="DROPDOWN"
                    name="status"
                    required
                    label="Status"
                    placeholder="Select Status"
                    choices={statusOptions}></FwFormControl>
                  <FwFormControl
                    type="DATE"
                    name="date_of_birth"
                    required
                    label="Date of Birth"
                    placeholder="Enter Date of Birth"></FwFormControl>
                  <FwFormControl
                    type="DROPDOWN"
                    name="gender"
                    required
                    label="Gender"
                    placeholder="Enter Gender"
                    choices={genderOptions}></FwFormControl>
                  <FwFormControl
                    type="TEXT"
                    name="mobile_number"
                    required
                    label="Mobile Number"
                    placeholder="Enter Mobile Number"></FwFormControl>
                  <FwFormControl
                    type="TEXT"
                    name="place"
                    required
                    label="Place"
                    placeholder="Enter Place"></FwFormControl>
                  <FwFormControl
                    type="NUMBER"
                    name="postal_code"
                    required
                    label="Postal Code"
                    placeholder="Enter Postal Code"></FwFormControl>
                </Col>
              </Row>
            </FwForm>
            <FwButton
              className="ml-2"
              color="primary"
              onClick={handleFormSubmit}>
              Save
            </FwButton>
          </TabPane>
          <TabPane tabId={APPLICATIONS_LOANS_TAB} className="w-100">
            {/* Delete Loans Modal Starts */}
            <FwModal
              id="composition"
              size="small"
              submit-color="danger"
              submit-text="Delete"
              submit={loanTypeDelete}
              onFwClose={deleteToggle}
              isOpen={deleteModal}>
              <FwModalTitle>
                <span>Delete Loans</span>
              </FwModalTitle>
              <FwModalContent>
                <span>
                  Are you sure you want to delete{" "}
                  {currentDeleteData && currentDeleteData.companyName}?
                </span>
              </FwModalContent>
            </FwModal>
            {/* Delete Loans Modal Ends */}

            {/*Redux table  */}

            {/* <div className="mt-4 mb-5"> */}
            <ReduxTable
              onScroll
              id="loanType"
              showHeader
              searchPlaceholder="Search Loans"
              apiURL={`${endpoints().loansAPI}/search`}
              newTableHeading
              sortByOptions={sortByOption}
              disableColumnSort={true}>
              <ReduxColumn
                minWidth="150px"
                field="companyName"
                isClickable={"true"}
                sortBy="companyName"
                type="link"
                renderField={(row) => <span>{row.companyName}</span>}>
                Name
              </ReduxColumn>
              <ReduxColumn minWidth="100px" field="email">
                Email
              </ReduxColumn>
              <ReduxColumn minWidth="100px" field="createdAt">
                Created At
              </ReduxColumn>
              <ReduxColumn
                minWidth="70px"
                field="Action"
                className="action-column"
                disableOnClick
                renderField={(row) => (
                  <div className="text-center">
                    {row.role !== "Super Admin" && (
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
                    )}
                  </div>
                )}>
                Action
              </ReduxColumn>
            </ReduxTable>
          </TabPane>
          <TabPane tabId={APPLICATIONS_PAYMENTS_TAB} className="w-100">
            Payments
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default CustomerDetail;
