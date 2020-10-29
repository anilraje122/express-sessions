const jwt = require("jsonwebtoken");
const config = require("../config/default.json");

module.exports = async (req, res, next) => {
    //How do we access Token from client Side ?
    const token = req.header('auth-token');
    //Check if token is available or not
    if (!token) {
        return res.status(401).json({ Error: "No Token, Access Denied" });
    }
    const key = config.SECRET_KEY;
    try {
        const decoded = await jwt.verify(token, key);
        // console.log(decoded);
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ Error: "Invalid Token, Access Denied" });
    }
}