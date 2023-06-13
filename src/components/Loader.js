import React from "react";
import { Spinner } from "reactstrap";

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <>
        <div className="spinner-loading">
          <Spinner />
        </div>
        <div className="spinner-loading">
          We can’t imagine anyone better at supporting than you.
        </div>
      </>
    );
  }
}

export default Loader;
