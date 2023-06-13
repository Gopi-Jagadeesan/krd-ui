import React from "react";
import PropTypes from "prop-types";
import defaultAvatar from "../assets/img/default-avatar.png";
import { EditIconAlt } from "../assets/icons";

class Avatar extends React.Component {
  render() {
    const {
      id,
      url,
      name,
      defaultUrl,
      size,
      customSize,
      imageSize,
      fontSize,
      className,
      customStyle,
      allowEdit,
    } = this.props;

    const sizes = {
      xs: 32,
      sm: 45,
      md: 60,
      lg: 100,
      customSize: parseInt(imageSize, 10),
    };

    let dimension;
    if (customSize) {
      dimension = customSize;
    }

    if (!dimension && size) {
      dimension = sizes[size];
    }

    if (!dimension) {
      dimension = sizes["sm"];
    }

    const defaultStyle = {
      width: dimension,
      height: dimension,
      display: "block",
      borderRadius: "0.4375rem",
    };

    if (url) {
      let backgroundImage = `url(https://freshworks-spritle.s3.amazonaws.com/contract-management-internal/media/setting/${url})`;
      if (defaultUrl) {
        backgroundImage = `${backgroundImage}, url(${defaultUrl})`;
      }

      const style = Object.assign({}, defaultStyle, {
        backgroundSize: "cover",
        backgroundRepeat: "initial",
        backgroundImage,
        backgroundPosition: "center",
      });

      return (
        <>
          <div
            id={id}
            style={style}
            className={["avatar-picture cursor-pointer"].join(" ")}
          />{" "}
          <div>
            {allowEdit === true && (
              <span
                style={{
                  position: "absolute",
                  right: "0",
                  bottom: "0",
                  padding: "10px",
                  borderRadius: "0.4375rem",
                  color: "#000000",
                }}
                className="pt-5 cursor-pointer">
                <EditIconAlt style={{ verticalAlign: "bottom" }} />
              </span>
            )}
          </div>
        </>
      );
    }

    if (name) {
      const initial = [];
      if (name) {
        initial.push(name[0]);
      }

      if (initial.length === 1 && name) {
        initial.push(name[1]);
      }

      if (initial.length > 0) {
        const style = Object.assign({}, defaultStyle, {
          lineHeight: `${dimension}px`,
          backgroundColor: "#fff",
          border: "2px solid #224562",
          color: "#000000",
          textTransform: "uppercase",
          textAlign: "center",
          fontSize: fontSize || 15,
          letterSpacing: 1,
        });

        return (
          <>
            <div id={id} className={customStyle} style={style}>
              {initial.join("")}
            </div>
            <div>
              {allowEdit === true ? (
                <span
                  style={{
                    position: "absolute",
                    right: "0",
                    bottom: "0",
                    padding: "10px",
                    borderRadius: "0.4375rem",
                    color: "#000000",
                  }}
                  className="pt-5 cursor-pointer">
                  <EditIconAlt style={{ verticalAlign: "bottom" }} />
                </span>
              ) : (
                ""
              )}
            </div>
          </>
        );
      }
    }

    if (defaultUrl) {
      const style = Object.assign({}, defaultStyle, {
        backgroundSize: "cover",
        backgroundImage: `url(${defaultUrl})`,
        margin: "auto",
      });

      return <div id={id} style={style} />;
    }

    const style = Object.assign({}, defaultStyle, {
      backgroundSize: "cover",
      backgroundImage: `url(${defaultAvatar})`,
    });

    return <div id={id} className={className} style={style} />;
  }
}

Avatar.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  defaultUrl: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  square: PropTypes.bool,
  customSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Avatar;
