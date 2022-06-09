// IMPORTING THE REQUIRED MODULES
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "i#note#book#admin#samrat&samrat%owner$^&*1";

// IMPORTING THE CUSTOM MOUDLES
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');


// ROUTE 1: Create a User using POST: "/api/auth/createuser". Doesn't require authentication
router.post('/createuser', [
     body('name', "Enter the valid name").isLength({ min: 3 }),
     body('email', "Enter the valid email").isEmail(),
     body('password', "Password must be of atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {

     // Finds the validation errors in this request and wraps them in an object with handy functions
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }

     // Creates the user and checks whether the email exists already or not
     try {

          let user = await User.findOne({ email: req.body.email });
          if (user) {
               return res.status(400).json({ error: "Sorry a user with this email already exists" });
          }
          const salt = await bcrypt.genSalt(10);
          const secPass = await bcrypt.hash(req.body.password, salt);

          user = await User.create({
               name: req.body.name,
               email: req.body.email,
               password: secPass
          });

          const data = {
               user: {
                    id: user.id
               }
          }
          const authToken = jwt.sign(data, JWT_SECRET);

          res.json({ authToken });

     } catch (error) {
          console.error(error.message);
          res.status(500).send("An Internal Server Error Occured!");
     }
});


// ROUTE 2: Authenticate a user using POST: "/api/auth/login". Doesn't require authentication
router.post('/login', [
     body('email', "Enter the valid email").isEmail(),
     body('password', "Password can't be blank").exists(),
], async (req, res) => {

     // Finds the validation errors in this request and wraps them in an object with handy functions
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }

     const { email, password } = req.body;
     try {
          let user = await User.findOne({ email });
          if (!user) {
               return res.status(400).json({ error: "Please try to login with correct credentials." });
          }

          const passwordCompare = await bcrypt.compare(password, user.password);
          if (!passwordCompare) {
               return res.status(400).json({ error: "Please try to login with correct credentials." });
          }

          const data = {
               user: {
                    id: user.id
               }
          }
          const authToken = jwt.sign(data, JWT_SECRET);

          res.json({ authToken });

     } catch (error) {
          console.error(error.message);
          res.status(500).send("An Internal Server Error Occured!");
     }
});



// ROUTE 3: Getting loggedin User details using POST: "/api/auth/getuser".   REQUIRE AUTHENTICATION
router.post('/getuser', fetchuser, async (req, res) => {

     try {
          let userId = req.user.id;
          const user = await User.findById(userId).select("-password");
          res.send(user);

     } catch (error) {
          console.error(error.message);
          res.status(500).send("An Internal Server Error Occured!");
     }
});

module.exports = router;