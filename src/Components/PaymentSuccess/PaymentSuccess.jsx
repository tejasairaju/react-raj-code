import axios from "axios";
import _get from 'lodash/get';
import React, { useContext, useEffect } from "react";
import queryString from 'query-string';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import actions from '../../actions/SignUpActions.js'
import './PaymentSuccess.css';
import Requests from "../../Requests";

const PaymentSuccess = () => {
  // const { search } = _get(window, 'location', '?');
  // const params = queryString.parse(search);
  // const { payment_intent = "", redirect_status = '', id = '' } = params;

  const { orgDetails = {} } = useSelector(state => state.signup);
  const { selectedPakege = {}, paymentIntent={}  } = useSelector((state) => state.packeges);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {

    setTimeout(() => { updatePaymentStatus() }, 6000);

  }, []);
  // Required transaction details: 'transaction_id', 'package_selected', 'organization', 'paid_by', 'payment_status_frontend'
  const updatePaymentStatus = async () => {
    let pay_status = '';
    if (paymentIntent.status === 'succeeded') {
      pay_status = 'Successful';
    }
    const payload = {
      transaction_id: paymentIntent.id,
      status: pay_status,
      package: selectedPakege.id,
      organization: orgDetails.id
    }
    try {
      const response = await Requests.Post('/subscriptions/payments', payload, {organization: orgDetails.name});
      setTimeout(() => {getUpdatedOrgDetails()}, 2000);
      // dispatch(actions.updatePaymentStatus(true));
    } catch (e) {
      console.log(e);
    }

  }

  const getUpdatedOrgDetails = async() => {
    try {
      const response = await Requests.Get(`/organizations/${orgDetails.name}`);
      if (response) {
        dispatch(actions.organisationDatails(response));
      }
    } catch(e) {
      console.log(e);
    }
    
  }


  return (<div className="payment-success-card">
    <div className="">
      <div style={{ 'border-radius': '200px', 'height': '200px', 'width': '200px', 'background': '#F8FAF5', 'margin': '0 auto' }}>
        <i className="checkmark">✓</i>
      </div>
      <h1 className="pay-success">Success</h1>
      <p className="pay-success-desc">We received your purchase request;<br /> we'll be in touch shortly!</p>
    </div>
  </div>)
}

export default PaymentSuccess;