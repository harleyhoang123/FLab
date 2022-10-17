import React from 'react';
import {Image, StyleSheet} from "react-native";

function Logo(props) {
    return <Image source={require("../assets/logo.png")} style={styles.logo}/>;
}
const styles = StyleSheet.create({
    logo: {
        width: "50px",
        height: "50px"
    }
    }
)
export default Logo;
