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
import CreateFramework from './CreateFramework/CreateFramework.jsx';
import axios from 'axios';

const clientUserMenu = [{
    clsName: '',
    role: 'client',
    label: "Home",
    isActive: true,
    icon1: 'home-icon.svg',
    icon2: '',
    route: '/'
},
{
    clsName: '',
    role: 'client',
    label: "Manage Framework",
    isActive: false,
    icon1: 'frame-icon.svg',
    icon2: 'plus-icon.svg',
    subMenu: [{
        clsName: '',
        label: "Create Framework",
        isActive: false,
        route: '/createframe',
    },
    {
        clsName: '',
        label: "Manage Framework",
        isActive: false,
        route: '/manageframework',
    },
    {
        clsName: '',
        label: "Map Disclosures",
        isActive: false,
        route: '/createdisclosures',
    }]
},
{
    clsName: '',
    role: 'client',
    label: "Manage Client",
    isActive: false,
    icon1: 'client-icon.svg',
    icon2: '',
    route: '/manageclient'
},
{
    clsName: '',
    role: 'client',
    label: "Manage Users",
    isActive: false,
    icon1: 'users-icon.svg',
    icon2: '',
    route: '/manageusers'
}, {
    clsName: '',
    role: 'client',
    label: "Manage Masters",
    isActive: false,
    icon1: 'masters-icon.svg',
    icon2: '',
    route: '/managemasters'
},
{
    clsName: '',
    role: 'client',
    label: "System Settings",
    isActive: false,
    icon1: 'settings-icon.svg',
    icon2: 'plus-icon.svg',
    route: '/'
}]

const CreateWizard = () => {

    const navigate = useNavigate();
    const [sideMenu, updateSideMenu] = useState(clientUserMenu);
    const [statusData, setStatusData] = useState({});

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
                    <img src={`assets/icons/${item.icon1}`} className='menu-icon' alt={item.label} />
                    {item.label}
                    {item.icon2 && <img src={`assets/icons/${item.icon2}`} className='list-item__plus' alt={item.label} />}
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
                    <img src="assets/icons/esg_logo.png" alt="logo" className="aside-framework__logo" />
                </a>
            </div>
            <nav className="aside-framework__nav">
                <ul className="nav__list">
                    {renderSideMenu()}
                </ul>
            </nav>
        </aside>
        <main className="main">
            <Header />
            <Outlet />
        </main>
    </>)
}

export default CreateWizard;