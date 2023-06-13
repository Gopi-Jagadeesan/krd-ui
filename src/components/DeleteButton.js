import React from "react";
import PropTypes from "prop-types";

import { FwButton, FwIcon } from "@freshworks/crayons/react";

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, onClick, id } = this.props;

    return (
      <FwButton color="danger" id={id || label} onClick={onClick}>
        <FwIcon slot="before-label" name="delete"></FwIcon>
        <span>{label}</span>
      </FwButton>
    );
  }
}

DeleteButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
};

export default DeleteButton;
