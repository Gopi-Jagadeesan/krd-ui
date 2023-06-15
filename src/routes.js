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
    path: "/rentals/create",
    exact: true,
    name: "CreateRental",
    component: CreateRental,
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
