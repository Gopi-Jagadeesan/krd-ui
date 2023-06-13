import React from "react";

//Pages
import UserNavigation from "./UserNavigation";

const Header = (props) => {
  const { userDetails } = props;

  return (
    <div>
      <UserNavigation
        pathName={"/dashboard"}
        avatar={userDetails && userDetails.avatar}
        logoRedirectUrl={"http://google.com"}
        portalName={"KRD"}
        props={props}
      />
    </div>
  );
};

export default Header;
