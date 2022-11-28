import React from 'react';
import {Image, StyleSheet} from "react-native";

function Logo({style}) {
    return <Image source={require("../assets/logo.png")} style={[styles.logo,style]}/>;
}
const styles = StyleSheet.create({
    logo: {
        width: "40px",
        height: "40px"
    }
    }
)
export default Logo;
