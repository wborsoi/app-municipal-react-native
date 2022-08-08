import React, { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { COLORS, CUSTOM_BUTTONS } from "../styles/Theme";
import CustomButton from "./CustomButton";
import { Ionicons } from '@expo/vector-icons';

const AttachFileButton = props => {
    const [visibleModal, setVisibleModal] = useState(false);

    const adjuntarArchivoHandler = () => {
        setVisibleModal(false);
        if(props.onAdjuntar){
            props.onAdjuntar()
        }
    };

    const sacarFotoHandler = () => {
        setVisibleModal(false);
        if(props.onSacarFoto){
            props.onSacarFoto();
        }        
    }

    return (
        <View>
            <View style={styles.buttonContainer} >
                <CustomButton style={styles.button} onPress={() => setVisibleModal(!visibleModal)} >
                    <Ionicons name="md-add" size={30} color={COLORS.BLUE} style={styles.icon} />
                </CustomButton>
            </View>
            <Modal visible={visibleModal} animationType="slide" transparent={true}>
                <View style={styles.modal}>
                    <TouchableWithoutFeedback onPress={() => setVisibleModal(!visibleModal)}>
                        <View style={{ width: '100%', height: '100%' }}></View>
                    </TouchableWithoutFeedback>
                    <View style={styles.sectionContainer}>
                        <View style={styles.buttonsContainer}>
                            <CustomButton style={CUSTOM_BUTTONS.button2} onPress={sacarFotoHandler}>Sacar Foto</CustomButton>
                            <CustomButton style={CUSTOM_BUTTONS.button2} onPress={adjuntarArchivoHandler}>Adjuntar Archivo</CustomButton>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: COLORS.DARKBLUE
    },
    button: {
        height: '100%',
        justifyContent: 'center'
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    sectionContainer: {
        backgroundColor: COLORS.WHITE,
        width: '100%',
        height: '25%',
        justifyContent: 'center',
        borderTopColor: COLORS.BLUE,
        paddingBottom: 30,
        borderTopWidth: 3
    },
    buttonsContainer: {
        paddingHorizontal: 50,
        flex: 1,
        justifyContent: 'space-evenly'
    },
    listAdjuntos: {
        flexDirection: 'row'
    }
});

export default AttachFileButton;