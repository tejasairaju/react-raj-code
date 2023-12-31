import React from "react";
import ReactDOM from "react-dom";
// import Auth0ProviderWithHistory from "./auth0-provider-with-history.js";
import history from "./utils/history";
import './styles/template/framework.css'
// import './styles/roots/fonts.css';
// import './styles/roots/reset.css';
// import './styles/template/aside-framework.css';
// import './styles/template/aside.css';
// import './styles/template/framework.css';
// import './styles/template/header.css';
import { Auth0Provider } from "./react-auth0-spa";
import App from './App.jsx';
import './styles/common.css';
import './index.css';

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_AUTH0_DOMAIN}
    client_id={process.env.REACT_AUTH0_CLIENT_ID}
    redirect_uri={window.location.origin}
    audience={process.env.AUTH0_AUDIENCE}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);