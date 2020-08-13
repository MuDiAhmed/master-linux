const morgan = require("./morgan");
const morganAccess = morgan.logAll;
const morganError = morgan.logError;
const helmet = require("./helmet");
const express = require("express");
const router = express.Router();
const bearerToken = require('express-bearer-token');

router.use(bearerToken());
router.use(morganAccess);
router.use(morganError);
router.use(helmet);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

module.exports = router;
