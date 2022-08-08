const dbConnection = require("../database/connection");

async function registrarse(req, res){
    //Validar campos obligatorios:
    if(!req.body.dni || !req.body.password){
        res.status(400).json({
            msg: "Debe completar los campos obligatorios: 'dni' y 'password'"
        });
    }
    else{
        const query = getQueryRegistrarse(req);
        const pool = await dbConnection.getConnection();
        const result = await pool.request().query(query);
        console.log("result", result)
        if(result.recordsets[0][0].codigo == 1){
            res.status(200).json({
                nombre: result.recordsets[0][0].nombre,
                apellido: result.recordsets[0][0].apellido,
                rol: result.recordsets[0][0].rol,
                dni: result.recordsets[0][0].dni,
                msg: result.recordsets[0][0].msg
            });
        }
        else{
            res.status(203).json({
                msg: result.recordsets[0][0].descripcion
            });
        }
    }    
}

function getQueryRegistrarse(req){
    let query = "EXEC spRegistrarse";
    if(typeof req.body.dni !== 'undefined'){
        query = query + " @dni = '" + req.body.dni + "',";
    }
    if(typeof req.body.nombre !== 'undefined'){
        query = query + " @nombre = " + req.body.nombre + ",";
    }
    if(typeof req.body.apellido !== 'undefined'){
        query = query + " @apellido = '" + req.body.apellido + "',";
    }
    if(typeof req.body.dirección !== 'undefined'){
        query = query + " @dirección = '" + req.body.dirección + "',";
    }
    if(typeof req.body.codBarrio !== 'undefined'){
        query = query + " @codBarrio = " + req.body.codBarrio + ",";
    }
    if(typeof req.body.email !== 'undefined'){
        query = query + " @email = '" + req.body.email + "',";
    }
    if(typeof req.body.password !== 'undefined'){
        query = query + " @password = '" + req.body.password + "',";
    }

    if(query.charAt(query.length -1) == ","){
        query = query.slice(0, -1);
    }

    return query;
}

module.exports = {registrarse};