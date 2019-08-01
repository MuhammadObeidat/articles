import React, { PureComponent } from "react";
import "./styles.scss";
import { getBase64 } from "../../helpers/getBase64.js";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { uniqueKeyGenerator } from "../../helpers/uniqueKeyGenerator";
import { Redirect } from "react-router-dom";
const articles = JSON.parse(window.localStorage.getItem("articles")) || [];

export default class Cms extends PureComponent {
  state = {
    article: {
      title: "",
      image: null,
      description: EditorState.createEmpty(),
      desc: null,
      decriptionText: "",
      date: new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/")
    },
    loading: true,
    isUpdate: false
  };
  async componentDidMount() {
    const query = await new URLSearchParams(this.props.location.search);
    let id = "";
    for (let param of query.entries()) {
      id = param[1];
    }
    await this.setState({
      loading: false,
      isUpdate: id ? true : false,
      article: id
        ? {
            ...articles.find(article => article.id === id),
            description: EditorState.createWithContent(
              convertFromRaw(
                JSON.parse(articles.find(article => article.id === id).desc)
              )
            )
          }
        : this.state.article
    });
  }

  imageUpload = e => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      this.setState({
        article: {
          ...this.state.article,
          image: base64
        }
      });
    });
  };

  onEditorStateChange = editorState => {
    const contentState = editorState.getCurrentContent();
    const convertTextToRaw = JSON.stringify(convertToRaw(contentState));
    const extractedText = JSON.parse(convertTextToRaw);
    const text = extractedText.blocks.map(el => el.text).join(", ");
    this.setState({
      article: {
        ...this.state.article,
        description: editorState,
        desc: JSON.stringify(convertToRaw(contentState)),
        decriptionText: text
      }
    });
  };
  onchangeInputHandler = e => {
    this.setState({
      article: {
        ...this.state.article,
        title: e.target.value
      }
    });
  };
  submitFormHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    const { article, isUpdate } = this.state;
    const { user } = this.props;
    if (!article.decriptionText) {
      window.alert("Article description cann't be empty!");
      return;
    }
    if (isUpdate) {
      const index = articles.findIndex(e => e.id === article.id);
      const updatedArticle = [...articles];
      updatedArticle[index] = article;

      window.localStorage.setItem("articles", JSON.stringify(updatedArticle));
      this.props.history.replace("/articles");
    } else {
      let data = [
        ...articles,
        {
          ...article,
          id: uniqueKeyGenerator(article.title.replace(/\s/g, "")),
          authorEmail: user.email,
          authorName: `${user.first_name} ${user.last_name}`
        }
      ];
      window.localStorage.setItem("articles", JSON.stringify(data));
      this.props.history.replace("/articles");
    }
  };

  render() {
    const { article, loading, isUpdate } = this.state;
    const { isUserAuthenticated } = this.props;
    if (!isUserAuthenticated) {
      return <Redirect to="/" />;
    }
    if (loading) {
      return <button>loading</button>;
    }

    return (
      <div className="cms-page">
        <h1 className="text-muted">Articles CMS</h1>
        <form onSubmit={this.submitFormHandler}>
          <div className="form-group">
            <label>Article Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="article title"
              value={article.title}
              onChange={this.onchangeInputHandler}
              name="title"
              required
            />
          </div>
          <div className="form-group">
            <label>Publish Date</label>
            <input
              type="text"
              className="form-control"
              placeholder="Date"
              value={article.date}
              name="date"
              required
              disabled
            />
          </div>

          <div className="form-group">
            <label className="d-block">Upload Image</label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              onChange={this.imageUpload}
            />
          </div>
          {article.image && (
            <img
              className="uploaded-image"
              src={article.image}
              alt="Uploaded-Img"
            />
          )}

          <Editor
            editorState={article.description}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
          />
          <div className="d-flex justify-content-center flex-column">
            <button type="submit" className="btn btn-success">
              {isUpdate ? "Update Article" : "Add Article"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
