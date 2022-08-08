import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, ToastAndroid, Image, Alert } from 'react-native';
import AttachFileButton from './AttachFileButton';
import { COLORS, CUSTOM_BUTTONS, DEFAULT_BUTTONS_CONTAINER, DEFAULT_CONTAINER, DEFAULT_CONTENT_CONTAINER, TEXT_STYLES } from '../styles/Theme';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import * as DenunciasDB from '../databases/DenunciasDB';

const AttachFileSection = props => {
    const files = props.files;
    const adjuntarArchivoHandler = async () => {
        const response = await DocumentPicker.getDocumentAsync({});
        if (response.type === "success") {
            props.onPickFile([...files, response]);
        }
    };
    const sacarFotoHandler = async () => {
        const response = await ImagePicker.launchCameraAsync({});
        if (!response.cancelled) {
            props.onPickFile([...files, response]);
        }
    };
    const eliminarItemAdjunto = (item) => {
        const newFiles = files.filter((archivo) => archivo.uri !== item.uri);
        props.onPickFile(newFiles);
    };
    const showToastEliminarItemAdjunto = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Mantener presionado para eliminar",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25, 50
        );
    };
    const AdjuntoItem = ({ item }) => {
        return (
            <View style={styles.adjuntoItemContainer}>
                <TouchableNativeFeedback
                    style={styles.adjuntoItemContainerButton}
                    onLongPress={eliminarItemAdjunto.bind(this, item)}
                    onPress={showToastEliminarItemAdjunto}
                >
                    {item.type === 'image' || item.mimeType.includes('image') ?
                        <Image source={{ uri: item.uri }} style={styles.imageAdjunto} />
                        : <Text style={TEXT_STYLES.boldText}>{'...' + item.uri.slice(item.uri.length - 30, item.uri.length)}</Text>}
                </TouchableNativeFeedback>
            </View>
        );
    };
    const adjuntarButtonCheck = () => {
        const buttonComponent = <AttachFileButton onAdjuntar={adjuntarArchivoHandler} onSacarFoto={sacarFotoHandler} />;
        if (props.usuarioSesion.accesos.denuncias.realizarDenuncia.maxArchivos === null
            || typeof (props.usuarioSesion.accesos.denuncias.realizarDenuncia.maxArchivos) === 'undefined') {
            return buttonComponent;
        }
        else if (props.usuarioSesion.accesos.denuncias.realizarDenuncia.maxArchivos > files.length) {
            return buttonComponent;
        }
        else {
            return null;
        }
    };

    return (
        <ScrollView horizontal={true}>
            <View style={styles.adjuntosContainer} >
                {adjuntarButtonCheck()}
                {files.map((item, index) => {
                    return <AdjuntoItem item={item} key={index} />;
                })}
            </View>
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    adjuntosContainer: {
        flexDirection: 'row',
        marginVertical: 10
    },
    adjuntoItemContainerButton: {
        width: 80,
        height: 80,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
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
    imageAdjunto: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
});

export default AttachFileSection;