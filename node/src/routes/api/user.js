const router = require("express").Router();
const userRepo = require('../../repositories/user');
const auth = require("../../middlewares/auth");

router.post("login", (req, res) => {
    try{
        const token = await userRepo.login(req.body.email, req.body.password);
        res.send(token);
    }catch (e){
        res.status(e.status).send(e.message);
    }
})

router.post("/", async (req, res) => {
    try{
        const user = await userRepo.register(req.body);
        res.status(201).send(user);
    } catch (e){
        res.status(e.status).send(e.message);
    }
})

router.get("/me", auth, async (req, res) => {

})


module.exports = router;
