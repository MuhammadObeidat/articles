import React, { PureComponent } from "react";
import "./styles.scss";
import { getBase64 } from "../../helpers/getBase64.js";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { uniqueKeyGenerator } from "../../helpers/uniqueKeyGenerator";

const articles = JSON.parse(window.localStorage.getItem("articles")) || [];

export default class Cms extends PureComponent {
  state = {
    article: {
      title: "",
      image: null,
      description: EditorState.createEmpty(),
      desc: null,
      decriptionText: ""
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
        ? articles.find(article => article.id === id)
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
    console.log("articles from storge =>", articles);
    const { article, isUpdate } = this.state;
    if (isUpdate) {
      const index = articles.findIndex(e => e.id === article.id);
      const updatedArticle = [...articles];
       updatedArticle[index] = article;

      window.localStorage.setItem("articles", JSON.stringify(updatedArticle));
      this.props.history.replace("/articles");
    } else {
      let data = [
        ...articles,
        { ...article, id: uniqueKeyGenerator(article.title) }
      ];
      window.localStorage.setItem("articles", JSON.stringify(data));
      this.props.history.replace("/articles");
    }
  };

  render() {
    const { article, loading, isUpdate } = this.state;
    console.log("article =>", article);
    console.log("loading =>", loading);

    if (loading) {
      return <button>loading</button>;
    }
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
              value={article.title}
              onChange={this.onchangeInputHandler}
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
            editorState={
              isUpdate
                ? EditorState.createWithContent(
                    convertFromRaw(JSON.parse(article.desc))
                  )
                : article.description
            }
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
          />
          <div className="d-flex justify-content-center flex-column">
            <button type="submit" className="btn btn-primary">
              {isUpdate ? "Update Article" : "Add Article"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
