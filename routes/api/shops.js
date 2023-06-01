const express = require("express");

const ctrl = require("../../controllers/shops");


const router = express.Router();


router.get('/', ctrl.getShops);

module.exports = router;
