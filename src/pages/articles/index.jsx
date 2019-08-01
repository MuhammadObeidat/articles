import React, { Component } from "react";
import "./styles.scss";
import { Redirect } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Card from "../../components/Card";
import { uniqueKeyGenerator } from "../../helpers/uniqueKeyGenerator";

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
          {articles.length > 0? (
            articles.map((item, index) => {
              return (
                <Card
                  key={uniqueKeyGenerator(index)}
                  addArticle={this.addArticle}
                  showArticle={this.showArticle}
                  editArticle={this.editArticle}
                  deleteArticle={this.deleteArticle}
                  user={user}
                  card={item}
                  index={index}
                />
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
