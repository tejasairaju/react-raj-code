import React, { lazy, Suspense } from "react";
import { useLocation, Navigate, Outlet, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from "./containers/Home/Home.jsx";
import Login from './containers/login/Login.jsx';
import { useAuth0 } from "@auth0/auth0-react";
// import RegistrationForm from "./components/RegistrationForm/RegistrationForm.jsx";
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store.js';
import Packeges from "./containers/Packeges/Packeges.jsx";
// import Payment from "./containers/Payment/Payment.jsx";
// import PrivateRoutes from "../src/protected-route.js";
// import Createframework from "./containers/CreateFrameWork/CreateFrameWork.jsx";
// import CreateframeworkForm from "./containers/CreateFrameWork/createFrameworkForm/createFrameWorkForm.jsx";
// import HomeFrameWork from "./containers/HomeFrameWork/HomeFrameWork.jsx";
// import Popup from './Components/Common/Popup/Popup.jsx';

import HomePage from './client-components/Home.js';
import Profile from './client-components/Profile.js';
import ExternalApi from './client-components/ExternalApi.js';
import PrivateRoute from "./client-components/PrivateRoute.js";
import RootRouter from "./client-components/RootRouter.js";
const App = (props) => {
    const { isAuthenticated, users } = useAuth0();
    console.log('::::::::::::::::::app:::::::', isAuthenticated);
    return (
        <section className="wrapper">
            <Provider store={store}>
                <Router history={history}>
                <RootRouter />
                </Router>
            </Provider>
        </section>);
}

export default App;