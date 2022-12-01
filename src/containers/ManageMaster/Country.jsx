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
    const [doEdit, setDoEdit] = useState({});
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
            let response = {};
            if (!_isEmpty(doEdit)) {
                response = await axios.put(`${process.env.API_BASE_URL}/esgadmin/master/countries/${doEdit.id}`, { name: value }).then(({ data }) => data);
                setDoEdit({});
            } else {
                response = await axios.post(`${process.env.API_BASE_URL}/esgadmin/master/countries`, { name: value }).then(({ data }) => data);

            }
            getCountryList();
            setStatusData({ type: 'success', message: 'Thanks! Successfully created' });
        } catch (e) {
            let error = getErrorMessage(e);
            setStatusData({ ...error });
        }
    }

    const onCloseHandler = () => {

    }

    const onActive = async (val) => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.put(`${process.env.API_BASE_URL}/esgadmin/master/countries/${val.id}`, { ...val, is_active: true });
            getCountryList();
            setStatusData({ type: '', message: '' });
        } catch (e) {
            let error = getErrorMessage(e);
            setStatusData({ ...error });
        }
    }

    const onBlock = async (val) => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.put(`${process.env.API_BASE_URL}/esgadmin/master/countries/${val.id}`, { ...val, is_active: false });
            getCountryList();
            setStatusData({ type: '', message: '' });
        } catch (e) {
            let error = getErrorMessage(e);
            setStatusData({ ...error });
        }

    }


    const onEdit = (val) => {
        setDoEdit({ ...val });

    }

    const headers = ['Country', "Status",
        'Action'];

    return (<>
        <div class="main__top-wrapper">
            <h1 class="main__title">
                {'Manage Masters -> Country'}
            </h1>
        </div>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
        <AddMoreOption label={'Country'} isEdit={!_isEmpty(doEdit)} value={doEdit.name || ''} placeholder={"Enter the Country"} status={statusData.type} updateMoreOption={updateMoreOption} />
        <br />
        <div id="viewCountry" className="view-diclosuer-container">
            <MoreOptionTable onEdit={onEdit} onActive={onActive} onBlock={onBlock} isCountry={true} headers={headers} tableData={countryData.results} />
        </div>
        <br />

    </>)
}
export default ManageCountry;