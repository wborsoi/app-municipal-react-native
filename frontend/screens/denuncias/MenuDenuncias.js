import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import Screen from '../../components/Screen';
import { CUSTOM_BUTTONS, DEFAULT_BUTTONS_CONTAINER } from '../../styles/Theme';

const MenuDenuncias = props => {
    const usuario = props.route.params;

    const RealizarDenunciaButton = () => {
        return (
            <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer}>
                <CustomButton style={CUSTOM_BUTTONS.button1} onPress={() => props.navigation.navigate('NuevaDenuncia', usuario)}>
                    Realizar una Denuncia
                </CustomButton>
            </View>
        );
    };
    const BuscarDenunciasButton = () => {
        return (
            <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer}>
                <CustomButton style={CUSTOM_BUTTONS.button1} onPress={() => props.navigation.navigate('BuscarDenuncia', usuario)}>
                    Buscar Denuncias
                </CustomButton>
            </View>
        );
    }

    return (
        <Screen title="Denuncias">
            {usuario.accesos.denuncias.realizarDenuncia.habilitado ? <RealizarDenunciaButton /> : null}
            {usuario.accesos.denuncias.buscarDenuncias.habilitado ? <BuscarDenunciasButton /> : null}
        </Screen>
    );
}

const styles = StyleSheet.create({

});

export default MenuDenuncias;