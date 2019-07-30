import React from "react";
import "./styles.scss";
import { Redirect } from "react-router-dom";

export default props => {
	const { isUserAuthenticated } = props;
  if (!isUserAuthenticated) {
    return <Redirect to="/" />;
	}
	const addArticle = () => {
		console.log("props =>", props);
		props.history.push("/cms");
	}

  return (
    <div>
      <h1>welcome to article page</h1>
			<button onClick={addArticle} className='btn btn-info mt-5'>Add new article</button>
    </div>
  );
};
