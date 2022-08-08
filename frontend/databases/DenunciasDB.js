import denuncias from './denuncias.json';
import { client } from './ClientDB';

export const buscarDenuncias = async (numero, tipo, usuarioSesion) => {
    let paramsData = {};
    if(numero){
        paramsData = {...paramsData, idDenuncia: numero}
    }
    if(tipo){
        paramsData = {...paramsData, owner: usuarioSesion.documento};
    }

    const response = await client.get('/denuncias');
    return response;
};

export const realizarDenuncia = async (denunciaObject) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
          }
    };
    const formData = new FormData();
    for(let i = 0; i < denunciaObject.files.length ; i++){
        formData.append('files', {
            uri: denunciaObject.files[i].uri,
            type: (denunciaObject.files[i].mimeType ? denunciaObject.files[i].mimeType : "image/jpg"),
            name: (denunciaObject.files[i].name ? denunciaObject.files[i].name : denunciaObject.files[i].uri.split("/").pop())
        });
    }
    formData.append("body", JSON.stringify(denunciaObject));
    const response = await client.post('/denuncias', formData, config);

    return response;
}

//1027922