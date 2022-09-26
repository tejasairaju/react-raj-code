import React from "react";
import {onRedirecting, withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
// import PageLoader from '../src/Components/Common/PageLoader/PageLoader.jsx';
// import Popup from "./Components/Common/Popup/Popup.jsx";

const ProtectedRoute = ({component}) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => null,
  });
  return <Component />;
};

export default ProtectedRoute;