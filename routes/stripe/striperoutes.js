const express = require("express");
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
router.use(require("body-parser").text());

router.post("/account-create", async (req, res) =>{
try{
   const acct = await stripe.accounts.create({
      email: req.body.email,
      country: "gb",        
      type: "custom"
  }).then(function(acct) {

    console.log(acct);
      // asynchronously called

   res.status(200).send(acct);
  })}
  catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the Users"
        });
      }
})

router.post("/plan-create", async (req, res)=>{
  try{
    const plan = await stripe.plans.create({
      amount: req.body.amount,
      name: req.body.name,
      id: req.body.id,
  
      interval: "month",
      currency: "gbp"
    },  {
          stripe_account: req.body.account
       })
    .then(function(plan) {
      res.status(200).send(plan);
    });
  }catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
  
})
router.post("/customer-create", async (req, res)=>{
  try{
    const customer = await stripe.customers.create({
      description: req.body.description,
      source: "tok_visa" //TODO Pass proper payment detail
    },{
        stripe_account: req.body.account
   	}).then(function(customer) {
       res.status(200).send(customer);
    });

  }catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
})
router.post("/subs-create", async (req, res)=>{
  try{
    const subscription = await stripe.subscriptions.create({

      // Rory, one of James' customers
      customer: req.body.customer,

      // James' plan for his wifi
      plan: req.body.plan,

      // Application fee
      application_fee_percent: 50
  }, {

      // Platform account (Rory)
      stripe_account: req.body.account
  })
  .then(function(err, subscription) {
      res.status(200).send(subscription);
  });

  }catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
})

 router.delete ("/subs-create", async (req, res) => {
   try{
    const subscription = await stripe.subscriptions.retrieve('sub_49ty4767H20z6a');
    stripe.subscriptions.update('sub_49ty4767H20z6a', {
      cancel_at_period_end: false,
      items: [{
        id: subscription.items.data[0].id,
        plan: 'plan_CBb6IXqvTLXp3f',
      }]
    })
    res.status(200).json({
            message: "Fee penalty has been terminated"
          });
  }catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
  })
     
module.exports = router;
