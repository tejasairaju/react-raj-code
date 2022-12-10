import React, { useState, useEffect } from "react";
import _toLower from 'lodash/toLower';
import _toUpper from 'lodash/toUpper';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import AdminAction from "./AdminAction.jsx";
import ESGManageUserAction from './ESGManageUserAction.jsx';
// import ClientUserAction from './MoreAction.jsx';
// import AddClientUser from './AddClientUser.jsx';
import moment from 'moment';
import _get from 'lodash/get';
import Requests from "../../Requests/index.js";
// import './ClientUsers.css';
import { getProfilePhoto } from "../../utils/utils.js";
import './ESGAdminUserOnboard.css';

const ESGManageUser = () => {

    const navigate = useNavigate();


    const [clientData, setClientData] = useState({});
    const [statusData, setStatusData] = useState({});
    const { orgDetails = {} } = useSelector(state => state.signup);
    useEffect(() => {
        getClientUsers();
    }, []);

    const getClientUsers = async () => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await Requests.Get(`/esgadmin/administrators`);
            setStatusData({ type: '', message: '' });
            setClientData(response);
        } catch (e) {
            setStatusData({ type: 'error', message: e.message });
        }
    }

    // const getProfilePhoto = (val) => {
    //     if (!_isEmpty(val.profile_picture)) return <img src={val.profile_picture} width='40px' height={'40px'} alt="" />;
    //     else {
    //         return <div className="profile-image-icon">{_toUpper((val&&val.first_name).charAt(0))} {_toUpper((val&&val.last_name).charAt(0))}</div>}

    // }

    const headers = ['Image', 'Username',
        'Location',
        'Email iD',
        'Phone Number',
        'Designation',
        // 'Department',
        'Role',
        'Status',
        'Action'];

    return (<>

        <div class="main__top-wrapper">
            <h1 class="main__title custom-title">
            Manage Users
            </h1>
            <a type="submit" class="form__btn main__button" onClick={() => { navigate(`/esg/users/invite`) }}>
                ADD
            </a>
        </div>
        <br />

        <table className="default-flex-table table-scroll client-admin-manage-user">

            <thead>
                <tr>
                    {headers.map(header => <th>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {(clientData.results || []).map((val, index) => {
                    if (_toLower(val.role) !== 'admin') {
                        return (<tr>
                            {/* <td>{getProfilePhoto(val)}</td> */}
                            <td><div class="row__item-img">
                                <div class="client__edit">
                                    {getProfilePhoto(val)}
                                </div>
                                <a  class="edit__avatar" onClick={() => { navigate(`/esg/users/invite`, {state: {userDetails: val, isEditable: true}}) }}>
                                 
                                    EDIT
                                </a>
                            </div></td>
                            <td>{val.first_name}</td>
                            <td>{val.location}</td>
                            <td>{val.email_id}</td>
                            <td>{val.phone_number}</td>
                            <td>{val.designation}</td>
                            {/* <td>{val.department}</td> */}
                            <td>{(val.role=="Administrator")?"Admin":val.role}</td>
                            <td>{val.status}</td>
                            <td>
                            <ESGManageUserAction getClientUsers={getClientUsers} value={val} index={index}/>
                            {/* <AdminAction value={val} index={index} /> */}
                                {/* <ClientUserAction getClientUsers={getClientUsers} value={val} index={index} /> */}
                                {/* <img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /> */}
                            </td>
                        </tr>)
                    }
                })}
            </tbody>
        </table>



    </>)
}
export default ESGManageUser;