import React, { Component } from "react";
import { Link } from "react-router-dom";

class Projecttemplate extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3 px-1 bg-white">
            <div className="py-2 sticky-top flex-grow-1">
              <div class="nav flex-sm-column">
                <Link to="/projectTemplate" className="text-primary">
                  software-enginnering project
                </Link>
                <Link to="/" className="nav-link d-none d-sm-inline">
                  <h4> Software enginnering project </h4>
                </Link>
                <Link to="/" className="nav-link">
                  Workspace
                </Link>
                <Link to="/" className="nav-link">
                  Tasks
                </Link>
                <Link to="/" className="nav-link">
                  Issues
                </Link>
                <Link to="" className="nav-link">
                  Uploadfiles
                </Link>
                <Link to="" className="nav-link">
                  People
                </Link>
                <Link to="" className="nav-link">
                  Calender
                </Link>
              </div>
            </div>
          </div>
          <div className="col" id="main">
            <br />
            <h4>Main Area</h4>
          </div>
        </div>
      </div>
    );
  }
}
export default Projecttemplate;
