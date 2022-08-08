import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView,  Alert } from 'react-native';
import AttachFileButton from '../../components/AttachFileButton';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import { COLORS, CUSTOM_BUTTONS, TEXT_STYLES } from '../../styles/Theme';
import SitioInput from '../../components/SitioInput';
import DesperfectoInput from '../../components/DesperfectoInput';
import * as ReclamosDB from '../../databases/ReclamosDB';
import AttachFileSection from '../../components/AttachFileSection';

const NuevoReclamo = props => {
    const [descripcionInput, setDescripcionInput] = useState("");
    const [sitioInput, setSitioInput] = useState();
    const [desperfectoInput, setDesperfectoInput] = useState();
    const [files, setFiles] = useState([]);
    const [creaSitio, setCreaSitio] = useState(0);
    const [creaDesperfecto, setCreaDesperfecto] = useState(0);
    const usuarioSesion = props.route.params;
    const nuevoReclamoData = {
        documento: usuarioSesion.documento,
        descripcion: descripcionInput,
        sitio: sitioInput,
        desperfecto: desperfectoInput,
        files: files,
        creaSitio: creaSitio,
        creaDesperfecto: creaDesperfecto
    };
    
    const selectInstalacionHandle = (sitio) => {
        setSitioInput(sitio);
    };
    const selectDesperfectoHandle = (desperfecto) => {
        setDesperfectoInput(desperfecto);
    };

    const enviarReclamoHandle = () => {
        if(!sitioInput){
            Alert.alert("No se puede enviar el reclamo", "Debe ingresar una instalacion", [{ text: "Aceptar" }])
        }
        else if (!desperfectoInput){
            Alert.alert("No se puede enviar el reclamo", "Debe indicar el desperfecto", [{ text: "Aceptar" }])
        }
        else if (!descripcionInput || descripcionInput.length === 0){
            Alert.alert("No se puede enviar el reclamo", "Debe escribir la descripcion del reclamo", [{ text: "Aceptar" }])
        }
        else {
            ReclamosDB.generarReclamo(nuevoReclamoData).then(response => {
                if(response.status === 200){
                    Alert.alert("Enviar Reclamo",( response.data.msg + '\nID Reclamo: ' + response.data.idReclamo ), [{ text: "Volver", onPress: () => props.navigation.popToTop() }])
                }
                else{
                    Alert.alert("Error al enviar", response.data.msg, [{ text: "Aceptar"}])
                }
            });
        }
    }


    return (
        <Screen title="Generar Reclamo" >
            <View style={styles.contentDistribution}>
                <ScrollView>
                    <View style={styles.separator} >
                        <Title>Instalacion</Title>
                        <SitioInput
                            placeholder="*Obligatorio"
                            value={sitioInput ? sitioInput.descripcion + '\t-\t' + sitioInput.calle + ' ' + sitioInput.numero : null}
                            onSelect={selectInstalacionHandle}
                            creaSitio={setCreaSitio}
                        />
                    </View>
                    <View style={styles.separator}>
                        <Title>Desperfecto</Title>
                        <DesperfectoInput
                            placeholder="*Obligatorio"
                            value={desperfectoInput ? desperfectoInput.descripcion : null}
                            onSelect={selectDesperfectoHandle}
                            creaDesperfecto={setCreaDesperfecto}
                        />

                    </View>
                    <View style={styles.separator}>
                        <Title>Descripcion</Title>
                        <CustomTextInput
                            placeholder="*Obligatorio"
                            value={descripcionInput}
                            onChangeText={setDescripcionInput}
                            style={TEXT_STYLES.largeTextInput}
                            maxLength={1000}
                            multiline={true} />
                    </View>
                    <View style={styles.separator}>
                        <Title>Adjuntos {files.length > 0 ? ('(' + files.length + ')') : null}</Title>
                    </View>
                    <View>
                        <AttachFileSection
                            files={files}
                            onPickFile={setFiles}
                            usuarioSesion={usuarioSesion}
                        />
                    </View>
                </ScrollView>
                <CustomButton style={CUSTOM_BUTTONS.button1} onPress={enviarReclamoHandle}>Enviar Reclamo</CustomButton>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    contentDistribution: {
        flex: 1,
        justifyContent: 'space-between'
    },
    separator: {
        marginVertical: 5
    },
    largeTextInput: {
        height: 100
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
    }
});

export default NuevoReclamo;