import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Axios from 'axios';
import moment from 'moment';
import _get from 'lodash/get';
import Fields from '../../Components/Common/Fields/Fields.jsx';
import _isEmpty from 'lodash/isEmpty';
import Requests from '../../Requests/index.js';
import { getErrorMessage } from '../../utils/utils.js';

import './AddClientUser.css';
import Popup from '../../components/Common/Popup/Popup.jsx';

const { Input, TextArea, Pills, UploadFile, Button, InputBox, Label } = Fields;

const AddClientUser = () => {
  const navigate = useNavigate();
  const { state = {} } = useLocation();
  const { isEditable = false } = state || {};
  const { id = '' } = _get(state, 'userDetails', {});

  const [statusData, setStatusData] = useState({});
  const [inputValue, setInputValue] = useState({});
  const { orgDetails = {} } = useSelector((state) => state.signup);
  const [logo, setLogo] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [logoSizeError, setLogoSizeError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const validation = {};

  const onChangeHandler = (e) => {
    const { name, value = '' } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  useEffect(() => {
    if (!_isEmpty(state)) {
      const userDetails = state.userDetails;
      setInputValue({ ...userDetails });
      setLogo(userDetails.profile_picture);
      !_isEmpty(userDetails.profile_picture) && setUploadImage({ fileName: `avatar${Math.floor(Math.random() * 90 + 10)}.png`, imageUrl: userDetails.profile_picture });
    }
  }, []);

  const onSaveUser = async () => {
    if (
      !_isEmpty(
        inputValue.first_name &&
          inputValue.last_name &&
          inputValue.email_id &&
          inputValue.location &&
          inputValue.country &&
          inputValue.phone_number &&
          inputValue.department &&
          inputValue.designation
      )
    ) {
      setErrorMsg('');
      try {
        const form = new FormData();
        setStatusData({ type: 'loading', message: '' });
        form.append('first_name', inputValue.first_name);
        form.append('last_name', inputValue.last_name);
        form.append('email_id', inputValue.email_id);
        form.append('location', inputValue.location);
        form.append('country', inputValue.country);
        form.append('phone_number', inputValue.phone_number);
        form.append('department', inputValue.department);
        form.append('designation', inputValue.designation);
        form.append('role', inputValue.role);
        form.append('created_at', moment().format());
        form.append('updated_at', moment().format());
        if (!_isEmpty(uploadImage && uploadImage.fileName)) {
          form.append('profile_picture', _get(uploadImage, 'imageUrl', ''), uploadImage.fileName);
        } else if (uploadImage != null) {
          let blob = new Blob([logo], {
            type: 'application/pdf'
          });
          form.append('profile_picture', blob, uploadImage.fileName);
        }

        form.append('organization_name', orgDetails.name);
        let response = {};
        if (!isEditable) {
          response = await axios
            .post(`${process.env.API_BASE_URL}/users/?organization=${orgDetails.name}`, form, {
              headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(({ data }) => data);
        } else {
          response = await axios
            .put(`${process.env.API_BASE_URL}/users/${id}?organization=${orgDetails.name}`, form, {
              headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(({ data }) => data);
        }

        if (isEditable) {
          setStatusData({ type: 'success', message: 'Thanks! Successfully updated ' });
        } else {
          setStatusData({ type: 'success', message: 'Thanks! Successfully created' });
        }
      } catch (e) {
        let error = getErrorMessage(e);
        setStatusData({ ...error });
      }
    } else {
      if (_isEmpty(inputValue.first_name)) {
        setErrorMsg('Please fill first name');
      } else if (_isEmpty(inputValue.last_name)) {
        setErrorMsg('Please fill last name');
      } else if (_isEmpty(inputValue.email_id)) {
        setErrorMsg('Please fill email');
      } else if (_isEmpty(inputValue.phone_number)) {
        setErrorMsg('Please fill phone number');
      } else if (_isEmpty(inputValue.country)) {
        setErrorMsg('Please fill country name');
      } else if (_isEmpty(inputValue.location)) {
        setErrorMsg('Please fill location');
      } else if (_isEmpty(inputValue.designation)) {
        setErrorMsg('Please fill designation name');
      } else if (_isEmpty(inputValue.department)) {
        setErrorMsg('Please fill department name');
      }
    }
  };

  const onCloseHandler = () => {
    if (statusData.type === 'success') {
      navigate('/client/users');
    }
    setStatusData({});
  };

  const onChangeFile = (event) => {
    const imageUrl = event.target.files[0];
    const fileName = event.target.files[0].name;
    const fileSize = event.target.files[0].size / 1024 / 1024;
    if (fileSize < 1) {
      setLogo(URL.createObjectURL(imageUrl));
      if (imageUrl) {
        setUploadImage({ fileName, imageUrl });
      }
      setLogoSizeError(false);
    } else {
      setLogoSizeError(true);
    }
  };

  const onChangeRemoveFile = () => {
    setLogo('');
  };

  return (
    <>
      <div className='main__top-wrapper'>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
        {state ? <h1 className='main__title custom-title'>Update User</h1> : <h1 className='main__title custom-title'>Add User</h1>}
      </div>
      <div className='cli-add-main__content-wrapper content-wrapper m-0 my-4'>
        <div className='framework__col-wrapper'>
          <div className='Generate_report_head'>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <Label label={'First Name'} className={'Generate_h1_label'} required={true} />
                <input
                  value={inputValue.first_name}
                  error={validation['first_name']}
                  type='text'
                  name='first_name'
                  className='GenerateReport-framework__input'
                  placeholder='John'
                  required={true}
                  onChange={onChangeHandler}
                  maxLength={25}
                />
              </div>
            </div>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <Label label={'Last Name'} className={'Generate_h1_label'} required={true} />
                <input
                  value={inputValue.last_name}
                  error={validation['last_name']}
                  type='text'
                  name='last_name'
                  className='GenerateReport-framework__input'
                  placeholder='John'
                  required={true}
                  onChange={onChangeHandler}
                  maxLength={25}
                />
              </div>
            </div>
          </div>
          <div className='Generate_report_head'>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <Label label={'Email'} className={'Generate_h1_label'} required={true} />
                <input
                  value={inputValue.email_id}
                  error={validation['email_id']}
                  type='text'
                  name='email_id'
                  className='GenerateReport-framework__input'
                  placeholder='user@example.com'
                  required={true}
                  onChange={onChangeHandler}
                  maxLength={50}
                />
              </div>
            </div>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <Label label={'Phone'} className={'Generate_h1_label'} required={true} />
                <input
                  minLength={8}
                  maxLength={20}
                  value={inputValue.phone_number}
                  error={validation['phone_number']}
                  type='text'
                  name='phone_number'
                  className='GenerateReport-framework__input'
                  placeholder='+44235545'
                  required={true}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>
          <div className='Generate_report_head'>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <Label label={'Country'} className={'Generate_h1_label'} required={true} />
                <input
                  value={inputValue.country}
                  error={validation['country']}
                  type='text'
                  name='country'
                  className='GenerateReport-framework__input'
                  placeholder='United Kingdom'
                  required={true}
                  onChange={onChangeHandler}
                  maxLength={25}
                />
              </div>
            </div>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <Label label={'Location'} className={'Generate_h1_label'} required={true} />
                <input
                  value={inputValue.location}
                  error={validation['location']}
                  type='text'
                  name='location'
                  className='GenerateReport-framework__input'
                  placeholder='London'
                  required={true}
                  onChange={onChangeHandler}
                  maxLength={25}
                />
              </div>
            </div>
          </div>
          <div className='Generate_report_head'>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <Label label={'Designation'} className={'Generate_h1_label'} required={true} />
                <input
                  value={inputValue.designation}
                  error={validation['designation']}
                  type='text'
                  name='designation'
                  className='GenerateReport-framework__input'
                  placeholder='HR Manager'
                  required={true}
                  onChange={onChangeHandler}
                  maxLength={25}
                />
              </div>
            </div>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <Label label={'Department'} className={'Generate_h1_label'} required={true} />
                <input
                  value={inputValue.department}
                  error={validation['department']}
                  type='text'
                  name='department'
                  className='GenerateReport-framework__input'
                  placeholder='HR'
                  required={true}
                  onChange={onChangeHandler}
                  maxLength={25}
                />
              </div>
            </div>
          </div>
          <div className='Generate_report_head'>
            <div className='GenerateReport-framework__row'>
              <div className='GenerateReport_row'>
                <Label label={'Select Role'} className={'Generate_h1_label'} required={true} />
                <select name='role' id='form__role' value={inputValue.role} onChange={(e) => onChangeHandler(e)} className='acc-info__form-input m-0' required>
                  <option value=''>Select</option>
                  <option value='Administrator'>Administrator</option>
                  <option value='Reporter'>Reporter</option>
                </select>
              </div>
            </div>
            <div className='GenerateReport-framework__row'></div>
          </div>
        </div>
      </div>

      {errorMsg !== '' && (
        <div className=' text-center text-red-600'>
          <span className='color-red P-4'>*</span>
          {errorMsg}
        </div>
      )}
      <div className='buttons__panel'>
        <button
          className='buttons__panel-button'
          onClick={() => {
            navigate(`/client/users`);
          }}
        >
          CANCEL
        </button>
        {state ? (
          <button className='main__button' onClick={() => onSaveUser()}>
            Update
          </button>
        ) : (
          <button className='main__button' onClick={() => onSaveUser()}>
            Invite
          </button>
        )}
      </div>
    </>
  );
};
export default AddClientUser;
