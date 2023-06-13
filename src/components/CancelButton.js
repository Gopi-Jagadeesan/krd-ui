import React from "react";
import PropTypes from "prop-types";

import { FwButton } from "@freshworks/crayons/react";

class CancelButton extends React.Component {
  render() {
    const { onClick, name } = this.props;

    return (
      <FwButton color="secondary" id={name || "Cancel"} onClick={onClick}>
        {name || "Cancel"}
      </FwButton>
    );
  }
}

CancelButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default CancelButton;
