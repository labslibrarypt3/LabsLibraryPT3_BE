const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../../DATA/helpers/usersDb");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const baseUrl = process.env.BASE_URL;

router.post("/auth", async (req, res) => {
  let user = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.token, salt);

  if (!(await db.getByEmail(user.email))) {
    const newUser = {
      name: user.name,
      email: user.email,
      img: user.img,
      password: hash
    };
    try {
      const userO = await db.insert(newUser);
      const userinfo = db.getByEmail(newUser.email);

      const token = jwt.sign(
        { email: userinfo.email, userId: userinfo.userId },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 240 }
      );

      res.status(200).json(token);
      return;
    } catch (error) {
      res.status(500).json({
        message: "Error registering the User try alternative registering method"
      });
      return;
    }
  } else {
    try {
      const xuser = await db.getByEmail(user.email);

      const token = jwt.sign(
        {
          email: xuser.email,
          userId: xuser.userId
        },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 240 }
      );

      res.status(200).json(token);
      return;
    } catch (error) {
      res.status(500).json({
        message: "Error logging in the User try alternative login method"
      });
    }
  }
});

router.post("/manual", async (req, res) => {
  console.log("regis got here");
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const user = req.body;
  const email = await db.getByEmail(user.email);

  if (!email) {
    const newUser = {
      name: user.name,
      email: user.email,
      password: hash
    };
    console.log("newuser", newUser);
    try {
      const userO = await db.insert(newUser);
      res.status(200).json(newUser);
      return;
    } catch (error) {
      res.status(500).json({
        message: "Error registering the User try alternative registering method"
      });
      return;
    }
  } else {
    res.status(500).json({ message: "user already exist" });
    return;
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const xuser = await db.getByEmail(email);
  try {
    if (email && bcrypt.compareSync(password, xuser.password)) {
      const token = jwt.sign(
        {
          email: xuser.email,
          userId: xuser.userId
        },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 240 }
      );

      const udata = {
        userId: xuser.userId,
        password: token
      };

      res.status(200).json(token);
      return;
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error or authetication failed"
    });
    return;
  }
});

//change password
router.post("/password", async (req, res) => {
  const newPass = req.body.newPassword;
  const password = req.body.password;
  const email = req.body.email;
  const xuser = await db.getByEmail(email);
  const hashed = bcrypt.hashSync(newPass);

  try {
    if (bcrypt.compareSync(password, xuser.password)) {
      const obj = {
        password: hashed
      };
      const updated = await db.update(xuser.userId, obj);
      res
        .status(200)
        .json({ message: "password has been sucessfully updated" });
    } else {
      res.status(400).json({ message: "Could not validate password" });
      return;
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error or authetication failed"
    });
  }
});

//forgot password
router.post("/forgot-password", async (req, res) => {
  const email = req.body.email;
  const xuser = await db.getByEmail(email);
  if (xuser.email === null) {
    res.status(401).json("email not found");
  } else {
    const token = crypto.randomBytes(20).toString("hex");
    const obj = {
      password: token
    };
    const updated = await db.update(xuser.userId, obj);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `theneighborhoodlibrarycom@gmail.com`,
        pass: `${process.env.EMAIL_PASSWORD}`
      }
    });
    const mailOptions = {
      from: "theneighborhoodlibrarycom@gmail.com",
      to: `${email}`,
      subject: "Password reset request",
      text: `Here is the password reset you have requested just click the link and create a new password ${baseUrl}/reset/${token}`
    };

    transporter.sendMail(mailOptions, function(err, response) {
      err
        ? console.error("Problem sending the reset", err)
        : console.log("here is the res:", response);
      res.status(200).json("reset email sent");
    });
  }
});

//reset password
router.post("/reset-password", async (req, res) => {
  const newPass = req.body.newPassword;
  const email = req.body.email;
  const xuser = await db.getByEmail(email);
  const hashed = bcrypt.hashSync(newPass);
  const obj = {
    password: hashed
  };
  try {
    const updated = await db.update(xuser.userId, obj);
    res.status(200).json({ message: "password has been sucessfully updated" });
  } catch (error) {
    res.status(500).json({
      message: "Server error or authetication failed"
    });
  }
});

module.exports = router;
