const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload')
const cors = require('cors'); 
const puerto = 3100;


const app = express();
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.listen(puerto, () => {
    console.log("El servidor está inicializado en el puerto " + puerto);
});
app.get('/', function (req, res) {
    res.send('Saludos desde express');
});


//Endpoints:
const Login = require("./api/Login");
const Registrarse = require("./api/Registrarse");
const Sitios = require("./api/Sitios");
const Desperfectos = require("./api/Desperfectos");
const Rubros = require("./api/Rubros");
const Denuncias = require("./api/Denuncias");
const Reclamos = require("./api/Reclamos");
const Promociones = require("./api/Promociones");


app.use("/api", Login);
app.use("/api", Registrarse);
app.use("/api", Sitios);
app.use("/api", Desperfectos);
app.use("/api", Rubros);
app.use("/api", Denuncias);
app.use("/api", Reclamos);
app.use("/api", Promociones);

