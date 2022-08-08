import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import { COLORS, CUSTOM_BUTTONS, DEFAULT_BUTTONS_CONTAINER, SIZES } from '../../styles/Theme';
import * as SesionDB from '../../databases/SesionDB';
import * as RolesAccesos from '../../rules/RolesAccesos';

const Inicio = props => {
    const usuarioInvitado = {
        documento: '',
        rol: 'Invitado',
        accesos: RolesAccesos.GetAccesos({ rol: "Invitado" })
    };

    return (
        <Screen title="Inicio de Sesion" keyboardDismiss={true}>
            <View style={styles.contentDistribution} >
                <LoginSection navigation={props.navigation} />
                <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer} >
                    <CustomButton style={CUSTOM_BUTTONS.button2} onPress={() => props.navigation.navigate('BuscarPromocion', usuarioInvitado)} >
                        Ingresar como Invitado
                    </CustomButton>
                </View>
            </View>
        </Screen>
    );
}

const LoginSection = props => {
    const [dniInput, setDniInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const onLoginHandler = () => {
        SesionDB.Login(dniInput, passwordInput).then(response => {
            console.log("loginResponse", response.data);
            if (typeof (response.data.msg) === 'undefined') {
                props.navigation.replace('Home', response.data);
            }
            else {
                Alert.alert("No se pudo iniciar sesion:", response.data.msg, [{ text: "Aceptar" }])
            }
        });
    };

    return (
        <View>
            <CustomTextInput
                placeholder="DNI o Legajo"
                onChangeText={setDniInput}
                value={dniInput} />
            <CustomTextInput
                placeholder="Contraseña"
                onChangeText={setPasswordInput}
                secureTextEntry={true}
                value={passwordInput} />
            <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer} >
                <CustomButton
                    style={CUSTOM_BUTTONS.button1}
                    onPress={onLoginHandler}>
                    Iniciar Sesion
                </CustomButton>
            </View>
            <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer} >
                <CustomButton
                    style={CUSTOM_BUTTONS.button3}
                    onPress={() => props.navigation.navigate('Registrarse')}>
                    Registrarse
                </CustomButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentDistribution: {
        flex: 1,
        justifyContent: 'space-between'
    }
});

export default Inicio;