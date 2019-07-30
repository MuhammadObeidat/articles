import React, { Component } from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import "./Layout.scss";

class Layout extends Component {
  state = { showSideDrawer: false };

  render() {
    const { user, isUserAuthenticated } = this.props;
    return (
      <>
        <Toolbar isUserAuthenticated={isUserAuthenticated} user={user} />
        <main className="Content">{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
