import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS, SIZES } from "../styles/Theme";

const DataField = props => {

    return (
        <View style={props.style} >
            {props.title ? <Text style={{...styles.title, ...props.titleStyle}} >{props.title}</Text> : null }
            {!props.disableBody ? <Text style={{...styles.body, ...props.bodyStyle}} >{props.children}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: SIZES.LARGE,
        color: COLORS.BLUE,
        fontWeight: 'bold'
    },
    body: {
        fontSize: SIZES.MEDIUM,
        color: COLORS.DARKBLUE,
        marginVertical: 5
    }
});

export default DataField;