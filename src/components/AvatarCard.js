import React from "react";
import PropTypes from "prop-types";
import Avatar from "./Avatar";

class AvatarCard extends React.Component {
  render() {
    const { title, name } = this.props;

    const names = [];
    if (name) {
      names.push(name);
    }

    return (
      <div style={{ display: "table" }}>
        <div
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            paddingRight: 10,
          }}>
          <Avatar {...this.props} />
        </div>
        {(name || title) && (
          <div style={{ display: "table-cell", verticalAlign: "middle" }}>
            {(title || name) && (
              <h3 style={{ fontSize: 14, margin: "0 0 2px" }}>
                {title || name}
              </h3>
            )}
          </div>
        )}
      </div>
    );
  }
}

AvatarCard.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  defaultUrl: PropTypes.string,
  size: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  square: PropTypes.bool,
  customSize: PropTypes.number,
};

export default AvatarCard;
