import React from 'react';
// Components
import HomePage from './StripeHomePage';
// Stripe
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_zCHhDQRlYULSrArp9BJ390rC00NnAcrsz7');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <HomePage />
    </Elements>
  );
}

export default App;
