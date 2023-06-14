import React from "react";
import sidebarImage from "../../assets/img/krd-hero-image.jpg";
class LeftSideSection extends React.Component {
  render() {
    return (
      <div className="col desktop-only">
        <div
          className="dashboard-sidebar-image d-flex flex-column align-items-center justify-content-center"
          style={{
            height: "100%",
            // backgroundImage: "url(" + sidebarImage + ")",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#ffffff",
          }}
          >
            <img src={sidebarImage} alt="KRD" />
          </div>
      </div>
    );
  }
}

export default LeftSideSection;
