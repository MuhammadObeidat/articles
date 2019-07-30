import React, { PureComponent } from "react";
import "./styles.scss";
import {getBase64} from "../../helpers/getBase64.js";

export default class Cms extends PureComponent {
  state = {
    article:{
       title:'',
       image:null,
       description:''
    },
    x:null
  }
   imageUpload = (e) => {
      const file = e.target.files[0];
      getBase64(file).then(base64 => {
        this.setState({ article: {
          ...this.state.article,image:base64
        } });
      });
  };
  render() {
    const {article} = this.state;

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
          <div className="form-group">
            <label className="d-block">Upload Image</label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              onChange={this.imageUpload}
              required
            />
          </div>
          {article.image && <img className="uploaded-image" src={article.image} alt="Uploaded-Img" />}

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
