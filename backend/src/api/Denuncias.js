const express = require('express');
const router = express.Router();
const DenunciasController = require("../controllers/DenunciasController");

router.post("/denuncias", DenunciasController.postDenuncia);

router.get("/denuncias", DenunciasController.getDenuncia);

router.get("/denuncias/archivo", DenunciasController.getArchivo);

//Test publicar denuncia + archivos (no se entrega)
router.get("/denuncias/test", DenunciasController.getTestAppDenuncias);

module.exports = router;
