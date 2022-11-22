import React, { useEffect, useState } from "react";
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _lowerCase from 'lodash/lowerCase';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import paymentJson from '../../../__mocks__/payment.json';
import Popup from "../../components/Common/Popup/Popup.jsx";
import axios from 'axios';
import './Packeges.css'
import PageInprogress from "../../Components/Common/PageInprogress/PageInprogress.jsx";
import { useSelector, useDispatch } from "react-redux";

import actions from '../../actions/PackegeAction.js';
import PackageSummary from "../../Components/PackageSummary/PackageSummary.jsx";
import { useNavigate } from "react-router-dom";

const { API_BASE_URL } = process.env;

const Packeges = (props) => {
  const {
    isAuthenticated,
    user,
    // loginWithRedirect,
  } = useAuth0();
  // const { user } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector(state => state.packeges);
  const statusData = useSelector(state => state.statusResponse);

  const [dbStatus, setDbStatus] = useState('Done');

  useEffect(() => {
    if (_isEmpty(data)) {
      localStorage.setItem("selectedPackege", JSON.stringify({}));
      dispatch(actions.getPackegeDetails());
    }
  }, []);

  useEffect(() => {
    if (dbStatus === 'Inprogress') {
      setTimeout(() => getDBStatus(), 2000)

    }
  }, [dbStatus]);

  const getDBStatus = async () => {
    try {
      setDbStatus('');
      const response = await axios.get(`${API_BASE_URL}/auth/isdbcreated?org_name=testtest`);
      if (response) {
        setDbStatus(_get(response, 'data.DatabaseCreationStatus', 'Inprogress'));
      }
    } catch (error) {
      setDbStatus('');
    }
  }
const onClickSubscribe = (item) => {
  dispatch(actions.updateSubscribeDetails(item));
  localStorage.setItem("selectedPackege", JSON.stringify({...item}));
   navigate('/package/summary', { state: { packageDetails: { ...item } } });
}
  

  // const getPaymentDetails = async () => {
  //   try {
  //     setStatusData({ type: 'loading' });
  //     const response = await axios.get(`${API_BASE_URL}/subscriptions/pricing`);
  //     if (response) {
  //       setStatusData({ type: '' });
  //       setData(response.data);
  //     }
  //   } catch (error) {
  //     setStatusData({ type: 'error', message: error.message });
  //   }
  // }

  return <>
    {(dbStatus === 'Done') ? <>
      <aside className="aside">
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} />}
        <div className="aside__logo-container">
          <a href="#">
            <img src="../../assets/icons/esg_logo.png" alt="logo" className="aside__logo" />
          </a>
        </div>
      </aside>
      <section className="right-section packages">
        <h1 className="right-section__title packages__title">
          Your favourite packages to choose
        </h1>
        <ul className="packages__list">
          {(data || []).map((item, index) => <li key={index} className="package__list-item">
            <h3 className="package__item-title bronze">
              <img src={`assets/icons/${_lowerCase(item.name)}.svg`} alt="bronze" width='24px' height='40px' style={{ margin: 'auto' }} />
              {item.name} 
            </h3>
            <p className="package__item-subtitle">
              {item.description}
            </p>
            <p className="package__item-price">
              <span>
                {item.price}
              </span>
              ({item.unit})
            </p>
            <ul className="benefits__list">
              {
                (item.features || []).map((subItem, i) => <li ket={i} className="benefits__list-item">
                  {subItem}
                </li>)
              }
            </ul>
            <a onClick={() => onClickSubscribe(item)} className="package__item-subscribe">
              Subscribe
            </a>
          </li>)}
        </ul>
        <article className="purchase">
          <h2 className="purchase__title">
            Need a custom purchase?
          </h2>
          <p className="purchase__text">
            You can contact us and we will get back to you
          </p>
          <a href="#" className="purchase__link">
            Contact us
          </a>
        </article>
      </section>
    </>
      : <PageInprogress />
    }
  </>
}

export default Packeges;