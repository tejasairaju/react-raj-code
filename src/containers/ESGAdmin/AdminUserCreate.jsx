import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import _get from 'lodash/get';
import Fields from '../../Components/Common/Fields/Fields.jsx';

const { Input, TextArea, Pills, UploadFile, Button } = Fields;

import './ESGAdminUserOnboard.css';

const ESGAdminUserOnboard = (props) => {
  const navigate = useNavigate();
  const { state = {} } = useLocation();
  const { isEditable = false, adminUserDetails = {} } = state || {};

  const [statusData, setStatusData] = useState({});
  const [inputValue, setInputValue] = useState({});

  const validation = {};
  const onChangeFile = (event) => {
    const imageUrl = event.target.files[0];
    const fileName = event.target.files[0].name;
    setLogo(URL.createObjectURL(imageUrl));
    if (imageUrl) {
      setUploadImage({ fileName, imageUrl });
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  
  useEffect(() => {
    if (isEditable) {
      setInputValue({
        first_name: adminUserDetails.first_name,
        last_name: adminUserDetails.last_name,
        email_id: adminUserDetails.email_id,
        phone_number: adminUserDetails.phone_number
      });
    }
  }, []);

  const onChangeRemoveFile = () => {
    setLogo(null);
  };

  const onSaveCustomer = async () => {
    try {
      const url = isEditable ? `${process.env.API_BASE_URL}/esgadmin/administrators/${adminUserDetails.id}` : `${process.env.API_BASE_URL}/esgadmin/administrators`;
      const response = await axios
        .post(url, { first_name: inputValue.first_name, last_name: inputValue.last_name, email_id: inputValue.email_id, phone_number: inputValue.phone_number })
        .then(({ data }) => data);
      navigate(`/adminuser`);
      setStatusData({ type: 'success', message: 'Thanks! Successfully created' });
    } catch (e) {
      setStatusData({ type: 'error', message: e.message });
    }
  };

  return (
    <>
      <div className='main__top-wrapper'>
        {isEditable && <h1 className='main__title'>Admin User {'->'} Edit</h1>}
        {!isEditable && <h1 className='main__title'>Admin User {'->'} Onboard</h1>}
      </div>

      <div className='main__content-wrapper'>
        <Input
          inputblockcls={`user_input_block ${_get(validation, 'first_name', false) ? 'user_input_error' : null}`}
          error={validation['first_name']}
          label={'First Name'}
          type='text'
          name='first_name'
          value={inputValue.first_name}
          className='create-framework__input'
          placeholder='John'
          required={true}
          onChangeHandler={onChangeHandler}
        />

        <Input
          inputblockcls={`user_input_block ${_get(validation, 'last_name', false) ? 'user_input_error' : null}`}
          error={validation['last_name']}
          label={'Last Name'}
          type='text'
          name='last_name'
          className='create-framework__input'
          value={inputValue.last_name}
          placeholder='Victor'
          required={true}
          onChangeHandler={onChangeHandler}
        />

        <Input
          inputblockcls={`user_input_block ${_get(validation, 'email_id', false) ? 'user_input_error' : null}`}
          error={validation['email_id']}
          label={'Email'}
          type='text'
          name='email_id'
          value={inputValue.email_id}
          className='create-framework__input'
          placeholder='demo@esg-disclose.com'
          required={true}
          onChangeHandler={onChangeHandler}
        />

        <Input
          inputblockcls={`user_input_block ${_get(validation, 'phone_number', false) ? 'user_input_error' : null}`}
          error={validation['phone_number']}
          label={'Phone Number'}
          type='text'
          name='phone_number'
          value={inputValue.phone_number}
          className='create-framework__input'
          placeholder='+1 2236544'
          required={true}
          onChangeHandler={onChangeHandler}
        />
      </div>

      <div className='buttons__panel'>
        <button
          className='buttons__panel-button'
          onClick={() => {
            navigate(`/adminuser`);
          }}
        >
          CANCEL
        </button>
        <button className='main__button' onClick={() => onSaveCustomer()}>
          SAVE
        </button>
      </div>
    </>
  );
};

export default ESGAdminUserOnboard;
