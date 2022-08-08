import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity, Alert } from "react-native";
import Card from "../../components/Card";
import CustomButton from "../../components/CustomButton";
import DataField from "../../components/DataField";
import Location from "../../components/Location";
import Screen from "../../components/Screen";
import Title from "../../components/Title";
import { COLORS, CUSTOM_BUTTONS } from "../../styles/Theme";
import * as ReclamosDB from '../../databases/ReclamosDB';
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import LoadingScreen from "../../components/LoadingScreen";

const ResultadosReclamos = props => {
    const usuarioSesion = props.route.params.usuarioSesion;
    const [reclamos, setReclamos] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const formatID = (value, length) => {
        return (value.toString().length < length) ? formatID("0" + value, length) :
            value;
    };

    const renderItemReclamo = ({ item }) => {
        const onSelectHandler = () => {
            props.navigation.navigate("VerReclamo", item);
        }
        return (
            <View style={styles.itemCardContainer} >
                <TouchableNativeFeedback onPress={onSelectHandler}>
                    <Card>
                        <DataField title={"#R" + formatID(item.idReclamo, 10)}>
                            <Text style={styles.boldText}>Estado:{'\t\t'}</Text>{item.estado}</DataField>
                        <DataField>
                            <Text style={styles.boldText}>Descripcion:{'\t\t'}</Text>{item.descripcion.slice(0, 100) + "..."}</DataField>
                        <Location />
                    </Card>
                </TouchableNativeFeedback>
            </View>
        );
    };

    if (!loaded) {
        ReclamosDB.buscarReclamos(props.route.params.numero, props.route.params.origen, usuarioSesion).then(response => {
            if(!response.msg){
                setReclamos(response);
            }
            else{
                Alert.alert("Resultados", response.msg, [{
                    text: "Volver",
                    onPress: () => props.navigation.pop()
                }])
            }
            setLoaded(true);
        });
        return (
            <LoadingScreen />
        );
    }
    else {
        return (
            <Screen title="Resultados">
                <FlatList
                    data={reclamos}
                    renderItem={renderItemReclamo}
                    keyExtractor={item => item.idReclamo}
                    showsVerticalScrollIndicator={false}
                />
            </Screen>
        );
    }

}

const styles = StyleSheet.create({
    paginationButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 30
    },
    boldText: {
        fontWeight: 'bold',
        color: COLORS.BLUE
    },
    itemCardContainer: {
        marginVertical: 10,
        overflow: 'hidden',
        borderRadius: 10,
        elevation: 3
    }
});

export default ResultadosReclamos;