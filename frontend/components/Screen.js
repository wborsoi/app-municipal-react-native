import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { COLORS, CUSTOM_BUTTONS, DEFAULT_CONTAINER, DEFAULT_CONTENT_CONTAINER } from "../styles/Theme";
import Header from "./Header";

const Screen = props => {
    const content = (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.DARKBLUE} />
            <View style={styles.contentContainer} >{props.children}</View>
        </View>
    );
    
    if (props.keyboardDismiss) {
        return (
            <TouchableWithoutFeedback touchSoundDisabled={true} onPress={() => Keyboard.dismiss()}>
                {content}
            </TouchableWithoutFeedback>
        );
        
    }
    else {
        return (content);
    }


}

const styles = StyleSheet.create({
    ...CUSTOM_BUTTONS,
    ...DEFAULT_CONTAINER,
    ...DEFAULT_CONTENT_CONTAINER
});

export default Screen;