const express = require("express");
const router = express.Router();
const {upload } = require("../../middlewares");
const ctrl = require("../../controllers/shops");

router.get('/', ctrl.getShops);
router.patch("/avatars/:id", upload.single("avatarURL"), ctrl.updateAvatar);
router.patch("/products/:id/:name", upload.single("pictureURL"), ctrl.updateDishPicture);

module.exports = router;
