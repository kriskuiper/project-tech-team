const express = require("express");
const bodyParser = require('body-parser');
const session = require("express-session");
const fetch = require("node-fetch");

function untappdAuth(req, res) {

  const CODE = req.query.code
  let CLIENTID = 'A0D5D7F766E859E3EF145BD051A3A576D2EA97CF'
  let CLIENTSECRET = 'EBF811599C0F5914F7F37349041336C86926AC40'
  let REDIRECT_URL = 'https://untappdtest.herokuapp.com/untappd-authentication'

  fetch('https://untappd.com/oauth/authorize/?client_id=' + CLIENTID + '&client_secret=' + CLIENTSECRET + '&response_type=code&redirect_url=' + REDIRECT_URL + '&code=' + CODE , {
    method: 'GET'
    })
  .then(response => response.json())
  .then(function(data) {
    // req.user.access_token = data.response.access_token
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
                username = data.response.user.user_name,
                firstName = data.response.user.first_name,
                lastName = data.response.user.last_name,
                profilePicture = data.response.user.user_avatar_hd
              };
              res.redirect("/");
          }
      }
      console.log(data.response.user.user_name);
      res.redirect("/")
    })
    .catch(error => console.error('Error:', error))
  })
  .catch(error => console.error('Error:', error))
}

module.exports = untappdAuth;
