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
            label: 'pay'
        }}
        
        onError={(err) => {
            console.log(err);
        }}

        onSuccess={async (details, data) => {
          //alert("Transaction completed by " + details.payer.name.given_name);
          console.log("details")
          console.log(details)
          console.log("data")
          console.log(data)

          const paymentRes = await axios.post(`${MAIN_PROXY_URL}/paypal/callback`, {
            orderID: data.orderID,
            customerID,
            amount: total,
            planID
          });

          if (paymentRes.data.data.status === "COMPLETED") {
              message.success("Successfully subscribed", 5);
              return this.props.history.push("/");
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