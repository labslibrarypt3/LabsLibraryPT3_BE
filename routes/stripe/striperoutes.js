const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const request = require("request-promise");
// const queryString = require("query-string");
// const restricted = require("../../middleware/restricted");

router.get("/connect", (req, response) => {
  const stripeData = {
    response_type: "code",
    uri: "https://connect.stripe.com/express/oauth/authorize",
    qs: {
      redirect_uri: "https://goofy-mayer-45bb20.netlify.com/",
      client_id: "ca_FIasejiINwidFDyzoZ3EZ5Go8GKRfdsO"
    }
  };

  request
    .get(stripeData)
    .then(secondRes => response.send(secondRes))
    .catch(err => res.status(500).json({"Error: Unable to connect to Stripe at this time. Please try again later."}));
});

module.exports = router;
