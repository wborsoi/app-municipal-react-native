import React, { useState } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { COLORS, TEXT_STYLES } from "../styles/Theme";

const AttachViewFiles = props => {
    const files = props.files;
    const [modalViewFile, setModalViewFile] = useState(false);
    const [viewImagen, setViewImagen] = useState();

    const ViewFile = () => {
        return (
            <Modal visible={modalViewFile} animationType="fade" onRequestClose={() => setModalViewFile(false)}>
                <View style={styles.modalImagen}>
                    <Image source={{ uri: viewImagen.url }} style={{width: '100%', height: '100%' }} />
                </View>
            </Modal>
        );
    }

    const AdjuntoItem = ({ item }) => {
        return (
            <View style={styles.adjuntoItemContainer}>
                <TouchableNativeFeedback style={styles.adjuntoItemContainerButton} onPress={() => verImagenHandle(item)}>
                    <Image source={{ uri: item.url }} style={styles.imageAdjunto} />
                </TouchableNativeFeedback>
            </View>
        );
    }

    const verImagenHandle = (item) => {
        setViewImagen(item);
        setModalViewFile(true);
    }

    return (
        <View>
            <ScrollView horizontal={true}>
                <View style={styles.container}>
                    {files ? files.map((item, index) => {
                        return <AdjuntoItem item={item} key={item.id} />;
                    }) : null}
                </View>
            </ScrollView>
            {viewImagen ?  <ViewFile /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
    imageAdjunto: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 10
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
    modalImagen: {
        flex: 1
    }
});

export default AttachViewFiles;