const route = require("express").Router();
const User = require("../models/User");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
 
// Register
route.post("/register", async (req, res) => {
  // if(req.body.username=="") 
  // hna tasti w tzid les messages
  const encryptedPass = cryptoJs.AES.encrypt(
    req.body.password,
    process.env.SEC_KEY
  ).toString();
 

  

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: encryptedPass,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
    console.log(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// login
route.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.status(401).send("Wrong credentials!");
    const decryptedPass = cryptoJs.AES.decrypt(
      user.password,
      process.env.SEC_KEY
    );
    const originalPass = decryptedPass.toString(cryptoJs.enc.Utf8);
    originalPass !== req.body.password &&
      res.status(201).send("Wrong credentials!");
    // for never send password:
    
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SEC_JWT,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = route;
