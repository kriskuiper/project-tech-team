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

  fetch('https://untappd.com/oauth/authorize/?client_id=' + process.env.CLIENTID + '&client_secret=' + process.env.CLIENTSECRET + '&response_type=code&redirect_url=' + REDIRECT_URL + '&code=' + CODE, {
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
            let beer_name = data.response.user.recent_brews.items[i].beer.beer_name;
            let beer_label = data.response.user.recent_brews.items[i].beer.beer_label;
            let beer_description = data.response.user.recent_brews.items[i].beer.beer_description;
            let beer_brewery = data.response.user.recent_brews.items[i].brewery.brewery_name;
            objectBeer = {
              beer: {
                bid: beer_bid,
                name: beer_name,
                img: beer_label,
                description: beer_description,
                brewery: beer_brewery
              }
            };

            beersArray.push(objectBeer);
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
                age: null,
                gender: null,
                prefered_age: {
                  min: null,
                  max: null
                },
                prefered_gender: null
              };
            }
          }

          User.find({
            'username': req.session.user.username
          }).exec(function(err, user) {
            if (err) return handleError(err);

            console.log(req.session.user.username);
            console.log(user.length);

            if (user.length > 0) {
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
              if (req.session.password == null) {
                res.redirect("/set-password")
              } else {
                res.redirect("/")
              }
            }
          });
        })
        .catch(error => console.error('Error:', error))
    })
    .catch(error => console.error('Error:', error))
}

module.exports = untappdAuth;
