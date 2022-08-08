import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import RadioButton from '../../components/RadioButton';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import { CUSTOM_BUTTONS, DEFAULT_BUTTONS_CONTAINER } from '../../styles/Theme';

const BuscarDenuncia = props => {
    const opcionesTipoDenuncia = ["Mis denuncias", "Hechas hacia mi"];
    const [tipoDenuncia, setTipoDenuncia] = useState(opcionesTipoDenuncia[0]);
    const [numeroDenuncia, setNumeroDenuncia] = useState();
    const usuarioSesion = props.route.params;

    const buscarDenunciaData = {
        numero: numeroDenuncia,
        tipo: tipoDenuncia,
        usuarioSesion: usuarioSesion
    }

    const numberInputHandler = inputText => {
        setNumeroDenuncia(inputText.replace(/[^0-9]/g, ''));
    };

    return (
        <Screen title="Buscar Denuncia" keyboardDismiss={true}>
            <View style={styles.contentDistribution}>
                <View>
                    <Title>Numero de Denuncia</Title>
                    <CustomTextInput 
                        placeholder="(Opcional)"
                        keyboardType="number-pad"
                        maxLength={10}
                        value={numeroDenuncia}
                        onChangeText={numberInputHandler} />
                    <Title>Tipo</Title>
                    <RadioButton
                        selected={tipoDenuncia === opcionesTipoDenuncia[0] ? true : false}
                        onPress={() => setTipoDenuncia(opcionesTipoDenuncia[0])}>
                        {opcionesTipoDenuncia[0]}
                    </RadioButton>
                    <RadioButton
                        selected={tipoDenuncia === opcionesTipoDenuncia[1] ? true : false}
                        onPress={() => setTipoDenuncia(opcionesTipoDenuncia[1])}>
                        {opcionesTipoDenuncia[1]}
                    </RadioButton>
                </View>
                <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer}>
                    <CustomButton style={CUSTOM_BUTTONS.button1} onPress={() => props.navigation.navigate("ResultadosDenuncia", buscarDenunciaData)}>Buscar</CustomButton>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    contentDistribution: {
        flex: 1,
        justifyContent: 'space-between'
    }
});

export default BuscarDenuncia;