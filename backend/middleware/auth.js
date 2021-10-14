const jwt = require('jsonwebtoken');

// Validation userId et Admin par rapport au token
module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RjfkdlRFempocSl');
        const userId = decodedToken.userId;
        const admin = decodedToken.admin;
        if (req.body.userId && req.body.userId !== userId) {
            return res.status(401).json({error: "Invalid user ID"})
        } else {
            //console.log(decodedToken)
            req.userId = userId;
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Invalid request!' });
    }
};