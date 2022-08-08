import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, Button } from 'react-native';
import DataField from '../../components/DataField';
import Location from '../../components/Location';
import Screen from '../../components/Screen';
import { COLORS, SIZES } from '../../styles/Theme';
import ComentField from '../../components/ComentField';
import AttachViewFiles from '../../components/AttachViewFiles';
import Title from '../../components/Title';

const VerReclamo = props => {
    const reclamo = props.route.params;
    const formatID = (value, length) => {
        return (value.toString().length < length) ? formatID("0" + value, length) : value;
    };
    useEffect(() => {
        props.navigation.setOptions(
            { title: ("#R" + formatID(reclamo.idReclamo, 10)) }
        );
    });

    const renderItemMovimiento = ({ item }) => {
        return <ComentField
            fecha={item.fecha}
            responsable={item.responsable}
            causa={item.causa} />;
    }

    const ReclamosDetails = () => {
        return (
            <View>
                <DataField style={styles.textContainer}
                    title="Estado">
                    {reclamo.estado}
                </DataField>
                <DataField style={styles.textContainer}
                    title="Ubicacion">
                    {reclamo.sitio.calle + ' ' + reclamo.sitio.numero}
                </DataField>

                <Location />

                <DataField style={styles.textContainer}
                    title="Descripcion">
                    {reclamo.descripcion}
                </DataField>
                <Title>Adjuntos</Title>
                
                <AttachViewFiles files={reclamo.files} />

                <DataField style={styles.textContainer}
                    title="Movimientos"
                    disableBody={true}>
                </DataField>
            </View>
        );
    }

    return (
        <Screen keyboardDismiss={false}>
            <FlatList
                ListHeaderComponent={ReclamosDetails}
                data={reclamo.movimientos}
                renderItem={renderItemMovimiento}
                keyExtractor={(item) => item.idMovimiento}
                showsVerticalScrollIndicator={false}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: SIZES.XXL
    },
    textContainer: {
        marginVertical: 10
    }
});

export default VerReclamo;