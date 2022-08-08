const dbConnection = require("../database/connection");
const fs = require('fs');
const path = require('path');
const rutaRaiz = path.join(__dirname + "../../../archivos_promociones");


async function postPromocion(req, res) {
    const reqFiles = (req.files ? req.files.files : null);
    const reqBody = (req.body ? JSON.parse(req.body.body) : null);

    console.log("ReqBody: \n\n",reqBody);

    if (typeof reqBody.documento !== 'undefined') {
        let query = getQueryPostPromocion(reqBody);
        dbConnection.getConnection().then((pool) => {
            pool.request().query(query).then((result) => {
                if (result.rowsAffected[0] >= 1) {
                    let promocion = result.recordset[0];
                    promocion = { ...promocion, files: [] };

                    if (reqFiles) {
                        const directorio = promocion.idPromocion;
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
                                                query = query + " " + getQueryInsertarArchivo(promocion.idPromocion, element.name);
                                            }

                                            pool.request().query(query).then(() => {
                                                pool.request().query(getQueryGetArchivos(promocion.idPromocion)).then((resultado) => {
                                                    let archivos = [];
                                                    resultado.recordset.forEach(element => {
                                                        archivos.push(element)
                                                    });
                                                    promocion = { ...promocion, files: archivos };
                                                    res.status(200).json(promocion);
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
                                                    query = getQueryInsertarArchivo(promocion.idPromocion, element.name);
                                                    pool.request().query(query).then(() => {
                                                        pool.request().query(getQueryGetArchivos(promocion.idPromocion)).then((resultado) => {
                                                            let archivos = [];
                                                            resultado.recordset.forEach(element => {
                                                                archivos.push(element)
                                                            });
                                                            promocion = { ...promocion, files: archivos };
                                                            res.status(200).json(promocion);
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
                        res.status(200).json(promocion);
                    }
                }
                else {
                    res.status(203).json({
                        msg: "No se pudo crear la promocion. Por favor intente de nuevo."
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
async function getPromocion(req, res) {
    const query = getQueryGetPromocion(req);
    const pool = await dbConnection.getConnection();
    const result = await pool.request().query(query);

    if (result.rowsAffected[0] >= 1) {
        let promociones = [];
        for (let i = 0; result.recordset[i]; i++) {
            let files = [];
            const queryFiles = "SELECT * FROM archivos_promociones WHERE idPromocion = " +  result.recordset[i].idPromocion;
            const resultFiles = await pool.request().query(queryFiles);

            for(let k = 0; resultFiles.recordset[k]; k++){
                files.push({
                    id: resultFiles.recordset[k].id,
                    url: 'http://10.0.2.2:3100/api/promociones/archivo?id=' + resultFiles.recordset[k].id
                });
            }

            promociones.push({
                idPromocion: result.recordset[i].idPromocion,
                documento: result.recordset[i].documento,
                cuit: result.recordset[i].cuit,
                nombre: result.recordset[i].nombre,
                tipo: result.recordset[i].tipo,
                rubro: result.recordset[i].rubro,
                horarios: result.recordset[i].horarios,
                descripcion: result.recordset[i].descripcion,
                imagenes: files
            });
        }
        res.status(200).json(promociones);
    }
    else {
        res.status(203).json({
            msg: "No se encontraron registros"
        })
    }
}
async function getArchivo(req, res) {
    if (typeof req.query.id != 'undefined' && req.query.id) {
        const query = "SELECT * FROM archivos_promociones WHERE id = " + req.query.id + ";"
        const pool = await dbConnection.getConnection();
        const result = await pool.request().query(query);

        if (result.rowsAffected[0] >= 1) {
            try {
                const nombre = result.recordset[0].url;
                const directorio = result.recordset[0].idPromocion;
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


function getQueryPostPromocion(reqBody) {
    let query = "EXEC spPostPromocion";
    if (typeof reqBody.documento !== 'undefined') {
        query = query + " @documento = '" + reqBody.documento + "',";
    }
    if (typeof reqBody.cuit !== 'undefined') {
        query = query + " @cuit = '" + reqBody.cuit + "',";
    }
    if (typeof reqBody.nombre !== 'undefined') {
        query = query + " @nombre = '" + reqBody.nombre + "',";
    }
    if (typeof reqBody.tipo !== 'undefined') {
        query = query + " @tipo = '" + reqBody.tipo + "',";
    }
    if (typeof reqBody.rubro !== 'undefined') {
        query = query + " @rubro = '" + reqBody.rubro + "',";
    }
    if (typeof reqBody.horarios !== 'undefined') {
        query = query + " @horarios = '" + reqBody.horarios + "',";
    }
    if (typeof reqBody.descripcion !== 'undefined') {
        query = query + " @descripcion = '" + reqBody.descripcion + "',";
    }

    if (query.charAt(query.length - 1) == ",") {
        query = query.slice(0, -1);
    }
    console.log("QUERY: ", query)
    return query;
};

function getQueryInsertarArchivo(id, url) {
    let query = "EXEC spInsertarArchivoPromocion";
    if (typeof id !== 'undefined') {
        query = query + " @idPromocion = " + id + ",";
    }
    if (typeof url !== 'undefined') {
        query = query + " @url = '" + url + "',";
    }

    if (query.charAt(query.length - 1) == ",") {
        query = query.slice(0, -1);
    }

    return query;
}

function getQueryGetArchivos(idPromocion) {
    return ("SELECT * FROM archivos_promociones WHERE idPromocion = " + idPromocion + ";");
}

function getQueryGetPromocion(req) {
    let query = "EXEC spGetPromociones";
    if (typeof req.query.idPromocion !== 'undefined') {
        query = query + " @idPromocion = " + req.query.idPromocion + ",";
    }
    if (typeof req.query.cuit !== 'undefined') {
        query = query + " @cuit = '" + req.query.cuit + "',";
    }
    if (typeof req.query.nombre !== 'undefined') {
        query = query + " @nombre = '" + req.query.nombre + "',";
    }
    if (typeof req.query.tipo !== 'undefined') {
        query = query + " @tipo = '" + req.query.tipo + "',";
    }
    if (typeof req.query.rubro !== 'undefined') {
        query = query + " @rubro = '" + req.query.rubro + "',";
    }
    if (typeof req.query.horarios !== 'undefined') {
        query = query + " @horarios = '" + req.query.horarios + "',";
    }
    if (typeof req.query.descripcion !== 'undefined') {
        query = query + " @descripcion = '" + req.query.descripcion + "',";
    }

    if (query.charAt(query.length - 1) == ",") {
        query = query.slice(0, -1);
    }
    return query;
}


module.exports = {postPromocion, getPromocion, getArchivo};