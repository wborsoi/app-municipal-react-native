import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../styles/Theme";

const RadioButton = props => {
    return (
        <TouchableOpacity disabled={props.disabled} style={styles.mainContainer} activeOpacity={0.8} onPress={props.onPress}>
            <View style={[styles.radioButtonIcon]}>
                <View style={props.selected ? [styles.radioButtonIconInnerIcon] : null} />
            </View>
            <View style={[styles.radioButtonTextContainer]}>
                <Text style={styles.radioButtonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        height: 50,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 0.5,
        borderColor: COLORS.BLUE,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10
    },
    radioButtonIcon: {
        backgroundColor: COLORS.WHITE,
        borderWidth: 3,
        borderColor: COLORS.DARKBLUE,
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    radioButtonIconInnerIcon: {
        height: 25,
        width: 25,
        backgroundColor: COLORS.BLUE,
        borderRadius: 25 / 2,
        borderWidth: 3,
        borderColor: "white",
    },
    radioButtonTextContainer: {
        flex: 5,
        height: 50,
        justifyContent: "center",
        paddingLeft: 10,
    },
    radioButtonText: {
        fontSize: 18,
    },
});

export default RadioButton;