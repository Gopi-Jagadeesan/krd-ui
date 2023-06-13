import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  NavLink,
} from "reactstrap";

//Assets
import { UserIcon } from "../../assets/icons";

//Context
import UserContext from "../../context/userContext/UserContext";

//Components
import Avatar from "../Avatar";

const UserNavDropdown = React.memo(function UserNavDropdown(props) {
  const { id, avatar } = props;

  return (
    <div id="avatarDiv" className="dropdown-wrapper ml-auto">
      <UserContext.Consumer>
        {(context) => (
          <>
            {context.userLoggedIn ? (
              <UncontrolledDropdown inNavbar>
                <DropdownToggle nav className="p-0">
                  {context.token && (
                    <Avatar
                      id="avatar"
                      name={context.user.name}
                      size="xs"
                      fontSize={15}
                      url={avatar ? avatar : ""}
                    />
                  )}
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-right">
                  <DropdownItem tag={"li"} className={"edit-profile-item"}>
                    <div className="edit-profile-actions">
                      <div className="edit-profile-name">
                        <strong>{context.user.name}</strong>
                      </div>
                    </div>
                  </DropdownItem>
                  <DropdownItem divider />
                  <Link
                    to={`/edit-profile`}
                    className={[
                      "edit-profile-name",
                      "text-decoration-none",
                      "text-dark d-block",
                    ].join(" ")}>
                    <DropdownItem>Edit Profile</DropdownItem>
                  </Link>

                  <DropdownItem divider />
                  <Link
                    to={`/settings`}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                    }}
                    className={[
                      "edit-profile-name",
                      "text-decoration-none",
                      "text-dark d-block",
                    ].join(" ")}>
                    <DropdownItem>Settings</DropdownItem>
                  </Link>

                  <DropdownItem divider />
                  <Link
                    onClick={context.logoutUser}
                    className="edit-profile-logout text-danger"
                    style={{ textDecoration: "none" }}>
                    <DropdownItem id="logout">Log Out</DropdownItem>
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <NavLink
                id={id}
                href={"/login"}
                className={[
                  "font-weight-bold",
                  "d-inline-flex",
                  "login-btn",
                  "h6-5",
                ].join(" ")}
                style={{
                  textDecoration: "none",
                }}>
                <span id={id} className={["mr-2"].join(" ")}>
                  Login
                </span>{" "}
                <UserIcon />
              </NavLink>
            )}
          </>
        )}
      </UserContext.Consumer>
    </div>
  );
});

export default UserNavDropdown;
