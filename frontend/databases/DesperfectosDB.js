const DUMMY_DATA = [
    {
        idDesperfecto: 1,
        descripcion: "Adherirse al programa AVELLANEDA RECICLA",
        rubro: {
            idRubro: 1,
            descripcion: "Subsecretaría de Gestión de Residuos"
        }
    },
    {
        idDesperfecto: 263,
        descripcion: "Vereda rota por obra nueva de cloaca",
        rubro: {
            idRubro: 2,
            descripcion: "Subsecretaría de Infraestructura"
        }
    },
    {
        idDesperfecto: 2,
        descripcion: "Aguas servidas en la vía pública",
        rubro: {
            idRubro: 2,
            descripcion: "Subsecretaría de Infraestructura"
        }
    },
    {
        idDesperfecto: 3,
        descripcion: "Alarma Vecinal",
        rubro: {
            idRubro: 3,
            descripcion: "Secretaria de Seguridad"
        }
    },
    {
        idDesperfecto: 5,
        descripcion: "Alimentos en mal estado en fábrica o comercio de alimentos",
        rubro: {
            idRubro: 5,
            descripcion: "Subdirección de Bromatología"
        }
    },
    {
        idDesperfecto: 6,
        descripcion: "Alimentos vencidos en fábrica o comercio de alimentos",
        rubro: {
            idRubro: 5,
            descripcion: "Subdirección de Bromatología"
        }
    },
    {
        idDesperfecto: 7,
        descripcion: "Animal con dueño irresponsable suelto en vía pública - ataca , muerde, molesta-.",
        rubro: {
            idRubro: 6,
            descripcion: "Dirección de Zoonosis"
        }
    },
    {
        idDesperfecto: 8,
        descripcion: "Animal maltratado en vía pública o domicilio privado",
        rubro: {
            idRubro: 6,
            descripcion: "Dirección de Zoonosis"
        }
    },
    {
        idDesperfecto: 9,
        descripcion: "Animal mordiendo en vía pública",
        rubro: {
            idRubro: 6,
            descripcion: "Dirección de Zoonosis"
        }
    },
    {
        idDesperfecto: 10,
        descripcion: "Animal que mató en vía pública a otro animal",
        rubro: {
            idRubro: 6,
            descripcion: "Dirección de Zoonosis"
        }
    }
];
import { client } from './ClientDB';

export const getDesperfectos = async (descripcion) => {

    let paramsData = {}
    if(descripcion && descripcion !== ''){
        paramsData = {...paramsData, descripcion: descripcion};
    }
    
    const response = await client.get('/desperfectos', { params: paramsData} );

    return response.data;
}