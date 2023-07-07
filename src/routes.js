import Login from "../src/pages/login";
import Dashboard from "./Dashboard.js/index.js";
import UserList from "./pages/Users/userList";
import CustomerList from "./pages/customer/CustomerList";
import Rental from "./pages/rentals/Rental";
import Vehicles from "./pages/vehicles/Vehicles";

import RolesList from "./pages/roles/RolesList";
import RentalHistory from "./pages/rentalHistory/RentalHistory";
import PublicPage from "./pages/publicPages/PublicPage";
import CreateRental from "./pages/rentals/CreateRental";
import RentalDetails from "./pages/rentals/RentalDetails";
import EditRentals from "./pages/rentals/EditRentals";
import CustomerDetail from "./pages/customer/CustomerDetail";
import BikeRentals from "./pages/bikeRentals/BikeRentals";
import CreateBikeRental from "./pages/bikeRentals/CreateBikeRental";
import BikeRentalDetails from "./pages/bikeRentals/BikeRentalDetails";
import BikeRentalHistory from "./pages/bikeRentals/BikeRentalHistory";

// List of routes
const routes = [
  {
    path: "/login",
    exact: true,
    name: "login",
    component: Login,
  },
  {
    path: "/public-page",
    exact: true,
    name: "public-page",
    component: PublicPage,
  },
  {
    path: "/dashboard",
    exact: true,
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/customers",
    exact: true,
    name: "CustomerList",
    component: CustomerList,
  },
  {
    path: "/customers/details/:id",
    exact: true,
    name: "CustomerDetail",
    component: CustomerDetail,
  },
  {
    path: "/rentals",
    exact: true,
    name: "Rental",
    component: Rental,
  },
  {
    path: "/bike-rentals",
    exact: true,
    name: "BikeRentals",
    component: BikeRentals,
  },
  {
    path: "/rentals/create",
    exact: true,
    name: "CreateRental",
    component: CreateRental,
  },
  {
    path: "/bike/rentals/create",
    exact: true,
    name: "CreateBikeRental",
    component: CreateBikeRental,
  },

  {
    path: "/edit-rental/:id",
    exact: true,
    name: "EditRental",
    component: EditRentals,
  },
  {
    path: "/rentals/details/:id",
    exact: true,
    name: "RentalDetails",
    component: RentalDetails,
  },
  {
    path: "/bike/rentals/details/:id",
    exact: true,
    name: "BikeRentalDetails",
    component: BikeRentalDetails,
  },

  {
    path: "/vehicles",
    exact: true,
    name: "Vehicles",
    component: Vehicles,
  },
  {
    path: "/rental-history",
    exact: true,
    name: "RentalHistory",
    component: RentalHistory,
  },
  {
    path: "/bike/rental-history",
    exact: true,
    name: "BikeRentalHistory",
    component: BikeRentalHistory,
  },
  {
    path: "/roles",
    exact: true,
    name: "RolesList",
    component: RolesList,
  },

  {
    path: "/users",
    exact: true,
    name: "users",
    component: UserList,
  },
];
export default routes;
