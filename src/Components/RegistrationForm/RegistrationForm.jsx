import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import axios from 'axios';
import Popup from '../Common/Popup/Popup.jsx';
import actions from '../../actions/SignUpActions.js';
import PopupActions from '../../actions/PopupActions.js';
import Request from '../../Requests';
import './RegistrationForm.css';
import OrganisationInfo from '../../containers/OrganisationInfo/OrganisationInfo.jsx';
import EsgImageNavBar from '../EsgImageNavBar/EsgImageNavBar.jsx';
const { API_BASE_URL } = process.env;

const RegistrationForm = ({ isClientOnBoard = false }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const statusData = useSelector((state) => state.statusResponse);

    const inputFields = { first_name: "", last_name: "", phone_number: "", organization_name: "", companyLocation: '', email_id: "", password: "", confirmPassword: "" }
    const [inputValues, setInputValue] = useState(inputFields);
    const [validation, setValidation] = useState(inputFields);

    const isEditable = false;

    // useEffect(() => {
    //     status && setTimeout(() => setStatus(''), 10000);
    // }, [status]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputValue({ ...inputValues, [name]: value });
    }

    const onChangeRadioHandler = (value) => {
        setInputValue({ ...inputValues, ['radio__package']: value });
    }

    const checkValidation = () => {
        let errors = JSON.parse(JSON.stringify(validation));

        if (!inputValues.first_name.trim()) {
            errors.first_name = "First name is required";
        } else {
            errors.first_name = "";
        }
        if (!inputValues.last_name.trim()) {
            errors.last_name = "Last name is required";
        } else {
            errors.last_name = "";
        }

        const phoneCond = /^\+\d+$/;
        if (!inputValues.phone_number.trim()) {
            errors.phone_number = "Phone Number is required";
        } else if (inputValues.phone_number.length < 8 || inputValues.phone_number.length > 15) {
            errors.phone_number = "Phone Number should be between 8 and 15";
        } else if (!inputValues.phone_number.match(phoneCond)) {
            errors.phone_number = "Phone Number should have country code"
        }
        else {
            errors.phone_number = "";
        }
        if (!inputValues.organization_name.trim()) {
            errors.organization_name = "Company name is required";
        } else {
            errors.organization_name = "";
        }
        if (inputValues.organization_name.length < 3 || inputValues.organization_name.length > 50) {
            errors.organization_name = "Organisation name should be between 3 and 50"
        }

        const emailCond = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!inputValues.email_id.trim()) {
            errors.email_id = "Email is required";
        } else if (inputValues.email_id.match(emailCond)) {
            errors.email_id = "";
        } else {
            errors.email_id = "Please ingress a valid email address";;
        }

        const uppercaseRegExp = /(?=.*?[A-Z])/;
        const lowercaseRegExp = /(?=.*?[a-z])/;
        const digitsRegExp = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp = /.{8,}/;
        const password = inputValues.password;
        const uppercasePassword = uppercaseRegExp.test(password);
        const lowercasePassword = lowercaseRegExp.test(password);
        const digitsPassword = digitsRegExp.test(password);
        const specialCharPassword = specialCharRegExp.test(password);
        const minLengthPassword = minLengthRegExp.test(password);

        if (!password) {
            errors.password = "Password is required";
        } else if (!uppercasePassword) {
            errors.password = "At least one Uppercase";
        } else if (!lowercasePassword) {
            errors.password = "At least one Lowercase";
        } else if (!digitsPassword) {
            errors.password = "At least one digit";
        } else if (!specialCharPassword) {
            errors.password = "At least one Special Characters";
        } else if (!minLengthPassword) {
            errors.password = "At least minumum 8 characters";
        } else {
            errors.password = "";
        }
        if (!inputValues.confirmPassword) {
            errors.confirmPassword = "Password confirmation is required";
        } else if (inputValues.confirmPassword !== inputValues.password) {
            errors.confirmPassword = "Password does not match confirmation password";
        } else {
            errors.confirmPassword = "";
        }

        setValidation(errors);
    };

    const checkOnSubmit = async () => {
        if ((inputValues.password !== '' && (inputValues.password === inputValues.confirmPassword)) && inputValues.first_name !== '' && inputValues.last_name !== '' && (inputValues.email_id !== '' && validation.email_id === '')
            && inputValues.organization_name !== '' && (inputValues.phone_number !== '' && validation.phone_number === '')) {
            const payload = { ...inputValues };
            // const payload = {"first_name":"poid","last_name":"odp","phone_number":"9655505868","organization_name":"lllll","companyLocation":"chenani","email_id":"lllll@gmail.com","password":"Raj@12345","confirmPassword":"Raj@12345"}
            dispatch(actions.signUp(payload));
            setInputValue(inputFields);
            setValidation(inputFields)
        } else {
            checkValidation();
        }
    }

    const onCloseHandler = () => {
        if (statusData.type === 'success' && isClientOnBoard) {
            navigate(-1);

        } else if (statusData.type === 'success') {
            navigate('/');
        }
        dispatch(PopupActions.closePageLoader());
    }

    const renderForm = () => (<form action="#" method="get" className="acc-info__form">
        <div className="acc-info__form-item">
            <label for="form__name" className="acc-info__form-label">
                <div><span className="color-red">*</span>First Name &nbsp; {validation.first_name && <span className='error-msg'>({validation.first_name})</span>}</div>
                <input type="text" value={inputValues.first_name} name="first_name" id="firstName" onChange={(e) => handleChange(e)} className="acc-info__form-input" required />
            </label>
            <label for="form__last-name" className="acc-info__form-label">
                <div><span className="color-red">*</span>Last Name &nbsp; {validation.last_name && <span className='error-msg'>({validation.last_name})</span>}</div>
                <input type="text" value={inputValues.last_name} name="last_name" id="lastName" onChange={(e) => handleChange(e)} className="acc-info__form-input" required />
            </label>
        </div>
        <div className="acc-info__form-item">
            <label for="form__email" className="acc-info__form-label">
                <div><span className="color-red">*</span>Company email &nbsp; {validation.email_id && <span className='error-msg'>({validation.email_id})</span>}</div>
                <input type="text" value={inputValues.email_id} name="email_id" id="form__email" onChange={(e) => handleChange(e)} className="acc-info__form-input" required />
            </label>
            <label for="form__phone_number" className="acc-info__form-label">
                <div><span className="color-red">*</span>Mobile number &nbsp; {validation.phone_number && <span className='error-msg'>({validation.phone_number})</span>}</div>
                <input type="text" pattern="\+\d+" ondrop="false" minLength={8} maxLength={15} value={inputValues.phone_number} name="phone_number" id="form__phone_number" onChange={(e) => handleChange(e)} className="acc-info__form-input" required />
            </label>
        </div>
        <div className="acc-info__form-item">
            <label for="form__company-name" className="acc-info__form-label">
                <div><span className="color-red">*</span>Company Name&nbsp;{validation.organization_name && <span className='error-msg'>({validation.organization_name})</span>}</div>
                <input type="text" maxLength={50} value={inputValues.organization_name} name="organization_name" id="form__company-name" onChange={(e) => handleChange(e)} className="acc-info__form-input" required />
            </label>
            <label for="form__company-location" className="acc-info__form-label">
                Company Location
                <input type="text" value={inputValues.companyLocation} name="companyLocation" id="form__company-location" onChange={(e) => handleChange(e)} className="acc-info__form-input" required />
            </label>
        </div>
        <div className="acc-info__form-item">
            <label for="form__password" className="acc-info__form-label">
                <div><span className="color-red">*</span>Password &nbsp; {validation.password && <span className='error-msg'>({validation.password})</span>}</div>
                <input type="password" value={inputValues.password} name="password" id="form__password" onChange={(e) => handleChange(e)} className="acc-info__form-input" required />
            </label>
            <label for="form__confirm-password" className="acc-info__form-label">
                <div><span className="color-red">*</span>Confirm password &nbsp; {validation.confirmPassword && <span className='error-msg'>({validation.confirmPassword})</span>}</div>
                <input type="password" value={inputValues.confirmPassword} name="confirmPassword" id="form__confirm-password" onChange={(e) => handleChange(e)} className="acc-info__form-input" required />
            </label>
        </div>

    </form>);


    const packageDetails = () => (<><h1 class="create-framework__title package-label">
        Package
    </h1>
        <form class="create-framework__row-wrapper radios">
            <label for="bronze" class="create-framework__label">
                <input type="radio" name="radio__package" onClick={() => onChangeRadioHandler('Bronze')} class="create-framework__input" id="bronze" />

                <h1 class="create-framework__title">
                    Bronze
                </h1>
            </label>
            <label for="silver" class="create-framework__label">
                <input type="radio" name="radio__package" onClick={() => onChangeRadioHandler('Silver')} class="create-framework__input" id="silver" />

                <h1 class="create-framework__title">
                    Silver
                </h1>
            </label>
            <label for="gold" class="create-framework__label">

                <h1 class="create-framework__title">
                    Gold
                </h1>
            </label>
            <label for="custom" class="create-framework__label">
                <input type="radio" name="radio__package" onClick={() => onChangeRadioHandler('Custom')} class="create-framework__input" id="custom" />
                <h1 class="create-framework__title">
                    Custom
                </h1>
            </label>
        </form>
    </>);

    return (
        <>
            {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
            {!isClientOnBoard ? <><EsgImageNavBar />
                <section className="right-section acc-info">
                    <h1 className="right-section__title acc-info__form-title">
                        Account Information
                    </h1>
                    {renderForm()}
                    <a type="submit" className="next-btn form-btn" onClick={checkOnSubmit}>
                        Next
                    </a>
                    {/* <form action="#" method="get" className="acc-info__form">
                    <div className="acc-info__form-item">
                        <label for="form__name" className="acc-info__form-label">
                            <div><span className="color-red">*</span>First Name &nbsp; {validation.first_name && <span className='error-msg'>({validation.first_name})</span>}</div>
                            <input type="text" value={inputValues.first_name} name="first_name" id="firstName" onChange={(e) => handleChange(e)} className="acc-info__form-input" required />
                        </label>
                        <label for="form__last-name" className="acc-info__form-label">
                            <div><span className="color-red">*</span>Last Name &nbsp; {validation.last_name && <span className='error-msg'>({validation.last_name})</span>}</div>
                            <input type="text" value={inputValues.last_name} name="last_name" id="lastName" onChange={(e) => handleChange(e)} className="acc-info__form-input" required />
                        </label>
                    </div>
                    <div className="acc-info__form-item">
                        <label for="form__email" className="acc-info__form-label">
                            <div><span className="color-red">*</span>Company email &nbsp; {validation.email_id && <span className='error-msg'>({validation.email_id})</span>}</div>
                            <input type="text" value={inputValues.email_id} name="email_id" id="form__email" onChange={(e) => handleChange(e)} className="acc-info__form-input" required />
                        </label>
                        <label for="form__phone_number" className="acc-info__form-label">
                            <div><span className="color-red">*</span>Mobile number &nbsp; {validation.phone_number && <span className='error-msg'>({validation.phone_number})</span>}</div>
                            <input type="text" pattern="\+\d+" ondrop="false" minLength={8} maxLength={15} value={inputValues.phone_number} name="phone_number" id="form__phone_number" onChange={(e) => handleChange(e)} className="acc-info__form-input" required />
                        </label>
                    </div>
                    <div className="acc-info__form-item">
                        <label for="form__company-name" className="acc-info__form-label">
                            <div><span className="color-red">*</span>Company Name&nbsp;{validation.organization_name && <span className='error-msg'>({validation.organization_name})</span>}</div>
                            <input type="text" maxLength={50} value={inputValues.organization_name} name="organization_name" id="form__company-name" onChange={(e) => handleChange(e)} className="acc-info__form-input" required />
                        </label>
                        <label for="form__company-location" className="acc-info__form-label">
                            Company Location
                            <input type="text" value={inputValues.companyLocation} name="companyLocation" id="form__company-location" onChange={(e) => handleChange(e)} className="acc-info__form-input" required />
                        </label>
                    </div>
                    <div className="acc-info__form-item">
                        <label for="form__password" className="acc-info__form-label">
                            <div><span className="color-red">*</span>Password &nbsp; {validation.password && <span className='error-msg'>({validation.password})</span>}</div>
                            <input type="password" value={inputValues.password} name="password" id="form__password" onChange={(e) => handleChange(e)} className="acc-info__form-input" required />
                        </label>
                        <label for="form__confirm-password" className="acc-info__form-label">
                            <div><span className="color-red">*</span>Confirm password &nbsp; {validation.confirmPassword && <span className='error-msg'>({validation.confirmPassword})</span>}</div>
                            <input type="password" value={inputValues.confirmPassword} name="confirmPassword" id="form__confirm-password" onChange={(e) => handleChange(e)} className="acc-info__form-input" required />
                        </label>
                    </div>
                    <a type="submit" className="next-btn form-btn" onClick={checkOnSubmit}>
                        Next
                    </a>
                </form> */}
                </section></> :
                <>
                    <div className="main__top-wrapper">
                        {isEditable && <h1 className="main__title">
                            Manage Clients {'->'} Edit Client
                        </h1>}
                        {!isEditable && <h1 className="main__title">
                            Manage Clients {'->'} Onboard
                        </h1>}

                    </div>
                    <br></br>
                    {renderForm()}

                    <div class="buttons__panel margin-top-1em">
                        <button class="buttons__panel-button" onClick={() => { navigate(-1) }}>
                            CANCEL
                        </button>
                        <button class="main__button" onClick={() => checkOnSubmit()}>
                        NEXT
                        </button>
                    </div>
                    {/* <a type="submit" className="next-btn form-btn" onClick={checkOnSubmit}>
                        Next
                    </a> */}

                </>
            }
        </>);


}

export default RegistrationForm;
