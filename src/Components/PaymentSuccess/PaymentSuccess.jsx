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
  const { payment_intent = "", redirect_status = '' } = params;
  const { orgDetails = {} } = useSelector(state => state.signup)
  const navigate = useNavigate();
  useEffect(() => {

    setTimeout(() => { updatePaymentStatus(); }, 6000);

  }, []);
  // Required transaction details: 'transaction_id', 'package_selected', 'organization', 'paid_by', 'payment_status_frontend'
  const updatePaymentStatus = async () => {
    const payload = {
      transaction_id: payment_intent,
      payment_status_frontend: redirect_status,
      package_selected: "5faa3752-7083-4c02-8ecf-a588bfb97233",
      organization: orgDetails.id || '37c46b6f-15be-490e-87f6-59d62a977d34',
      paid_by: orgDetails.employees_count || 150
    }
    try {
      const response = await axios.post(`${process.env.API_BASE_URL}/backend/payments/`, { ...payload }).then(({ data }) => data);
      navigate('/');

    } catch (e) {

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