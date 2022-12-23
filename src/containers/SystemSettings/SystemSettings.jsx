import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import MoreAction from '../ClientInfo/MoreAction.jsx';
import Popup from '../../components/Common/Popup/Popup.jsx';
import moment from 'moment';
import _get from 'lodash/get';
import { getErrorMessage } from '../../utils/utils';
import Fields from '../../Components/Common/Fields/Fields.jsx';
const { RadioButton, Button, Pills } = Fields;

import './SystemSettings.css';

const SystemSettings = (props) => {
  const navigate = useNavigate();

  const inputFields = { date_format: '', suspend_days: '', alert_days: '', vat_percentage: '', id: '' };
  const [inputValue, setInputValue] = useState({ ...inputFields });
  const [validation, setValidation] = useState(inputFields);
  const [clientData, setClientData] = useState({});
  const [statusData, setStatusData] = useState({});

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const navigateHome = () => {
    navigate('/');
  };

  const onCloseHandler = () => {
    setStatusData({ type: '', message: '' });
  };

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
          ...inputValue,
          ...response,
          date_format: response.date_format,
          suspend_days: response.suspend_days,
          alert_days: response.alert_days,
          vat_percentage: response.vat_percentage,
          id: response.id
        };
        setInputValue({ ...constractInputVal });
        setStatusData({ type: '', message: '' });
        setClientData(response);
      } catch (e) {
        setStatusData({ type: 'error', message: e.message });
      }
    };

    getSystemSettings();
  }, []);

  const onSaveHandler = async () => {
    if (inputValue && inputValue.suspend_days != '' && inputValue.alert_days != '' && inputValue.vat_percentage != '') {
      try {
        setStatusData({ type: 'loading', message: '' });
        const response = await axios.put(`${process.env.API_BASE_URL}/esgadmin/systemsettings/${inputValue.id}`, { ...inputValue }).then(({ data }) => data);
        const constractInputVal1 = {
          ...inputValue,
          ...response,
          date_format: response.date_format,
          suspend_days: response.suspend_days,
          alert_days: response.alert_days,
          vat_percentage: response.vat_percentage,
          id: response.id
        };
        setInputValue({ ...constractInputVal1 });
        setStatusData({ type: 'success', message: 'Thanks! System Settings has been successfully created/updated' });
      } catch (e) {
        let error = getErrorMessage(e);
        setStatusData({ type: 'error', message: 'Please provide valid inputs' });
      }
    } else {
      setStatusData({ type: 'error', message: 'Please fill all fields' });
    }
  };

  // const maxLengthCheck = (object) => {
  //   if (object.target.value.length > object.target.maxLength) {
  //     object.target.value = object.target.value.slice(0, object.target.maxLength);
  //   }
  // };

  return (
    <>
      {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
      <div className='main__top-wrapper'>
        <h1 className='main__title custom-title'>System Settings</h1>
      </div>

      <div className='client-main__content-wrapper content-wrapper scrollable'>
        {/* <div className="framework__row-wrapper bot20">
                    <div className="GenerateReport_row">
                        <h1 className="Generate_h1_label"><b>Date format</b></h1>
                        <input type="text" className="framework__input"  name='date_format' required defaultValue={inputValue.date_format} onChange={onChangeHandler} />
                        <span className="Generate_h1_label_span"></span>
                    </div>
                </div> */}

        <div className='framework__row-wrapper bot20'>
          <div className='GenerateReport_row'>
            <h1 className='Generate_h1_label textwrap'>
              <b>Suspend account after X days if not renewed</b>
              <span className='color-red p-4'>*</span>
            </h1>
            <input
              type='number'
              // onInput={maxLengthCheck}
              maxLength={2}
              className='framework__input'
              min='0'
              name='suspend_days'
              required
              defaultValue={inputValue.suspend_days}
              onChange={onChangeHandler}
            />
            <span className='Generate_h1_label_span'>days</span>
          </div>
        </div>

        <div className='framework__row-wrapper bot20'>
          <div className='GenerateReport_row'>
            <h1 className='Generate_h1_label textwrap'>
              <b>Alert notification to be send to the client before</b>
              <span className='color-red p-4'>*</span>
            </h1>
            <input type='number' className='framework__input' min='0' name='alert_days' required defaultValue={inputValue.alert_days} onChange={onChangeHandler} />
            <span className='Generate_h1_label_span'>days</span>
          </div>
        </div>

        <div className='framework__row-wrapper bot20'>
          <div className='GenerateReport_row'>
            <h1 className='Generate_h1_label'>
              <b>VAT%</b>
              <span className='color-red P-4'>*</span>
            </h1>
            <input
              type='number'
              maxLength={2}
              // onInput={maxLengthCheck}
              className='framework__input'
              min='0'
              name='vat_percentage'
              required
              defaultValue={inputValue.vat_percentage}
              onChange={(e) => onChangeHandler(e)}
            />
            <span className='Generate_h1_label_span'></span>
          </div>
        </div>
      </div>

      <Button label='SAVE' onClickHandler={onSaveHandler} className='main__button map-disc-main-btn' />

      {/* <div className="buttons__panel">

 <Button label='BACK' onClickHandler={navigateHome} className='buttons__panel-button' />  

 


<Button label='SAVE' onClickHandler={onSaveHandler} className='main__button map-disc-main-btn' />
</div> */}
    </>
  );
};
export default SystemSettings;
