import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/404.css";

const NoUrlPage = () => {
  return (
    <div>
      <div className="face">
        <div className="band">
          <div className="red"></div>
          <div className="white"></div>
          <div className="blue"></div>
        </div>
        <div className="eyes"></div>
        <div className="dimples"></div>
        <div className="mouth"></div>
      </div>

      <h1 className="nourl-heading">Oops! Source Url doesn't exist!</h1>
      <Link to="/" className="nourl-btn">
        Return to Home
      </Link>
    </div>
  );
};

export default NoUrlPage;
