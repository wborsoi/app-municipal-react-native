const dbConnection = require("../database/connection");

async function getSitios(req, res){
    const query = getQueryGetSitios(req);
    const pool = await dbConnection.getConnection();
    const result = await pool.request().query(query);

    if(result.rowsAffected[0] >= 1){
        res.status(200).json(result.recordsets[0]);
    }
    else{
        res.status(203).json({
            msg: "No se encontraron Registros"
        })
    }
}

function getQueryGetSitios(req){
    let query = "EXEC spBuscarSitio";
    if(typeof req.query.calle !== 'undefined'){
        query = query + " @calle = '" + req.query.calle + "',";
    }
    if(typeof req.query.numero !== 'undefined'){
        query = query + " @numero = " + req.query.numero + ",";
    }
    if(typeof req.query.entreCalleA !== 'undefined'){
        query = query + " @entreCalleA = '" + req.query.entreCalleA + "',";
    }
    if(typeof req.query.entreCalleB !== 'undefined'){
        query = query + " @entreCalleB = '" + req.query.entreCalleB + "',";
    }
    
    if(query.charAt(query.length -1) == ","){
        query = query.slice(0, -1);
    }
    return query;
}

module.exports = {getSitios};