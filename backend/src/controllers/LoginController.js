const dbConnection = require("../database/connection");

async function login(req, res){
    const query = "EXEC spLogin '" + req.body.user + "', '" + req.body.password + "';"; 
    const pool = await dbConnection.getConnection();
    const result = await pool.request().query(query);

    if(result.recordsets[0][0].codigo == 1){
        res.status(200).json({
            nombre: result.recordsets[0][0].nombre,
            apellido: result.recordsets[0][0].apellido,
            rol: result.recordsets[0][0].rol,
            documento: result.recordsets[0][0].documento
        });
    }
    else{
        res.status(201).json({
            msg: result.recordsets[0][0].descripcion
        })
    }
}

module.exports = {login};