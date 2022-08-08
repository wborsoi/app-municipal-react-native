import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, Button } from 'react-native';
import AttachFileButton from '../../components/AttachFileButton';
import AttachViewFiles from '../../components/AttachViewFiles';
import ComentField from '../../components/ComentField';
import DataField from '../../components/DataField';
import Location from '../../components/Location';
import RadioButton from '../../components/RadioButton';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import { COLORS, DEFAULT_BUTTONS_CONTAINER, DEFAULT_CONTENT_CONTAINER } from '../../styles/Theme';

const VerDenuncia = props => {
    const denuncia = props.route.params;
    const formatID = (value, length) => {
        return (value.toString().length < length) ? formatID("0" + value, length) : value;
    };
    useEffect(() => {
        props.navigation.setOptions({ title: ("#D" + formatID(denuncia.idDenuncia, 10))});
    });

    const renderItemMovimiento = ({ item }) => {
        return (
            <View style={styles.movimientoItemContainer}>
                <ComentField
                    fecha={item.fecha}
                    responsable={item.responsable}
                    causa={item.causa} />
            </View>
        );
    }

    const DenunciaDetails = () => {
        return (
            <View>
                <DataField title="Estado">{denuncia.estado}</DataField>
                <DataField title="Descripcion">{denuncia.descripcion}</DataField>
                <Title>Lugar</Title>
                <View style={DEFAULT_CONTENT_CONTAINER.contentContainer}>
                    <Location />
                </View>
                <Title>Adjuntos</Title>
                <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer}>
                    <AttachViewFiles files={denuncia.files} />
                </View>
                <Title>Acepta Responsabilidad</Title>
                <RadioButton disabled={true} selected={denuncia.aceptaResponsabilidad ? true : false}>Acepto la responsabilidad</RadioButton>
                <Title>Movimientos</Title>
            </View>
        );
    }

    return (
        <Screen keyboardDismiss={false}>
            <FlatList
                ListHeaderComponent={DenunciaDetails}
                data={denuncia.movimientos}
                renderItem={renderItemMovimiento}
                keyExtractor={(item) => item.idMovimiento}
                showsVerticalScrollIndicator={false}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    movimientoItemContainer: {
        marginVertical: 10
    }
});

export default VerDenuncia;