const express = require('express');
const router = express.Router();
const pruebaController = require("../controllers/PruebaController");

router.get("/prueba", pruebaController.getPrueba );

router.post("/prueba", pruebaController.postPrueba);

router.delete("/prueba", pruebaController.deletePrueba);

router.put("/prueba", pruebaController.putPrueba);

module.exports = router;