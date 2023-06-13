import React, { Component } from "react";
import UserContext from "./UserContext";

// API Client
import { apiClient } from "../../apiClient";

// Library
import { getCookie } from "../../lib/helper";
import {
  clearAllCookies,
  COOKIE_SESSION_TOKEN,
  COOKIE_USER_ID,
} from "../../lib/cookie";

// Configs
import { endpoints } from "../../configs";

// Constant
import { isBadRequest } from "../../common/http";

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.setToken();
    this.state = {
      userLoggedIn: false,
      token: null,
      user: {
        name: "",
        avatarUrl: "",
        userId: "",
      },
    };
    this.loginUser = this.loginUser.bind(this);
  }

  componentDidMount() {
    this.setToken();
    this.getToken();
    this.userLoggedIn().then(() => {
      this.state.userLoggedIn && this.getUserDetails();
    });
  }

  loginUser() {
    this.setState(
      {
        userLoggedIn:
          getCookie(COOKIE_USER_ID) !== undefined &&
          getCookie(COOKIE_USER_ID) !== "",
      },
      () => {
        this.getToken();
        this.getUserDetails();
      }
    );
  }

  logoutUser() {
    // Create Logout Activity
    apiClient.defaults.headers.common.Authorization = null;
    clearAllCookies();
    return window.location.replace("/login");
  }

  async userLoggedIn() {
    await this.setState({
      userLoggedIn:
        getCookie(COOKIE_USER_ID) !== undefined &&
        getCookie(COOKIE_USER_ID) !== "",
    });
  }

  async getUserDetails() {
    try {
      this.setToken();
      let response = await apiClient.get(`${endpoints().userAPI}`);
      const { id, name } = response.data;

      this.setState({
        user: {
          name,
          userId: id,
        },
      });
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        console.error(errorMessage);
      }
    }
  }

  _getUserDetailsById = (id) => {
    return apiClient
      .get(`${endpoints().userAPI}/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          return { error: true };
        }
      });
  };

  setToken() {
    return (apiClient.defaults.headers.common.Authorization =
      getCookie(COOKIE_SESSION_TOKEN));
  }

  getToken() {
    const token = getCookie(COOKIE_SESSION_TOKEN);
    this.setState({
      token:
        apiClient.defaults.headers.common.Authorization === token
          ? token
          : apiClient.defaults.headers.common.Authorization,
    });
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          logoutUser: this.logoutUser,
          _getUserDetailsById: this._getUserDetailsById,
          loginUser: this.loginUser,
        }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
