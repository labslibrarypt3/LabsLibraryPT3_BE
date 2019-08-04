const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const clientId = process.env.STRIPE_CLIENT_ID;
const request = require("request");
// const restricted = require("../../middleware/restricted");

const stateValue = Math.random()
  .toString(36)
  .slice(2);
//https://goofy-mayer-45bb20.netlify.com/stripe-connect-success
const stripeUrl = `https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://goofy-mayer-45bb20.netlify.com/stripe-connect-success&client_id=${clientId}&state=${stateValue}&suggested_capabilities[]=platform_payments`;

router.get("/connect", async (req, res) => {
  //this is used to authorize data back from stripe

  res.redirect(stripeUrl);
});

router.get("/token", async (req, res) => {
  console.log(req.session.state);
  c;
  // Check the `state` we got back equals the one we generated before proceeding (to protect from CSRF)
  if (req.session.state != req.query.state) {
    res.redirect(stripeUrl);
  }
  request.post(
    config.stripe.tokenUri,
    {
      form: {
        grant_type: "authorization_code",
        client_id: config.stripe.clientId,
        client_secret: config.stripe.secretKey,
        code: req.query.code
      },
      json: true
    },
    (err, response, body) => {
      if (err || body.error) {
        console.log("The Stripe onboarding process has not succeeded.");
      } else {
        // Update the model and store the Stripe account ID in the datastore:
        // this Stripe account ID will be used to issue payouts to the pilot
        req.user.stripeAccountId = body.stripe_user_id;
        req.user.save();
      }
      // Redirect to the Rocket Rides dashboard
      // req.flash("showBanner", "true");
      res.redirect("/stripe-connect-success");
    }
  );
});

module.exports = router;
