import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from 'history';

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

export const history = createBrowserHistory();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Auth0Provider
      domain="dev-7mwpqpr4.us.auth0.com"
      clientId="7awJLGExXVdGC5v2q8YeNQt0CP0kynH2"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
  rootElement
);
