import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Axios from 'axios';
import moment from 'moment';
import _get from 'lodash/get';
import Fields from '../../Components/Common/Fields/Fields.jsx';
import _isEmpty from 'lodash/isEmpty';
import Requests from "../../Requests/index.js";
import { getErrorMessage } from "../../utils/utils.js";


// import './AddClientUser.css';
import Popup from "../../components/Common/Popup/Popup.jsx";

const { Input, TextArea, Pills, UploadFile, Button, InputBox } = Fields;

const AddESGManageUser = () => {

    const navigate = useNavigate();
    const { state = {} } = useLocation();
    const { isEditable = false, isView = false } = state || {};
    const { id = "" } = _get(state, 'userDetails', {});

    const [statusData, setStatusData] = useState({});
    const [inputValue, setInputValue] = useState({});
    const { orgDetails = {} } = useSelector(state => state.signup);
    const [logo, setLogo] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [error, setError] = useState('');
    const validation = {};

    const onChangeHandler = (e) => {
        console.log(e.target);
        const { name, value = '' } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    }



    useEffect(() => {

        if (!_isEmpty(state)) {
            const userDetails = state.userDetails;
            setInputValue({ ...userDetails });
            setLogo(userDetails.profile_picture);
            !_isEmpty(userDetails.profile_picture) && setUploadImage({ fileName: `avatar${Math.floor(Math.random() * 90 + 10)}.png`, imageUrl: userDetails.profile_picture });

        }

    }, []);

    const emailValidation = (val) => {
        return /\S+@\S+\.\S+/.test(val)
    }

    const onSaveUser = async () => {
        if (!_isEmpty(inputValue) && inputValue.first_name && emailValidation(inputValue.email_id) && inputValue.last_name && inputValue.phone_number) {
            try {
                let response = {};
                if (!isEditable) {
                    response = await axios.post(`${process.env.API_BASE_URL}/esgadmin/administrators`, { ...inputValue }, {
                        headers: { "Content-Type": "multipart/form-data" }
                    }).then(({ data }) => data);
                } else {
                    response = await axios.put(`${process.env.API_BASE_URL}/esgadmin/administrators/${id}`, { ...inputValue }, {
                        headers: { "Content-Type": "multipart/form-data" }
                    }).then(({ data }) => data);
                }

                setStatusData({ type: 'success', message: `Thanks! Successfully ${!_isEmpty(state) ? "updated" : 'created'}` });

            } catch (e) {
                let error = getErrorMessage(e);
                setStatusData({ ...error });
            }
            setError('');
        } else {
            if (_isEmpty(inputValue.first_name)) {
                setError('Please enter first name.');
            } else if (_isEmpty(inputValue.last_name)) {
                setError('Please enter last name.');
            } else if (!emailValidation(inputValue.email_id)) {
                setError('Please Provide vaild Email id');
            } else if (_isEmpty(inputValue.phone_number)) {
                setError('Please enter phone number.');
            }

        }
    }

    const onCloseHandler = () => {
        if (statusData.type === 'success') {
            navigate('/adminuser');

        }
        setStatusData({});
    }

    const onChangeFile = (event) => {
        const imageUrl = event.target.files[0];
        const fileName = event.target.files[0].name;
        setLogo(URL.createObjectURL(imageUrl));
        if (imageUrl) {
            setUploadImage({ fileName, imageUrl });
        }
    }

    const onChangeRemoveFile = () => {
        setLogo('');
    }

    return (<>
        <div class="main__top-wrapper">
            {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
            {state && isEditable ?
                <h1 class="main__title">
                    {'Manage Users -> Edit User'}
                </h1> :
                <h1 class="main__title">
                    {'Manage Users -> Add User'}
                </h1>
            }
        </div>

        <div class="cli-add-main__content-wrapper content-wrapper">
            <div class="framework__col-wrapper">
                {/* <div class="Generate_report_head align-center">
                    <UploadFile imgcls={'org-image-size'} label='Photo' imageUrl={logo} onChangeFile={onChangeFile} onChangeRemoveFile={onChangeRemoveFile} required={false} />
                    <div class="framework__row"></div>
                    <div class="framework__row"></div>
                </div> */}

                <div class="Generate_report_head">
                    <div class="GenerateReport-framework__row">
                        <div class="GenerateReport_row">
                            <h1 class="Generate_h1_label">First Name</h1>
                            <input
                                value={inputValue.first_name}
                                error={validation['first_name']} type="text"
                                name='first_name'
                                readOnly={isView}
                                className="GenerateReport-framework__input"
                                placeholder="John" required={true}
                                onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div class="GenerateReport-framework__row">
                        <div class="GenerateReport_row">
                            <h1 class="Generate_h1_label">Last Name</h1>
                            <input
                                value={inputValue.last_name}
                                error={validation['last_name']} type="text"
                                name='last_name'
                                readOnly={isView}
                                className="GenerateReport-framework__input"
                                placeholder="John" required={true}
                                onChange={onChangeHandler} />
                        </div>
                    </div>
                </div>
                <div class="Generate_report_head">
                    <div class="GenerateReport-framework__row">
                        <div class="GenerateReport_row">
                            <h1 class="Generate_h1_label">Email</h1>
                            <input
                                value={inputValue.email_id}
                                error={validation['email_id']} type="text"
                                name='email_id'
                                readOnly={isView}
                                className="GenerateReport-framework__input"
                                placeholder="user@example.com" required={true}
                                onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div class="GenerateReport-framework__row">
                        <div class="GenerateReport_row">
                            <h1 class="Generate_h1_label">Phone</h1>
                            <input
                                minLength={8}
                                maxLength={15}
                                value={inputValue.phone_number}
                                error={validation['phone_number']} type="number"
                                name='phone_number'
                                readOnly={isView}
                                
                                className="GenerateReport-framework__input"
                                placeholder="+44235545" required={true}
                                onChange={onChangeHandler} />
                        </div>
                    </div>
                </div>
                <div class="Generate_report_head">
                    <div class="GenerateReport-framework__row">
                        <div class="GenerateReport_row">
                            <h1 class="Generate_h1_label">Country</h1>
                            <input
                                value={inputValue.country}
                                error={validation['country']} type="text"
                                name='country'
                                readOnly={isView}
                                className="GenerateReport-framework__input"
                                placeholder="United Kingdom" required={true}
                                onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div class="GenerateReport-framework__row">
                        <div class="GenerateReport_row">
                            <h1 class="Generate_h1_label">Location</h1>
                            <input
                                value={inputValue.location}
                                error={validation['location']} type="text"
                                name='location'
                                readOnly={isView}
                                className="GenerateReport-framework__input"
                                placeholder="London" required={true}
                                onChange={onChangeHandler} />
                        </div>
                    </div>
                </div>
                <div class="Generate_report_head">
                    <div class="GenerateReport-framework__row">
                        <div class="GenerateReport_row">
                            <h1 class="Generate_h1_label">Designation</h1>
                            <input
                                value={inputValue.designation}
                                error={validation['designation']} type="text"
                                name='designation'
                                readOnly={isView}
                                className="GenerateReport-framework__input"
                                placeholder="HR Manager" required={true}
                                onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div class="GenerateReport-framework__row">
                        <div class="GenerateReport_row">
                            <h1 class="Generate_h1_label">Department</h1>
                            <input
                                value={inputValue.department}
                                error={validation['department']} type="text"
                                name='department'
                                className="GenerateReport-framework__input"
                                placeholder="HR" required={true}
                                readOnly={isView}
                                onChange={onChangeHandler} />
                        </div>
                    </div>
                </div>

            </div>
        </div>



        <div class="buttons__panel">
            <button class="buttons__panel-button" onClick={() => { navigate(`/adminuser`) }}>
                CANCEL
            </button>
            {!isView && <>
                {state ?
                    <button class="main__button" onClick={() => onSaveUser()}>
                        Update
                    </button>

                    :
                    <button class="main__button" onClick={() => onSaveUser()}>
                        Invite
                    </button>
                }
            </>
            }
        </div>
        {!_isEmpty(error) && <div className='overall-error-container color-red'>* {error}</div>}


    </>)

}
export default AddESGManageUser;