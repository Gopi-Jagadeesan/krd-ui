import React, { useEffect, useRef, useState } from "react";
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
import { apiClient } from "../../apiClient";
import Loader from "../../components/Loader";

const UserList = (props) => {
  const { rolePermissions } = props;
  const [addModalOpen, setAddModal] = useState(false);
  const [currentData, setCurrentData] = useState();
  const [currentDeleteData, setCurrentDeleteData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Dispach
  const dispatch = useDispatch();

  //useRef
  const formRef = useRef();
  const editFormRef = useRef();

  // Toggle add modal
  const toggle = () => {
    setAddModal(!addModalOpen);
  };

  // Toggle edit modal
  const editToggle = () => {
    setEditModalOpen(!editModalOpen);
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
   * Create User
   *
   * @param values
   */
  const handleSave = (values) => {
    const data = new FormData();
    if (values && values.email !== undefined) {
      data.append("email", values.email);
    }
    if (values && values.name !== undefined) {
      data.append("name", values.name);
    }
    if (values && values.role) {
      data.append("role", values.role);
    }
    if (values && values.slack_id !== undefined) {
      data.append("slack_id", values && values.slack_id ? values.slack_id : "");
    }

    dispatch(API.addUser(data, {}));
    toggle();
  };

  // User delete function
  const userDelete = () => {
    dispatch(API.deleteUser(currentDeleteData.id, {}));
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

  /**
   * Edit User
   *
   * @param values
   */
  const handleEditSave = (values) => {
    const data = new FormData();
    if (currentData) {
      data.append("id", currentData && currentData.id);
    }
    if (values && values.email !== undefined) {
      data.append(
        "email",
        values && values.email ? values.email : currentData.email
      );
    }
    if (values && values.name !== undefined) {
      data.append(
        "name",
        values && values.name ? values.name : currentData.name
      );
    }
    if (values && values.role) {
      data.append(
        "role",
        values && values.role ? values.role : currentData.role
      );
    }
    if (values && values.slack_id !== undefined) {
      data.append(
        "slack_id",
        values && values.slack_id ? values.slack_id : currentData.slack_id
      );
    }

    dispatch(API.updateUser(data, {}));
    editToggle();
  };

  // Edit Form submit function
  const handleEditFormSubmit = async (e) => {
    const { values, isValid } = await editFormRef.current.doSubmit(e);

    if (isValid) {
      handleEditSave(values);
    }
  };

  const initialValues = {
    name: currentData && currentData.name,
    email: currentData && currentData.email,
    role: currentData && currentData.roleId,
    slack_id: currentData && currentData.slack_id,
  };

  if (isLoading) {
    return <Loader />;
  }

  //Get Edit Form Schema
  const editFromSchema = {
    name: "Test Form",
    fields: [
      {
        id: "name",
        name: "name",
        label: "Name",
        type: "TEXT",
        position: 3,
        required: true,
        placeholder: "Enter  Name",
        choices: [],
      },
      {
        id: "email",
        name: "email",
        label: "Email",
        type: "EMAIL",
        position: 3,
        required: true,
        placeholder: "Enter Email",
        choices: [],
      },
      {
        id: "role",
        name: "role",
        label: "Role",
        type: "DROPDOWN",
        position: 3,
        required: true,
        placeholder: "Select Role",
        choices: roleList ? roleList : [],
      },
      {
        id: "slack_id",
        name: "slack_id",
        label: "Slack ID",
        type: "TEXT",
        position: 3,
        required: false,
        placeholder: "Enter Slack ID",
        choices: [],
      },
    ],
  };

  //Get Form Schema
  const formSchema = {
    name: "Test Form",
    fields: [
      {
        id: "name",
        name: "name",
        label: "Name",
        type: "TEXT",
        position: 3,
        required: true,
        placeholder: "Enter  Name",
        choices: [],
      },
      {
        id: "email",
        name: "email",
        label: "Email",
        type: "EMAIL",
        position: 3,
        required: true,
        placeholder: "Enter Email",
        choices: [],
      },
      {
        id: "role",
        name: "role",
        label: "Role",
        type: "DROPDOWN",
        position: 3,
        required: true,
        placeholder: "Select Role",
        choices: roleList ? roleList : [],
      },
      {
        id: "slack_id",
        name: "slack_id",
        label: "Slack ID",
        type: "TEXT",
        position: 3,
        required: false,
        placeholder: "Enter Slack ID",
        choices: [],
      },
    ],
  };

  return (
    <>
      {/* Add User Modal Starts */}
      <FwModal
        id="add-user"
        submitText="submitText"
        hideFooter
        onFwClose={toggle}
        isOpen={addModalOpen}
        titleText={"Add User"}>
        <div>
          <FwForm ref={formRef} formSchema={formSchema}></FwForm>
          <FwButton color="secondary" onClick={toggle}>
            Cancel
          </FwButton>
          <FwButton className="ml-2" color="primary" onClick={handleFormSubmit}>
            Add User
          </FwButton>
        </div>
      </FwModal>
      {/* Add User Modal Ends */}

      {/* Delete User Modal Starts */}
      <FwModal
        id="composition"
        size="small"
        submit-color="danger"
        submit-text="Delete"
        submit={userDelete}
        onFwClose={deleteToggle}
        isOpen={deleteModal}>
        <FwModalTitle>
          <span>Delete User</span>
        </FwModalTitle>
        <FwModalContent>
          <span>
            Are you sure you want to delete{" "}
            {currentDeleteData && currentDeleteData.name}?
          </span>
        </FwModalContent>
      </FwModal>
      {/* Delete User Modal Ends */}

      {/* Edit User Modal Starts */}
      <FwModal
        id="edit-user"
        submitText="submitText"
        hideFooter
        onFwClose={editToggle}
        isOpen={editModalOpen}
        titleText={"Edit User"}>
        <div>
          <FwForm
            initialValues={initialValues}
            ref={editFormRef}
            formSchema={editFromSchema}></FwForm>
          <FwButton color="secondary" onClick={editToggle}>
            Cancel
          </FwButton>
          <FwButton
            className="ml-2"
            color="primary"
            onClick={handleEditFormSubmit}>
            Edit User
          </FwButton>
        </div>
      </FwModal>
      {/* Edit User Modal Ends */}

      {/*Redux table  */}
      <PageTitle
        label="Users"
        buttonHandler={
          rolePermissions && rolePermissions.create_user === "true"
            ? () => {
                toggle();
              }
            : ""
        }
        buttonLabel="Add New"
      />

      <div className="mt-4 mb-5">
        <ReduxTable
          onScroll
          id="users"
          showHeader
          searchPlaceholder="Search Users"
          apiURL={`${endpoints().userAPI}/users/search`}
          newTableHeading
          sortByOptions={sortByOption}
          disableColumnSort={true}
          onRowClick={(row) => {
            setCurrentData(row);
            setEditModalOpen(true);
          }}>
          <ReduxColumn
            minWidth="150px"
            field="name"
            isClickable={
              rolePermissions && rolePermissions.edit_user === "true"
                ? "true"
                : "false"
            }
            sortBy="name"
            type="link"
            renderField={(row) => (
              <span>
                {row.name} {row.last_name}
              </span>
            )}>
            Name
          </ReduxColumn>
          <ReduxColumn minWidth="100px" field="email">
            Email
          </ReduxColumn>
          <ReduxColumn minWidth="100px" field="createdAt">
            Created At
          </ReduxColumn>
          <ReduxColumn
            minWidth="100px"
            field="role"
            renderField={(row) =>
              row.role == null ? <span>Super Admin</span> : row.role
            }>
            Role
          </ReduxColumn>
          {rolePermissions && rolePermissions.delete_user === "true" ? (
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
          ) : (
            ""
          )}
        </ReduxTable>
      </div>
    </>
  );
};
export default UserList;
