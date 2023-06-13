import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FwButton,
  FwForm,
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

const PaymentModeList = () => {
  const [addModalOpen, setAddModal] = useState(false);
  const [currentDeleteData, setCurrentDeleteData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

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
      value: "payment_mode_name:ASC",
      text: "Name",
    },
    {
      value: "createdAt:DESC",
      text: "Most Recent",
    },
  ];

  /**
   * Create Payment Mode
   *
   * @param values
   */
  const handleSave = (values) => {
    const data = new FormData();
    if (values && values.payment_mode_name !== undefined) {
      data.append("payment_mode_name", values && values.payment_mode_name);
    }
    dispatch(API.addPaymentMode(data, {}));
    toggle();
  };

  // Payment Mode delete function
  const loanTypeDelete = () => {
    dispatch(API.deletePaymentMode(currentDeleteData.id, {}));
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

  //Get Form Schema
  const formSchema = {
    name: "Test Form",
    fields: [
      {
        id: "payment_mode_name",
        name: "payment_mode_name",
        label: "Payment Mode Name",
        type: "TEXT",
        position: 3,
        required: true,
        placeholder: "Enter Name",
        choices: [],
      },
    ],
  };

  return (
    <>
      {/* Add Payment Mode Modal Starts */}
      <FwModal
        id="add-payment-mode"
        submitText="submitText"
        hideFooter
        onFwClose={toggle}
        isOpen={addModalOpen}
        titleText={"Add Payment Mode"}>
        <div>
          <FwForm ref={formRef} formSchema={formSchema}></FwForm>
          <FwButton color="secondary" onClick={toggle}>
            Cancel
          </FwButton>
          <FwButton className="ml-2" color="primary" onClick={handleFormSubmit}>
            Add Payment Mode
          </FwButton>
        </div>
      </FwModal>
      {/* Add Payment Mode Modal Ends */}

      {/* Delete Payment Mode Modal Starts */}
      <FwModal
        id="composition"
        size="small"
        submit-color="danger"
        submit-text="Delete"
        submit={loanTypeDelete}
        onFwClose={deleteToggle}
        isOpen={deleteModal}>
        <FwModalTitle>
          <span>Delete Payment Mode</span>
        </FwModalTitle>
        <FwModalContent>
          <span>
            Are you sure you want to delete{" "}
            {currentDeleteData && currentDeleteData.companyName}?
          </span>
        </FwModalContent>
      </FwModal>
      {/* Delete Payment Mode Modal Ends */}

      {/*Redux table  */}
      <PageTitle
        label="Payment Mode"
        buttonHandler={() => {
          toggle();
        }}
        buttonLabel="Add New"
      />

      <div className="mt-4 mb-5">
        <ReduxTable
          onScroll
          id="paymentMode"
          showHeader
          searchPlaceholder="Search Payment Mode"
          apiURL={`${endpoints().paymentModeAPI}/search`}
          newTableHeading
          sortByOptions={sortByOption}
          disableColumnSort={true}>
          <ReduxColumn
            minWidth="150px"
            field="payment_mode_name"
            isClickable={"true"}
            sortBy="payment_mode_name"
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
      </div>
    </>
  );
};
export default PaymentModeList;
