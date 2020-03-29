const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/database.config');


module.exports = {
    authenticate, 
    create,
    getAll, 
    getById
};

async function authenticate({email, password}) {
    const user = await User.findOne({email});
    if (email && bcrypt.compareSync(password, user.hash)) {
        const {hash, ...userWithoutHash} = user.toObject();
        const token = jwt.sign({sub: user.id}, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    if (await User.findOne({ user: userParam.email})) {
        throw ("Email " + userParam.email + " ya está tomado");
    }
    const user = new User(userParam);

    if(userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    await user.save();
}