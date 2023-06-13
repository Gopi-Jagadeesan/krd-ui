import React from "react";
import BasicLoginForm from "../../pages/login/BasicLoginForm";

export const LoginForm = ({
  redirect,
  eventKey,
  settings,
  secondaryPortalDetails,
  id,
}) => {
  return (
    <BasicLoginForm
      id={id}
      redirect={redirect}
      eventKey={eventKey}
      settings={settings}
      secondaryPortalDetails={secondaryPortalDetails}
    />
  );
};

const AuthButtons = (props) => {
  const { children } = props;

  return (
    <>
      <div className="signup-buttons">{children}</div>
    </>
  );
};

export default AuthButtons;
