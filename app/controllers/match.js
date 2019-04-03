// require list
//const slug = require("slug");
//const mongoose = require("mongoose");

// display the user people that can be matched with
// items needed from database: User image, name, city
// for each person in database

function showUser() {
    //total users in database
    const users = 10; //users.length
    const userDetails = [];
    let i = 0;

    for (i = 0; i <= users; i++) {
        const { name, image, city } = users[i];
        const userName = name;    
        const userImage = image;    
        const userCity = city;    
        
        userDetails.push(userName , userImage , userCity);
    }
    // Saves the info about the user and sends it to matches.ejs
}
module.exports = showUser;

// function addPost(req, res, next) {
//     try {
//         const url = slug(req.body.title).toLowerCase();
//         const { firstName, lastName, bike } = req.session.user;
//         const newFeedPost = new FeedPost({
//             _id: new mongoose.Types.ObjectId(),
//             url: url,
//             title: req.body.title,
//             author: `${firstName} ${lastName}`,
//             contents: req.body.contents,
//             kms: req.body.kms,
//             bike: bike,
//             location: req.body.location,
//             pictures: []
//         });
        
//         FeedPost.create(newFeedPost);
        
//         // When the form is posted, redirect to the users' feed
//         res.redirect("/my-feed");
//     } catch(error) {
//         next(error);
//     }
// }

// module.exports = addPost;