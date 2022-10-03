import React, { useState, useEffect } from "react";
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import AdminAction from "./AdminAction.jsx";
import moment from 'moment';
import _get from 'lodash/get';
 

const ESGAdmin = (props) => {
    const navigate = useNavigate();


    const [clientData, setClientData] = useState({});
    const [statusData, setStatusData] = useState({});
    useEffect(() => {
        const getFramework = async () => {
            try {
                setStatusData({ type: 'loading', message: '' });
                const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/administrators`).then(({ data }) => data);
                setStatusData({ type: '', message: '' });
                setClientData(response);
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
        }

        getFramework();
    }, []);



    const headers = ['First Name',
    'Last Name',
    'Contact Number',
    'Emil Id',
    'Action'];

    return (<>

            <div class="main__top-wrapper">
                <h1 class="main__title">
                    ESG Admin User Info
                </h1>
                <button class="main__button" onClick={() => { navigate(`/adminuser/create`) }}>
                    ADD
                </button>
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
                                <td>
                                <AdminAction value={val} index={index}/>
                                    {/* <img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /> */}
                                </td>
                            </tr>)
                        })}
                    </tbody>
            </table>
             
            

    </>)
}
export default ESGAdmin;