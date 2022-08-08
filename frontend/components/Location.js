import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { DEFAULT_CONTENT_CONTAINER } from "../styles/Theme";

const Location = props => {
    return (
        <View>
            <Image
                source={{ uri: 'https://www.mdzol.com/u/fotografias/m/2021/3/8/f608x342-1027937_1057660_0.jpg' }}
                style={{
                    width: '100%',
                    height: 150,
                    borderWidth: 1,
                    borderColor: 'black'
                }}
                resizeMode="cover"
            />
        </View>
    );
}

export default Location;

/* <Image
    source={{ uri: 'https://www.mdzol.com/u/fotografias/m/2021/3/8/f608x342-1027937_1057660_0.jpg' }}
    style={{
        width: '100%',
        height: 150,
        borderWidth: 1,
        borderColor: 'black'
    }}
    resizeMode="cover"
/> */