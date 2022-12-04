import React, { useState, useEffect } from "react";
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import MoreAction from "../ClientInfo/MoreAction.jsx";
import moment from 'moment';
import _get from 'lodash/get';
import { getErrorMessage } from "../../utils/utils";


import './SystemSettings.css';

const SystemSettings = (props) => {
    const navigate = useNavigate();

    const inputFields = { date_format: "", suspend_days: "", alert_days: "", vat_percentage: "", id:""}
    const [inputValue, setInputValue] = useState(inputFields);
    const [validation, setValidation] = useState(inputFields);
    const [clientData, setClientData] = useState({});
    const [statusData, setStatusData] = useState({});
    

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue,  [name]: value });
    }

    
    useEffect(() => {
        const getSystemSettings = async () => {
            try {
                setStatusData({ type: 'loading', message: '' });
                const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/systemsettings`).then(({ data }) => data.results[0]);
                // inputValue.date_format = response.id;
                // inputValue.suspend_days = response.suspend_days;
                // inputValue.notification_days = response.notification_days;
                // inputValue.vat = response.vat;
                const constractInputVal = {
                    ...inputValue, ...response, date_format: response.date_format,
                    suspend_days: response.suspend_days,
                    alert_days: response.alert_days,
                    vat_percentage: response.vat_percentage,
                    id: response.id
                };
                setInputValue({...constractInputVal});
                setStatusData({ type: '', message: '' });
                setClientData(response);
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
        }

        getSystemSettings();
    }, []);
    const onSaveHandler = async () => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.put(`${process.env.API_BASE_URL}/esgadmin/systemsettings/${inputValue.id}`, {...inputValue}).then(({ data }) => data);
            const constractInputVal1 = {
                ...inputValue, ...response, date_format: response.date_format,
                suspend_days: response.suspend_days,
                alert_days: response.alert_days,
                vat_percentage: response.vat_percentage,
                id: response.id
            };
            setInputValue({...constractInputVal1});
            setStatusData({ type: 'success', message: 'Thanks! System Settings has been successfully created' });
        } catch (e) {
            let error = getErrorMessage(e);
            setStatusData({ ...error });
        }
    }



    return (<>
            <div class="main__top-wrapper">
                <h1 class="main__title">
                    System Settings
                </h1>
            </div>

            <div class="client-main__content-wrapper content-wrapper scrollable">

                <div class="framework__row-wrapper bot20">
                    <div class="GenerateReport_row">
                        <h1 class="Generate_h1_label"><b>Date format</b></h1>
                        <input type="text" class="framework__input"  name='date_format' required defaultValue={inputValue.date_format} onChange={onChangeHandler} />
                        <span class="Generate_h1_label_span"></span>
                    </div>
                </div>

                <div class="framework__row-wrapper bot20">
                    <div class="GenerateReport_row">
                        <h1 class="Generate_h1_label textwrap"><b>Suspend account after X days if not renewed</b></h1>
                        <input type="number" class="framework__input" min="0" name='suspend_days'  required defaultValue={inputValue.suspend_days} onChange={onChangeHandler}  />
                        <span class="Generate_h1_label_span">days</span>
                    </div>
                </div>

                <div class="framework__row-wrapper bot20">
                    <div class="GenerateReport_row">
                        <h1 class="Generate_h1_label textwrap"><b>Alert notification to be send to the client before</b></h1>
                        <input type="number" class="framework__input" min="0" name="alert_days" required defaultValue={inputValue.alert_days} onChange={onChangeHandler}  />
                        <span class="Generate_h1_label_span">days</span>
                    </div>
                </div>

                <div class="framework__row-wrapper bot20">
                    <div class="GenerateReport_row">
                        <h1 class="Generate_h1_label"><b>VAT%</b></h1>
                        <input type="number" class="framework__input" min="0" name="vat_percentage" required defaultValue={inputValue.vat_percentage} onChange={onChangeHandler}  />
                        <span class="Generate_h1_label_span"></span>
                    </div>
                </div>

            </div>
            
            <button class="main__button" onClick={() => onSaveHandler()}>
                SAVE
            </button>
    </>)
}
export default SystemSettings;