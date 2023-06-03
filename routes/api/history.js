const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/history');

router.get('/', ctrl.getHistory);
router.post('/', ctrl.setHistory);

module.exports = router;