import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "./Card";
import DataField from "./DataField";

const ComentField = props => {
    return (
        <View style={props.style}>
            <Card>
                <View style={styles.header} >
                    <Text style={styles.fecha}>{props.fecha}</Text>
                    <Text>{' \t - \t '}</Text>
                    <Text style={styles.responsable}>{props.responsable}</Text>
                </View>
                <View>
                    <DataField>{props.causa}</DataField>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row'
    },
    fecha: {
        fontWeight: 'bold'
    },
    responsable: {
        fontStyle: 'italic'
    }
});

export default ComentField;