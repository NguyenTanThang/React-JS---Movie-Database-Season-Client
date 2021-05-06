import { PayPalButton } from "react-paypal-button-v2";
import React, {Component} from "react";
import axios from "axios";
import {message} from "antd";
import {MAIN_PROXY_URL} from "../../config/config";
import {withRouter} from "react-router-dom";

class PaypalV2 extends Component {

  render() {
    const {total, planID, customerID} = this.props;

    return (
      <PayPalButton
        amount={total}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"

        options={{
            clientId: "ARY7az4KO34sNaA9MkbfeUAPP9TFUE6z_Ahyb82mbLDuxyu8x0sA8TNZ4ImLkU0Ee0ahRuZfP2w84UAI",
            disableFunding: "card"
        }}

        style = {{
            label: 'pay',
            color: 'silver',
        }}
        
        onError={(err) => {
            console.log(err);
        }}

        onSuccess={async (details, data) => {
          message.loading("Checking your payment...", 0);

          const paymentRes = await axios.post(`${MAIN_PROXY_URL}/paypal/callback`, {
            orderID: data.orderID,
            customerID,
            amount: total,
            planID
          });

          message.destroy();

          if (paymentRes.data.data.status === "COMPLETED") {
              message.success("Successfully subscribed", 5);
              return this.props.history.push("/");
          } else {
            message.error("An error occur during payment process", 5);
          }

          /*
          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderID: data.orderID
            })
          });
          */

        }}
      />
    );
  }
}

export default withRouter(PaypalV2);