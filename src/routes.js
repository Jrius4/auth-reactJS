import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import Callback from "./components/Callback";
import Auth from "./Auth/Auth";
import history from './history'

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if(/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthenticated();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history} >
    <div>
      <Route path="/" render={props => <App auth={auth} {...props} />}/>
      <Route path="/callback" render={props => {
        handleAuthentication();
        return <Callback {...props}/>
      }}/>
    </div>
    </Router>
  );
}