import React, {useState} from 'react';
import axios from 'axios';
import {getPlanByPrice} from "../../requests/planRequests";
import {addSubscription} from "../../requests/subscriptionRequests";
// MUI Components
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Label} from "reactstrap";
import {message} from "antd";
// stripe
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
// Util imports
import {makeStyles} from '@material-ui/core/styles';
// Custom Components
import CardInput from './StripeCardInput';
import {MAIN_PROXY_URL} from "../../config/config";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '35vh auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    margin: '2em auto 1em',
  },
  displayBlock: {
    width: "100%",
    margin: '2em auto 1em'
  }
});

function HomePage() {
  const classes = useStyles();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    message.loading("Sending request. Please wait...", 0);

    if (!stripe || !elements) {
      return;
    }

    const amount = localStorage.getItem("amount");

    const res = await axios.post(`${MAIN_PROXY_URL}/stripes/pay`, { amount});

    const clientSecret = res.data['client_secret'];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      },
    });

    message.destroy();

    if (result.error) {
      message.error(result.error.message, 5);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        const price = amount / 100;
        const plan = await getPlanByPrice(price);
        const sub = await addSubscription(plan._id);
        message.success("Successfully subscribed", 5);
      }
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Label htmlFor="card-input">Credit Card:</Label>
        <CardInput />
        <div className={classes.div}>
          <Button variant="contained" color="primary" className={classes.displayBlock} onClick={handleSubmit}>
            Pay
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default HomePage;
