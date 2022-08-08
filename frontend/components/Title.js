import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS, SIZES } from "../styles/Theme";

const Title = props => {
    return (
        <View style={props.style}>
            <Text style={{ ...styles.title, ...props.titleStyle }} >{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: SIZES.LARGE,
        color: COLORS.BLUE,
        fontWeight: 'bold'
    }
});

export default Title;