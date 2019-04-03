const express = require("express");
const bodyParser = require('body-parser');

function untappdAuth(req, res) {

  const CODE = req.query.code
  let CLIENTID = 'A0D5D7F766E859E3EF145BD051A3A576D2EA97CF'
  let CLIENTSECRET = 'EBF811599C0F5914F7F37349041336C86926AC40'
  let REDIRECT_URL = 'https://untappdtest.herokuapp.com/untappd-authentication'

const fetch = require("node-fetch");
// some code
  fetch('https://untappd.com/oauth/authorize/?client_id=' + CLIENTID + '&client_secret=' + CLIENTSECRET + '&response_type=code&redirect_url=' + REDIRECT_URL + '&code=' + CODE , {
    method: 'GET'
    })
  .then(response => response.json())
  .then(function(data) {
    req.user.access_token = data.response.access_token
    console.log(data.response.access_token);
    res.redirect('/')
  })
  .catch(error => console.error('Error:', error))
}

module.exports = untappdAuth;
