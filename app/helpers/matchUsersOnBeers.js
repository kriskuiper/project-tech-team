async function filterUsersOnBeer(users, query) {
    let filteredUsers = [];

    users.forEach(user => user.beers.forEach(beer => {
        const beerName = beer.beer.name.toLowerCase();

        if (query[beerName]) {
            filteredUsers.push(user);
        }
    }));

    // Remove duplicates from array
    filteredUsers = filteredUsers.filter((item, index) => filteredUsers.indexOf(item) === index);

    return filteredUsers;
}

module.exports = filterUsersOnBeer;
