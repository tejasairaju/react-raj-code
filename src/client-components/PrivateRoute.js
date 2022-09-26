import React, { useEffect } from "react";
import { useLocation, Navigate, Outlet, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect = () => {} } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: {targetUrl: window.location.pathname}
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

return <React.Fragment>{isAuthenticated === true ? <Component /> : null}</React.Fragment>
};

export default PrivateRoute;