import promociones from './promociones.json'
import { client } from './ClientDB';


export const getPromociones = async ({nombre, rubro, tipoNegocio, origen, usuarioSesion}) =>{
    let paramsData = {};
    if(nombre){
        paramsData = {...paramsData, nombre: nombre}
    }
    if(rubro){
        paramsData = {...paramsData, rubro: rubro};
    }
    if(tipoNegocio !== "Cualquiera"){
        paramsData = {...paramsData, tipo: tipoNegocio};
    }
    if(tipoNegocio === "Servicio Profesional"){
        paramsData = {...paramsData, tipo: "Servicio"};
    }
    if(origen === "Mis Promociones"){
        paramsData = {...paramsData, documento: usuarioSesion.documento};
    }

    const response = await client.get('/promociones', {params: paramsData});
    return response;
};

export const publicarPromocion = async (promocionObject) => {
    console.log(promocionObject)
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
          }
    };
    const formData = new FormData();
    for(let i = 0; i < promocionObject.files.length ; i++){
        formData.append('files', {
            uri: promocionObject.files[i].uri,
            type: (promocionObject.files[i].mimeType ? promocionObject.files[i].mimeType : "image/jpg"),
            name: (promocionObject.files[i].name ? promocionObject.files[i].name : promocionObject.files[i].uri.split("/").pop())
        });
    }
    formData.append("body", JSON.stringify(promocionObject));
    const response = await client.post('/promociones', formData, config);

    return response;
}