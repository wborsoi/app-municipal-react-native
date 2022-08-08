import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Button } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import RadioButton from '../../components/RadioButton';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import { CUSTOM_BUTTONS } from '../../styles/Theme';

const BuscarReclamo = props => {
    const usuarioSesion = props.route.params;
    const opcionesInformadoPor = ["Cualquiera", "Mis Reclamos"];
    const [informadoPor, setInformadoPor] = useState(opcionesInformadoPor[1]);
    const [numeroReclamo, setNumeroReclamo] = useState();
    const buscarReclamoData ={
        numero: numeroReclamo,
        origen: informadoPor,
        usuarioSesion: usuarioSesion
    };

    const numberInputHandler = inputText => {
        setNumeroReclamo(inputText.replace(/[^0-9]/g, ''));
    };

    return (
        <Screen title="Buscar Reclamos" keyboardDismiss={true}>
            <View style={styles.contentDistribution} >
                <View>
                    <Title>Numero de Reclamo</Title>
                    <CustomTextInput 
                        placeholder="(Opcional)"
                        value={numeroReclamo}
                        onChangeText={numberInputHandler}
                        keyboardType="number-pad"
                        maxLength={10}
                    />
                    <Title>Realizados por</Title>
                    <RadioButton
                        selected={informadoPor === opcionesInformadoPor[1] ? true : false}
                        onPress={() => setInformadoPor(opcionesInformadoPor[1])}>
                        {opcionesInformadoPor[1]}
                    </RadioButton>
                    <RadioButton
                        selected={informadoPor === opcionesInformadoPor[0] ? true : false}
                        onPress={() => setInformadoPor(opcionesInformadoPor[0])}>
                        {opcionesInformadoPor[0]}
                    </RadioButton>
                </View>
                <View>
                    <CustomButton style={CUSTOM_BUTTONS.button1} onPress={() => props.navigation.navigate('ResultadosReclamos', buscarReclamoData)}>
                        Buscar
                    </CustomButton>
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

export default BuscarReclamo;