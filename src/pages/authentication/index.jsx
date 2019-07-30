import React, { Component } from "react";
import "./styles.scss";
import { Redirect } from "react-router-dom";

export default class Authentication extends Component {
  state = {
    isSignup: true,
    loading: false,
    email: "",
    password: "",
    first_name: "",
    last_name: ""
  };

  submitFormHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    const users = JSON.parse(window.localStorage.getItem("users")) || [];
    console.log("users xxx =>", users);

    try {
      const { isSignup, first_name, last_name, password, email } = this.state;
      const data = {
        first_name,
        last_name,
        password,
        email
      };
      if (isSignup) {
        const isUserExist = users.find(user => user.email === email);
        if (isUserExist) {
          window.alert("Email already exist !");
          return false;
        } else {
          const updatedUsers = [...users, data];
          window.localStorage.setItem("users", JSON.stringify(updatedUsers));
          this.setState({ isSignup: false });
        }
      } else {
        const canLoggin = users.find(
          user => user.email === email && user.password === password
        );
        if (canLoggin) {
           window.localStorage.setItem("user", JSON.stringify(canLoggin));
           this.props.history.replace("/articles");
        } else window.alert("The email handler is not correct !");
      }
    } catch (e) {
      console.log("e =>", e);
    } finally {
      this.setState({ loading: false });
    }
  };

  switchAuth = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  };

  signOut = () => {
    window.localStorage.removeItem("user");
  };

  handleTextChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  render() {
    const {
      isSignup,
      first_name,
      last_name,
      password,
      email,
      loading
    } = this.state;
    const {isUserAuthenticated } = this.props;
    if(isUserAuthenticated) {
      return <Redirect to="/articles" />;
    }
    const text = isSignup ? "Sign up" : "Login";
    const oppsiteText = isSignup ? "Login" : "Sign up";
    return (
      <div className="authentication">
        <h1>{text}</h1>
        <form onSubmit={this.submitFormHandler}>
          {isSignup && (
            <div className="input-group justify-content-between">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Adam"
                  onChange={this.handleTextChange}
                  value={first_name}
                  name="first_name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Jhonson"
                  onChange={this.handleTextChange}
                  value={last_name}
                  name="last_name"
                  required
                />
              </div>
            </div>
          )}
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={this.handleTextChange}
              value={email}
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={this.handleTextChange}
              value={password}
              name="password"
              required
            />
          </div>
          <div className="d-flex justify-content-center flex-column">
            {loading ? (
              <button
                className="btn btn-primary"
                onClick={e => {
                  e.preventDefault();
                }}
              >
                Loading...
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                {text}
              </button>
            )}
            <span>
              {isSignup ? " Already have an account" : " Dont have an account"}
              <small className="px-2" onClick={this.switchAuth}>
                {oppsiteText} now
              </small>
            </span>
          </div>
        </form>
      </div>
    );
  }
}
