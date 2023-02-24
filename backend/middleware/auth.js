const jwtoken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwtoken.verify(token, process.env.AUTHORIZATION_TOKEN);
        const userId = decodedToken.userId;

        req.auth = {
            userId: userId
        };
        
        next();
    } catch(error) {
        res.status(401).json({ error: error });
    }
};