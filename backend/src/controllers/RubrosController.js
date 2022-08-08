const dbConnection = require("../database/connection");

async function getRubros(req, res){
    const query = getQueryGetRubros(req);
    const pool = await dbConnection.getConnection();
    const result = await pool.request().query(query);

    if(result.rowsAffected[0] >= 1){
        res.status(200).json(result.recordsets[0]);
    }
    else{
        res.status(400).json({
            msg: "No se encontraron registros"
        })
    }
}

function getQueryGetRubros(req){
    let query = "EXEC spGetRubros";
    if(typeof req.body.descripcion !== 'undefined'){
        query = query + " @descripcion = '" + req.body.descripcion + "',";
    }

    if(query.charAt(query.length -1) == ","){
        query = query.slice(0, -1);
    }
    return query;
}

module.exports = {getRubros};