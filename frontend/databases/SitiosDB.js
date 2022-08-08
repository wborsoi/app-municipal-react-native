const DUMMY_DATA = [
    {
        idSitio: 1,
        latitud: null,
        longitud: null,
        calle: 'Polonia',
        numero: 777,
        entreCalleA: 'Merlo',
        entreCalleB: 'San Isidro',
        descripcion: 'Mi casa',
        aCargoDe: 'Juan Ramirez',
        apertura: '09:00:00',
        cierre: '18:00:00',
        comentarios: null
    },
    {
        idSitio: 2,
        latitud: null,
        longitud: null,
        calle: 'Polonia',
        numero: 778,
        entreCalleA: 'Merlo',
        entreCalleB: 'San Isidro',
        descripcion: 'Mi no casa ',
        aCargoDe: 'Juan Ramirez',
        apertura: '09:00:00',
        cierre: '18:00:00',
        comentarios: null
    },
    {
        idSitio: 3,
        latitud: null,
        longitud: null,
        calle: 'Polonia',
        numero: 779,
        entreCalleA: 'Merlo',
        entreCalleB: 'San Isidro',
        descripcion: 'Mi casa',
        aCargoDe: 'Juan Ramirez',
        apertura: '09:00:00',
        cierre: '18:00:00',
        comentarios: null
    },
    {
        idSitio: 4,
        latitud: null,
        longitud: null,
        calle: 'Polonia',
        numero: 780,
        entreCalleA: 'Merlo',
        entreCalleB: 'San Isidro',
        descripcion: 'Mi casa',
        aCargoDe: 'Juan Ramirez',
        apertura: '09:00:00',
        cierre: '18:00:00',
        comentarios: null
    },
    {
        idSitio: 5,
        latitud: null,
        longitud: null,
        calle: 'Polonia',
        numero: 781,
        entreCalleA: 'Merlo',
        entreCalleB: 'San Isidro',
        descripcion: 'Mi casa',
        aCargoDe: 'Juan Ramirez',
        apertura: '09:00:00',
        cierre: '18:00:00',
        comentarios: null
    },
    {
        idSitio: 6,
        latitud: null,
        longitud: null,
        calle: 'Polonia',
        numero: 782,
        entreCalleA: 'Merlo',
        entreCalleB: 'San Isidro',
        descripcion: 'Mi casa',
        aCargoDe: 'Juan Ramirez',
        apertura: '09:00:00',
        cierre: '18:00:00',
        comentarios: null
    },
    {
        idSitio: 7,
        latitud: null,
        longitud: null,
        calle: 'Polonia',
        numero: 783,
        entreCalleA: 'Merlo',
        entreCalleB: 'San Isidro',
        descripcion: 'Mi casa',
        aCargoDe: 'Juan Ramirez',
        apertura: '09:00:00',
        cierre: '18:00:00',
        comentarios: null
    },
    {
        idSitio: 8,
        latitud: null,
        longitud: null,
        calle: 'Polonia',
        numero: 784,
        entreCalleA: 'Merlo',
        entreCalleB: 'San Isidro',
        descripcion: 'Mi casa',
        aCargoDe: 'Juan Ramirez',
        apertura: '09:00:00',
        cierre: '18:00:00',
        comentarios: null
    }
]
import { client } from './ClientDB';

export const GetSitios = async (calle, numero) => {
    let paramsData = {}
    if(calle && calle !== ''){
        paramsData = {...paramsData, calle: calle};
    }
    if(numero && numero !== '' && parseInt(numero) !== 0){
        paramsData = {...paramsData, numero: parseInt(numero)};
    }
    const response = await client.get('/sitios', {params: paramsData});

    return response.data;
}