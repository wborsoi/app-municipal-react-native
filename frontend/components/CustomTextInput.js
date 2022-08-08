import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { COLORS } from "../styles/Theme";

const CustomTextInput = props => {
    return(
        <TextInput 
            style={{...styles.customTextInput, ...props.style}}
            placeholder={props.placeholder}
            selectionColor="gray"
            multiline={props.multiline}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
            maxLength={props.maxLength}
            blurOnSubmit={true}
            value={props.value}
        />
    );
}

const styles = StyleSheet.create({
    customTextInput: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.BLUE,
        height: 45,
        padding: 12,
        marginVertical: 5
    }
});

export default CustomTextInput;