import React from "react";
import "./styles.scss";
import { Redirect } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { uniqueKeyGenerator } from "../../helpers/uniqueKeyGenerator";
import { cutSentence } from "../../helpers/cutSentence";

export default props => {
  const { isUserAuthenticated } = props;
  if (!isUserAuthenticated) {
    return <Redirect to="/" />;
	}
	
  const addArticle = () => {
    console.log("props =>", props);
    props.history.push("/cms");
  };

  const showArticle = item => {
    props.history.push("/details?id=" + item.id);
  };

  const editArticle = item => {
    props.history.push("/cms?id=" + item.id);
  };
  
  const articles = JSON.parse(window.localStorage.getItem("articles")) || [];
  return (
    <div className="container">
      <div className="articles card-deck">
        {articles.length ? (
          articles.map((item, index) => {
            return (
              <div className="card mb-3" key={uniqueKeyGenerator(index)}>
                <div onClick={() => showArticle(item)}>
                  <img className="card-img-top" src={item.image} alt="" />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p>
                      {cutSentence(item.decriptionText, true, 200, "...")}
                    </p>
                  </div>
                </div>

                <div className="card-footer d-flex">
                  <span
                    onClick={() => showArticle(item)}
                    className="text-muted"
                  >
                    see more
                  </span>
                  <span
                    onClick={() => editArticle(item)}
                    className="ml-auto text-muted"
                  >
                    Edit
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="poster">
            <h1>There's no articles uploaded yet ... </h1>
            <p className="text-muted">You can start uploading your articles by clicking on button down below</p>
             <button onClick={addArticle} className="btn btn-info mt-3">
        Add article
      </button>
          </div>
        )}
      </div>
     
    </div>
  );
};
