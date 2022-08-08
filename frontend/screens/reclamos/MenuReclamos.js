import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import Screen from '../../components/Screen';
import { CUSTOM_BUTTONS, DEFAULT_BUTTONS_CONTAINER } from '../../styles/Theme';

const MenuReclamos = props => {
    const usuarioSesion = props.route.params;

    const GenerarReclamoButton = () => {
        return (
            <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer} >
                <CustomButton style={CUSTOM_BUTTONS.button1} onPress={() => props.navigation.navigate('NuevoReclamo', usuarioSesion)}>
                    Generar Reclamo
                </CustomButton>
            </View>
        );
    };

    const BuscarReclamosButton = () => {
        return (
            <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer} >
                <CustomButton style={CUSTOM_BUTTONS.button1} onPress={() => props.navigation.navigate('BuscarReclamo', usuarioSesion)}>
                    Buscar Reclamos
                </CustomButton>
            </View>
        );
    };

    const ControlarReclamosButton = () => {
        return (
            <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer} >
                <CustomButton style={CUSTOM_BUTTONS.button1}>
                    Controlar Reclamos
                </CustomButton>
            </View>
        );
    }

    return (
        <Screen>
            {usuarioSesion.accesos.reclamos.generarReclamo.habilitado ? <GenerarReclamoButton /> : null}
            {usuarioSesion.accesos.reclamos.buscarReclamos.habilitado ? <BuscarReclamosButton /> : null}
            {usuarioSesion.accesos.reclamos.controlarReclamos.habilitado ? <ControlarReclamosButton /> : null}
        </Screen>
    );
}

const styles = StyleSheet.create({

});

export default MenuReclamos;