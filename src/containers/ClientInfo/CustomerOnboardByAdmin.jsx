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

const { Input, TextArea, Pills, UploadFile, Button } = Fields;


import './CustomerOnboardByAdmin.css';

const CustomerOnboardByAdmin = (props) => {
    const navigate = useNavigate();
    const { state = {} } = useLocation();
    const { isEditable = false, clientDetails = {} } = state || {};
    const [logo, setLogo] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [inputValue, setInputValue] = useState({});

    useEffect(() => {

        if (isEditable) {
            setInputValue({
                hq: clientDetails.headquarters,
                firstname: clientDetails.name,
                noofuser: clientDetails.employees_count
            });
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
         
    }
    

    return  (
        <>
            <div className="main__top-wrapper">
                {isEditable && <h1 className="main__title">
                Manage Clients {'->'} Edit Client
                </h1>}
                {!isEditable && <h1 className="main__title">
                Manage Clients {'->'} Onboard
                </h1>}
                
            </div>

        <div className="main__content-wrapper">
           
            <UploadFile label='Logo' imageUrl={logo} onChangeFile={onChangeFile} onChangeRemoveFile={onChangeRemoveFile} required={true} />
            <Input inputblockcls={`user_input_block ${_get(validation, 'organization', false) ? 'user_input_error' : null}`} 
            error={validation['organization']} label={'Organisation'} type="text" name='organization' value={inputValue.organization}
            className="create-framework__input" 
            placeholder="ESG Disclose" required={true} onChangeHandler={onChangeHandler} />

            <Input inputblockcls={`user_input_block ${_get(validation, 'country', false) ? 'user_input_error' : null}`} 
            error={validation['country']} label={'Country'} type="text" name='country' value={inputValue.country}
            className="create-framework__input" 
            placeholder="UK" required={true} onChangeHandler={onChangeHandler} />

            <Input inputblockcls={`user_input_block ${_get(validation, 'hq', false) ? 'user_input_error' : null}`} 
            error={validation['hq']} label={'Headquarters'} type="text" name='hq' value={inputValue.hq}
            className="create-framework__input" 
            placeholder="London" required={true} onChangeHandler={onChangeHandler} />
            
            <Input inputblockcls={`user_input_block ${_get(validation, 'firstname', false) ? 'user_input_error' : null}`} 
                error={validation['firstname']} label={'First Name'} type="text" name='firstname' value={inputValue.firstname}
                className="create-framework__input" 
                placeholder="John" required={true} 
                onChangeHandler={onChangeHandler} />

            <Input inputblockcls={`user_input_block ${_get(validation, 'lastname', false) ? 'user_input_error' : null}`} 
                error={validation['lastname']} label={'Last Name'} type="text" name='lastname' 
                className="create-framework__input" 
                placeholder="Victor" required={true} 
                onChangeHandler={onChangeHandler} />

            <h1 class="create-framework__title">
                       No of users
            </h1>

            <div class="create-framework__row-wrapper dates">
                    
                <input type="number" min="1" class="create-framework__input" 
                error={validation['noofuser']}  
                name='noofuser' 
                value={inputValue.noofuser}
                className="create-framework__input" 
                placeholder="Victor" required={true} 
                onChangeHandler={onChangeHandler}/>

                    <h1 class="create-framework__title">
                        License from
                    </h1>
                    <label for="create-framework__date-from" class="create-framework__label">
                        <input type="date" class="create-framework__input"   name='from' value={inputValue.from}
                        id="create-framework__date-from" required=""
                        onChangeHandler={onChangeHandler}
                        />
                         
                    </label>
                    <h1 class="create-framework__title">
                        License to
                    </h1>
                    <label for="create-framework__date-to" class="create-framework__label">
                        <input type="date" class="create-framework__input"   name='to' value={inputValue.to}
                        id="create-framework__date-to" required=""
                        onChangeHandler={onChangeHandler}
                        />
                         
                    </label>
            </div>

            <h1 class="create-framework__title">
                    Package
                </h1>
            <form class="create-framework__row-wrapper radios">
                    <label for="bronze" class="create-framework__label">
                        <input type="radio" name="radio__package" class="create-framework__input" id="bronze"/>
                        <div class="fake__radio">
                            <div class="fake__radio-active"></div>
                        </div>
                        <h1 class="create-framework__title">
                            Bronze
                        </h1>
                    </label>
                    <label for="silver" class="create-framework__label">
                        <input type="radio" name="radio__package" class="create-framework__input" id="silver"/>
                        <div class="fake__radio">
                            <div class="fake__radio-active"></div>
                        </div>
                        <h1 class="create-framework__title">
                            Silver
                        </h1>
                    </label>
                    <label for="gold" class="create-framework__label">
                        <input type="radio" name="radio__package" class="create-framework__input" id="gold"/>
                        <div class="fake__radio">
                            <div class="fake__radio-active"></div>
                        </div>
                        <h1 class="create-framework__title">
                            Gold
                        </h1>
                    </label>
                    <label for="custom" class="create-framework__label">
                        <input type="radio" name="radio__package" class="create-framework__input" id="custom"/>
                        <div class="fake__radio">
                            <div class="fake__radio-active"></div>
                        </div>
                        <h1 class="create-framework__title">
                            Custom
                        </h1>
                    </label>
                </form>
        </div>

        <div class="buttons__panel">
                <button class="buttons__panel-button" onClick={() => { navigate(`/manageclient`) }}>
                    CANCEL
                </button>
                <button class="main__button" onClick={() => onSaveCustomer()}>
                    SAVE
                </button>
            </div>

        </>
        )
}

export default CustomerOnboardByAdmin;