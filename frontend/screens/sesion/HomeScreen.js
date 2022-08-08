import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import Title from "../../components/Title";
import { COLORS, CUSTOM_BUTTONS, DEFAULT_BUTTONS_CONTAINER, DEFAULT_CONTENT_CONTAINER } from "../../styles/Theme";
import * as RolesAccesos from '../../rules/RolesAccesos';

const HomeScreen = props => {
    const [usuario, setUsuario] = useState({ ...props.route.params, accesos: RolesAccesos.GetAccesos(props.route.params) })

    useEffect(() => {
        props.navigation.setOptions(
            {
                headerRight: () => (
                    <Button
                        onPress={() => props.navigation.replace('Login')}
                        title="Cerrar Sesion"
                        color={COLORS.BLUE}
                    />)
            }
        );
    });

    const ReclamosButton = () => {
        return (
            <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer}>
                <CustomButton
                    style={CUSTOM_BUTTONS.button1}
                    onPress={() => props.navigation.navigate('MenuReclamos', usuario)}>
                    Reclamos
                </CustomButton>
            </View>
        );
    };

    const DenunciasButton = () => {
        return (
            <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer}>
                <CustomButton
                    style={CUSTOM_BUTTONS.button1}
                    onPress={() => props.navigation.navigate('MenuDenuncias', usuario)}>
                    Denuncias
                </CustomButton>
            </View>
        );
    };

    const PromocionesButton = () => {
        return (
            <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer}>
                <CustomButton
                    style={CUSTOM_BUTTONS.button1}
                    onPress={() => props.navigation.navigate('MenuPromociones', usuario)}>
                    Promociones
                </CustomButton>
            </View>
        );
    };

    return (
        <View style={DEFAULT_CONTENT_CONTAINER.contentContainer}>
            {usuario.accesos.reclamos.menuHabilitado ? <ReclamosButton /> : null}
            {usuario.accesos.denuncias.menuHabilitado ? <DenunciasButton /> : null}
            {usuario.accesos.promociones.menuHabilitado ? <PromocionesButton /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    menuFlex: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

export default HomeScreen;