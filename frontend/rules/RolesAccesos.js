
const VECINO_ACCESOS = {
    reclamos: {
        menuHabilitado: true,
        generarReclamo: {
            habilitado: true,
            maxArchivos: 10
        },
        buscarReclamos : {
            habilitado: true,
            verOrigen: false
        },
        controlarReclamos: {
            habilitado: false
        }
    },
    denuncias: {
        menuHabilitado: true,
        realizarDenuncia: {
            habilitado: true,
            maxArchivos: 10
        },
        buscarDenuncias: {
            habilitado: true,
            verOrigen: false
        }
    },
    promociones: {
        menuHabilitado: true,
        publicarPromocion: {
            habilitado: true
        },
        buscarPromociones: {
            habilitado: true,
            filtroOrigen: true
        }
    }
};

const INSPECTOR_ACCESOS = {
    reclamos: {
        menuHabilitado: true,
        generarReclamo: {
            habilitado: true,
            maxArchivos: null
        },
        buscarReclamos : {
            habilitado: true,
            verOrigen: true
        },
        controlarReclamos: {
            habilitado: true
        }
    },
    denuncias: {
        menuHabilitado: false,
        realizarDenuncia: {
            habilitado: true,
            maxArchivos: null
        },
        buscarDenuncias: {
            habilitado: true,
            verOrigen: true
        }
    },
    promociones: {
        menuHabilitado: true,
        publicarPromocion: {
            habilitado: true
        },
        buscarPromociones: {
            habilitado: true,
            filtroOrigen: true
        }
    }
};

const INVITADO_ACCESOS = {
    reclamos: {
        menuHabilitado: false,
        generarReclamo: {
            habilitado: false,
            maxArchivos: null
        },
        buscarReclamos : {
            habilitado: false,
            verOrigen: false
        },
        controlarReclamos: {
            habilitado: false
        }
    },
    denuncias: {
        menuHabilitado: false,
        realizarDenuncia: {
            habilitado: false,
            maxArchivos: null
        },
        buscarDenuncias: {
            habilitado: false,
            verOrigen: false
        }
    },
    promociones: {
        menuHabilitado: false,
        publicarPromocion: {
            habilitado: false
        },
        buscarPromociones: {
            habilitado: true,
            filtroOrigen: false
        }
    }
};

export const GetAccesos = ({rol}) => {
    try {
        if(rol.toUpperCase() === 'VECINO'){
            return VECINO_ACCESOS;
        }
        else if (rol.toUpperCase() === 'INSPECTOR'){
            return INSPECTOR_ACCESOS;
        }
        else {
            return INVITADO_ACCESOS;
        }
    } catch (error) {
        throw error   
    }
};