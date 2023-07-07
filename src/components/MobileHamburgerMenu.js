import React from "react";
import MyContext from "../context/MyContext";
import {
  CrossIcon as HamburgerMenuClose,
  HamburgerMenu
} from "../assets/icons";

const MobileHamburgerMenu = props => (
  <MyContext.Consumer>
    {context => (
      <>
        <button
          className={`hamburger-btn btn btn-plain mt-1`}
          onClick={props.onClick}
          style={{ color: `${props.headerTextColor}` }}
        >
          {!context.menuToggled && <HamburgerMenu />}
          {context.menuToggled && <HamburgerMenuClose />}
        </button>
      </>
    )}
  </MyContext.Consumer>
);

export default MobileHamburgerMenu;
