
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
import SystemSettings from "../containers/SystemSettings/SystemSettings.jsx";
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
import CustomerOnboardByAdmin from "../containers/ClientInfo/CustomerOnboardByAdmin.jsx";
import ESGAdmin from "../containers/ESGAdmin/AdminUser.jsx";
import ESGAdminUserOnboard from "../containers/ESGAdmin/AdminUserCreate.jsx";
import Sector from "../containers/ManageMaster/Sector.jsx";
import SubSector from "../containers/ManageMaster/SubSector.jsx";
import StripePayment from "../containers/StripePayment/StripePayment.jsx";
import PackageSummary from "../Components/PackageSummary/PackageSummary.jsx";
import PaymentSuccess from "../Components/PaymentSuccess/PaymentSuccess.jsx";
import OrganisationInfo from "../containers/OrganisationInfo/OrganisationInfo.jsx";
import ClientAdminDashboard from "../containers/ClientAdminDashboard/ClientAdminDashboard.jsx";
import action from '../actions/SignUpActions.js'
import axios from "axios";
import AssignDisclosures from "../containers/AssignDisclosures/AssignDisclosures.jsx";
import { useDispatch, useSelector } from "react-redux";
import { org } from "../../__mocks__/org.js";
import { client_user } from "../../__mocks__/client_user.js";
import PageInprogress from "../Components/Common/PageInprogress/PageInprogress.jsx";
import CreateReport from "../containers/CreateReport/CreateReport.jsx";
import ViewReport from "../containers/ViewReport/ViewReport.jsx"
import Requests from "../Requests";
import MyTaskDashboard from "../containers/MyTaskDashboard/MyTaskDashboard.jsx";
import ViewMyTaskList from "../containers/ViewMyTaskList/ViewMyTaskList.jsx";
import AnswerQuestions from "../containers/AnswerQuestions/AnswerQuestions.jsx";
import ViewMyTaskDisclosuresList from "../Components/ViewMyTaskDisclosuresList/ViewMyTaskDisclosuresList.jsx";
import OverlappingDisclosures from "../containers/OverlappingDisclosures/OverlappingDisclosures.jsx";
// import CreateTemplate from "../containers/CreateTemplate/CreateTemplate.jsx";
import CreateBespokeFramework from "../containers/CreateBespokeFramework/CreateBespokeFramework.jsx";
import CreateBespokeDisclosures from "../containers/CreateBespokeDisclosures/CreateBespokeDisclosures.jsx";
import ClientAdminFrameworkList from "../containers/ClientAdminFrameworkList/ClientAdminFrameworkList.jsx";

import ClientUsers from "../containers/ClientUserManagment/ClientUsers.jsx";
import AddClientUser from "../containers/ClientUserManagment/AddClientUser.jsx";
import PersonalInformation from "../containers/ProfileInformation/PersonalInformation.jsx";
import CreateBespokeQuestions from "../containers/CreateBespokeQuestions/CreateBespokeQuestions.jsx";
import ESGKpiDashboard from "../containers/ESGKpiDashboard/ESGKpiDashboard.jsx";
import ViewBespokeFramework from "../containers/ViewBespokeFramework/ViewBespokeFramework.jsx";
import ViewBespokeDisclosures from "../containers/ViewBespokeDisclosures/ViewBespokeDisclosures.jsx";
import ViewBespokeQuestions from "../containers/ViewBespokeQuestions/ViewBespokeQuestions.jsx";
import ESGManageUser from "../containers/ESGAdmin/ESGManageUser.jsx";
import AddESGManageUser from "../containers/ESGAdmin/AddESGManageUser.jsx";

