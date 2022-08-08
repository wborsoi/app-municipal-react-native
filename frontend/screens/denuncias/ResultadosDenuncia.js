import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import Card from "../../components/Card";
import DataField from "../../components/DataField";
import LoadingScreen from "../../components/LoadingScreen";
import Screen from "../../components/Screen";
import Title from "../../components/Title";
import * as DenunciasDB from '../../databases/DenunciasDB';
import { TEXT_STYLES } from "../../styles/Theme";

const ResultadosDenuncia = props => {
    const [denunciasList, setDenunciasList] = useState();

    const formatID = (value, length) => {
        return (value.toString().length < length) ? formatID("0" + value, length) : value;
    };

    const renderItemDenuncia = ({ item }) => {
        const onSelectHandler = () => {
            props.navigation.navigate("VerDenuncia", item);
        }

        return (
            <View style={styles.itemCardContainer}> 
                <TouchableNativeFeedback style={styles.cardItemContainer} onPress={onSelectHandler}>
                    <Card>
                        <Title>{"#D" + formatID(item.idDenuncia, 10)}</Title>
                        <DataField><Text style={TEXT_STYLES.boldText}>Estado: </Text>{item.estado}</DataField>
                        <DataField>{item.descripcion.slice(0, 100) + "..."}</DataField>
                    </Card>
                </TouchableNativeFeedback>
            </View>
        );
    };
    
    if(denunciasList){
        return (
            <Screen>
                <FlatList
                    data={denunciasList}
                    keyExtractor={(item) => item.idDenuncia}
                    renderItem={renderItemDenuncia}
                    showsVerticalScrollIndicator={false}
                />
            </Screen>
        );
    }
    else{
        DenunciasDB.buscarDenuncias(props.route.params.numero, props.route.params.tipo, props.route.params.usuarioSesion ).then(response => {
            if(response.status === 200){
                setDenunciasList(response.data);
            }
            else{
                Alert.alert("Resultados", response.data.msg, [{
                    text: "Volver",
                    onPress: () => props.navigation.pop()
                }]);
            }
        });
        return (
            <Screen>
                <LoadingScreen />
            </Screen>
        );
    }
};

const styles = StyleSheet.create({
    cardItemContainer: {
        overflow: 'hidden',
        borderRadius: 10
    },
    itemCardContainer: {
        marginVertical: 10,
        overflow: 'hidden',
        borderRadius: 10,
        elevation: 3
    }
});

export default ResultadosDenuncia;
