import React, { Component } from "react";
import "./styles.scss";
import { Redirect } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

export default class Article extends Component {
  state = {
    article_id: null
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let id = "";
    for (let param of query.entries()) {
      id = param[1];
    }
    this.setState({ article_id: id });
  }

  render() {
    const { isUserAuthenticated, user } = this.props;
    const { article_id } = this.state;
    const articles = JSON.parse(window.localStorage.getItem("articles")) || [];
    const article =
      article_id && articles.find(article => article.id === article_id);

    if (!isUserAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="article">
          {article && (
            <div className="card mb-3">
              <img className="card-img-top" src={article.image} alt="" />
              <div className="card-body">
                <h2 className="card-title">{article.title}</h2>
                {article.date && (
                  <p className="card-title text-muted">{article.date}</p>
                )}
                {article.date && (
                  <p className="card-title text-muted">
                    Powered By Author "<b>{article.authorName}</b>"
                  </p>
                )}
                <Editor
                  editorState={EditorState.createWithContent(
                    convertFromRaw(JSON.parse(article.desc))
                  )}
                  readOnly
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
