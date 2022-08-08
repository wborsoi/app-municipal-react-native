const express = require('express');
const router = express.Router();
const RegistrarseController = require("../controllers/RegistrarseController");

router.post("/registro", RegistrarseController.registrarse);

module.exports = router;