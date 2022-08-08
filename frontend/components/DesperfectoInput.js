import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Modal, TouchableNativeFeedback, ScrollView } from "react-native";
import { FlatList, } from "react-native-gesture-handler";
import { COLORS, CUSTOM_BUTTONS, TEXT_STYLES } from "../styles/Theme";
import CustomButton from "./CustomButton";
import CustomTextInput from "./CustomTextInput";
import Title from "./Title";
import * as DesperfectosDB from '../databases/DesperfectosDB';

const DesperfectoInput = props => {
    const [modalIsActive, setModalIsActive] = useState(false);
    const [modalOtroDesperfecto, setModalOtroDesperfecto] = useState(false);
    const [desperfectos, setDesperfectos] = useState([]);
    const [desperfectoSelected, setDesperfectoSelected] = useState();
    let descripcionInput = "";

    useEffect(() => {
        if (props.onSelect) {
            props.onSelect(desperfectoSelected);
        }
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
            setDesperfectoSelected(item);
            setModalIsActive(false);
            setModalOtroDesperfecto(false);
        };
        return (
            <TouchableNativeFeedback onPress={selectItemHandle}>
                <View style={styles.sitioItemContainer}>
                    <Text><Text style={TEXT_STYLES.boldText}>Descripcion: </Text>{item.descripcion}</Text>
                    <Text><Text style={TEXT_STYLES.boldText}>Rubro: </Text>{item.rubro.descripcion}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    };
    const buscarDesperfectoHandle = () => {
        DesperfectosDB.getDesperfectos(descripcionInput).then(response => {
            setDesperfectos(response);
        })
    };
    const ModalInput = () => {
        return (
            <Modal visible={modalIsActive} transparent={true} animationType='fade' onRequestClose={() => setModalIsActive(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalOverlay} />
                    <View style={styles.modalContent}>
                        <Title>Buscar Desperfecto</Title>
                        <CustomTextInput
                            onChangeText={(value) => descripcionInput = value}
                            placeholder="Descripcion" />
                        <CustomButton style={CUSTOM_BUTTONS.button3} onPress={buscarDesperfectoHandle}>Buscar</CustomButton>
                        <View style={styles.resultadosContainer}>
                            <FlatList
                                data={desperfectos}
                                renderItem={renderItemSitio}
                                keyExtractor={item => item.idDesperfecto}
                                ListFooterComponent={OtroDesperfectoButton}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };
    const OtroDesperfectoButton = () => {
        const otraDesperfectoHandle = () => {
            setModalOtroDesperfecto(true);
        }
        return (
            <CustomButton
                onPress={otraDesperfectoHandle}
                style={{ ...CUSTOM_BUTTONS.button2, ...styles.otroDesperfectoButton }}>Otro Desperfecto</CustomButton>
        );
    };
    const ModalOtraDesperfecto = () => {
        let newDescripcionInput= "";
        const crearOtraDesperfectoHandle = () => {
            setModalIsActive(false);
            setModalOtroDesperfecto(false);
            setDesperfectoSelected({
                descripcion: newDescripcionInput,
                rubro: {
                    descripcion: "Otro"
                }
            });
            props.creaDesperfecto(1);
        };
        return (
            <Modal visible={modalOtroDesperfecto} transparent={true} animationType='fade' onRequestClose={() => setModalOtroDesperfecto(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalOverlay} />
                    <View style={styles.otroModalContent}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Title>Otro Desperfecto</Title>
                            <CustomTextInput
                                onChangeText={(value) => newDescripcionInput = value}
                                placeholder="*Descripcion" />
                            <CustomButton onPress={crearOtraDesperfectoHandle}
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
            <ModalOtraDesperfecto />
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
    otroDesperfectoButton: {
        borderRadius: 0,
        height: 50
    },
    verticalMargin: {
        marginVertical: 10
    }
})

export default DesperfectoInput;