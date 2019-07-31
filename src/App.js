import React from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import Layout from "./hoc/Layout/Layout.jsx";
import Auth from "./pages/authentication";
import Articles from "./pages/articles";
import Cms from "./pages/cms";
import Article from "./pages/article";

const App = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const isUserAuthenticated = user ? true : false;
  return (
    <div className="App">
      <Layout isUserAuthenticated={isUserAuthenticated} user={user}>
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Auth isUserAuthenticated={isUserAuthenticated} {...props} />
            )}
          />
          <Route
            path="/articles"
            exact
            render={props => (
              <Articles
                isUserAuthenticated={isUserAuthenticated}
                {...props}
              />
            )}
          />
          <Route
            path="/details"
            exact
            render={props => (
              <Article isUserAuthenticated={isUserAuthenticated} {...props} />
            )}
          />

          <Route
            path="/cms"
            exact
            render={props => (
              <Cms isUserAuthenticated={isUserAuthenticated} {...props} />
            )}
          />
        </Switch>
      </Layout>
    </div>
  );
};

export default withRouter(App);
