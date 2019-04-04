
//This function will add the likes to an array
async function pushLike(req, res) {
    
    //gets the id from the liked user (button like) on click
    //const like = document.getElementById("like").value;

    /* even in de Mark taal */
    // Hiermee krijg ik de waarde van de user die de gebruiker leuk vindt.
    const like = document.getElementById("like").value;

    /* 
    Wanneer er op een button gedrukt wordt:
        Krijg de waarde van een geklikte button
        Stuur de waarde naar een functie
        Stuur de waarde naar een array
        Sla de array op 
    */

    //copy function above
    const users = await User.find();
    res.status(200).render("matches", {users: users});
}
module.exports = pushLike;
