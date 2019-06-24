async function filterUsersOnBeer(users, matchingBeers) {
    let filteredUsers = [];

    users.forEach(user => matchingBeers.forEach(beer => {
        if (user.beers && user.beers.some(userBeer => userBeer.beer.name === beer.beer.name)) {
            filteredUsers.push(user);
        }
    }));

    // Remove duplicates from array
    filteredUsers = filteredUsers.filter((item, index) => filteredUsers.indexOf(item) === index);

    return filteredUsers;
}

module.exports = filterUsersOnBeer;