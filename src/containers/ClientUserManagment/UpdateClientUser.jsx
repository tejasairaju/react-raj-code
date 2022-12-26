import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Axios from 'axios';
import moment from 'moment';
import _get from 'lodash/get';
import Requests from '../../Requests/index.js';
import Fields from '../../Components/Common/Fields/Fields.jsx';

const { Input, TextArea, Pills, UploadFile, Button, InputBox } = Fields;

import './AddClientUser.css';

const UpdateClientUser = () => {
  const navigate = useNavigate();

  const [statusData, setStatusData] = useState({});
  const [inputValue, setInputValue] = useState({});
  const { orgDetails = {} } = useSelector((state) => state.signup);

  useEffect(() => {
    const getClientUsers = async () => {
      try {
        setStatusData({ type: 'loading', message: '' });
        const response = await Requests.Get(`/users/`, { organization: orgDetails.name });
        setStatusData({ type: '', message: '' });
        setClientData(response);
      } catch (e) {
        setStatusData({ type: 'error', message: e.message });
      }
    };

    getClientUsers();
  }, []);

  const validation = {};

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const onChangeRemoveFile = () => {
    setLogo(null);
  };

  const onSaveUser = async () => {
    try {
      const response = await Requests.Post(
        `/users/`,
        {
          first_name: inputValue.first_name,
          last_name: inputValue.last_name,
          email_id: inputValue.email_id,
          location: inputValue.location,
          country: inputValue.country,
          phone_number: inputValue.phone_number,
          department: inputValue.department,
          designation: inputValue.designation,
          organization_name: orgDetails.name
        },
        { organization: orgDetails.name }
      );
      navigate('/client/users');
      setStatusData({ type: 'success', message: 'Thanks! Successfully created' });
    } catch (e) {
      setStatusData({ type: 'error', message: e.message });
    }
  };

  return (
    <>
      <div className='main__top-wrapper'>
        <h1 className='main__title'>On-board User</h1>
      </div>

      <div className='main__content-wrapper content-wrapper'>
        <div className='framework__col-wrapper'>
          <div className='Generate_report_head'>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <h1 className='Generate_h1_label'>First Name</h1>
                <input
                  error={validation['first_name']}
                  type='text'
                  name='first_name'
                  className='GenerateReport-framework__input'
                  placeholder='John'
                  required={true}
                  onChangeHandler={onChangeHandler}
                />
              </div>
            </div>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <h1 className='Generate_h1_label'>Last Name</h1>
                <input
                  error={validation['last_name']}
                  type='text'
                  name='last_name'
                  className='GenerateReport-framework__input'
                  placeholder='John'
                  required={true}
                  onChangeHandler={onChangeHandler}
                />
              </div>
            </div>
          </div>
          <div className='Generate_report_head'>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <h1 className='Generate_h1_label'>Email</h1>
                <input
                  error={validation['email_id']}
                  type='text'
                  name='email_id'
                  className='GenerateReport-framework__input'
                  placeholder='user@example.com'
                  required={true}
                  onChangeHandler={onChangeHandler}
                />
              </div>
            </div>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <h1 className='Generate_h1_label'>Phone</h1>
                <input
                  error={validation['phone_number']}
                  type='text'
                  name='phone_number'
                  className='GenerateReport-framework__input'
                  placeholder='+44235545'
                  required={true}
                  onChangeHandler={onChangeHandler}
                />
              </div>
            </div>
          </div>
          <div className='Generate_report_head'>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <h1 className='Generate_h1_label'>Country</h1>
                <input
                  error={validation['country']}
                  type='text'
                  name='country'
                  className='GenerateReport-framework__input'
                  placeholder='United Kingdom'
                  required={true}
                  onChangeHandler={onChangeHandler}
                />
              </div>
            </div>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <h1 className='Generate_h1_label'>Location</h1>
                <input
                  error={validation['location']}
                  type='text'
                  name='location'
                  className='GenerateReport-framework__input'
                  placeholder='London'
                  required={true}
                  onChangeHandler={onChangeHandler}
                />
              </div>
            </div>
          </div>
          <div className='Generate_report_head'>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <h1 className='Generate_h1_label'>Designation</h1>
                <input
                  error={validation['designation']}
                  type='text'
                  name='designation'
                  className='GenerateReport-framework__input'
                  placeholder='HR Manager'
                  required={true}
                  onChangeHandler={onChangeHandler}
                />
              </div>
            </div>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <h1 className='Generate_h1_label'>Department</h1>
                <input
                  error={validation['department']}
                  type='text'
                  name='department'
                  className='GenerateReport-framework__input'
                  placeholder='HR'
                  required={true}
                  onChangeHandler={onChangeHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='buttons__panel'>
        <button
          className='buttons__panel-button'
          onClick={() => {
            navigate(`/client/users`);
          }}
        >
          CANCEL
        </button>
        <button className='main__button' onClick={() => onSaveUser()}>
          Invite
        </button>
      </div>
    </>
  );
};
export default UpdateClientUser;
