const express = require('express');
const router = express.Router();
const SitiosController = require("../controllers/SitiosController");

router.get("/Sitios", SitiosController.getSitios);

module.exports = router;
