const dbConnection = require("../database/connection");

async function getDesperfectos(req, res){
    const query = getQueryGetSitios(req);
    const pool = await dbConnection.getConnection();
    const result = await pool.request().query(query);

    if(result.rowsAffected[0] >= 1){
        let desperfectos = [];
        for(let i=0; result.recordset[i]; i++){
            desperfectos.push({
                idDesperfecto: result.recordset[i].idDesperfecto,
                descripcion: result.recordset[i].desperfectos_descripcion,
                rubro: {
                    idRubro: result.recordset[i].idRubro,
                    descripcion: result.recordset[i].rubros_descripcion
                }
            });
        }
        res.status(200).json(desperfectos);
    }
    else{
        res.status(400).json({
            msg: "No se encontraron Registros"
        })
    }
}

function getQueryGetSitios(req){
    let query = "EXEC spGetDesperfectos";
    if(typeof req.query.descripcion !== 'undefined'){
        query = query + " @descripcion = '" + req.query.descripcion + "',";
    }
    if(typeof req.query.idRubro !== 'undefined'){
        query = query + " @idRubro = " + req.query.idRubro + ",";
    }

    
    if(query.charAt(query.length -1) == ","){
        query = query.slice(0, -1);
    }
    return query;
}

module.exports = {getDesperfectos};