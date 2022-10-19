import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from 'react-native-paper';
import Logo from "../assets/Logo";
export default function HomeTopNavigator({navigation}) {
    return (
        <View style = {styles.container}>
            <View style = {styles.topNavigationContent}>
                <View style = {styles.topNavigationContentLeft}>
                    <Logo/>
                    <Button style={styles.button} onPress={() => navigation.push("Home")}>
                        Home
                    </Button>
                    <Button style={styles.button} onPress={() => navigation.push("Home")}>
                        Home
                    </Button>
                </View>
                <View style = {styles.topNavigationContentRight}>
                    <Button style={styles.button} onPress={() => navigation.push("Login")}>
                        Login
                    </Button>
                    <Button style={styles.button} onPress={() => navigation.push("Register")}>
                        Register
                    </Button>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        borderBottomWidth:1
    },
    topNavigationContent: {
        flexDirection: 'row',
        height: 50,
        backgroundColor:'white',
        justifyContent:'space-between',
    },
    content : {
        backgroundColor:'gray',
    },
    topNavigationContentLeft: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',

    },
    topNavigationContentRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        justifyContent: "center",
    },
});
