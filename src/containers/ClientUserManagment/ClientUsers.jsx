import React, { useState, useEffect } from "react";
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
                const response = await axios.get(`${process.env.API_BASE_URL}/users/?organization=`+orgDetails.name).then(({ data }) => data);
                setStatusData({ type: '', message: '' });
                setClientData(response);
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
        }

        getClientUsers();
    }, []);
   
    const headers = ['First Name',
    'Last Name',
    'Contact Number',
    'Emil Id',
    'Country',
    'Location',
    'Designation',
    'Department',
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

            <table className="default-flex-table">

                <thead>
                        <tr>
                            {headers.map(header => <th>{header}</th>)}
                        </tr>
                </thead>
                <tbody>
                            {(clientData.results || []).map((val, index) => {
                                return (<tr>
                            
                                    <td>{val.first_name}</td>
                                    <td>{val.last_name}</td>
                                    <td>{val.phone_number}</td>
                                    <td>{val.email_id}</td>
                                    <td>{val.country}</td>
                                    <td>{val.location}</td>
                                    <td>{val.designation}</td>
                                    <td>{val.department}</td>
                                    <td>{val.status}</td>
                                    <td>
                                    <ClientUserAction value={val} index={index}/> 
                                        {/* <img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /> */}
                                    </td>
                                </tr>)
                            })}
                </tbody>
            </table>
           
 

    </>)
}
export default ClientUsers;