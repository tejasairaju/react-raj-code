import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
setTimeout(() => {navigate('/')}, 6000)

  });
    

    return (<div className="payment-success-card">
        <div class="">
        <div style={{'border-radius':'200px', 'height':'200px', 'width':'200px', 'background': '#F8FAF5', 'margin':'0 auto' }}>
          <i class="checkmark">✓</i>
        </div>
          <h1 className="pay-success">Success</h1> 
          <p className="pay-success-desc">We received your purchase request;<br/> we'll be in touch shortly!</p>
        </div>
      </div>)
}

export default PaymentSuccess;