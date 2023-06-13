import React from "react";
import { ToastContainer } from "react-toastify";

const Toastcontainer = () => {
  return (
    <div>
      <ToastContainer autoClose={4000} pauseOnHover={false} />
    </div>
  );
};

export default Toastcontainer;
