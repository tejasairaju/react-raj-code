import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react'
import _isEmpty from 'lodash/isEmpty';
import Request from '../../requests';
import './Login.css';
import '../../components/RegistrationForm/RegistrationForm.css';

export const Login = ({loginHandler}) => {
    const { loginWithRedirect = () => {}, logout, isAuthenticated } = useAuth0();
    useEffect(() => {
        localStorage.setItem("orgInfo", JSON.stringify({ }));
        localStorage.setItem("selectedPackege", JSON.stringify({}));
    }, []);

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const onChangeHandler = (e) => {
        setEmail(e.target.value)
    }

    const onClickloginHandler = () => {
        if(email){
            loginHandler(email);
        } else {
            setError('Please Provide vaild Email id');
        }
        
    }
    
    const logoutExistUSer = async() => {
        await logout();
        setError('Successfully logout the existing user.!');
    }

    return (<section className="main__container">
        <div className="aside__logo-container">
            <a href="#">
                <img src="../../assets/icons/esg_logo.png" alt="logo" className="aside__logo" />
            </a>
        </div>
        <div className="content__wrapper">
            <div className="content__info">
                <img className="login-img" src="../../assets/images/login-img.jpg" alt="Hend with tree" />
                <h1 className="info__title">
                    Environmental, Social, Governance
                </h1>
                <h3 className="info__subtitle">
                    Creating & Sharing your ESG Vision
                </h3>
                <p className="info__text">
                    Environmental, social, and governance (ESG) is a tool that businesses use to report their environmental, social, and governance policies and impacts. Usually undertaken by public companies to be more transparent about investment risks and opportunities.
                </p>
            </div>
            <div className="content__form">
                <h2 className="login__form-title right-section__title">
                    Your Login Details
                </h2>
                <form action="#" method="get" className="login__form">
                    <label for="email" className="form__label">
                        <input type="email" name="email" placeholder='Email address' onChange={onChangeHandler} id="form__email" className="form__input" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9-.]{2,61}$" required />
                        <div className='error-msg'>{error}</div>
                    </label>
                    <a type="submit" className="form__btn" onClick={onClickloginHandler}>
                        LOGIN
                    </a>
                    {/* <a href="/signup" className='form_create_account'>Create an account</a>
                    <a onClick={logoutExistUSer} className='form_create_account'>Logout Existing USer</a> */}
                </form>
            </div>
        </div>
    </section>);
};

export default Login;