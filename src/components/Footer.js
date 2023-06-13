import React, { Suspense } from "react";
//Helper
import { getCurrentYear } from "../lib/helper";

const Footer = (props) => {
  const { footerColor, footerTextColor, footerCopyRightsText } = props;

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  return (
    <Suspense fallback={loading()}>
      <div
        className="footer p-3 "
        style={{
          backgroundColor: footerColor ? footerColor : "white",
          color: footerTextColor ? footerTextColor : "black",
          position: "fixed",
        }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col mx-auto text-left">
              <span>
                &copy; {getCurrentYear()}
                <a
                  className="ml-2"
                  target="#"
                  style={{
                    color: footerTextColor ? footerTextColor : "white",
                    textDecoration: "none",
                  }}>
                  {footerCopyRightsText}
                </a>
              </span>
            </div>
            <div className="col-lg-3 col-sm"></div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Footer;
