import auth0 from "auth0-js";
import history from "../history";

export let route;
export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "nelson05.auth0.com",
    clientID: "fjHqBPJ08m42V9sNXuk2DkBvlzYGLPas",
    redirectUri: "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid profile"
  });

  login() {
    this.auth0.authorize();
  }

  handleAuthenticated = () => {
    this.auth0.parseHash((err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        this.setSession(authResults);
      } else if (err) {
        history.replace("/");
        console.log(err);
      }
    });
  };

  getAccessToken = () => {};

  setSession = authResults => {
    localStorage.setItem("isLoggedIn", "true");

    let expiresAt = authResults.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResults.accessToken;
    this.idToken = authResults.idToken;
    this.expiresAt = expiresAt;

    history.replace("/");
  };

  renewSession = () => {
    this.auth0.checkSession({}, (err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        this.setSession(authResults);
      } else if (err) {
        this.logout();
        console.log(err);
      }
    });
  };

  logout = () => {
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    localStorage.removeItem("isLoggedIn");

    history.replace("/");
  };

  isAuthenticated = () => {
    return new Date().getTime() < this.expiresAt;
  };
}
