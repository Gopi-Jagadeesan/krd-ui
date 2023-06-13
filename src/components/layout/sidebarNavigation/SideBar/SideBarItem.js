import React, { useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";
import { Link } from "react-router-dom";

// Hook
function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);

        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );

  return [ref, value];
}

const SideBarItem = (props) => {
  const {
    id,
    key,
    navigation,
    currentRoute,
    enable,
  } = props;
  const leftNavTextStyle = { color: "#000000" };
  const leftNavTextHoverStyle = { color: "#000000" };

  const [hoverRef, isHovered] = useHover();
  return (
    <li
      id={`nav-item-${id}`}
      key={key}
      className={[
        `${
          currentRoute === navigation.url
            ? `active`
            : currentRoute === navigation.addPageurl
              ? `active`
              : currentRoute.startsWith(navigation.editPageurl)
                ? `active`
                : currentRoute.startsWith(navigation.detailsPageurl)
                  ? `active`
                  : ""
        }`,
        `${enable ? "" : navigation.name === "Dashboard" ? "" : "disabled"}`,
      ].join(" ")}
      ref={hoverRef}>
      <Link to={navigation.url}>
        <SVG
          src={navigation.icon}
          style={
            currentRoute === navigation.url
              ? {}
              : currentRoute === navigation.addPageurl
                ? {}
                : currentRoute.startsWith(navigation.editPageurl)
                  ? {}
                  : currentRoute.startsWith(navigation.detailsPageurl)
                    ? {}
                    : isHovered
                      ? leftNavTextHoverStyle
                      : leftNavTextStyle
          }
        />
        <span
          className="desktop-only"
          style={
            currentRoute === navigation.url
              ? {}
              : currentRoute === navigation.addPageurl
                ? {}
                : currentRoute.startsWith(navigation.editPageurl)
                  ? {}
                  : currentRoute.startsWith(navigation.detailsPageurl)
                    ? {}
                    : isHovered
                      ? leftNavTextHoverStyle
                      : leftNavTextStyle
          }>
          {navigation.name}
        </span>
      </Link>
    </li>
  );
};

export default SideBarItem;
