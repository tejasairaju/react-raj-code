const express = require("express");
const cors = require('cors');
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51LegNOSAF2CnYiZzvlX5MbEPyL51qL7sSBnKzrTpvdTxFmumyT1LZ5j6u0TGyqTFdHEJLA44p99XpH0OTbLnstfu007U7fykSU');

app.use(express.static("public"));
app.use(express.json());
app.use(cors({
  origin: '*'
}));

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 9900;
};

app.post("/create-payment-intent", async (req, res) => {
  const { amount = 0 } = req.body; 

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    // amount: calculateOrderAmount(items),
    amount,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));