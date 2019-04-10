require("dotenv").config();

function renderLogin(req, res,) {
  const authLink = 'https://untappd.com/oauth/authenticate/?client_id=' + CLIENTID + '&response_type=code&redirect_url=' + REDIRECT_URL;

    res.status(200).render("login", {error: false, authLink: authLink});
}

module.exports = renderLogin;
