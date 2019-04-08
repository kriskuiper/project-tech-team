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
      const beersArray = [];

      for (var i = 0; i < data.response.user.recent_brews.count; i++) {
        let beer_bid = data.response.user.recent_brews.items[i].beer.bid;
        beersArray.push(beer_bid);
      }

      setSession();

      function setSession(error) {
          if (error) {
              next(error);
          } else {
              req.session.user = {
                username: data.response.user.user_name,
                firstName: data.response.user.first_name,
                lastName: data.response.user.last_name,
                profilePicture: data.response.user.user_avatar_hd,
                beers: beersArray,
                token: ACCESS_TOKEN
              };
          }
      }

      createUser();

      function createUser() {

        User.find({ 'username': req.session.user.user_name }).exec( function (err, user) {
          if (err) return handleError(err);

          if (user.length) {
            console.log("Name exisits");
            res.redirect("/")
          } else {
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.session.user.username,
                password: null,
                firstName: req.session.user.firstName,
                lastName: req.session.user.lastName,
                profilePicture: req.session.user.profilePicture,
                beers: beersArray
            });

            User.create(newUser);
            res.redirect("/");
          }
        });
      }
    })
    .catch(error => console.error('Error:', error))
  })
  .catch(error => console.error('Error:', error))
}

module.exports = untappdAuth;
