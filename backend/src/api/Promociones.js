const express = require('express');
const router = express.Router();
const PromocionesController = require("../controllers/PromocionesController");

router.post("/promociones", PromocionesController.postPromocion);

router.get("/promociones", PromocionesController.getPromocion);

router.get("/promociones/archivo", PromocionesController.getArchivo);

module.exports = router;
