import React, { useState, useEffect } from "react";
import _toLower from 'lodash/toLower';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import ClientUserAction from './MoreAction.jsx';
import AddClientUser from './AddClientUser.jsx';
import moment from 'moment';
import _get from 'lodash/get';
import Requests from "../../Requests/index.js";
import './ClientUsers.css';

const ClientUsers = () => {

    const navigate = useNavigate();


    const [clientData, setClientData] = useState({});
    const [statusData, setStatusData] = useState({});
    const { orgDetails = {} } = useSelector(state => state.signup);
    useEffect(() => {
        const getClientUsers = async () => {
            try {
                setStatusData({ type: 'loading', message: '' });
                const response = await Requests.Get(`/users/`, {organization: orgDetails.name});
                setStatusData({ type: '', message: '' });
                setClientData(response);
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
        }

        getClientUsers();
    }, []);
   
    const headers = ['Username',
    'Location',
    'Email iD',
    'Phone Number',
    'Designation',
    'Department',
    'Role',
    'Status',
    'Action'];

    return (<> 
 
            <div class="main__top-wrapper">
                <h1 class="main__title">
                    Manage User
                </h1>
                <a type="submit" class="form__btn main__button" onClick={() => { navigate(`/client/users/invite`) }}>
                    ADD
                </a>
            </div>
            <br/>

            <table className="default-flex-table table-scroll">

                <thead>
                        <tr>
                            {headers.map(header => <th>{header}</th>)}
                        </tr>
                </thead>
                <tbody>
                            {(clientData.results || []).map((val, index) => {
                                if(_toLower(val.role) !== 'admin') {
                                return (<tr>
                                    <td>{val.first_name}</td>
                                    <td>{val.location}</td>
                                    <td>{val.email_id}</td>
                                    <td>{val.phone_number}</td>
                                    <td>{val.designation}</td>
                                    <td>{val.department}</td>
                                    <td>{val.role}</td>
                                    <td>{val.status}</td>
                                    <td>
                                    <ClientUserAction value={val} index={index}/> 
                                        {/* <img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /> */}
                                    </td>
                                </tr>)
                                }
                            })}
                </tbody>
            </table>
           
 

    </>)
}
export default ClientUsers;