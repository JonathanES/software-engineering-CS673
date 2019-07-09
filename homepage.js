import React, { Component } from "react";
import { Link } from "react-router-dom";

class Homepage extends Component {
  render() {
    return (
      <div className="container my-container mt-2">
        <div className="row my-row1">
          <div className="col">
            <br />
            <p>Collaborate, Assign and Manage all your work in one place.</p>
            <Link
              to="/projectForm"
              className="btn btn-primary btn-sm active"
              role="button"
              aria-pressed="false"
            >
              Create a new project
            </Link>
          </div>
        </div>
        <br />
        <h5> Your project list </h5>
        <div className="row my-row2 mt-2">
          <ul className="list mt-4">
            <li className="list-item">
              <Link to="/projectTemplate" className="text-primary">
                software-enginnering project
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Homepage;
