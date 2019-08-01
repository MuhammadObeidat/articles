import React, { Component } from "react";
import "./styles.scss";
import { Redirect } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { uniqueKeyGenerator } from "../../helpers/uniqueKeyGenerator";
import { cutSentence } from "../../helpers/cutSentence";

export default class Articles extends Component {
  state = {
    articles: JSON.parse(window.localStorage.getItem("articles")) || []
  };
  addArticle = () => {
    this.props.history.push("/cms");
  };

  showArticle = item => {
    this.props.history.push("/details?id=" + item.id);
  };

  editArticle = item => {
    this.props.history.push("/cms?id=" + item.id);
  };

  deleteArticle = index => {
    const { articles } = this.state;
    const r = window.confirm("Are you sure to delete this article!");
    if (r === true) {
      const updateArticles = [...articles];
      updateArticles.splice(index, 1);
      this.setState({ articles: updateArticles });
      window.localStorage.setItem("articles", JSON.stringify(updateArticles));
    } else {
      return false;
    }
  };

  render() {
    const { isUserAuthenticated, user } = this.props;
    if (!isUserAuthenticated) {
      return <Redirect to="/" />;
    }
    const { articles } = this.state;
    return (
      <div className="container">
        <div className="articles card-deck">
          {articles.length ? (
            articles.map((item, index) => {
              return (
                <div className="card mb-3" key={uniqueKeyGenerator(index)}>
                  <div onClick={() => this.showArticle(item)}>
                    <img className="card-img-top" src={item.image} alt="" />
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-title text-muted">
                        Published: {item.date}
                      </p>
                      <p>
                        {cutSentence(item.decriptionText, true, 200, "...")}
                      </p>
                    </div>
                  </div>

                  <div className="card-footer d-flex mt-auto">
                    <span
                      onClick={() => this.showArticle(item)}
                      className="text-muted"
                    >
                      see more
                    </span>
                    {item.authorEmail === user.email && (
                      <>
                        <span
                          onClick={() => this.editArticle(item)}
                          className="ml-auto text-success"
                        >
                          <i className="far fa-edit" />
                        </span>
                        <span
                          onClick={() => this.deleteArticle(index)}
                          className="ml-auto text-danger"
                        >
                          <i className="fas fa-trash-alt" />
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="poster">
              <h1>There's no articles uploaded yet ... </h1>
              <p className="text-muted">
                You can start uploading your articles by clicking on button down
                below
              </p>
              <button onClick={this.addArticle} className="btn btn-info mt-3">
                Add article
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
