import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../styles/Theme";
import Screen from "./Screen";

const LoadingScreen = () => {
    return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.textCargando}>Cargando...</Text>
                <ActivityIndicator animating={true} size='large' />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textCargando: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.BLUE
    }
});

export default LoadingScreen;