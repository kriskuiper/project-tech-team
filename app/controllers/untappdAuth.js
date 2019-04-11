const express = require("express");
const bodyParser = require('body-parser');
const session = require("express-session");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const User = require("../models/User");
require("dotenv").config();

async function untappdAuth(req, res) {

  try {

    const CODE = req.query.code
    const REDIRECT_URL = process.env.REDIRECT_URL

    const key = await fetch('https://untappd.com/oauth/authorize/?client_id=' +
      process.env.CLIENTID +
      '&client_secret=' +
      process.env.CLIENTSECRET +
      '&response_type=code&redirect_url=' +
      REDIRECT_URL + '&code=' +
      CODE, {
        method: 'GET'
      }
    );

    const authenticationKey = await key.json();

    createUser(authenticationKey);

    async function createUser(key) {

      const ACCESS_TOKEN = key.response.access_token
      const userFetch = await fetch('https://api.untappd.com/v4/user/info?access_token=' + ACCESS_TOKEN, {
        method: 'GET'
      });
      const userInJSON = await userFetch.json();

      const user = await User.find({
        'username': userInJSON.response.user.user_name
      });

      if (user.length > 0) {
        // Login
        setLoginSession();

        function setLoginSession(error) {
          if (error) {
            next(error);
          } else {
            req.session.user = {
              username: user[0].username,
              firstName: user[0].firstName,
              lastName: user[0].lastName,
              profilePicture: user[0].profilePicture,
              beers: user[0].beers,
              age: user[0].age,
              gender: user[0].gender
            };
            console.log(req.session.user);
          }
        }
        res.redirect("/")
      } else {

        // Sign-up

        const beersArray = [];

        for (var i = 0; i < userInJSON.response.user.recent_brews.count; i++) {
          const beer_bid = userInJSON.response.user.recent_brews.items[i].beer.bid;
          const beer_name = userInJSON.response.user.recent_brews.items[i].beer.beer_name;
          const beer_label = userInJSON.response.user.recent_brews.items[i].beer.beer_label;
          const beer_description = userInJSON.response.user.recent_brews.items[i].beer.beer_description;
          const beer_brewery = userInJSON.response.user.recent_brews.items[i].brewery.brewery_name;
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

        setCreateSession();

        function setCreateSession(error) {
          if (error) {
            next(error);
          } else {
            req.session.user = {
              username: userInJSON.response.user.user_name,
              firstName: userInJSON.response.user.first_name,
              lastName: userInJSON.response.user.last_name,
              profilePicture: userInJSON.response.user.user_avatar_hd,
              beers: beersArray,
              age: null,
              gender: null
            };
          }
        }

        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          username: req.session.user.username,
          password: null,
          firstName: req.session.user.firstName,
          lastName: req.session.user.lastName,
          profilePicture: req.session.user.profilePicture,
          beers: beersArray,
          age: null,
          gender: null
        });

        User.create(newUser);
        if (req.session.password == null) {
          res.redirect("/set-password")
        } else {
          res.redirect("/")
        }
      }
    }
  } catch(error) {
    console.error('Error:', error)
  }
}

module.exports = untappdAuth;
