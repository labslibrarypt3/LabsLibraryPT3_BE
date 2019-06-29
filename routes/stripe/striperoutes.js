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
    .get(stripeData,console.log(stripeData,'1st req stripedata'))
    .then(secondRes => response.send(secondRes))
    .catch(err => console.log(err));
});

module.exports = router;
