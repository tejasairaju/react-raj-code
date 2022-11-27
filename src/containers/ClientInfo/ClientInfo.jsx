import React, { useState, useEffect } from "react";
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import MoreAction from "./MoreAction.jsx";
import moment from 'moment';
import _get from 'lodash/get';



import './ClientInfo.css';

const ClientInfo = (props) => {
    const navigate = useNavigate();


    const [clientData, setClientData] = useState({});
    const [statusData, setStatusData] = useState({});
    useEffect(() => {
        const getFramework = async () => {
            try {
                setStatusData({ type: 'loading', message: '' });
                const response = await axios.get(`${process.env.API_BASE_URL}/organizations/`).then(({ data }) => data);
                setStatusData({ type: '', message: '' });
                setClientData(response);
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
        }

        getFramework();
    }, []);



    const headers = ['Logo',
        'Organisation',
        'Location',
        'Client admin',
        'Package',
        'License',
        'Users',
        'Status',
        'Action'];

    return (<>

        <div class="main__top-wrapper">
            <h1 class="main__title">
                Client Info
            </h1>
            <button class="main__button" onClick={() => { navigate(`/customeronboardbyadmin`) }}>
                ADD
            </button>
        </div>
        <br />
        <div className="client-info-list-container">
            <table className="default-flex-table">

                <thead>
                    <tr>
                        {headers.map(header => <th>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {(clientData.results || []).map((val, index) => {
                        return (<tr>
                            <td><img src={val.logo} alt="logo" width='28px' height='28px' /></td>
                            <td><div className="word-text-break">{val.name}</div></td>

                            <td>{val.headquarters}</td>

                            <td><div className="word-text-break">{val.name}</div></td>
                            <td>Silver</td>
                            <td> </td>
                            <td>5</td>
                            <td>{val.status}</td>
                            <td>
                                <MoreAction value={val} index={index} />
                                {/* <img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /> */}
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>



    </>)
}
export default ClientInfo;