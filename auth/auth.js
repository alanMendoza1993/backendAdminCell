var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

exports.atutToken = function(req, res, next) {
    var token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            res.status(401).json({
                ok: false,
                error: "error al verificar"
            });
        }

        next();

    });
};