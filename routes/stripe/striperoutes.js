const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const request = require("request-promise");
// const restricted = require("../../middleware/restricted");

router.get("/connect", (req, response) => {
  //this is used to authorize data back from stripe

  const stripeData = {
    response_type: "code",
    uri: "https://connect.stripe.com/express/oauth/authorize",
    qs: {
      redirect_uri: `${baseUrl}/account`,
      client_id: "ca_FIasejiINwidFDyzoZ3EZ5Go8GKRfdsO",
      state: Math.random().toString(36)
    }
  };

  request
    .get(stripeData)
    .then(secondRes => {
      console.log("I am about to redirect");
      response.send(secondRes);
    })
    .catch(err =>
      res
        .status(500)
        .json(
          "Error: Unable to connect to Stripe at this time. Please try again later."
        )
    );
});

module.exports = router;
