const { validateJWT } = require("../services/utility");
const userRepo = require('../repositories/user');


module.exports = async function(req, res, next){
    try{
        const userProfile = validateJWT(req.token);
        const user = await userRepo.getById(userProfile._id);
        if(!user) throw new Error();
        req.user = user;
        next();
    }catch (e){
        res.status(401).send("NotAuthorized");
    }
}