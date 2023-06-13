import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { FwButton, FwIcon } from "@freshworks/crayons/react";
import history from "../history";

class PageTitle extends React.Component {
  render() {
    const {
      label,
      id,
      buttonHandler,
      buttonLabel,
      targetUrl,
      normalButton,
      pageHint,
      modalTriggerId,
      showBreadcrumb,
    } = this.props;

    return (
      <>
        {showBreadcrumb && (
          <FwButton
            color="secondary"
            onFwClick={() => {
              history.back();
            }}>
            <FwIcon slot="before-label" name="arrow-left"></FwIcon>
            <span>Back</span>
          </FwButton>
        )}
        <div className="page-title-header">
          <div>
            <h5
              className="page-title mt-2 mb-2 font-weight-bold"
              id={id || label}>
              {label}
            </h5>
            {pageHint && <span>{pageHint}</span>}
          </div>

          <div>
            {(buttonHandler || modalTriggerId || targetUrl) &&
              (!normalButton ? (
                <div onClick={buttonHandler}>
                  <FwButton modalTriggerId={modalTriggerId} id={label}>
                    <FwIcon name="plus" slot="before-label"></FwIcon>{" "}
                    {buttonLabel}
                  </FwButton>
                </div>
              ) : (
                <Button
                  label={buttonLabel}
                  className="float-lg-right btn btn-secondary h6-5-important font-weight-bold"
                  onClick={buttonHandler}
                  targetUrl={targetUrl}
                />
              ))}
          </div>
        </div>
      </>
    );
  }
}

PageTitle.propTypes = {
  label: PropTypes.string,
};

export default PageTitle;
