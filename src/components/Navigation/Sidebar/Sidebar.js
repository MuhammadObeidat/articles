import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Laptop from "@material-ui/icons/Laptop";
import MobilePhone from "@material-ui/icons/MobileFriendly";
import Watch from "@material-ui/icons/Watch";
import * as action from "../../../store/actions/AuthenticationAction";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: "flex",
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },

  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: "absolute"
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  }
});

class sidebar extends React.Component {
  signIn = () => {
    this.props.openAuthDialog(false);
    this.props.closeSidebar();
  };
  signUp = () => {
    this.props.openAuthDialog(true);
    this.props.closeSidebar();
  };
  signOut = () => {
    this.props.logout();
    this.props.closeSidebar();
  };

  goTo = destination => {
    this.props.history.push(`/${destination}`);
    this.props.closeSidebar();
  };
  render() {
    const {classes, theme, open, isAuthenticated} = this.props;
    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.props.closeSidebar}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={() => this.goTo("")}>
              <ListItemIcon>
                <Laptop />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem button onClick={() => this.goTo("screens")}>
              <ListItemIcon>
                <Laptop />
              </ListItemIcon>
              <ListItemText primary="Screens" />
            </ListItem>
            <ListItem button onClick={() => this.goTo("laptops")}>
              <ListItemIcon>
                <Laptop />
              </ListItemIcon>
              <ListItemText primary="Laptops" />
            </ListItem>
            <ListItem button onClick={() => this.goTo("mobiles")}>
              <ListItemIcon>
                <MobilePhone />
              </ListItemIcon>
              <ListItemText primary="Mobiles" />
            </ListItem>

            <ListItem button onClick={() => this.goTo("watches")}>
              <ListItemIcon>
                <Watch />
              </ListItemIcon>
              <ListItemText primary="Watches" />
            </ListItem>
          </List>
          <Divider />

          {isAuthenticated ? (
            <List>
              <ListItem button onClick={this.signOut}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem button onClick={this.signIn}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItem>
              <ListItem button onClick={this.signUp}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </List>
          )}
        </Drawer>
      </div>
    );
  }
}

sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(connect(null, action)(withStyles(styles)(sidebar)));
