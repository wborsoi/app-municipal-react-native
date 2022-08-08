import reclamos from './reclamos.json';
import { client } from './ClientDB';

export const buscarReclamos = async (numero, origen, usuarioSesion) => {
    let paramsData = { };
    
    if(numero && numero !== '' && parseInt(numero) != 0){
        paramsData = {...paramsData, idReclamo: parseInt(numero)};
    }
    if(origen === "Mis Reclamos"){
        paramsData = {...paramsData, documento: usuarioSesion.documento};
    }

    const response = await client.get('/reclamos', {params: paramsData});

    return response.data;
}

export const generarReclamo = async (reclamoObject) => {
    console.log("CREAR RECLAMO:\n",reclamoObject);
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
          }
    };
    const formData = new FormData();
    for(let i = 0; i < reclamoObject.files.length ; i++){
        formData.append('files', {
            uri: reclamoObject.files[i].uri,
            type: (reclamoObject.files[i].mimeType ? reclamoObject.files[i].mimeType : "image/jpg"),
            name: (reclamoObject.files[i].name ? reclamoObject.files[i].name : reclamoObject.files[i].uri.split("/").pop())
        });
    }
    formData.append("body", JSON.stringify(reclamoObject));
    const response = await client.post('/reclamos', formData, config);

    return response;
};