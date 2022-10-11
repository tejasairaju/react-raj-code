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
const stripePromise = loadStripe("pk_test_51LegNOSAF2CnYiZzebRKLjCTYeVtCFKU19sUT7TmpW5DQw78tMe7UZM6Jhd3NksnipBYRuxT9mRFgYExiRjRI0Lz00pn5IpyhR");

const StripePayment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
  const price = _get(location, 'state.price', 0);
  useEffect(() => {
    fetch("http://localhost:4242/create-payment-intent", {
        // fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
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