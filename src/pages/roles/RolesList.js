import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FwAccordion,
  FwAccordionBody,
  FwAccordionTitle,
  FwButton,
  FwForm,
  FwFormControl,
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
import Loader from "../../components/Loader";
import { Col, Row } from "reactstrap";

const RolesList = (props) => {
  const [addModalOpen, setAddModal] = useState(false);
  const [currentDeleteData, setCurrentDeleteData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [isSysAdmin, setIsSysAdmin] = useState(false);

  // Dispach
  const dispatch = useDispatch();

  //useRef
  const formRef = useRef();

  // Toggle add modal
  const toggle = () => {
    setAddModal(!addModalOpen);
  };

  // Toggle delete modal
  const deleteToggle = () => {
    setDeleteModal(!deleteModal);
  };

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

  /**
   * Create Roles
   *
   * @param values
   */
  const handleSave = (values) => {
    console.log("values ----->", values);
    const data = new FormData();

    if (values && values.name !== undefined) {
      data.append("name", values && values.name);
    }
    if (values && values.add_customer !== undefined) {
      data.append("add_customer", values && values.add_customer);
    }
    if (values && values.add_loan_type !== undefined) {
      data.append("add_loan_type", values && values.add_loan_type);
    }
    if (values && values.add_loans !== undefined) {
      data.append("add_loans", values && values.add_loans);
    }
    if (values && values.add_payment_mode !== undefined) {
      data.append("add_payment_mode", values && values.add_payment_mode);
    }
    if (values && values.add_role !== undefined) {
      data.append("add_role", values && values.add_role);
    }
    if (values && values.add_user !== undefined) {
      data.append("add_user", values && values.add_user);
    }
    if (values && values.delete_customer !== undefined) {
      data.append("delete_customer", values && values.delete_customer);
    }
    if (values && values.delete_loan_type !== undefined) {
      data.append("delete_loan_type", values && values.delete_loan_type);
    }
    if (values && values.delete_loans !== undefined) {
      data.append("delete_loans", values && values.delete_loans);
    }
    if (values && values.delete_payment_mode !== undefined) {
      data.append("delete_payment_mode", values && values.delete_payment_mode);
    }
    if (values && values.delete_role !== undefined) {
      data.append("delete_role", values && values.delete_role);
    }
    if (values && values.delete_user !== undefined) {
      data.append("delete_user", values && values.delete_user);
    }
    if (values && values.edit_customer !== undefined) {
      data.append("edit_customer", values && values.edit_customer);
    }
    if (values && values.edit_loan_type !== undefined) {
      data.append("edit_loan_type", values && values.edit_loan_type);
    }
    if (values && values.edit_loans !== undefined) {
      data.append("edit_loans", values && values.edit_loans);
    }
    if (values && values.edit_payment_mode !== undefined) {
      data.append("edit_payment_mode", values && values.edit_payment_mode);
    }
    if (values && values.edit_role !== undefined) {
      data.append("edit_role", values && values.edit_role);
    }
    if (values && values.edit_user !== undefined) {
      data.append("edit_user", values && values.edit_user);
    }
    if (values && values.is_system_admin !== undefined) {
      data.append("is_system_admin", values && values.is_system_admin);
    }
    if (values && values.show_overdue_payments !== undefined) {
      data.append(
        "show_overdue_payments",
        values && values.show_overdue_payments
      );
    }
    if (values && values.show_report !== undefined) {
      data.append("show_report", values && values.show_report);
    }
    if (values && values.view_customer !== undefined) {
      data.append("view_customer", values && values.view_customer);
    }
    if (values && values.view_loan_type !== undefined) {
      data.append("view_loan_type", values && values.view_loan_type);
    }
    if (values && values.view_loans !== undefined) {
      data.append("view_loans", values && values.view_loans);
    }
    if (values && values.view_payment_mode !== undefined) {
      data.append("view_payment_mode", values && values.view_payment_mode);
    }
    if (values && values.view_role !== undefined) {
      data.append("view_role", values && values.view_role);
    }
    if (values && values.view_user !== undefined) {
      data.append("view_user", values && values.view_user);
    }
    data.append("company_id", 1);

    dispatch(API.addRole(data, {}));
    toggle();
  };

  // Roles delete function
  const loanTypeDelete = () => {
    dispatch(API.deleteRole(currentDeleteData.id, {}));
    setDeleteModal(false);
    setCurrentDeleteData("");
  };

  // Form submit function
  const handleFormSubmit = async (e) => {
    const { values, isValid } = await formRef.current.doSubmit(e);

    if (isValid) {
      handleSave(values);
    }
  };

  return (
    <>
      {/* Add Roles Modal Starts */}
      <FwModal
        size="large"
        id="add-payment-mode"
        submitText="submitText"
        hideFooter
        onFwClose={toggle}
        isOpen={addModalOpen}
        titleText={"Add Roles"}>
        <div>
          <FwForm ref={formRef}>
            <FwFormControl
              type="TEXT"
              name="name"
              required
              label="Role Name"
              placeholder="Enter Role Name"></FwFormControl>
            <FwFormControl
              type="CHECKBOX"
              name="is_system_admin"
              label="Is System Admin"
              onFwChange={() => {
                setIsSysAdmin(!isSysAdmin);
              }}
              placeholder="Enter Is System Admin"></FwFormControl>
            {!isSysAdmin && (
              <>
                <Row>
                  <Col sm="4">
                    <h6 className="font-weight-bold">Customers</h6>
                    <FwFormControl
                      type="CHECKBOX"
                      name="view_customer"
                      label="View Customer"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="add_customer"
                      label="Add Customer"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="edit_customer"
                      label="Edit Customer"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      view_customer
                      name="delete_customer"
                      label="Delete Customer"></FwFormControl>
                  </Col>
                  <Col sm="4">
                    <h6 className="font-weight-bold">Loans</h6>
                    <FwFormControl
                      type="CHECKBOX"
                      name="view_loans"
                      label="View Loans"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="add_loans"
                      label="Add Loans"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="edit_loans"
                      label="Edit Loans"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="delete_loans"
                      label="Delete Loans"></FwFormControl>
                  </Col>
                  <Col sm="4">
                    <h6 className="font-weight-bold">Loan Type</h6>
                    <FwFormControl
                      type="CHECKBOX"
                      name="view_loan_type"
                      label="View Loan Type"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="add_loan_type"
                      label="Add Loan Type"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="edit_loan_type"
                      label="Edit Loan Type"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="delete_loan_type"
                      label="Delete Loan Type"></FwFormControl>
                  </Col>
                </Row>
                <Row>
                  <Col sm="4">
                    <h6 className="font-weight-bold">Payment Mode</h6>
                    <FwFormControl
                      type="CHECKBOX"
                      name="view_payment_mode"
                      label="View Payment Mode"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="add_payment_mode"
                      label="Add Payment Mode"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="edit_payment_mode"
                      label="Edit Payment Mode"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="delete_payment_mode"
                      label="Delete Payment Mode"></FwFormControl>
                  </Col>
                  <Col sm="4">
                    <h6 className="font-weight-bold">Roles & Permissions</h6>
                    <FwFormControl
                      type="CHECKBOX"
                      name="view_role"
                      label="View Roles & Permissions"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="add_role"
                      label="Add Roles & Permissions"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="edit_role"
                      label="Edit Roles & Permissions"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="delete_role"
                      label="Delete Roles & Permissions"></FwFormControl>
                  </Col>
                  <Col sm="4">
                    <h6 className="font-weight-bold">Users</h6>
                    <FwFormControl
                      type="CHECKBOX"
                      name="view_user"
                      label="View Users"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="add_user"
                      label="Add Users"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="edit_user"
                      label="Edit Users"></FwFormControl>
                    <FwFormControl
                      type="CHECKBOX"
                      name="delete_user"
                      label="Delete Users"></FwFormControl>
                  </Col>
                </Row>
                <Row>
                  <Col sm="4">
                    <h6 className="font-weight-bold">Reports</h6>
                    <FwFormControl
                      type="CHECKBOX"
                      name="show_report"
                      label="Show Report"></FwFormControl>
                  </Col>
                  <Col sm="4">
                    <h6 className="font-weight-bold">Overdue Payments</h6>
                    <FwFormControl
                      type="CHECKBOX"
                      name="show_overdue_payments"
                      label="Show Overdue payments"></FwFormControl>
                  </Col>
                  <Col sm="4"></Col>
                </Row>
              </>
            )}
          </FwForm>
          <FwButton className="mt-2" color="secondary" onClick={toggle}>
            Cancel
          </FwButton>
          <FwButton className="ml-2" color="primary" onClick={handleFormSubmit}>
            Add Roles
          </FwButton>
        </div>
      </FwModal>
      {/* Add Roles Modal Ends */}

      {/* Delete Roles Modal Starts */}
      <FwModal
        id="composition"
        size="small"
        submit-color="danger"
        submit-text="Delete"
        submit={loanTypeDelete}
        onFwClose={deleteToggle}
        isOpen={deleteModal}>
        <FwModalTitle>
          <span>Delete Roles</span>
        </FwModalTitle>
        <FwModalContent>
          <span>
            Are you sure you want to delete{" "}
            {currentDeleteData && currentDeleteData.companyName}?
          </span>
        </FwModalContent>
      </FwModal>
      {/* Delete Roles Modal Ends */}

      {/*Redux table  */}
      <PageTitle
        label="Roles"
        buttonHandler={() => {
          toggle();
        }}
        buttonLabel="Add New"
      />

      <div className="mt-4 mb-5">
        <ReduxTable
          onScroll
          id="role"
          showHeader
          searchPlaceholder="Search Roles"
          apiURL={`${endpoints().rolesAPI}/search`}
          newTableHeading
          sortByOptions={sortByOption}
          disableColumnSort={true}>
          <ReduxColumn
            minWidth="150px"
            field="name"
            isClickable={"true"}
            sortBy="name"
            type="link">
            Name
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
              console.log("row ---->", row),
              (
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
              )
            )}>
            Action
          </ReduxColumn>
        </ReduxTable>
      </div>
    </>
  );
};
export default RolesList;
