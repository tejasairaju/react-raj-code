import axios from "axios";
import _get from 'lodash/get';
import React, { useContext, useEffect } from "react";
import queryString from 'query-string';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const { search } = _get(window, 'location', '?');
  const params = queryString.parse(search);
  const { payment_intent = "", redirect_status = '', id ='' } = params;
  const { orgDetails = {} } = useSelector(state => state.signup)
  const { selectedPakege = {}} = useSelector((state) => state.packeges);
  const packegeDetails = localStorage.getItem("selectedPackege");
  const retrivePackegeDetails = JSON.parse(packegeDetails);
   const orgInfo = localStorage.getItem("orgInfo");
  const retriveOrgInfo = JSON.parse(orgInfo);
  const navigate = useNavigate();
  useEffect(() => {

    setTimeout(() => { navigate('/') }, 6000);

  }, []);
  // Required transaction details: 'transaction_id', 'package_selected', 'organization', 'paid_by', 'payment_status_frontend'
  const updatePaymentStatus = async () => {
    let pay_status = '';
    if(redirect_status === 'succeeded') {
      pay_status = 'Successful';
    }
    const payload = {
      transaction_id: payment_intent,
      status: pay_status,
      package: retrivePackegeDetails.id,
      organization: retriveOrgInfo.id
    }
    try {
      localStorage.setItem("selectedPackege", JSON.stringify({}));
      navigate('/orginfo');

    } catch (e) {
      navigate('/orginfo');
    }

  }


  return (<div className="payment-success-card">
    <div class="">
      <div style={{ 'border-radius': '200px', 'height': '200px', 'width': '200px', 'background': '#F8FAF5', 'margin': '0 auto' }}>
        <i class="checkmark">✓</i>
      </div>
      <h1 className="pay-success">Success</h1>
      <p className="pay-success-desc">We received your purchase request;<br /> we'll be in touch shortly!</p>
    </div>
  </div>)
}

export default PaymentSuccess;