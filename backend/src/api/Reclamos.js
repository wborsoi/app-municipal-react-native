const express = require('express');
const router = express.Router();
const ReclamosController = require("../controllers/ReclamosController");

router.post("/reclamos", ReclamosController.generarReclamo);

router.get("/reclamos", ReclamosController.getReclamos);

router.get("/reclamos/archivo", ReclamosController.getArchivo);


module.exports = router;

