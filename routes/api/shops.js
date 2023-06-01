const express = require("express");
const router = express.Router();
const {upload } = require("../../middlewares");

const ctrl = require("../../controllers/shops");





router.get('/', ctrl.getShops);
router.patch("/avatars/:id", upload.single("avatarURL"), ctrl.updateAvatar);

module.exports = router;
