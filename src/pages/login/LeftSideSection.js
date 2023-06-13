import React from "react";

class LeftSideSection extends React.Component {
  render() {
    return (
      <div className="col desktop-only">
        <div
          className="dashboard-sidebar-image d-flex flex-column align-items-center justify-content-center"
          style={{
            height: "100%",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#ffffff",
          }}></div>
      </div>
    );
  }
}

export default LeftSideSection;
