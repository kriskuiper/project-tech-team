const fetch = require("node-fetch");

function getUsers() {
    return request("https://jsonplaceholder.typicode.com/users");
}

async function request(url) {
    try {
        const {results} = body;
        const response = await fetch(url);
        const body = await response.json();
        return results;
    } catch(error) {
        logError(error);
    }
}

function logError(error) {
    console.error(error);
}

module.exports = getUsers;