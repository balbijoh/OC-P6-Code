const jwtoken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // On récupère le token sans le mot-clé "Bearer"
        const token = req.headers.authorization.split(' ')[1];

        // On décode le token pour récupérer l'userId
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