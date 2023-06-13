import React from "react";
import { LoginForm } from "../../components/authentication/AuthButtons";
import Avatar from "../../components/Avatar";
import LeftSideSection from "./LeftSideSection";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      showSecondaryPortalRedirectModel: false,
    };
  }

  render() {
    const leftNavigationBackgroundImage = "";

    return (
      <div className="container-fluid" style={{ minHeight: "100vh" }}>
        <div
          className="row overflow-hidden"
          style={{ height: "100%", minHeight: "100vh" }}>
          <LeftSideSection sidebarImage={leftNavigationBackgroundImage} />

          <div
            className="col"
            style={{
              background: "#ffffff",
              overflowY: "scroll",
              margin: "0",
              height: "auto",
            }}>
            <div className="login-page-right-side-section form-wrapper  justify-content-center">
              <div className="client-login-wrapper">
                <div className="d-flex justify-content-center mb-3">
                  <Avatar
                    editProfile={false}
                    customSize={240}
                    className="profile-picture-preview rounded-circle d-block avatar-placeholder"
                  />
                </div>
                <h2 className="pb-3 text-center login-text font-weight-bold mb-0">
                  Login to KRD System
                </h2>
                <LoginForm secondaryPortalDetails={""} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