const RootRouter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loginWithRedirect = () => { }, getTokenSilently } = useAuth0();
  const [loginUserDetails, setLoginUserDetails] = useState({});
  const [orgDetailsData, setOrgDetailsData] = useState({});
  const [isVarified, setIsVarified] = useState(false);
  const { orgDetails = {}, loginDatails = {} } = useSelector(state => state.signup);
  useEffect(() => {
    if (isAuthenticated) {
      const fn = async () => {
        try {
          const token = await getTokenSilently();
          let decodedData = jwt(token); //decodedData.org/test8
          if (decodedData.user_role === 'client_admin' || decodedData.user_role === 'client_user') {
            const response = await Requests.Get(`/organizations/${decodedData.org}`);
            if (response) {
              setOrgDetailsData({...response})
              dispatch(action.organisationDatails(response));
            }
          }
          dispatch(action.loginDatails(decodedData));
          setLoginUserDetails(decodedData);
        } catch (error) {
          setLoginUserDetails({});
        }
      }
      fn();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!_isEmpty(orgDetails)&&isAuthenticated && (loginUserDetails.user_role == 'client_admin')) {
      if (orgDetails.is_payment_done === false) {
        navigate('/package');
      }
      else if (!_isEmpty(orgDetails) && orgDetails.is_payment_done && !orgDetails.is_db_created) {
        navigate(`/pageinprogress`);
      }
      else if (!_isEmpty(orgDetails) && orgDetails.is_payment_done && orgDetails.is_db_created && orgDetails.status === 'Initial') {
        navigate('/orginfo');
      }
      else if (!_isEmpty(orgDetails) && orgDetails.is_payment_done && orgDetails.is_db_created && (orgDetails.status === 'Active')) {
        navigate('/');
      }
    }
  }, [orgDetails, loginUserDetails]);

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
  }
  else if (isAuthenticated && loginUserDetails.user_role === 'esg_admin') {
    renderRouteComponent = (<Routes>
      <Route element={<CreateWizard userRole={loginUserDetails.user_role} logoutHandler={() => logoutHandler} />}>
        <Route index element={<SystemAdminDashboard />} />
        <Route path="/createframe" element={<CreateFramework />} />
        <Route path="/personalinfo" element={<PersonalInformation />} />
        {/* Duplicate route */}
        <Route path="/createdisclosures" element={<CreateDisclosures />} />
        <Route path="/createquestions" element={<CreateQuestions />} />
        {/* Duplicate route */}
        <Route path="/manageframework" element={<ViewFrameWork />} />
        <Route path="/viewdisclosures" element={<ViewDisclosures />} />
        <Route path="/viewquestions" element={<ViewQuestions />} />
        {/* <Route path="/createdisclosures" element={<CreateFramework />} /> */}
        <Route path="/mapdisclosures" element={<MapDisclosures />} />
        <Route path="/manageclient" element={<ClientInfo />} />
        <Route path="/country" element={<ManageCountry />} />
        <Route path="/category" element={<ManageCategory />} />
        <Route path="/sector" element={<Sector />} />
        <Route path="/subsector" element={<SubSector />} />
        <Route path="/customeronboardbyadmin" element={<CustomerOnboardByAdmin />} />
        <Route path="/client/onboard" element={<RegistrationForm  isClientOnBoard={true} />} />
        <Route path="/adminuser" element={<ESGManageUser />} />
        <Route path="/adminuser/create" element={<ESGAdminUserOnboard />} />
        <Route path="/esg/users/invite" element={<AddESGManageUser />} />
        <Route path="/systemsettings" element={<SystemSettings component='Welcome to System Settings' />} />
        <Route path="/managemasters" element={<ManageFrameWork component='Manage Masters Page' />} />
      </Route>
    </Routes>)
  } else if (isAuthenticated && loginUserDetails.user_role === 'client_admin') {
    renderRouteComponent = (<Routes>
      <Route element={<CreateWizard userRole={loginUserDetails.user_role} logoutHandler={() => logoutHandler} />}>
        <Route index element={<ESGKpiDashboard/>} />
        <Route path="/clientadmin" element={<ClientAdminDashboard />} />
        <Route path="/select/framework" element={<StripePayment />} />
        <Route path="/template" element={<CreateBespokeFramework />} />
        <Route path="/template/:id" element={<CreateBespokeDisclosures />} />
        <Route path="/template/:id/disclosures/:disclosureId" element={<CreateBespokeQuestions />} />
        <Route path="/view/template" element={<ViewBespokeFramework />} />
        <Route path="/view/bespoke/:template_id/disclosures" element={<ViewBespokeDisclosures />} />
        <Route path="/template/:template_id/disclosures/:disclosure_id/questions" element={<ViewBespokeQuestions />} />
        {/* Duplicate route */}
        <Route path="/createdisclosures" element={<CreateDisclosures />} />
        <Route path="/createquestions" element={<CreateQuestions />} />
        <Route path="/manageframework" element={<ViewFrameWork />} />
        <Route path="/viewdisclosures" element={<ViewDisclosures />} />
        <Route path="/viewquestions" element={<ViewQuestions />} />
        {/* Duplicate route */}
        <Route path="/organisation/info" element={<OrganisationInfo />} />
        <Route path="/report/create" element={<CreateReport />} />
        <Route path="/report/view" element={<ViewReport />} />
        <Route path="/task" element={<MyTaskDashboard />} />
        <Route path="/task/reports" element={<ViewMyTaskList />} />
        <Route path="/task/report/:reportId/disclosures" element={<ViewMyTaskDisclosuresList />} />
        <Route path="/report/:reportId/disclosures/:disclosureId/answers" element={<AnswerQuestions />} />
        <Route path="/framework/success" element={<ManageFrameWork component='Welcome to framework' />} />
        <Route path="/report/:reportId/disclosures" element={<AssignDisclosures />} />
        <Route path="/bespoke/framework" element={<ManageFrameWork component='Welcome to Create Bespoke Framework' />} />
        <Route path="/intelligent/mapping" element={<ClientAdminFrameworkList />} />
        <Route path="/answer/questions" element={<ManageFrameWork component='Welcome to Answer Questions' />} />
        <Route path="/organisation/details" element={<ManageFrameWork component='Welcome to Organisation Info' />} />
        <Route path="/publish/reports" element={<ManageFrameWork component='Welcome to Publish Reports' />} />
        <Route path="/client/mangeuser" element={<ManageFrameWork component='Welcome to Manage Users' />} />
        <Route path="/client/users" element={<ClientUsers />} />
        <Route path="/client/users/invite" element={<AddClientUser />} />
        <Route path="/personalinfo" element={<PersonalInformation />} />
      </Route>
      <Route path="/package" element={<Packeges />} />
      <Route path="/orginfo" element={<OrganisationInfo />} />
      <Route path="/checkout" element={<StripePayment />} />
      <Route path="/package/summary" element={<PackageSummary />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/pageinprogress" element={<PageInprogress />} />
    </Routes>);
  } else
  // {
   if (isAuthenticated && loginUserDetails.user_role === 'client_user') {
    renderRouteComponent = (<Routes>
      <Route element={<CreateWizard userRole={loginUserDetails.user_role} logoutHandler={() => logoutHandler} />}>
        <Route index element={<MyTaskDashboard/>} />
        <Route path="/clientadmin" element={<ClientAdminDashboard />} />
        <Route path="/select/framework" element={<StripePayment />} />
        <Route path="/template" element={<CreateBespokeFramework />} />
        <Route path="/template/:id" element={<CreateBespokeDisclosures />} />
        <Route path="/template/:id/disclosures/:disclosureId" element={<CreateBespokeQuestions />} />
        <Route path="/view/template" element={<ViewBespokeFramework />} />
        <Route path="/view/bespoke/:template_id/disclosures" element={<ViewBespokeDisclosures />} />
        <Route path="/template/:template_id/disclosures/:disclosure_id/questions" element={<ViewBespokeQuestions />} />
        {/* Duplicate route */}
        <Route path="/createdisclosures" element={<CreateDisclosures />} />
        <Route path="/createquestions" element={<CreateQuestions />} />
        <Route path="/manageframework" element={<ViewFrameWork />} />
        <Route path="/viewdisclosures" element={<ViewDisclosures />} />
        <Route path="/viewquestions" element={<ViewQuestions />} />
        {/* Duplicate route */}
        <Route path="/organisation/info" element={<OrganisationInfo />} />
        <Route path="/report/create" element={<CreateReport />} />
        <Route path="/report/view" element={<ViewReport />} />
        <Route path="/task" element={<MyTaskDashboard />} />
        <Route path="/task/reports" element={<ViewMyTaskList />} />
        <Route path="/task/report/:reportId/disclosures" element={<ViewMyTaskDisclosuresList />} />
        <Route path="/report/:reportId/disclosures/:disclosureId/answers" element={<AnswerQuestions />} />
        <Route path="/framework/success" element={<ManageFrameWork component='Welcome to framework' />} />
        <Route path="/report/:reportId/disclosures" element={<AssignDisclosures />} />
        <Route path="/bespoke/framework" element={<ManageFrameWork component='Welcome to Create Bespoke Framework' />} />
        <Route path="/intelligent/mapping" element={<ClientAdminFrameworkList />} />
        <Route path="/answer/questions" element={<ManageFrameWork component='Welcome to Answer Questions' />} />
        <Route path="/organisation/details" element={<ManageFrameWork component='Welcome to Organisation Info' />} />
        <Route path="/publish/reports" element={<ManageFrameWork component='Welcome to Publish Reports' />} />
        <Route path="/client/mangeuser" element={<ManageFrameWork component='Welcome to Manage Users' />} />
        <Route path="/client/users" element={<ClientUsers />} />
        <Route path="/client/users/invite" element={<AddClientUser />} />
        <Route path="/personalinfo" element={<PersonalInformation />} />
      </Route>
    </Routes>);
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
