import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {COLORS, SIZES} from '../styles/Theme';

const CustomButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.8} >
            <View style={{...styles.button, ...props.style}} >
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15
    },
    buttonText: {
        color: 'white',
        fontSize: SIZES.LARGE,
        textAlign: 'center'
    }
});

export default CustomButton;