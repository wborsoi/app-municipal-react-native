const dbConnection = require("../database/connection");
const RECLAMO_MODEL = require("../models/ReclamoModel")
const fs = require('fs');
const path = require('path');
const rutaRaiz = path.join(__dirname + "../../../archivos_reclamos");

async function generarReclamo(req, res) {
    const reqFiles = (req.files ? req.files.files : null);
    const reqBody = (req.body ? JSON.parse(req.body.body) : null);

    console.log("reqFiles", reqFiles)
    console.log("reqBody", reqBody)


    if (typeof reqBody.documento !== 'undefined') {
        let query = getQueryPostReclamo(reqBody);
        dbConnection.getConnection().then((pool) => {
            pool.request().query(query).then((result) => {
                if (result.rowsAffected[0] >= 1) {
                    let reclamo = result.recordset[0];
                    reclamo = { ...reclamo, files: [] };

                    if (reqFiles) {
                        const directorio = reclamo.idReclamo;
                        if (reqFiles) {
                            if (!fs.existsSync(rutaRaiz + "/" + directorio)) {
                                fs.mkdir(rutaRaiz + "/" + directorio, (error) => {
                                    if (error) {
                                        res.status(400).json({
                                            msg: error
                                        });
                                        return;
                                    }
                                    else {
                                        query = "";
                                        // Si son mas de un archivo:
                                        if (reqFiles && Array.isArray(reqFiles)) {

                                            let ruta = "";
                                            let element;
                                            for (let i = 0; reqFiles[i]; i++) {
                                                element = reqFiles[i];
                                                ruta = rutaRaiz + "/" + directorio + "/" + element.name;

                                                element.mv(ruta, function (error) {
                                                    if (error) {
                                                        res.status(400).json({
                                                            msg: error
                                                        });
                                                        return;
                                                    }
                                                });
                                                query = query + " " + getQueryInsertarArchivo(reclamo.idReclamo, element.name);
                                            }

                                            pool.request().query(query).then(() => {
                                                pool.request().query(getQueryGetArchivos(reclamo.idReclamo)).then((resultado) => {
                                                    let archivos = [];
                                                    resultado.recordset.forEach(element => {
                                                        archivos.push(element)
                                                    });
                                                    reclamo = { ...reclamo, files: archivos };
                                                    res.status(200).json(reclamo);
                                                })
                                            })
                                        }
                                        // Si es un archivo:
                                        else {
                                            const element = reqFiles
                                            const ruta = rutaRaiz + "/" + directorio + "/" + element.name;

                                            element.mv(ruta, function (error) {
                                                if (error) {
                                                    res.status(400).json({
                                                        msg: error
                                                    });
                                                    return;
                                                }
                                                else {
                                                    query = getQueryInsertarArchivo(reclamo.idReclamo, element.name);
                                                    pool.request().query(query).then(() => {
                                                        pool.request().query(getQueryGetArchivos(reclamo.idReclamo)).then((resultado) => {
                                                            let archivos = [];
                                                            resultado.recordset.forEach(element => {
                                                                archivos.push(element)
                                                            });
                                                            reclamo = { ...reclamo, files: archivos };
                                                            console.log("LLEGUE", reclamo)
                                                            res.status(200).json(reclamo);
                                                        })
                                                    })
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    }
                    else {
                        res.status(200).json(reclamo);
                    }
                }
                else {
                    res.status(203).json({
                        msg: "No se pudo crear la reclamo. Por favor intente de nuevo."
                    });
                }
            })
        });
    }
    else {
        res.status(203).json({
            msg: "Debe completar los campos obligatorios: owner y descripcion"
        });
    }

}

async function getReclamos(req, res) {
    const query = getQueryGetReclamos(req);
    const pool = await dbConnection.getConnection();
    const result = await pool.request().query(query);
    
    if (result.rowsAffected[0] >= 1) {
        let reclamos = [];
        for (let i = 0; result.recordset[i]; i++) {
            let movimientos = [];
            const queryMovimientos = "SELECT * FROM movimientosReclamo WHERE idReclamo = " + result.recordset[i].idReclamo;
            const resultMovimientos = await pool.request().query(queryMovimientos);

            for(let j = 0; resultMovimientos.recordset[j]; j++){
                movimientos.push({
                    idMovimiento: resultMovimientos.recordset[j].idMovimiento,
                    responsable: resultMovimientos.recordset[j].responsable,
                    causa: resultMovimientos.recordset[j].causa,
                    fecha: resultMovimientos.recordset[j].fecha,
                });
            }

            let files = [];
            const queryFiles = "SELECT * FROM archivos_reclamos WHERE idReclamo = " +  result.recordset[i].idReclamo;
            const resultFiles = await pool.request().query(queryFiles);

            for(let k = 0; resultFiles.recordset[k]; k++){
                files.push({
                    id: resultFiles.recordset[k].id,
                    url: 'http://10.0.2.2:3100/api/reclamos/archivo?id=' + resultFiles.recordset[k].id
                });
            }

            reclamos.push({
                idReclamo: result.recordset[i].idReclamo,
                documento: result.recordset[i].documento,
                descripcion: result.recordset[i].reclamo_descripcion,
                estado: result.recordset[i].estado,
                IdReclamoUnificado: result.recordset[i].IdReclamoUnificado,
                sitio: {
                    idSitio: result.recordset[i].idSitio,
                    latitud: result.recordset[i].latitud,
                    longitud: result.recordset[i].longitud,
                    calle: result.recordset[i].calle,
                    numero: result.recordset[i].numero,
                    entreCalleA: result.recordset[i].entreCalleA,
                    entreCalleB: result.recordset[i].entreCalleB,
                    descripcion: result.recordset[i].sitio_descripcion,
                    aCargoDe: result.recordset[i].aCargoDe,
                    apertura: result.recordset[i].apertura,
                    cierre: result.recordset[i].cierre,
                    comentarios: result.recordset[i].comentarios
                },
                desperfecto: {
                    idDesperfecto: result.recordset[i].idDesperfecto,
                    descripcion: result.recordset[i].desperfecto_descripcion,
                    rubro: {
                        idRubro: result.recordset[i].idRubro,
                        descripcion: result.recordset[i].rubro_descripcion,
                    }
                },
                movimientos: movimientos,
                files: files
            });
        }
        res.status(200).json(reclamos);
    }
    else {
        res.status(203).json({
            msg: "No se encontraron registros"
        })
    }
}

function getQueryGetReclamos(req) {
    let query = "EXEC spGetReclamos";
    if (typeof req.query.documento !== 'undefined') {
        query = query + " @documento = '" + req.query.documento + "',";
    }
    if (typeof req.query.idReclamo !== 'undefined') {
        query = query + " @idReclamo = " + req.query.idReclamo + ",";
    }
    if (typeof req.query.estado !== 'undefined') {
        query = query + " @estado = '" + req.query.estado + "',";
    }
    
    if (query.charAt(query.length - 1) == ",") {
        query = query.slice(0, -1);
    }
    return query;
}


function getQueryPostReclamo(reqBody) {
    let query = "EXEC spPostReclamo";
    if (typeof reqBody.documento !== 'undefined') {
        query = query + " @documento = '" + reqBody.documento + "',";
    }
    if (typeof reqBody.descripcion !== 'undefined') {
        query = query + " @descripcion = '" + reqBody.descripcion + "',";
    }
    if (typeof reqBody.sitio.idSitio !== 'undefined') {
        query = query + " @sitio_idSitio = " + reqBody.sitio.idSitio + ",";
    }
    if (typeof reqBody.sitio.latitud !== 'undefined') {
        query = query + " @sitio_latitud = " + reqBody.sitio.latitud + ",";
    }
    if (typeof reqBody.sitio.longitud !== 'undefined') {
        query = query + " @sitio_longitud = " + reqBody.sitio.longitud + ",";
    }
    if (typeof reqBody.sitio.calle !== 'undefined') {
        query = query + " @sitio_calle = '" + reqBody.sitio.calle + "',";
    }
    if (typeof reqBody.sitio.numero !== 'undefined') {
        query = query + " @sitio_numero = " + reqBody.sitio.numero + ",";
    }
    if (typeof reqBody.sitio.entreCalleA !== 'undefined') {
        query = query + " @sitio_entreCalleA = '" + reqBody.sitio.entreCalleA + "',";
    }
    if (typeof reqBody.sitio.entreCalleB !== 'undefined') {
        query = query + " @sitio_entreCalleB = '" + reqBody.sitio.entreCalleB + "',";
    }
    if (typeof reqBody.sitio.descripcion !== 'undefined') {
        query = query + " @sitio_descripcion = '" + reqBody.sitio.descripcion + "',";
    }
    if (typeof reqBody.sitio.aCargoDe !== 'undefined') {
        query = query + " @sitio_aCargoDe = '" + reqBody.sitio.aCargoDe + "',";
    }
    /* if (typeof req.body.sitio.apertura !== 'undefined') {
        query = query + " @sitio_apertura = '" + req.body.sitio.apertura + "',";
    }
    if (typeof req.body.sitio.cierre !== 'undefined') {
        query = query + " @sitio_cierre = '" + req.body.sitio.cierre + "',";
    } */
    if (typeof reqBody.sitio.comentarios !== 'undefined') {
        query = query + " @sitio_comentarios = '" + reqBody.sitio.comentarios + "',";
    }
    if (typeof reqBody.desperfecto.idDesperfecto !== 'undefined') {
        query = query + " @desperfecto_idDesperfecto = " + reqBody.desperfecto.idDesperfecto + ",";
    }
    if (typeof reqBody.desperfecto.descripcion !== 'undefined') {
        query = query + " @desperfecto_descripcion = '" + reqBody.desperfecto.descripcion + "',";
    }
    if (typeof reqBody.creaDesperfecto !== 'undefined') {
        query = query + " @creaDesperfecto = " + reqBody.creaDesperfecto + ",";
    }
    if (typeof reqBody.creaSitio !== 'undefined') {
        query = query + " @creaSitio = " + reqBody.creaSitio + ",";
    }

    if (query.charAt(query.length - 1) == ",") {
        query = query.slice(0, -1);
    }
    console.log("QUERY: ", query);
    return query;
};

function getQueryInsertarArchivo(id, url) {
    let query = "EXEC spInsertarArchivoReclamo";
    if (typeof id !== 'undefined') {
        query = query + " @idReclamo = " + id + ",";
    }
    if (typeof url !== 'undefined') {
        query = query + " @url = '" + url + "',";
    }

    if (query.charAt(query.length - 1) == ",") {
        query = query.slice(0, -1);
    }

    console.log("insertar Archivo Query:", query)
    return query;
}

function getQueryGetArchivos(idReclamo) {
    return ("SELECT * FROM archivos_reclamos WHERE idReclamo = " + idReclamo + ";");
}

async function getArchivo(req, res) {
    if (typeof req.query.id != 'undefined' && req.query.id) {
        const query = "SELECT * FROM archivos_reclamos WHERE id = " + req.query.id + ";"
        const pool = await dbConnection.getConnection();
        const result = await pool.request().query(query);

        if (result.rowsAffected[0] >= 1) {
            try {
                const nombre = result.recordset[0].url;
                const directorio = result.recordset[0].idReclamo;
                const ruta = path.join(rutaRaiz + "/" + directorio + "/" + nombre);
                res.sendFile(ruta);
            } catch (error) {
                console.log(error)
            }
        }
        else {
            res.status(400).json({
                msg: "No se encontraron registros"
            })
        }
    }
    else {
        res.status(400).json({
            msg: "Debe indicar el id del archivo"
        })
    }
}


module.exports = { generarReclamo, getReclamos , getArchivo};