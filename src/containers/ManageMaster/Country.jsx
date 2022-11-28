import React, { useState, useEffect } from "react";
import './Country.css'
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import CountryAction from "./CountryAction.jsx";
import Popup from "../../components/Common/Popup/Popup.jsx";
import moment from 'moment';
import _get from 'lodash/get';
import { getErrorMessage } from "../../utils/utils";
import AddMoreOption from "../../Components/AddMoreOption/AddMoreOption.jsx";
import MoreOptionTable from "../../Components/MoreOptionTable/MoreOptionTable.jsx";

import './ManageMaster.css';

const ManageCountry = (props) => {
    const navigate = useNavigate();
    const [countryData, setCountryData] = useState({});
    const [statusData, setStatusData] = useState({});
    useEffect(() => {
        getCountryList();
    }, []);

    const getCountryList = async () => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/master/countries`).then(({ data }) => data);
            setStatusData({ type: '', message: '' });
            setCountryData(response);
        } catch (e) {
            setStatusData({ type: 'error', message: e.message });
        }
    }

    const updateMoreOption = async (value) => {
        try {
            const response = await axios.post(`${process.env.API_BASE_URL}/esgadmin/master/countries`, { name: value }).then(({ data }) => data);
            getCountryList();
            setStatusData({ type: 'success', message: 'Thanks! Successfully created' });
        } catch (e) {
            let error = getErrorMessage(e);
            setStatusData({ ...error });
        }
    }

    const onCloseHandler = () => {

    }

    const headers = ['Country',
        'Action'];

    return (<>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
        <AddMoreOption label={'Country'} placeholder={"Enter the Country"} status={statusData.type} updateMoreOption={updateMoreOption} />
        <br />
        <div id="viewCountry" className="view-diclosuer-container">
            <MoreOptionTable headers={headers} tableData={countryData.results} />
        </div>
        <br />

    </>)
}
export default ManageCountry;