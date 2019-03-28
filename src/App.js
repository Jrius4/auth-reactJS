import React, { Component } from "react";
import { Button } from "react-bootstrap";

class App extends Component {
  goTo = route => {
    this.props.history.replace(`/${route}`);
  };

  login = () => {
    this.props.auth.login();
  };

  logout = () => {
    this.props.auth.logout();
  };

  componentDidMount = () => {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem("isLoggedIn") === true) {
      renewSession();
    }
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div class="container">
        <Button
          bsStyle="primary"
          className="btn-margin"
          onClick={this.goTo("/")}
        >
          Home
        </Button>
        {isAuthenticated() && (
          <Button
            bsStyle="primary"
            className="btn-margin"
            onCLick={this.login()}
          >
            Log in
          </Button>
        )}
        {isAuthenticated() && (
          <Button
            bsStyle="primary"
            className="btn-margin"
            onCLick={this.logout()}
          >
            Log out
          </Button>
        )}
      </div>
    );
  }
}

export default App;
