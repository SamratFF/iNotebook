// IMPORTING THE REQUIRED MODULES
const mongoose = require("mongoose");

// MAKING THE USER SCHEMA
const UserSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true,
          unique: true
     },
     password: {
          type: String,
          required: true
     },
     date: {
          type: Date,
          default: Date.now
     }
});

// COMPILING THE SCHEMA TO MAKE IT A MODEL
const User = mongoose.model('user', UserSchema);

// EXPORTING THE SCHEMA
module.exports = User;