import React, { Component } from "react";
import { Consumer } from "../context";

export default class Secret extends Component {
  render() {
    return (
      <div>
        This is a secret place.
        {
          <Consumer>
            {context => <button onClick={context.auth.logout}>Logout</button>}
          </Consumer>
        }
      </div>
    );
  }
}
