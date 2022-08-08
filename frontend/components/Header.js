import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS , SIZES} from "../styles/Theme";

const Header = props => {
    return(
        <View style={styles.header} >
            <Text style={styles.headerTitle} >{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: COLORS.DARKBLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: 'white',
        fontSize: SIZES.XL
    }
});

export default Header;