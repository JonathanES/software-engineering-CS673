import React, { Component } from "react";

class Projectform extends Component {
  render() {
    return (
      <div className="container mt-5">
        <form>
          <div class="form-group">
            <label> Project name </label>
            <input
              type="text"
              className="form-control"
              id="FormProjectName"
              placeholder="your project name"
            />
          </div>

          <div className="form-group">
            <label> Description </label>
            <textarea class="form-control" id="formDescription" row="3" />
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="option1"
            />
            <label className="form-check-label" for="inlineCheckbox1">
              Public
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="option1"
            />
            <label className="form-check-label" for="inlineCheckbox2">
              Private
            </label>
          </div>
          <br />
          <br />
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default Projectform;
