import React, { Component } from "react";

class Page404 extends Component {
  /**
   * Render page 404 error
   */
  render() {
    return (
      <div className="app align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-sm-12">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">Oops!</h1>
                <h4 className="pt-3">You're lost.</h4>
                <p className="text-muted float-left">
                We can't seem to find the page you're looking for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Page404;
