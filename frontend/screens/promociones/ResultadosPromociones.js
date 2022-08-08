import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableNativeFeedback } from "react-native-gesture-handler";
import Card from "../../components/Card";
import DataField from "../../components/DataField";
import Screen from "../../components/Screen";
import * as PromocionesDB from '../../databases/PromocionesDB';
import { TEXT_STYLES } from "../../styles/Theme";
import LoadingScreen from "../../components/LoadingScreen";


const ResultadosPromociones = ({ route, navigation }) => {
    const params = route.params;
    const [promociones, setPromociones] = useState(null);
    
    const renderItemsPromociones = ({ item }) => {
        const onSelectItemHandle = () => {
            navigation.navigate("VerPromocion", {promocion: item, usuarioSesion: params.usuarioSesion});
        }
        return (
            <View style={styles.itemCardContainer}>
                <TouchableNativeFeedback onPress={onSelectItemHandle} >
                    <Card>
                        <DataField title={item.nombre}>
                            <Text style={TEXT_STYLES.boldText}>Tipo:{'\t'}</Text>
                            {item.tipo}
                        </DataField>
                        <DataField>
                            <Text style={TEXT_STYLES.boldText}>Rubro:{'\t'}</Text>
                            {item.rubro}
                        </DataField>
                        <DataField>
                            <Text style={TEXT_STYLES.boldText}>Descripcion:{'\t'}</Text>
                            {item.descripcion.slice(0, 100) + "..."}
                        </DataField>
                        {item.imagenes ? <Image style={styles.image} source={{ uri: item.imagenes[0].url }} /> : null}
                    </Card>
                </TouchableNativeFeedback>
            </View>
        );
    };

    if(promociones){
        return (
            <Screen>
                <FlatList
                    data={promociones}
                    renderItem={renderItemsPromociones}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.idPromocion}
                />
            </Screen>
        );
    }
    else{
        PromocionesDB.getPromociones(params).then(response =>{
            setPromociones(response.data);
        });
        return <LoadingScreen/>
    }

};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 150,
        borderWidth: 1,
        borderColor: 'black'
    },
    itemCardContainer: {
        marginVertical: 10,
        overflow: 'hidden',
        borderRadius: 10,
        elevation: 3
    }
});

export default ResultadosPromociones;