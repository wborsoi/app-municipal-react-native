const express = require('express');
const router = express.Router();
const RubrosController = require("../controllers/RubrosController");

router.get("/rubros", RubrosController.getRubros);

module.exports = router;
