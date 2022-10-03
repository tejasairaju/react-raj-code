
import React, { useEffect, useMemo, useState } from "react";
import jwt from 'jwt-decode';
import _isEmpty from 'lodash/isEmpty';
import { useLocation, Navigate, Outlet, BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
import MapDisclosures from "../containers/MapDisclosures/MapDisclosures.jsx";
import SystemAdminDashboard from "../containers/Dashboards/SystemAdminDashboard.jsx";
import ViewQuestions from "../containers/ViewQuestions/ViewQuestions.jsx";


const RootRouter = () => {
  const navigator = useNavigate();
  const { isAuthenticated = false, loginWithRedirect = () => { }, getTokenSilently } = useAuth0();
  const [loginUserDetails, setLoginUserDetails] = useState({});
  const [isVarified, setIsVarified] = useState(false);
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
    // setIsVarified(true);
    // navigator('/');
  }

  const logoutHandler = () => {
    // loginWithRedirect();
    // setIsVarified(false);
    // navigator('/');
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
      <Route element={<CreateWizard logoutHandler={() => logoutHandler}/>}>
      <Route index element={<SystemAdminDashboard />} />
        <Route path="/createframe" element={<CreateFramework />} />
        <Route path="/createdisclosures" element={<CreateDisclosures/>} />
        <Route path="/createquestions" element={<CreateQuestions/>} />
        <Route path="/manageframework" element={<ViewFrameWork />} />
        <Route path="/viewdisclosures" element={<ViewDisclosures />} />
        <Route path="/viewquestions" element={<ViewQuestions />} />
        <Route path="/createdisclosures" element={<CreateFramework />} />
        <Route path="/mapdisclosures" element={<MapDisclosures />} />
        <Route path="/manageclient" element={<ClientInfo />} />
        <Route path="/country" element={<ManageCountry />} />
        <Route path="/category" element={<ManageCategory />} />
        <Route path="/manageusers" element={<ManageFrameWork component='Manage Users Page' />} />
        {/* <Route path="/managemasters" element={<ManageFrameWork component='Manage Masters Page' />} />  */}
      </Route>
    </Routes>)
  }

  return (
    <>
      {!isAuthenticated && (<React.Fragment>
        <Routes>
          <Route path="/" element={<Login loginHandler={loginHandler} />} />
           <Route path="*" element={<div>Please login <button className="default-login-btn" onClick={() => navigator('/')}>Login</button></div>}/> 
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
