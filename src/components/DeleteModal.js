import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CancelButton from "./CancelButton";
import DeleteButton from "./DeleteButton";

const DeleteModal = ({ isOpen, toggle, deleteFunction, title, id, label }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      backdrop="static"
      className={["add-create-popup"].join(" ")}
    >
      <ModalHeader toggle={toggle}>
        <h4 className={["font-weight-bold"].join(" ")}>{title}</h4>
      </ModalHeader>
      <ModalBody className={["text-center", "mb-4"].join(" ")}>
        <p>
          Are you sure you want to delete <br />
          <b>"{label}"</b>?
        </p>
      </ModalBody>
      <ModalFooter className={["justify-content-center"].join(" ")}>
        <div className="btn-wrapper">
          <CancelButton onClick={() => toggle()} />
          <DeleteButton
            id={id}
            className="btn btn-danger"
            onClick={() => {
              toggle();
              deleteFunction(id);
            }}
            label=" Yes, Delete"
          >
          </DeleteButton>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModal;
