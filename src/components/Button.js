import { FwButton } from "@freshworks/crayons/react";
import React from "react";
class Button extends React.Component {
  render() {
    const { id, disabled, type, onClick, label } = this.props;

    return (
      <FwButton
        id={id || label}
        type={type || "button"}
        disabled={disabled}
        onClick={onClick}>
        {label}
      </FwButton>
    );
  }
}

export default Button;
