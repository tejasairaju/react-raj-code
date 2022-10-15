import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import _get from 'lodash/get';
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../../Components/CheckoutFrom/CheckoutForm.jsx";
import "./StripePayment.css";
import { useLocation } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.REACT_STRIPE_PUBLIC_KEY);

const StripePayment = () => {
  const [clientSecret, setClientSecret] = useState('');
  const location = useLocation();
  const price = _get(location, 'state.price', 0);
  useEffect(() => {
    if (price > 0) {
      fetch(`${process.env.NODE_BASE_URL}/create-payment-intent`, {
        // fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="stripe-payment-gatway">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default StripePayment;