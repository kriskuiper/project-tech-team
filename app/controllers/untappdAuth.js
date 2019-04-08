const express = require("express");
const bodyParser = require('body-parser');
const session = require("express-session");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const User = require("../models/User");
require("dotenv").config();

function untappdAuth(req, res) {

  const CODE = req.query.code
  let REDIRECT_URL = 'https://untappdtest.herokuapp.com/untappd-authentication'

  fetch('https://untappd.com/oauth/authorize/?client_id=' + process.env.CLIENTID + '&client_secret=' + process.env.CLIENTSECRET + '&response_type=code&redirect_url=' + REDIRECT_URL + '&code=' + CODE , {
    method: 'GET'
    })
  .then(response => response.json())
  .then(function(data) {
    console.log(data);


    const ACCESS_TOKEN = data.response.access_token
    fetch('https://api.untappd.com/v4/user/info?access_token=' + ACCESS_TOKEN, {
      method: 'GET'
      })
    .then(response => response.json())
    .then(function(data) {

      setSession();

      function setSession(error) {
          if (error) {
              next(error);
          } else {
              req.session.user = {
                username: data.response.user.user_name,
                firstName: data.response.user.first_name,
                lastName: data.response.user.last_name,
                profilePicture: data.response.user.user_avatar_hd
              };
          }
      }

      createUser();

      function createUser() {

        User.findOne({ 'username': data.response.user.user_name }, function (err, data) {
          if (err) return handleError(err);

          if (data === null) {

            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                username: data.response.user.user_name.toLowerCase(),
                password: '0000',
                firstName: data.response.user.first_name,
                lastName: data.response.user.last_name
            });

          User.create(newUser);

          } else {
            console.log("User already exists");
          }
        });
      }

      console.log(req.session.user);
      res.redirect("/")
    })
    .catch(error => console.error('Error:', error))
  })
  .catch(error => console.error('Error:', error))
}

module.exports = untappdAuth;
