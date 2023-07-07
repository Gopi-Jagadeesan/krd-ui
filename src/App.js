import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

// ReactToastify CSS
import "react-toastify/dist/ReactToastify.min.css";

//SCSS
import "./App.scss";

// History
import history from "./history";

//Context
import MyProvider from "./context/MyProvider";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Lib
import { getCookie, isLoggedIn } from "./lib/helper";
import { COOKIE_SESSION_TOKEN } from "./lib/cookie";

import Login from "../src/pages/login";

//Action
import { fetchSettings } from "./actions/settings";
//Layout
import PublicLayout from "./components/layout/PublicLayout";
import Loader from "./components/Loader";
import ProjectLayout from "./components/layout/ProjectLayout";
import Dashboard from "./Dashboard.js/index.js";
import UserList from "./pages/Users/userList";
import CustomerList from "./pages/customer/CustomerList";
import Rental from "./pages/rentals/Rental";
import Vehicles from "./pages/vehicles/Vehicles";
import RentalHistory from "./pages/rentalHistory/RentalHistory";
import PublicPage from "./pages/publicPages/PublicPage";
import CreateRental from "./pages/rentals/CreateRental";
import RentalDetails from "./pages/rentals/RentalDetails";
import EditRentals from "./pages/rentals/EditRentals";
import CustomerDetail from "./pages/customer/CustomerDetail";
import BikeRentals from "./pages/bikeRentals/BikeRentals";
import BikeRentalDetails from "./pages/bikeRentals/BikeRentalDetails";
import EditBikeRentals from "./pages/bikeRentals/EditBikeRentals";
import CreateBikeRental from "./pages/bikeRentals/CreateBikeRental";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// 404 error page
const Page404 = Loadable({
  loader: () => import("./components/Page404"),
  loading,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portalName: "",
      isLoading: false,
    };
  }
  bodyClass(authenticated) {
    if (!authenticated) {
      document.body.classList.remove("loggedin-layout");
    } else {
      document.body.classList.add("loggedin-layout");
    }
  }

  componentDidMount() {
    this.bodyClass(getCookie(COOKIE_SESSION_TOKEN));
    this.props.actions.fetchSettings();
    const currentPath = window.location.pathname + window.location.search;
    if (currentPath === "/dashboard") {
      isLoggedIn();
    }
  }

  componentDidUpdate() {
    const currentPath = window.location.pathname + window.location.search;
    this.bodyClass(getCookie(COOKIE_SESSION_TOKEN));
    if (currentPath === "/") {
      const startPageUrl = getCookie(COOKIE_SESSION_TOKEN)
        ? "/dashboard"
        : "/login";
      window.location.replace(startPageUrl);
    }
  }

  componentWillUnmount() {
    this.bodyClass(getCookie(COOKIE_SESSION_TOKEN));
  }

  customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    this.props.history.push("/login");
  };
  render() {
    const { settings } = this.props;

    if (settings && settings.isFetching == true) {
      return (
        <div
          style={{
            marginLeft: "50%",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}>
          <Loader />
        </div>
      );
    }
    return (
      <div>
        <MyProvider>
          <div className="routeSection">
            <Router history={history}>
              <Switch>
                <Route exact path="/"></Route>
                <PublicLayout
                  exact
                  name="login"
                  path="/login"
                  component={Login}
                  settings={settings}
                />
                <PublicLayout
                  exact
                  name="public-page"
                  path="/public-page"
                  component={PublicPage}
                  settings={settings}
                />
                <ProjectLayout
                  exact
                  name="Dashboard"
                  path={"/dashboard"}
                  component={Dashboard}
                  settings={settings}
                />

                <ProjectLayout
                  exact
                  name="CustomerList"
                  path={"/customers"}
                  component={CustomerList}
                  settings={settings}
                />
                <ProjectLayout
                  exact
                  name="CustomerDetail"
                  path={"/customers/details/:id"}
                  component={CustomerDetail}
                  settings={settings}
                />

                <ProjectLayout
                  exact
                  name="Rental"
                  path={"/rentals"}
                  component={Rental}
                  settings={settings}
                />
                <ProjectLayout
                  exact
                  name="BikeRentals"
                  path={"/bike-rentals"}
                  component={BikeRentals}
                  settings={settings}
                />

                <ProjectLayout
                  exact
                  name="RentalDetails"
                  path={"/rentals/details/:id"}
                  component={RentalDetails}
                  settings={settings}
                />
                <ProjectLayout
                  exact
                  name="BikeRentalDetails"
                  path={"/bike/rentals/details/:id"}
                  component={BikeRentalDetails}
                  settings={settings}
                />

                <ProjectLayout
                  exact
                  name="EditRentals"
                  path={"/edit-rental/:id"}
                  component={EditRentals}
                  settings={settings}
                />
                <ProjectLayout
                  exact
                  name="EditBikeRentals"
                  path={"/edit-bike-rental/:id"}
                  component={EditBikeRentals}
                  settings={settings}
                />

                <ProjectLayout
                  exact
                  name="CreateRental"
                  path={"/rentals/create"}
                  component={CreateRental}
                  settings={settings}
                />
                <ProjectLayout
                  exact
                  name="CreateBikeRental"
                  path={"/bike/rentals/create"}
                  component={CreateBikeRental}
                  settings={settings}
                />
                <ProjectLayout
                  exact
                  name="Vehicles"
                  path={"/vehicles"}
                  component={Vehicles}
                  settings={settings}
                />
                <ProjectLayout
                  exact
                  name="RentalHistory"
                  path={"/rental-history"}
                  component={RentalHistory}
                  settings={settings}
                />
                <ProjectLayout
                  exact
                  name="BikeRentalHistory"
                  path={"/bike/rental-history"}
                  component={RentalHistory}
                  settings={settings}
                />

                <ProjectLayout
                  exact
                  name="UsersList"
                  path={"/users"}
                  component={UserList}
                  settings={settings}
                />
                <PublicLayout
                  exact
                  name="Page 404"
                  path=""
                  component={Page404}
                  settings={settings}
                />
              </Switch>
            </Router>
          </div>
        </MyProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchSettings }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
