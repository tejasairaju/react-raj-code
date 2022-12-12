import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import _get from 'lodash/get';
// import Input from '../../Components/Common/Input.jsx';
import Popup from "../../components/Common/Popup/Popup.jsx";
import Header from '../../Components/Common/Header/Header.jsx';
import './CreateWizard.css';
import { useState } from 'react';
import { esg_admin, client_admin, client_user } from '../../utils/constants.js'
import CreateFramework from './CreateFramework/CreateFramework.jsx';
import axios from 'axios';
import Pagination from '../../Components/Pagination/Pagination.jsx';
import { useDBStatus } from '../../Components/IsDBReady/IsDBReady.jsx';
import PageInprogress from '../../Components/Common/PageInprogress/PageInprogress.jsx';
import actions from '../../actions/AppWizardAction.js';

const CreateWizard = ({ userRole, logoutHandler = () => { } }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sideMenu, updateSideMenu] = useState([]);
    const [statusData, setStatusData] = useState({});
    const [userRoleText, setUserRole] = useState('');

    useEffect(() => {
        if (userRole === 'esg_admin') {
            updateSideMenu(esg_admin);
            setUserRole('System Admin');
        } else if (userRole === 'client_admin') {
            updateSideMenu(client_admin);
            setUserRole('Client Admin');
        } else {
            updateSideMenu(client_user);
            setUserRole('Client User');
        }
        getUserAdminInfo(1);
    }, []);

    const getUserAdminInfo = async () => {
        try {
            await Axios.all([
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/countries?is_active=active`),
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/sectors?is_active=active`),
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/subsectors?is_active=active`),
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/disclosure-categories?is_active=active`),
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/industries?is_active=active`),
            ]).then(([{ data: countries }, { data: sectors }, { data: subsectors}, { data: categories }, { data: industries } /*{ data: subsectors }*/]) => {
                dispatch(actions.updateWizardData({ countries: countries.results, sectors: sectors.results, subsectors: subsectors.results, categories: categories.results }));
            });
        } catch (error) {
            console.log(error);
        }
    }
    const onCloseHandler = () => {
        setStatusData({ type: '', message: '' });
    }

    const onMenuClickHandler = (routeUrl = '', parentIndex = null, childIndex = null) => {
        let cloneSideMenu = [...sideMenu];
        if (((cloneSideMenu[parentIndex].subMenu) || []).length && childIndex !== null) {
            cloneSideMenu[parentIndex].subMenu = (cloneSideMenu[parentIndex].subMenu).map((iterateSubMenu, i) => {
                if (i === childIndex) {
                    iterateSubMenu.isActive = true;
                } else {
                    iterateSubMenu.isActive = false;
                }
                return iterateSubMenu;
            });

        } else {
            cloneSideMenu = (cloneSideMenu || []).map((iterateMenu, index) => {
                if (parentIndex === index) {
                    iterateMenu.isActive = true;
                } else {
                    iterateMenu.isActive = false
                }
                return iterateMenu;
            });
        }
        updateSideMenu(cloneSideMenu);
        routeUrl && navigate(routeUrl);
    }

    const renderSideMenu = () => {
        let render = <>{sideMenu.map((item, parentIndex) => <li key={parentIndex} className={`nav__list-item ${item.isActive && !(item.subMenu || []).length ? 'active' : null}`}>
            <div className="list-item__wrapper">
                {<a onClick={() => onMenuClickHandler(item.route, parentIndex)}>
                    <img src={`../../../../assets/icons/${item.icon1}`} className='menu-icon' width={'30px'} alt={item.label} />
                    {item.label}
                    {item.icon2&&<>{item.isActive ? <img src={`../../../../assets/icons/minus-side-menu.png`} width={'18px'} height={'28px'} className='list-item__plus' alt={item.label} /> :<img src={`../../../../assets/icons/${item.icon2}`} className='list-item__plus' alt={item.label} /> }</>}
                </a>}
            </div>
            {item.isActive && ((item.subMenu || []).length > 0) && <ul className="sublist active">
                {(item.subMenu).map((subData, childIndex) => (<li key={childIndex} onClick={() => onMenuClickHandler(subData.route, parentIndex, childIndex)} className={`sublist-item ${subData.clsName} ${subData.isActive ? 'active' : null}`}>
                    <div className={`list-item__wrapper`}>
                        <a>
                            {subData.label}
                        </a>
                    </div>
                </li>))
                }
            </ul>}
        </li>)}</>
        return render;
    };
    return (<>
                {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
                <aside className="aside-framework">
                    <div className="aside-framework__logo-container">
                        <a href="#">
                            <img src="../../../../assets/icons/esg_logo.png" alt="logo" className="aside-framework__logo" />
                        </a>

                        <div className='user-role-label'>{userRoleText}</div>
                    </div>
                    <nav className="aside-framework__nav">
                        <ul className="nav__list">
                            {renderSideMenu()}
                        </ul>
                    </nav>
                </aside>
                <main className="main">
                    <Header logoutHandler={() => logoutHandler()} userRole={userRole} />
                    {/* <Pagination /> */}
                    <Outlet />
                </main>
            </>
           )
}

export default CreateWizard;