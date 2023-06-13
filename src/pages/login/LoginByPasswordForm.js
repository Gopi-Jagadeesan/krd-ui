import React from "react";
import Checkbox from "../../components/Checkbox";

// Components
import Email from "../../components/Email";
import Password from "../../components/Password";

class LoginByPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
    };
    this._hideErrorMessage = this._hideErrorMessage.bind(this);
  }

  // Hide Error Message
  _hideErrorMessage = () => {
    this.setState({ errorMessage: "" });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    // Set Login Error Message
    if (
      nextProps.errorMessage &&
      nextProps.errorMessage !== this.state.errorMessage
    ) {
      this.setState({ errorMessage: nextProps.errorMessage });
    }
  }

  _onShowpasswordAndHide = () => {
    this.setState({
      showPassword: true,
    });
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <div
        className=""
        style={{
          marginLeft: "auto",
          marginRight: "auto",
        }}>
        <div className={["basic-login-form"].join(" ")}>
          <div className={["field-wrapper"].join("")}>
            <Email
              className=""
              name="email"
              placeholder="Email Address"
              onKeyDown={this._hideErrorMessage}
              required
            />
          </div>

          <div className={["field-wrapper"].join(" ")}>
            <Password
              name="password"
              placeholder="Password"
              onKeyDown={this._hideErrorMessage}
              required
            />
          </div>
          <div style={{ float: "left", paddingTop:"4px" }}>
            <Checkbox
              name="rememberPassword"
              label="Remember me"
              className={"accepted-terms mr-3"}
            />
          </div>
          <div className="public-link-text">
            <a className="link-text" href="/forget-password">
              Forget Password?
            </a>
          </div>
          <span
            id="invalid Email-or-Password"
            className={errorMessage ? "error-message" : ""}>
            {errorMessage}
          </span>
          <div className={["field-wrapper"].join(" ")}>
            <div className="form-group text-center">
              <button
                id="btn-login"
                type="submit"
                className="btn btn-login w-100"
                style={{ borderRadius: "0.4375rem" }}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginByPasswordForm;
