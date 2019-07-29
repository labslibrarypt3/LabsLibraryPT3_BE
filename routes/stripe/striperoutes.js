const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const request = require("request");
// const restricted = require("../../middleware/restricted");

router.get("/connect", async (req, res) => {
  //this is used to authorize data back from stripe
  const stateValue = Math.random()
    .toString(36)
    .slice(2);
  const stripeUrl = `https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://goofy-mayer-45bb20.netlify.com/&client_id=ca_FIasejiINwidFDyzoZ3EZ5Go8GKRfdsO&state=${stateValue}&suggested_capabilities[]=platform_payments`;
  res.redirect(stripeUrl);
});

module.exports = router;
