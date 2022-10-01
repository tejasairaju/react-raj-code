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

import './ManageMaster.css';

const Category = (props) => {
    const navigate = useNavigate();


    const [countryData, setCountryData] = useState({});
    const [statusData, setStatusData] = useState({});
    const [country, setCountry] = useState({});
    const [inputValue, setInputValue] = useState({});
    useEffect(() => {
        getFramework();
    }, []);

    const addMoreoptions = async (e) => {
        const { name, value } = e.target;
        inputValue[name] = value;
    }

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

    const updateMoreOption = async () => {
        try {
            const response = await axios.post(`${process.env.API_BASE_URL}/esgadmin/master/disclosure-categories`, { name: inputValue.category }).then(({ data }) => data);
            getFramework();
            setStatusData({ type: 'success', message: 'Thanks! Successfully created' });
        } catch (e) {
            setStatusData({ type: 'error', message: e.message });
        }
    }

    const onCloseHandler = () => {

    }

    const headers = ['Category',
        'Action'];

    return (<>
        <div class="main__top-wrapper">
            {/* <h1 class="main__title">
                    Country
                </h1> */}
            {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
            <div class="user_input_text flex flex-column">
                <h1 class="main__title">
                    Country
                </h1>
                <input type="text" name="category" class="country__text__box"
                    placeholder="Enter the Category"
                    value={inputValue.category}
                    onChange={addMoreoptions}
                />
                {/* <Input /> */}
                {/* <Input inputblockcls={`user_input_block ${_get(validation, 'name', false) ? 'user_input_error' : null}`} error={validation['name']} label={'Name'} type="text" name='name' value={inputValue.name || ''} className="create-framework__input" placeholder="GRI" required={true} onChangeHandler={onChangeHandler} /> */}

            </div>

            <button class="main__button" onClick={() => updateMoreOption()}>
                ADD
            </button>
        </div>

        <br />
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
                            <CountryAction value={val} index={index} />
                            {/* <img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /> */}
                        </td>
                    </tr>)
                })}
            </tbody>
        </table>

        <br />

    </>)
}
export default Category;