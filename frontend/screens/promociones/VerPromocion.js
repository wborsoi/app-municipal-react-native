import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton';
import DataField from '../../components/DataField';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import { COLORS, CUSTOM_BUTTONS, DEFAULT_BUTTONS_CONTAINER, DEFAULT_CONTENT_CONTAINER, TEXT_STYLES } from '../../styles/Theme';

const VerPromocion = props => {
    const userSession = props.route.params.usuarioSesion;
    const promocion = props.route.params.promocion;
    promocion.descripcion = promocion.descripcion.slice(0, 1000);
    
    useEffect(() => {
        props.navigation.setOptions({title: promocion.nombre});
    });

    const EliminarButton = () => {
        return (
            <View style={DEFAULT_BUTTONS_CONTAINER.buttonsContainer}>
                <CustomButton style={CUSTOM_BUTTONS.button1}>Eliminar Promocion</CustomButton>
            </View>
        );
    };

    const renderItemImagen = ({ item }) => {
        return (
            <View style={styles.separadorVertical}>
                <Image source={{ uri: item.url }} style={styles.image} resizeMode='cover' />
            </View>
        );
    };

    const PromocionDetalles = () => {
        return (
            <View>
                <DataField >
                    <Text style={TEXT_STYLES.boldText}>Tipo:{'\t'}</Text>
                    {promocion.tipo}
                </DataField>
                <DataField>
                    <Text style={TEXT_STYLES.boldText}>Rubro:{'\t'}</Text>
                    {promocion.rubro}
                </DataField>
                <DataField>
                    <Text style={TEXT_STYLES.boldText}>Horarios:{'\t'}</Text>
                    {promocion.horarios}
                </DataField>

                <DataField>{promocion.descripcion}</DataField>


            </View>
        );
    };

    return (
        <Screen title="Ver Promocion">
            <FlatList
                ListHeaderComponent={PromocionDetalles}
                data={promocion.imagenes}
                renderItem={renderItemImagen}
                keyExtractor={(item) => item.url}
                showsVerticalScrollIndicator={false}
            />
            {userSession.documento == promocion.documento ? <EliminarButton /> : null}
        </Screen>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 150,
        borderWidth: 1,
        borderColor: 'black'
    },
    separadorVertical: {
        marginVertical: 10
    }
});

export default VerPromocion;