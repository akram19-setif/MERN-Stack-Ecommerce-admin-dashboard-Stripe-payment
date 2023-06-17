import axios from "axios";
import React, { useEffect, useState } from "react";

import StripeCheckout from "react-stripe-checkout";
function Pay() {
  const [stripeToken, setStripeToken] = useState(null);
  const keyStripe =
    "pk_test_51MklIaKaKHWuzvmNbp47cUFS9KNq08H5Zdrdl1qVELqX6ozcDtJILj1gtRZSTxjpAsdTsATqycwsjyJtGpzbqHTZ00fsiMcn7J";

  useEffect(() => {
    const makeRequest = async () => {
      try {
        let response = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 1000,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);
  const onToken = (token) => {
    setStripeToken(token);
    console.log(token);
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StripeCheckout
        name='Shop dz'
        image='../data/logo.jpeg'
        billingAddress
        shippingAddress
        description='Your total is $20'
        amount={2000}
        token={onToken}
        stripeKey={keyStripe}
      >
        <button
          style={{
            border: "none",
            width: 120,
            borderRadius: 5,
            padding: "20px",
            backgroundColor: "black",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  );
}

export default Pay;
