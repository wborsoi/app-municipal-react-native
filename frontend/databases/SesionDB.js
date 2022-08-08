import usuarios from './usuarios.json';
import { client } from './ClientDB';

export const Login = async (usuario, password) => {
    let body = {
        user: usuario,
        password: password,
    }

    const postLogin = async () => {
        const response = await client.post('/login', body);
        return response
    }

    return postLogin();
};

export const Registrarse = async (dni, password, email) => {
    let bodyData = {}
    if(dni){
        bodyData = {...bodyData, dni: dni};
    }
    if(password){
        bodyData = {...bodyData, password: password};
    }
    if(email){
        bodyData = {...bodyData, email: email};
    }

    const response = await client.post('/registro', bodyData);
    return response.data;
}

