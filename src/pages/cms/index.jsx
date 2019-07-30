import React, { PureComponent } from "react";
import "./styles.scss";

export default class Cms extends PureComponent {
  render() {
    return (
      <div className="cms-page">
        <h1>Welcome to cms</h1>
        <form onSubmit={this.submitFormHandler}>
              <div className="form-group">
                <label>Article Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="article title"
                  name="title"
                  required
                />
              </div>
          <div className="d-flex justify-content-center flex-column">
            <button type="submit" className="btn btn-primary">
              Add articles
            </button>
          </div>
        </form>
      </div>
    );
  }
}
