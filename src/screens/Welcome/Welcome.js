import React from 'react';
import {Button, ImageBackground, View, StyleSheet} from 'react-native';
import {NAVIGATION} from "../../constants";
import {HomeNavigation} from "../../navigations/HomeNavigation";

function Welcome({navigation}) {
    return (
        <ImageBackground style={styles.background} source={require('../../assets/background.jpeg')}>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    container: {
        flex: 1,
        width: "500px",
        height: "500px",
        justifyContent: "center",
        alignItems: "center"
    }
}
);
export default Welcome;