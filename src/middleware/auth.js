const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({
            "success" : false,
            "message" : "Access denied"
        });
        return;
    }

    const secretKey = process.env.JWT_SECRET;
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            res.status(403).json({
                "success" : false,
                "message" : "Invalid or expired token"
            });
            return;
        }
        req.user = user;
        next();
    });
};


const authorization = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        } else {
            if (!token) {
                res.status(403).json({
                    "success" : false,
                    "message" : "Access denied"
                });
                return;
            }
        }
    };
};

module.exports = {authentication, authorization};