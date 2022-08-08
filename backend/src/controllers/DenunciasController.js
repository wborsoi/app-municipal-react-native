const dbConnection = require("../database/connection");
const fs = require('fs');
const path = require('path');

const rutaRaiz = path.join(__dirname + "../../../archivos_denuncias");

function postDenuncia(req, res) {
    const reqFiles = (req.files ? req.files.files : null);
    const reqBody = (req.body ? JSON.parse(req.body.body) : null);

    console.log("Req Files: ", reqFiles)
    console.log("Req Body: ", reqBody)

    if (typeof reqBody.owner !== 'undefined') {
        let query = getQueryPostDenuncia(reqBody);
        dbConnection.getConnection().then((pool) => {
            pool.request().query(query).then((result) => {
                const getFiles = function (idDenuncias) {
                    let files = [];
                    const queryArchivos = getQueryGetArchivos(idDenuncias);
                    pool.request().query(queryArchivos).then((resultArchivos) => {
                        resultArchivos.recordset.forEach(element => {
                            files.push(element);
                        });
                        return files;
                    });
                };

                if (result.rowsAffected[0] >= 1) {
                    let denuncia = result.recordset[0];
                    denuncia = { ...denuncia, files: [] };

                    if (reqFiles) {
                        const directorio = denuncia.id;

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
                                                query = query + " " + getQueryInsertarArchivo(denuncia.id, element.name);
                                            }

                                            pool.request().query(query).then(() => {
                                                pool.request().query(getQueryGetArchivos(denuncia.id)).then((resultado) => {
                                                    let archivos = [];
                                                    resultado.recordset.forEach(element => {
                                                        archivos.push(element)
                                                    });
                                                    denuncia = { ...denuncia, files: archivos };
                                                    res.status(200).json(denuncia);
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
                                                    query = getQueryInsertarArchivo(denuncia.id, element.name);
                                                    pool.request().query(query).then(() => {
                                                        pool.request().query(getQueryGetArchivos(denuncia.id)).then((resultado) => {
                                                            let archivos = [];
                                                            resultado.recordset.forEach(element => {
                                                                archivos.push(element)
                                                            });
                                                            denuncia = { ...denuncia, files: archivos };
                                                            res.status(200).json(denuncia);
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
                        res.status(200).json(denuncia);
                    }
                }
                else {
                    res.status(203).json({
                        msg: "No se pudo crear la denuncia. Por favor intente de nuevo."
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


async function getDenuncia(req, res) {
    const query = getQueryGetDenuncia(req);
    const pool = await dbConnection.getConnection();
    const result = await pool.request().query(query);

    if (result.rowsAffected[0] >= 1) {
        let denuncias = [];
        for (let i = 0; result.recordset[i]; i++) {
            let movimientos = [];
            const queryMovimientos = "SELECT * FROM movimientosDenuncia WHERE idDenuncia = " + result.recordset[i].idDenuncias;
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
            const queryFiles = "SELECT * FROM archivos_denuncias WHERE idDenuncias = " +  result.recordset[i].idDenuncias;
            const resultFiles = await pool.request().query(queryFiles);

            for(let k = 0; resultFiles.recordset[k]; k++){
                files.push({
                    id: resultFiles.recordset[k].id,
                    url: 'http://10.0.2.2:3100/api/denuncias/archivo?id=' + resultFiles.recordset[k].id
                });
            }

            denuncias.push({
                idDenuncia: result.recordset[i].idDenuncias,
                descripcion: result.recordset[i].descripcionDenuncia,
                estado: result.recordset[i].estado,
                aceptaResponsabilidad: result.recordset[i].aceptaResponsabilidad,
                movimientos: movimientos,
                files: files
            });
        }
        res.status(200).json(denuncias);
    }
    else {
        res.status(203).json({
            msg: "No se encontraron registros"
        })
    }

}

async function getArchivo(req, res) {
    if (typeof req.query.id != 'undefined' && req.query.id) {
        const query = "SELECT * FROM archivos_denuncias WHERE id = " + req.query.id + ";"
        const pool = await dbConnection.getConnection();
        const result = await pool.request().query(query);

        if (result.rowsAffected[0] >= 1) {
            try {
                const nombre = result.recordset[0].url;
                const directorio = result.recordset[0].idDenuncias;
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

function getQueryPostDenuncia(reqBody) {
    let query = "EXEC spCrearDenuncia";
    if (typeof reqBody.owner !== 'undefined') {
        query = query + " @documento = '" + reqBody.owner + "',";
    }
    if (typeof reqBody.idSitio !== 'undefined') {
        query = query + " @idSitio = " + reqBody.idSitio + ",";
    }
    if (typeof reqBody.descripcion !== 'undefined') {
        query = query + " @descripcion = '" + reqBody.descripcion + "',";
    }
    if (typeof reqBody.aceptaResponsabilidad !== 'undefined') {
        query = query + " @aceptaResponsabilidad = " + (reqBody.aceptaResponsabilidad ? 1 : 0) + ",";
    }

    if (query.charAt(query.length - 1) == ",") {
        query = query.slice(0, -1);
    }
    return query;
}

function getQueryGetDenuncia(req) {
    let query = "EXEC spBuscarDenuncia";
    if (typeof req.query.offset !== 'undefined') {
        query = query + " @offset = " + req.query.offset + ",";
    }
    if (typeof req.query.limit !== 'undefined') {
        query = query + " @limit = " + req.query.limit + ",";
    }
    if (typeof req.query.owner !== 'undefined') {
        query = query + " @owner = '" + req.query.owner + "',";
    }

    if (query.charAt(query.length - 1) == ",") {
        query = query.slice(0, -1);
    }
    return query;
}


function getQueryInsertarArchivo(id, url) {
    let query = "EXEC spInsertarArchivoDenuncia";
    if (typeof id !== 'undefined') {
        query = query + " @idDenuncias = " + id + ",";
    }
    if (typeof url !== 'undefined') {
        query = query + " @url = '" + url + "',";
    }

    if (query.charAt(query.length - 1) == ",") {
        query = query.slice(0, -1);
    }
    return query;
}

function getQueryGetArchivos(idDenuncias) {
    return ("SELECT * FROM archivos_denuncias WHERE idDenuncias = " + idDenuncias + ";");
}

function getTestAppDenuncias(req, res) {
    const ruta = path.join(__dirname + "../../../testDenunciasAPP.html");
    res.status(200).sendFile(ruta);
}

module.exports = { postDenuncia, getDenuncia, getArchivo, getTestAppDenuncias };