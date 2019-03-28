import React, { Component } from "react";
import { Consumer } from "../context";

export default class Main extends Component {
  render() {
    return (
      <div>
        <p>
          Hello {this.props.name} React
          <br />
          Do you wanna see the secret area? <a href="/secret">Click here</a>
        </p>
        {
          <Consumer>
            {context =>
              !context.auth.isAuthenticated() && (
                <div>
                  <h2>Please log in</h2>
                  <button onClick={context.auth.login}>Log in</button>
                </div>
              )
            }
          </Consumer>
        }
      </div>
    );
  }
}
