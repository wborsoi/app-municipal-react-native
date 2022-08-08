import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import Screen from '../../components/Screen';
import { CUSTOM_BUTTONS, DEFAULT_BUTTONS_CONTAINER } from '../../styles/Theme';

const MenuPromociones = props => {
    const usuario = props.route.params;

    const PublicarPromocionButton = () => {
        return (
            <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer}>
                <CustomButton style={CUSTOM_BUTTONS.button1} onPress={() => props.navigation.navigate('NuevaPromocion', usuario)}>
                    Publicar Promocion
                </CustomButton>
            </View>
        );
    };

    const BuscarPromocionesButton = () => {
        return (
            <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer}>
                <CustomButton style={CUSTOM_BUTTONS.button1} onPress={() => props.navigation.navigate('BuscarPromocion', usuario)}>
                    Buscar Promociones
                </CustomButton>
            </View>
        );
    }

    return (
        <Screen>
            {usuario.accesos.promociones.buscarPromociones.habilitado ? <BuscarPromocionesButton /> : null}
            {usuario.accesos.promociones.publicarPromocion.habilitado ? <PublicarPromocionButton /> : null}
        </Screen>
    );
};

const styles = StyleSheet.create({

});

export default MenuPromociones;