import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Modal, BackHandler, TouchableNativeFeedback, ScrollView, Alert } from "react-native";
import { FlatList, } from "react-native-gesture-handler";
import { COLORS, CUSTOM_BUTTONS } from "../styles/Theme";
import CustomButton from "./CustomButton";
import CustomTextInput from "./CustomTextInput";
import Title from "./Title";
import * as SitiosDB from '../databases/SitiosDB';

const SitioInput = props => {
    const [modalIsActive, setModalIsActive] = useState(false);
    const [modalOtraInstalacion, setModalOtraInstalacion] = useState(false);
    const [sitios, setSitios] = useState([]);
    const [sitioSelected, setSitioSelected] = useState();
    let calle = "";
    let numero = "";

    useEffect(() => {
        if (props.onSelect) {
            props.onSelect(sitioSelected);
        };
    });

    const InputButton = () => {
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={() => setModalIsActive(!modalIsActive)}>
                    <View style={styles.buttonContainer}>
                        {props.value ?
                            <Text style={styles.valueText}>{props.value}</Text> :
                            <Text style={styles.placeholderText}>{props.placeholder}</Text>}
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    };
    const renderItemSitio = ({ item }) => {
        const selectItemHandle = () => {
            setSitioSelected(item);
            setModalIsActive(false);
            setModalOtraInstalacion(false);
        };
        return (
            <TouchableNativeFeedback onPress={selectItemHandle}>
                <View style={styles.sitioItemContainer}>
                    <Text>{item.descripcion}</Text>
                    <Text>{item.calle + ' ' + item.numero}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    };
    const buscarSitioHandle = () => {
        SitiosDB.GetSitios(calle, numero).then(response => {
            console.log(response);
            if(response.msg){
                setSitios([]);
                Alert.alert("Buscar Instalaciones", response.msg, [{text: "Aceptar"}]);
            }
            else{
                setSitios(response);
            }
        });
        
    };
    const ModalInput = () => {
        return (
            <Modal visible={modalIsActive} transparent={true} animationType='fade' onRequestClose={() => setModalIsActive(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalOverlay} />
                    <View style={styles.modalContent}>
                        <Title>Buscar Instalacion</Title>
                        <CustomTextInput
                            onChangeText={(value) => calle = value}
                            placeholder="Calle" />
                        <CustomTextInput
                            onChangeText={(value) => numero = value}
                            placeholder="Numero" />
                        <CustomButton style={CUSTOM_BUTTONS.button3} onPress={buscarSitioHandle}>Buscar</CustomButton>
                        <View style={styles.resultadosContainer}>
                            <FlatList
                                data={sitios}
                                renderItem={renderItemSitio}
                                keyExtractor={item => item.idSitio}
                                ListFooterComponent={OtraInstalacionButton}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };
    const OtraInstalacionButton = () => {
        const otraInstalacionHandle = () => {
            setModalOtraInstalacion(true);
        }
        return (
            <CustomButton
                onPress={otraInstalacionHandle}
                style={{ ...CUSTOM_BUTTONS.button2, ...styles.otraInstalacionButton }}>Otra Instalacion</CustomButton>
        );
    };
    const ModalOtraInstalacion = () => {
        let calleInput = "";
        let numeroInput = "";
        let entreCalleAInput = "";
        let entreCalleBInput = "";
        let descripcionInput = "";
        let comentariosInput = "";
        const crearOtraInstalacionHandle = () => {
            setModalIsActive(false);
            setModalOtraInstalacion(false);
            setSitioSelected({
                latitud: null,
                longitud: null,
                calle: calleInput,
                numero: numeroInput,
                entreCalleA: entreCalleAInput,
                entreCalleB: entreCalleBInput,
                descripcion: descripcionInput,
                aCargoDe: null,
                apertura: null,
                cierre: null,
                comentarios: comentariosInput
            });
            props.creaSitio(1);
        };
        return (
            <Modal visible={modalOtraInstalacion} transparent={true} animationType='fade' onRequestClose={() => setModalOtraInstalacion(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalOverlay} />
                    <View style={styles.otroModalContent}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Title>Otra Instalacion</Title>
                            <CustomTextInput
                                onChangeText={(value) => calleInput = value}
                                placeholder="*Calle" />
                            <CustomTextInput
                                onChangeText={(value) => numeroInput = value}
                                placeholder="*Numero" />
                            <CustomTextInput
                                onChangeText={(value) => entreCalleAInput = value}
                                placeholder="Entre calle A" />
                            <CustomTextInput
                                onChangeText={(value) => entreCalleBInput = value}
                                placeholder="Entre calle B" />
                            <CustomTextInput
                                onChangeText={(value) => descripcionInput = value}
                                placeholder="Descripcion" />
                            <CustomTextInput
                                onChangeText={(value) => comentariosInput = value}
                                placeholder="Comentarios" />
                            <CustomButton onPress={crearOtraInstalacionHandle}
                                style={{ ...CUSTOM_BUTTONS.button3, ...styles.verticalMargin }}>
                                Crear
                            </CustomButton>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    }

    return (
        <View>
            <InputButton />
            <ModalInput />
            <ModalOtraInstalacion />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.BLUE,
        height: 45,
        marginVertical: 5,
        overflow: 'hidden',
    },
    buttonContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 10
    },
    placeholderText: {
        color: 'gray'
    },
    valueText: {
        color: COLORS.DARKBLUE
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalOverlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.DARKBLUE,
        opacity: 0.5
    },
    modalContent: {
        width: '80%',
        height: '90%',
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        padding: 20
    },
    otroModalContent: {
        width: '80%',
        height: 'auto',
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        padding: 20
    },
    resultadosContainer: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.BLUE,
        marginTop: 10,
        overflow: 'hidden'
    },
    sitioItemContainer: {
        borderTopWidth: 0.3,
        borderBottomWidth: 0.3,
        borderColor: 'gray',
        padding: 10
    },
    otraInstalacionButton: {
        borderRadius: 0,
        height: 50
    },
    verticalMargin: {
        marginVertical: 10
    }
})

export default SitioInput;