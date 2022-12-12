import React, { useState, useEffect } from "react";
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import MoreAction from "./MoreAction.jsx";
import moment from 'moment';
import _get from 'lodash/get';
import Fields from '../../Components/Common/Fields/Fields.jsx';
import { getErrorMessage } from "../../utils/utils.js";
import Popup from "../../components/Common/Popup/Popup.jsx";

const { Input, TextArea, Pills, UploadFile, Button } = Fields;


import './CustomerOnboardByAdmin.css';

const CustomerOnboardByAdmin = (props) => {
    const navigate = useNavigate();
    const { state = {} } = useLocation();
    const { isView = false, clientDetails = {}, isEditable = false } = state || {};

    console.log('>>>>>>>>>>clientDetails>>>>>>>>', clientDetails);
    const [logo, setLogo] = useState(null);
    // const [errorValidation, setErrorValidation] = useState(false);
    const [statusData, setStatusData] = useState({});
    const [apiData, setApiData] = useState({});
    const [uploadImage, setUploadImage] = useState(null);
    const [inputValue, setInputValue] = useState({});

    useEffect(() => {

        if (isEditable || isView) {
            setInputValue({
                ...clientDetails
                // headquarters: clientDetails.headquarters,
                // firstname: clientDetails.name,
                // employees_count: clientDetails.employees_count
            });
            setUploadImage({ fileName: `avatar${Math.floor(Math.random() * 90 + 10)}.png`, imageUrl: clientDetails.logo });
            !_isEmpty(clientDetails.logo) && setUploadImage({ fileName: `avatar${Math.floor(Math.random() * 90 + 10)}.png`, imageUrl: clientDetails.logo });
            setLogo(clientDetails.logo);

        }

    }, []);
    const validation = {};
    const onChangeFile = (event) => {
        const imageUrl = event.target.files[0];
        const fileName = event.target.files[0].name;
        setLogo(URL.createObjectURL(imageUrl));
        if (imageUrl) {
            setUploadImage({ fileName, imageUrl });
        }
    }


    const onChangeHandler = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    }

    const onChangeRemoveFile = () => {
        setLogo(null);
    }

    const onSaveCustomer = async () => {
        if (!_isEmpty(inputValue.name)) {
        const form = new FormData();
        form.append('name', inputValue.name);
        form.append('headquarters', inputValue.headquarters)
        form.append('mobile_number', inputValue.mobile || '');
        // form.append('zip_code', inputValue.zipcode);
        // form.append('email', inputValue.email);
        // form.append('address', inputValue.address);
        form.append('status', 'Active');
        form.append('employees_count', inputValue.employees_count);
        form.append('location', inputValue.location);
        form.append('package', inputValue.radio__package);
        form.append('is_payment_done', true);
        


        if (!_isEmpty(uploadImage && uploadImage.fileName )) {
            if(typeof(uploadImage.imageUrl) == 'object'){
                form.append('logo', _get(uploadImage, "imageUrl", ""), uploadImage.fileName);
            }
        } else {
            let blob = new Blob([logo], {
                type: "application/pdf"
            });
            form.append('logo', blob, uploadImage.fileName);
        }
        form.append('created_at', moment().format());
        form.append('updated_at', moment().format());

        // const getMultisector = getFilterArrayValue(inputValue.sectors);
        // for (const a of getMultisector) {
        //     if (!_isEmpty(a)) {
        //         form.append("sectors", a);
        //     }

        // }
        // const getMultisubsector = getFilterArrayValue(inputValue.subsectors);
        // for (const a of getMultisubsector) {
        //     if (!_isEmpty(a)) {
        //         form.append("sub_sectors", a);
        //     }
        // }
        // const getMultisubcountries = getFilterArrayValue(inputValue.operating_countries);
        // for (const a of getMultisubcountries) {
        //     if (!_isEmpty(a)) {
        //         form.append("supported_countries", a);
        //     }
        // }
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.put(`${process.env.API_BASE_URL}/organizations/${clientDetails.name}`, form, {
                headers: { "Content-Type": "multipart/form-data" }
            }).then(({ data }) => data);
            setApiData(response);
            setStatusData({ type: 'success', message: 'Client information has been updated successfully' });
            setInputValue({});
            setLogo(null);
        } catch (e) {
            let error = getErrorMessage(e);
            setStatusData({ ...error });
        }
        // setError(false);
    } else {
        // setError(true);
    }    }

    const onChangeRadioHandler = (value) => {
        setInputValue({ ...inputValue, ['radio__package']: value });
    }

    const onCloseHandler = () => {
        if (statusData.type === 'success') {
            navigate(-1);
        } else {
            // navigate(`/`);
        }

        setStatusData({ type: '', message: '' });
    }


    return (
        <>
          {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
            <div className="main__top-wrapper">
                {isEditable && <h1 className="main__title custom-title">
                    Manage Clients {'->'} Edit Client
                </h1>}
                {!isEditable && <h1 className="main__title custom-title">
                    Manage Clients {'->'} Onboard
                </h1>}

            </div>

            <div className="main__content-wrapper">

                <UploadFile label='Logo' imageUrl={logo} onChangeFile={onChangeFile} onChangeRemoveFile={onChangeRemoveFile} required={true} />
                <Input inputblockcls={`user_input_block ${_get(validation, 'name', false) ? 'user_input_error' : null}`}
                    error={validation['organization']} label={'Organisation'} type="text" name='name' value={inputValue.name}
                    className="create-framework__input"
                    readOnly={true}
                    placeholder="ESG Disclose" required={true} onChangeHandler={onChangeHandler} />

                <Input inputblockcls={`user_input_block ${_get(validation, 'location', false) ? 'user_input_error' : null}`}
                    error={validation['country']} label={'Country'} type="text" name='location' value={inputValue.location}
                    className="create-framework__input"
                    readOnly={isView}
                    placeholder="UK" required={true} onChangeHandler={onChangeHandler} />

                <Input inputblockcls={`user_input_block ${_get(validation, 'headquarters', false) ? 'user_input_error' : null}`}
                    error={validation['hq']} label={'Headquarters'} type="text" name='headquarters' value={inputValue.headquarters}
                    className="create-framework__input"
                    readOnly={isView}
                    placeholder="London" required={true} onChangeHandler={onChangeHandler} />

                {/* <Input inputblockcls={`user_input_block ${_get(validation, 'firstname', false) ? 'user_input_error' : null}`}
                    error={validation['firstname']} label={'First Name'} type="text" name='firstname' value={inputValue.firstname}
                    className="create-framework__input"
                    placeholder="John" required={true}
                    readOnly={isView}
                    onChangeHandler={onChangeHandler} />

                <Input inputblockcls={`user_input_block ${_get(validation, 'lastname', false) ? 'user_input_error' : null}`}
                    error={validation['lastname']} label={'Last Name'} type="text" name='lastname'
                    value={inputValue.lastname}
                    className="create-framework__input"
                    placeholder="Victor" required={true}
                    readOnly={isView}
                    onChangeHandler={onChangeHandler} /> */}

                <h1 class="create-framework__title">
                    No of users
                </h1>

                <div class="create-framework__row-wrapper dates">

                    <input type="number" min="1" class="create-framework__input"
                        error={validation['employees_count']}
                        name='employees_count'
                        value={inputValue.employees_count}
                        className="create-framework__input"
                        placeholder="50" required={true}
                        readOnly={isView}
                        onChange={onChangeHandler} />

                    <h1 class="create-framework__title">
                        License from
                    </h1>
                    <label for="create-framework__date-from" class="create-framework__label">
                        <input type="date" class="create-framework__input" name='from' value={inputValue.from}
                            min="2000-01-01" max="2100-01-01"
                            id="create-framework__date-from" required=""
                            onChange={onChangeHandler}
                            readOnly={isView}
                        />

                    </label>
                    <h1 class="create-framework__title">
                        License to
                    </h1>
                    <label for="create-framework__date-to" class="create-framework__label">
                        <input type="date" class="create-framework__input" name='to' value={inputValue.to}
                            min="2000-01-01" max="2100-01-01"
                            id="create-framework__date-to" required=""
                            onChange={onChangeHandler}
                            readOnly={isView}
                        />

                    </label>
                </div>

                <h1 class="create-framework__title">
                    Package
                </h1>
                <form class="create-framework__row-wrapper radios">
                    <label for="bronze" class="create-framework__label">
                        <input type="radio" name="radio__package" onClick={() => onChangeRadioHandler('Bronze')} class="create-framework__input" id="bronze" readOnly={isView}/>
                        {/* <div class="fake__radio">
                            <div class="fake__radio-active"></div>
                        </div> */}
                        <h1 class="create-framework__title">
                            Bronze
                        </h1>
                    </label>
                    <label for="silver" class="create-framework__label">
                        <input type="radio" name="radio__package" onClick={() => onChangeRadioHandler('Silver')} class="create-framework__input" id="silver" readOnly={isView}/>
                        {/* <div class="fake__radio">
                            <div class="fake__radio-active"></div>
                        </div> */}
                        <h1 class="create-framework__title">
                            Silver
                        </h1>
                    </label>
                    <label for="gold" class="create-framework__label">
                        <input type="radio" name="radio__package" onClick={() => onChangeRadioHandler('Gold')} class="create-framework__input" id="gold" readOnly={isView}/>
                        {/* <div class="fake__radio">
                            <div class="fake__radio-active"></div>
                        </div> */}
                        <h1 class="create-framework__title">
                            Gold
                        </h1>
                    </label>
                    <label for="custom" class="create-framework__label">
                        <input type="radio" name="radio__package" onClick={() => onChangeRadioHandler('Custom')} class="create-framework__input" id="custom" readOnly={isView}/>
                        {/* <div class="fake__radio">
                            <div class="fake__radio-active"></div>
                        </div> */}
                        <h1 class="create-framework__title">
                            Custom
                        </h1>
                    </label>
                </form>
            </div>

            <div class="buttons__panel">
                <button class="buttons__panel-button" onClick={() => { navigate(-1) }}>
                    CANCEL
                </button>
                {!isView&&<button class="main__button" onClick={() => onSaveCustomer()}>
                    SAVE
                </button>}
            </div>

        </>
    )
}

export default CustomerOnboardByAdmin;