import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import RadioButton from '../../components/RadioButton';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import { CUSTOM_BUTTONS } from '../../styles/Theme';

const BuscarPromocion = props => {
    const opcionesPublicadoPor = ["Cualquiera", "Mis Promociones"];
    const opcionesTipoNegocio = ["Cualquiera", "Negocio", "Servicio Profesional"];
    const [publicadoPor, setPublicadoPor] = useState(opcionesPublicadoPor[0]);
    const [tipoNegocioInput, setTipoNegocioInput] = useState(opcionesTipoNegocio[0]);
    const [nombreInput, setNombreInput] = useState("");
    const [categoriaInput, setCategoriaInput] = useState("");
    const usuarioSesion = props.route.params;
    const buscarPromocionParams = {
        nombre: nombreInput,
        categoria: categoriaInput,
        tipoNegocio: tipoNegocioInput,
        origen: publicadoPor,
        usuarioSesion: usuarioSesion
    };
    const userSesion = props.route.params;

    return (
        <Screen title="Buscar Promociones" keyboardDismiss={true}>
            <View style={styles.contentDistribution} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Title>Nombre</Title>
                    <CustomTextInput
                        placeholder="(Opcional)"
                        value={nombreInput}
                        onChangeText={setNombreInput}
                    />
                    <Title>Categoria</Title>
                    <CustomTextInput
                        placeholder="(Opcional)"
                        value={categoriaInput}
                        onChangeText={setCategoriaInput}
                    />

                    <Title>Tipo de Negocio</Title>
                    <RadioButton
                        selected={tipoNegocioInput === opcionesTipoNegocio[0] ? true : false}
                        onPress={() => setTipoNegocioInput(opcionesTipoNegocio[0])}>
                        {opcionesTipoNegocio[0]}
                    </RadioButton>
                    <RadioButton
                        selected={tipoNegocioInput === opcionesTipoNegocio[1] ? true : false}
                        onPress={() => setTipoNegocioInput(opcionesTipoNegocio[1])}>
                        {opcionesTipoNegocio[1]}
                    </RadioButton>
                    <RadioButton
                        selected={tipoNegocioInput === opcionesTipoNegocio[2] ? true : false}
                        onPress={() => setTipoNegocioInput(opcionesTipoNegocio[2])}>
                        {opcionesTipoNegocio[2]}
                    </RadioButton>

                    {userSesion.accesos.promociones.buscarPromociones.filtroOrigen ?
                        <View>
                            <Title>Publicado por</Title>
                            <RadioButton
                                selected={publicadoPor === opcionesPublicadoPor[0] ? true : false}
                                onPress={() => setPublicadoPor(opcionesPublicadoPor[0])}>
                                {opcionesPublicadoPor[0]}
                            </RadioButton>
                            <RadioButton
                                selected={publicadoPor === opcionesPublicadoPor[1] ? true : false}
                                onPress={() => setPublicadoPor(opcionesPublicadoPor[1])}>
                                {opcionesPublicadoPor[1]}
                            </RadioButton>
                        </View>
                        : null}

                </ScrollView>
                <View>
                    <CustomButton style={CUSTOM_BUTTONS.button1} onPress={() => props.navigation.navigate('ResultadosPromociones', buscarPromocionParams)}>
                        Buscar
                    </CustomButton>
                </View>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    contentDistribution: {
        flex: 1,
        justifyContent: 'space-between'
    }
});

export default BuscarPromocion;