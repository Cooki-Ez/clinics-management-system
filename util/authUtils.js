const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (passPlain) => {
    const passHashed = bcrypt.hashSync(passPlain, salt);
    return passHashed;
}

exports.comparePasswords = (passPlain, passHash) => {
    const res = bcrypt.compareSync(passPlain, passHash);
    return res;
}

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if(loggedUser) next();
    else throw new Error('unauthorized access');
}

exports.permitOnlyForAdmin = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    const admin = req.session.admin;
    if (admin) {
        next();
    }else if(loggedUser){
        throw new Error('Access only for admins!');
    } else {
        throw new Error('Unauthorized access!');
    }
}