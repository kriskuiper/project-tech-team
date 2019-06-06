require("dotenv").config();

function renderCreateAccount(req, res) {
  const authLink = "https://untappd.com/oauth/authenticate/?client_id=" + process.env.CLIENTID + "&response_type=code&redirect_url=" + process.env.REDIRECT_URL;

  res.status(200).render("create-account", {
    authLink: authLink,
    users: null,
  });
}

module.exports = renderCreateAccount;
