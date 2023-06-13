import React from "react";

// Components
import Form from "../../components/Form";

//Pages
import LoginByPasswordForm from "./LoginByPasswordForm";

//Context
import UserContext from "../../context/userContext/UserContext";

//API
import { apiClient } from "../../apiClient";

// Configs
import { endpoints } from "../../configs";
import { getUrlParameter, setCookie } from "../../lib/helper";
import { isBadRequest } from "../../common/http";
import {
  COOKIE_PORTAL_NAME,
  COOKIE_ROLE,
  COOKIE_SESSION_TOKEN,
  COOKIE_USER_ID,
} from "../../lib/cookie";

import { ToastController } from "@freshworks/crayons";

// Initialize toast message
const toastMessage = ToastController({ position: "top-center" });

class BasicLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      showSecondaryPortalRedirectModel: false,
      data: {},
    };
  }

  _handleLogin = (values, redirect, context, forceSecondaryApiLogin) => {
    this._userLogin(values, redirect, context, forceSecondaryApiLogin).then(
      (res) => {
        return (
          res &&
          Object.keys(res).map((key) => {
            // Setting Login Error Message
            if (key === "errorMessage") {
              this.setState({ errorMessage: "Invalid email or Password" });
            }

            if (key === "successMessage" && this.state.redirect) {
              context.loginUser();
              this.props.redirect();
            }
          })
        );
      }
    );
  };

  // Login with username and password
  _userLogin(data, redirect = false) {
    return apiClient
      .post(`${endpoints().userAPI}/login`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }

        const { token, role, userId, email, name, portalName } = response.data;

        // Setting Cookies
        setCookie(COOKIE_SESSION_TOKEN, token);
        setCookie(COOKIE_ROLE, role);
        setCookie(COOKIE_USER_ID, userId);
        setCookie(COOKIE_PORTAL_NAME, portalName);

        // Resetting Error Message
        this.setState({ errorMessage: "" });
        if (!redirect) {
          window.location.replace("/dashboard");
        }

        return { successMessage, email, name } || {};
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
            toastMessage.trigger({
              type: "error",
              content: error.response.data.message,
            });
          }
          return { errorMessage } || {};
        }
      });
  }

  render() {
    const email = getUrlParameter("email");
    const initialValues = {
      email: email || "",
      password: "",
      // number: "",
    };
    const { errorMessage } = this.state;

    return (
      <UserContext.Consumer>
        {(context) => (
          <Form
            initialValues={initialValues}
            onSubmit={(values) => {
              values.email = values.email ? values.email : null;
              values.password = values.password ? values.password : null;
              this._handleLogin(values, this.state.redirect, context, false);
              return false;
            }}>
            <LoginByPasswordForm errorMessage={errorMessage} />
          </Form>
        )}
      </UserContext.Consumer>
    );
  }
}

export default BasicLoginForm;
