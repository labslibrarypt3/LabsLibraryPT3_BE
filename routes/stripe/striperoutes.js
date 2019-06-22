const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
router.use(require("body-parser").text());

//Returns fields needed
router.post("/account/get", async (req, res) => {
  const stripeAccountId = null;

  if (!stripeAccountId) {
    res.send({
      success: true,
      message: "Missing Stripe account.",
      setupBegan: false
    });
  } else {
    res.send({
      success: true,
      message: "Stripe account.",
      setupBegan: true
    });
  }
});

//Begin Stripe Connect Setup
router.post("/account/setup", async (req, res) => {
  // email needs to come from db but is hardcoded for first try
  const email = "bob@example.com";
  const country = req.body.country;

  //check if CA or US
  if (country !== "US" && country !== "CA") {
    res.send({ error: "Invalid country" });
    // ↑ if not, throw error ↑
    // ↓ if so, create stripe account ↓
  } else {
    const axiosCreateResponse = await stripe.accounts.create(
      {
        type: "standard",
        country,
        email /* this is shorthand for {email: email}*/
      },
      async (error, account) => {
        if (error) {
          console.log("error", error);
          res.send({ success: true, error: `${error.message}` });
        } else {
          console.log("account", account);
          const { id } = account;
          const axiosUpdateResponse = await stripe.accounts
            .update(id, {
              tos_acceptance: {
                date: Math.floor(Date.now() / 1000),
                ip: request.connection.remoteAddress //Assumes you're not using a proxy
              }
            })
            .then(() => {
              res.send({
                message: "Account setup has begun"
              });
            });
        }
      }
    );
  }
});

module.exports = router;
