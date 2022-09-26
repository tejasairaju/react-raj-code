import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import './payment.css';
import CheckoutForm from '../../Components/CheckoutForm/CheckoutForm.jsx';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_51LdASNSCWlVTrtmkBNA0SId9Y92KPpy7iYYqZ80coXQCIlmFf6Q1D05gWrpxf66ePHuZbn4g9rk0rXYoQFj8Xz6s00lMyMkIoz');

const Payment = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{sk_test_51LdASNSCWlVTrtmk2QEw5qjxsjbAw33FdNldKeOsN1f4ZteEc7RmCmnpT5EyVhwycPRdleBcbrLr5q1oY4GGiBlg00hgFUZVty}}',
  };

  return (
    <section className="right-section packages">
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    </section>
  );
};

export default Payment;