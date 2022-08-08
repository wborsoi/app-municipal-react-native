import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import DataField from '../../components/DataField';
import RadioButton from '../../components/RadioButton';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import { COLORS, CUSTOM_BUTTONS, DEFAULT_BUTTONS_CONTAINER, TEXT_STYLES } from '../../styles/Theme';
import * as DenunciasDB from '../../databases/DenunciasDB';
import AttachFileSection from '../../components/AttachFileSection';

const NuevaDenuncia = props => {
    const [aceptaResponsabilidad, setAceptaResponsabilidad] = useState(false);
    const [descripcionInput, setDescripcionInput] = useState("");
    const [calleInput, setCalleInput] = useState("");
    const [numeroInput, setNumeroInput] = useState();
    const [files, setFiles] = useState([]);
    const usuarioSesion = props.route.params;
    const nuevaDenunciaData = {
        owner: usuarioSesion.documento,
        descripcion: descripcionInput,
        sitio: {
            calle: calleInput,
            numero: numeroInput
        },
        aceptaResponsabilidad: aceptaResponsabilidad,
        files: files
    };

    const enviarDenunciaHandle = () => {
        if(!descripcionInput || descripcionInput.length === 0){
            Alert.alert("Campos incompletos", "Debe completar el campo Descripcion para continuar", [{text: "Aceptar"}]);
        }
        else if (!calleInput || calleInput.length === 0){
            Alert.alert("Campos incompletos", "Debe completar el campo Calle para continuar", [{text: "Aceptar"}]);
        }
        else if (!numeroInput || numeroInput === 0 || numeroInput.length === 0){
            Alert.alert("Campos incompletos", "Debe completar el campo Numero para continuar", [{text: "Aceptar"}]);
        }
        else{
            DenunciasDB.realizarDenuncia(nuevaDenunciaData).then(response => {
                if(response.status === 200){
                    Alert.alert("Enviar Denuncia", "Se ha creado exitosamente la denuncia.\nID: " + response.data.id, [
                        {
                            text: "Aceptar",
                            onPress: () => props.navigation.popToTop()
                        }
                    ]);
                }
                else {
                    Alert.alert("Enviar Denuncia", response.data.msg, [
                        { text: "Aceptar"}
                    ]);
                }
                
            })
        }

    }

    return (
        <Screen title="Realizar una Denuncia" keyboardDismiss={false}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Descripcion</Title>
                <CustomTextInput
                    style={TEXT_STYLES.largeTextInput}
                    multiline={true}
                    value={descripcionInput}
                    onChangeText={setDescripcionInput}
                    placeholder={"*Obligatorio"} />
                <Title>Lugar</Title>
                <CustomTextInput
                    value={calleInput}
                    onChangeText={setCalleInput}
                    placeholder="*Calle"
                />
                <CustomTextInput
                    value={numeroInput}
                    onChangeText={(value)=> setNumeroInput(value.replace(/[^0-9]/g, ''))}
                    keyboardType="numeric"
                    placeholder="*Numero"
                />
                <Title>Adjuntos {files.length > 0 ? ('('+files.length+')') : null}</Title>
                <AttachFileSection 
                    files={files}
                    onPickFile={setFiles}
                    usuarioSesion={usuarioSesion}
                />
                <DataField bodyStyle={styles.justifyText} title="Acepto la responsabilidad">Al aceptar responsabilidad usted deja constancia, en carácter de declaración jurada, que lo indicado en el objeto de la denuncia y pruebas aportadas en caso de falsedad puede dar lugar a una acción judicial por parte del municipio y/o los denunciados</DataField>
                <RadioButton
                    selected={aceptaResponsabilidad ? true : false}
                    onPress={() => setAceptaResponsabilidad(!aceptaResponsabilidad)}
                >
                    Acepto la responsabilidad
                </RadioButton>
            </ScrollView>
            <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer}>
                <CustomButton style={CUSTOM_BUTTONS.button1} onPress={enviarDenunciaHandle}>Enviar</CustomButton>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    locationContainer: {
        marginVertical: 10
    },
    contentDistribution: {
        flex: 1,
        justifyContent: 'space-between'
    },
    justifyText: {
        textAlign: 'justify'
    },
    adjuntoItemContainer: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: COLORS.DARKBLUE,
        borderRadius: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    adjuntosContainer: {
        flexDirection: 'row',
        marginVertical: 10
    },
    imageAdjunto: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    adjuntoItemContainerButton: {
        width: 80,
        height: 80,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default NuevaDenuncia;