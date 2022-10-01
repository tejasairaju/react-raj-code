import React, { useState, useEffect } from "react";
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import CountryAction from "./CountryAction.jsx";
import moment from 'moment';
import _get from 'lodash/get';
 


import './ManageMaster.css';

const ManageCategory = (props) => {
    const navigate = useNavigate();


    const [countryData, setCountryData] = useState({});
    const [statusData, setStatusData] = useState({});
    useEffect(() => {
        const getFramework = async () => {
            try {
                setStatusData({ type: 'loading', message: '' });
                const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/master/disclosure-categories`).then(({ data }) => data);
                setStatusData({ type: '', message: '' });
                setCountryData(response);
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
        }

        getFramework();
    }, []);

    const headers = ['Category',
    'Action'];

    return (<>
             <div class="main__top-wrapper">
                <h1 class="main__title">
                    Category
                </h1>

                <div class="user_input_block null">
                    <input type="text" name="name" class="country__text__box"
                     placeholder="Social" required="" value="" />

                     </div>

                <button class="main__button">
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
                        {(countryData.results || []).map((val, index) => {
                            return (<tr>
                                 
                                <td>{val.name}</td>
 
                                <td>
                                <CountryAction value={val} index={index}/>
                                    {/* <img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /> */}
                                </td>
                            </tr>)
                        })}
                    </tbody>
            </table>

            <br/>

    </>)
}
export default ManageCategory;