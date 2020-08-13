const router = require("express").Router();
const users = require("./user");

router.use("/api/users", users);

module.exports = router;
