import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import AttachFileButton from '../../components/AttachFileButton';
import AttachFileSection from '../../components/AttachFileSection';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import RadioButton from '../../components/RadioButton';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import { CUSTOM_BUTTONS, DEFAULT_BUTTONS_CONTAINER, TEXT_STYLES } from '../../styles/Theme';
import * as PromocionesDB from '../../databases/PromocionesDB'

const NuevaPromocion = props => {
    const opcionesTipoNegocio = ["Negocio", "Servicio"];
    const [tipoNegocio, setTipoNegocio] = useState(opcionesTipoNegocio[0]);
    const [cuitInput, setCuitInput] = useState("");
    const [nombreInput, setNombreInput] = useState("");
    const [rubroInput, setRubroInput] = useState("");
    const [horariosInput, setHorariosInput] = useState("");
    const [descripcionInput, setDescripcionInput] = useState("");
    const [files, setFiles] = useState([]);
    const usuarioSesion = props.route.params;
    const nuevaPromocionData = {
        documento: usuarioSesion.documento,
        tipo: tipoNegocio,
        cuit: cuitInput,
        nombre: nombreInput,
        descripcion: descripcionInput,
        rubro: rubroInput,
        horarios: horariosInput,
        files: files
    };

    const publicarPromocionHandle = () => {
        if(!cuitInput || cuitInput === ''){
            Alert.alert("Campos incompletos", "Debe completar el campo CUIT para continuar", [{text: "Aceptar"}]);
        }
        else if(!nombreInput || nombreInput === ''){
            Alert.alert("Campos incompletos", "Debe completar el campo Nombre para continuar", [{text: "Aceptar"}]);
        }
        else if(!rubroInput || rubroInput === ''){
            Alert.alert("Campos incompletos", "Debe completar el campo Rubro para continuar", [{text: "Aceptar"}]);
        }
        else if(!horariosInput || horariosInput === ''){
            Alert.alert("Campos incompletos", "Debe completar el campo Horarios para continuar", [{text: "Aceptar"}]);
        }
        else if(!descripcionInput || descripcionInput === ''){
            Alert.alert("Campos incompletos", "Debe completar el campo Descripcion para continuar", [{text: "Aceptar"}]);
        }
        else{
            PromocionesDB.publicarPromocion(nuevaPromocionData).then(response => {
                console.log(response);
                Alert.alert("Publicar Promocion", "La promocion se ha publicado exitosamente\n\nID de promocion: " + response.data.idPromocion , [{
                    text: "Aceptar",
                    onPress: () => props.navigation.popToTop()
                }]);
            });
        }
    };


    return (
        <Screen>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>CUIT</Title>
                <CustomTextInput
                    value={cuitInput}
                    onChangeText={setCuitInput}
                    maxLength={13}
                    placeholder="XX-XXXXXXXX-X" />
                <Title>Tipo de Negocio</Title>
                <RadioButton
                    selected={tipoNegocio === opcionesTipoNegocio[0] ? true : false}
                    onPress={() => setTipoNegocio(opcionesTipoNegocio[0])}>
                    {opcionesTipoNegocio[0]}
                </RadioButton>
                <RadioButton
                    selected={tipoNegocio === opcionesTipoNegocio[1] ? true : false}
                    onPress={() => setTipoNegocio(opcionesTipoNegocio[1])}>
                    {opcionesTipoNegocio[1]}
                </RadioButton>
                <Title>Nombre del {tipoNegocio}</Title>
                <CustomTextInput
                    value={nombreInput}
                    onChangeText={setNombreInput}
                    placeholder={tipoNegocio === opcionesTipoNegocio[0] ? "Ej: Heladeria Almendra" : "Ej: Limpieza Domestica"} />
                <Title>Rubro</Title>
                <CustomTextInput
                    value={rubroInput}
                    onChangeText={setRubroInput}
                    placeholder={tipoNegocio === opcionesTipoNegocio[0] ? "Ej: Heladerias" : "Ej: Limpieza"} />
                <Title>Horarios</Title>
                <CustomTextInput
                    value={horariosInput}
                    onChangeText={setHorariosInput}
                    placeholder="Ej: De Lunes a Viernes de 09:00 a 18:00 hs" />
                <Title>Descripcion</Title>
                <CustomTextInput
                    style={TEXT_STYLES.largeTextInput}
                    multiline={true}
                    value={descripcionInput}
                    onChangeText={setDescripcionInput}
                />
                <Title>Imagenes {files.length > 0 ? ('(' + files.length + ')') : null}</Title>
                <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer}>
                    <AttachFileSection
                        files={files}
                        onPickFile={setFiles}
                        usuarioSesion={usuarioSesion}
                    />
                </View>
                <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer}>
                    <CustomButton style={CUSTOM_BUTTONS.button1} onPress={publicarPromocionHandle}>Publicar</CustomButton>
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
});

export default NuevaPromocion;