const dbConnection = require("../database/connection");

async function getPrueba(req, res){
    const pool = await dbConnection.getConnection();
    const result = await pool.request().query("SELECT * FROM tabla_prueba");

    res.json(result.recordsets[0]);
}

async function postPrueba(req, res){
    const nombre = req.headers.nombre;
    const descripcion = req.headers.descripcion;
    const cantidad = parseInt(req.headers.cantidad);

    const query = "INSERT INTO tabla_prueba VALUES ('" + nombre + "', '" + descripcion + "', " + cantidad + ");";
    const pool = await dbConnection.getConnection();
    const result = await pool.request().query(query);

    res.json(result);
    
}

async function deletePrueba(req, res){
    const pool = await dbConnection.getConnection();
    const result = await pool.request().query("DELETE FROM tabla_prueba WHERE ID = " + req.headers.id);

    res.json(result);
}

async function putPrueba(req, res){
    const id = parseInt(req.headers.id);
    const nombre = req.headers.nombre;
    const descripcion = req.headers.descripcion;
    const cantidad = parseInt(req.headers.cantidad);

    const pool = await dbConnection.getConnection();
    const result = await pool.request().query("UPDATE tabla_prueba SET nombre = '" + nombre + "', descripcion = '" + descripcion + "', cantidad = " + cantidad + " WHERE id = " + id );

    res.json(result);
}

module.exports = {getPrueba, postPrueba, deletePrueba, putPrueba};