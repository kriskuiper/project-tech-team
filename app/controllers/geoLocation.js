function geoLocation(req, res) {
    const { location } = req.cookies;
    const geoLocationArr = location.split("-");
    const [ lat, long ] = geoLocationArr;

    res.status(200).json({ lat, long });
}

module.exports = geoLocation;