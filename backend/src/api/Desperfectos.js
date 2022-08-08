const express = require('express');
const router = express.Router();
const DesperfectosController = require("../controllers/DesperfectosController");

router.get("/desperfectos", DesperfectosController.getDesperfectos );

module.exports = router;
