import React, { Component } from "react";

export default class Logo extends Component {
  render() {
    const { src, className, link, altText, label } = this.props;
    return (
      <div>
        {src === "" || src === undefined ? (
          <div className="col-3 mt-2 mb-2 align-items-center">
            <h3>{label}</h3>
          </div>
        ) : (
          <div className="text-center mx-2">
            <a href={link}>
              <img src={src} className={className} width="140" height="50" alt={altText} />
            </a>
          </div>
        )}
      </div>
    );
  }
}
