const expressJwt = require('express-jwt');
const config = require('../config/database.config.js');
const userService = require('../services/user.service.js');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({secret, isRevoked}).unless({
        path: [
            '/auth',
            '/register',
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    if (!user) {
        return done(null, true);
    }

    done();
}