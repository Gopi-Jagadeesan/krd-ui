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

const Vehicles = () => {
  const [addModalOpen, setAddModal] = useState(false);
  const [editModalOpen, setEditModal] = useState(false);
  const [currentDeleteData, setCurrentDeleteData] = useState();
  const [currentData, setCurrentData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);

  // Dispach
  const dispatch = useDispatch();

  //useRef
  const formRef = useRef();
  const editformRef = useRef();

  // Toggle add modal
  const toggle = () => {
    setAddModal(!addModalOpen);
  };

  // Toggle edit modal
  const toggleEdit = () => {
    setEditModal(!editModalOpen);
  };

  // Toggle delete modal
  const deleteToggle = () => {
    setDeleteModal(!deleteModal);
  };

  // Status options
  const statusOptions = [
    { value: "in", text: "in" },
    { value: "out", text: "out" },
  ];

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
   * Create Vehicle
   *
   * @param values
   */
  const handleSave = (values) => {
    const data = new FormData();
    if (values && values.name !== undefined) {
      data.append("name", values && values.name);
    }
    if (values && values.reg_no !== undefined) {
      data.append("reg_no", values && values.reg_no);
    }
    if (values && values.notes !== undefined) {
      data.append("notes", values && values.notes);
    }
    data.append("status", "in");
    if (values && values.type !== undefined) {
      data.append("type", values && values.type);
    }
    if (values && values.color !== undefined) {
      data.append("color", values && values.color);
    }

    dispatch(API.addVehicles(data, {}));
    toggle();
  };

  /**
   * Edit Vehicle
   *
   * @param values
   */
  const handleEditSave = (values) => {
    const data = new FormData();
    if (currentData) {
      data.append("id", currentData && currentData.id);
    }
    if (values && values.name !== undefined) {
      data.append("name", values && values.name);
    }
    if (values && values.reg_no !== undefined) {
      data.append("reg_no", values && values.reg_no);
    }
    if (values && values.status !== undefined) {
      data.append("status", values && values.status);
    }
    if (values && values.notes !== undefined) {
      data.append("notes", values && values.notes);
    }
    if (values && values.type !== undefined) {
      data.append("type", values && values.type);
    }
    if (values && values.color !== undefined) {
      data.append("color", values && values.color);
    }

    dispatch(API.updateVehicles(data, {}));
    toggleEdit();
  };

  // Vehicle delete function
  const userDelete = () => {
    dispatch(API.deleteVehicles(currentDeleteData.id, {}));
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

  // Edit Form submit function
  const handleEditFormSubmit = async (e) => {
    const { values, isValid } = await editformRef.current.doSubmit(e);

    if (isValid) {
      handleEditSave(values);
    }
  };

  // Initial Values
  const initialValues = {
    reg_no: currentData && currentData.reg_no,
    name: currentData && currentData.name,
    notes: currentData && currentData.notes,
    type: currentData && currentData.type,
    color: currentData && currentData.color,
    status: currentData && currentData.status,
  };

  const formSchema = {
    fields: [
      {
        id: "reg_no",
        name: "reg_no",
        label: "Reg No",
        type: "TEXT",
        position: 3,
        required: true,
        placeholder: "Enter Reg No",
        choices: [],
      },
      {
        id: "name",
        name: "name",
        label: "Name",
        type: "TEXT",
        position: 3,
        placeholder: "Enter Name",
        choices: [],
      },
      {
        id: "color",
        name: "color",
        label: "Color",
        type: "TEXT",
        position: 3,
        placeholder: "Enter Color",
        choices: [],
      },
      {
        id: "type",
        name: "type",
        label: "Type",
        type: "DROPDOWN",
        position: 3,
        placeholder: "Select Type",
        choices: [
          { value: "car", text: "Car" },
          { value: "bike", text: "Bike" },
        ],
      },
      {
        id: "notes",
        name: "notes",
        label: "Notes",
        type: "PARAGRAPH",
        position: 3,
        placeholder: "Enter Notes",
        choices: [],
      },
    ],
  };

  const editFormSchema = {
    fields: [
      {
        id: "reg_no",
        name: "reg_no",
        label: "Reg No",
        type: "TEXT",
        position: 3,
        required: true,
        placeholder: "Enter Reg No",
        choices: [],
      },
      {
        id: "name",
        name: "name",
        label: "Name",
        type: "TEXT",
        position: 3,
        placeholder: "Enter Name",
        choices: [],
      },
      {
        id: "status",
        name: "status",
        label: "Status",
        type: "DROPDOWN",
        position: 3,
        placeholder: "Select Status",
        choices: statusOptions,
      },
      {
        id: "color",
        name: "color",
        label: "Color",
        type: "TEXT",
        position: 3,
        placeholder: "Enter Color",
        choices: [],
      },
      {
        id: "type",
        name: "type",
        label: "Type",
        type: "DROPDOWN",
        position: 3,
        placeholder: "Select Type",
        choices: [
          { value: "car", text: "Car" },
          { value: "bike", text: "Bike" },
        ],
      },
      {
        id: "notes",
        name: "notes",
        label: "Notes",
        type: "PARAGRAPH",
        position: 3,
        placeholder: "Enter Notes",
        choices: [],
      },
    ],
  };

  return (
    <>
      {/* Add Vehicle Modal Starts */}
      <FwModal
        // size="large"
        id="add-vehicle"
        submitText="submitText"
        hideFooter
        onFwClose={toggle}
        isOpen={addModalOpen}
        titleText={"Add Vehicle"}>
        <div>
          <FwForm formSchema={formSchema} ref={formRef}></FwForm>
          <FwButton color="secondary" onClick={toggle}>
            Cancel
          </FwButton>
          <FwButton className="ml-2" color="primary" onClick={handleFormSubmit}>
            Add Vehicle
          </FwButton>
        </div>
      </FwModal>
      {/* Add Vehicle Modal Ends */}
      {/* Edit Vehicle Modal Starts */}
      <FwModal
        // size="large"
        id="edit-vehicle"
        submitText="submitText"
        hideFooter
        onFwClose={toggleEdit}
        isOpen={editModalOpen}
        titleText={"Edit Vehicle"}>
        <div>
          <FwForm
            initialValues={initialValues}
            formSchema={editFormSchema}
            ref={editformRef}></FwForm>
          <FwButton color="secondary" onClick={toggleEdit}>
            Cancel
          </FwButton>
          <FwButton
            className="ml-2"
            color="primary"
            onClick={handleEditFormSubmit}>
            Save
          </FwButton>
        </div>
      </FwModal>
      {/* Edit Vehicle Modal Ends */}

      {/* Delete Vehicle Modal Starts */}
      <FwModal
        id="composition"
        size="small"
        submit-color="danger"
        submit-text="Delete"
        submit={userDelete}
        onFwClose={deleteToggle}
        isOpen={deleteModal}>
        <FwModalTitle>
          <span>Delete Vehicle</span>
        </FwModalTitle>
        <FwModalContent>
          <span>
            Are you sure you want to delete{" "}
            <b>{currentDeleteData && currentDeleteData.reg_no}</b> ?
          </span>
        </FwModalContent>
      </FwModal>
      {/* Delete Vehicle Modal Ends */}

      {/*Redux table  */}
      <PageTitle
        label="Vehicles"
        buttonHandler={() => {
          toggle();
        }}
        buttonLabel="Add New"
      />

      <div className="mt-4 mb-5">
        <ReduxTable
          onScroll
          id="vehicles"
          showHeader
          searchPlaceholder="Search Vehicles"
          apiURL={`${endpoints().vehiclesAPI}/search`}
          newTableHeading
          sortByOptions={sortByOption}
          disableColumnSort={true}
          onRowClick={(row) => {
            toggleEdit();
            setCurrentData(row);
          }}>
          <ReduxColumn
            minWidth="100px"
            field="name"
            isClickable={"true"}
            sortBy="name"
            type="link">
            Name
          </ReduxColumn>
          <ReduxColumn minWidth="100px" field="reg_no">
            Reg No
          </ReduxColumn>
          <ReduxColumn minWidth="100px" field="color">
            Color
          </ReduxColumn>
          <ReduxColumn
            minWidth="100px"
            field="type"
            renderField={(row) =>
              row && row.type == "bike" ? (
                <span>Bike</span>
              ) : row && row.type == "car" ? (
                <span>Car</span>
              ) : (
                ""
              )
            }>
            Type
          </ReduxColumn>
          <ReduxColumn minWidth="150px" field="notes">
            Notes
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
export default Vehicles;
