const express = require("express");
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
router.use(require("body-parser").text());

router.post("/charge", async (req, res) => {
    console.log(req.body);
    try {
      let {status} = await stripe.charges.create({
        amount: 2000,
        currency: "usd",
        description: "Lost book payment",
        source: req.body
      });
  
      res.json({status});
      console.log(res.status)
    } catch (err) {
      res.status(500).end({error: "Purchase Failed"});
    }
  });

  module.exports = router;

