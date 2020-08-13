const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const env = require('../../env').getEnv();

const generateSalt = (rounds = env.bcryptRounds) => {
    return bcrypt.genSalt(rounds);
}

const hashString = (value, rounds = env.bcryptRounds) => {
    return bcrypt.hash(value, rounds);
}

const compareWithHash = (value, hash) => {
    return bcrypt.compare(value, hash);
}

const generateJWT = (value) => {
    return jwt.sign(value, env.jwtKey);
}

const validateJWT = (token) => {
    return jwt.verify(token, env.jwtKey);
}

module.exports = {
    generateSalt,
    hashString,
    compareWithHash,
    generateJWT,
    validateJWT
}