import React, { Component } from "react";
import Auth, { route } from "./Auth/Auth";
let MyContext = React.createContext();

let auth = new Auth();
let username = auth.getProfile().given_name || "Nelson";
export class Provider extends Component {
  state = {
    name: username,
    auth,
    route,
  }
  render() {
    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export const Consumer = MyContext.Consumer;
