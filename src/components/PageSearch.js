import { FwInput } from "@freshworks/crayons/react";
import React from "react";
import { InputGroup } from "reactstrap";

const PageSearch = (props) => {
  const { classnames, placeholder, onChange, width, id } = props;

  return (
    <>
      <InputGroup
        className={`${classnames} align-items-stretch mr-4 `}
        style={{ width: width ? width : "100%" }}>
        <FwInput
          clearInput
          iconLeft="search"
          placeholder={placeholder}
          id={id}
          onKeyPress={onChange}></FwInput>
      </InputGroup>
    </>
  );
};

export default PageSearch;
