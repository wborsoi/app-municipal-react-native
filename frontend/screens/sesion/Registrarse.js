import React, { useState } from 'react';
import { StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import { CUSTOM_BUTTONS, DEFAULT_CONTAINER, DEFAULT_CONTENT_CONTAINER } from '../../styles/Theme';
import * as SesionDB from '../../databases/SesionDB';

const Registrarse = props => {
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registrarseHandle = () => {
        if(!dni || dni.length === 0){
            Alert.alert("Campos Incompletos", "Debe completar el campo DNI para poder continuar", [{text: "Aceptar"}]);
        }
        else if (!email || email.length === 0){
            Alert.alert("Campos Incompletos", "Debe completar el campo Email para poder continuar", [{text: "Aceptar"}]);
        }
        else if (!password || password.length === 0){
            Alert.alert("Campos Incompletos", "Debe completar el campo Contraseña para poder continuar", [{text: "Aceptar"}]);
        }
        else{
            SesionDB.Registrarse(dni,password, email).then(response => {
                Alert.alert("Registro", response.msg, [{text: "Gracias", onPress: () => props.navigation.pop() }]);
            });
        }
    };

    return (
        <Screen title="Registrarse" keyboardDismiss={true}>
            <CustomTextInput placeholder="DNI" onChangeText={setDni} value={dni} />
            <CustomTextInput placeholder="Email" onChangeText={setEmail} value={email} />
            <CustomTextInput placeholder="Contraseña" onChangeText={setPassword} value={password} secureTextEntry={true}/>
            <CustomButton style={{ ...styles.button1, marginVertical: 20 }} onPress={registrarseHandle}>
                Registrarse
            </CustomButton>
        </Screen>
    );
}

const styles = StyleSheet.create({
    ...{

    },
    ...CUSTOM_BUTTONS,
    ...DEFAULT_CONTAINER,
    ...DEFAULT_CONTENT_CONTAINER
});

export default Registrarse;

{/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Header title="Registrarse" />
                <View style={styles.contentContainer} >
                    <CustomTextInput placeholder="DNI" />
                    <CustomTextInput placeholder="Email" />
                    <CustomTextInput placeholder="Contraseña" />
                    <CustomButton style={{ ...styles.button1, marginVertical: 20 }}>
                        Registrarse
                    </CustomButton>
                </View>
            </View>
        </TouchableWithoutFeedback> */}