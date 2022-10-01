
import React, { useEffect, useMemo, useState } from "react";
import jwt from 'jwt-decode';
import _isEmpty from 'lodash/isEmpty';
import { useLocation, Navigate, Outlet, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
import HomePage from './Home.js';
import ExternalApi from "./ExternalApi.js";
import Login from "../containers/login/Login.jsx";
import CreateWizard from "../containers/CreateWizard/CreateWizard.jsx";
import Profile from "./Profile.js";
import ClientInfo from "../containers/ClientInfo/ClientInfo.jsx";
import ManageCountry from "../containers/ManageMaster/Country.jsx";
import ManageCategory from "../containers/ManageMaster/Category.jsx";
import CreateFramework from "../containers/CreateWizard/CreateFramework/CreateFramework.jsx";
import CreateDisclosures from "../containers/CreateDisclosures/CreateDisclosures.jsx";
import ManageFrameWork from "../containers/ManageFrameWork/ManageFrameWork.jsx";
import RegistrationForm from '../components/RegistrationForm/RegistrationForm.jsx';
import CreateQuestions from '../containers/CreateWizard/CreateQuestions/CreateQuestions.jsx';
import Packeges from "../containers/Packeges/Packeges.jsx";
import ViewFrameWork from "../containers/ViewFrameWork/ViewFrameWork.jsx";
import ViewDisclosures from "../containers/ViewDisclosures/ViewDisclosures.jsx";


const RootRouter = () => {
  const { isAuthenticated = false, loginWithRedirect = () => { }, getTokenSilently } = useAuth0();
  const [loginUserDetails, setLoginUserDetails] = useState({});
  useMemo(() => {
    if (isAuthenticated) {
      const fn = async () => {
        try {
          const token = await getTokenSilently();
          setLoginUserDetails(jwt(token));
        } catch (error) {
          setLoginUserDetails({});
        }
      }
      fn();
    }
  }, [isAuthenticated]);

  const loginHandler = (email) => {
    loginWithRedirect();
  }

  let renderRouteComponent = null;
  if (isAuthenticated && loginUserDetails.orgi) {
    renderRouteComponent = (<React.Fragment>
      <Routes>
        <Route path="/" element={<PrivateRoute component={ExternalApi} />} />
        <Route path="/external-api" element={<PrivateRoute component={ExternalApi} />} />
        <Route path="*" element={<main style={{ padding: "1rem" }}><p>There's nothing here!</p></main>} />
      </Routes></React.Fragment>)
  } else if (isAuthenticated && loginUserDetails.user_role === 'client_admin') {
    renderRouteComponent = (<Routes>
      <Route element={<CreateWizard />}>
      <Route index element={<ManageFrameWork component='Home Page' />} />
        <Route path="/createframe" element={<CreateFramework />} />
        <Route path="/createdisclosures" element={<CreateDisclosures/>} />
        <Route path="/createquestions" element={<CreateQuestions/>} />
        <Route path="/manageframework" element={<ViewFrameWork />} />
        <Route path="/viewdisclosures" element={<ViewDisclosures />} />
        <Route path="/createdisclosures" element={<CreateFramework />} />

        <Route path="/manageclient" element={<ClientInfo />} />
        <Route path="/country" element={<ManageCountry />} />
        <Route path="/category" element={<ManageCategory />} />
        <Route path="/manageusers" element={<ManageFrameWork component='Manage Users Page' />} />
        <Route path="/managemasters" element={<ManageFrameWork component='Manage Masters Page' />} /> 
      </Route>
    </Routes>)
  }

  return (
    <>
      {!isAuthenticated && (<React.Fragment>
        <Routes>
          <Route path="/" element={<Login loginHandler={loginHandler} />} />
        </Routes>
      </React.Fragment>
      )}
      <Routes>
        <Route path="/signup" element={<RegistrationForm />} />
      </Routes>
      {renderRouteComponent}
    </>
  );
};
export default RootRouter;
