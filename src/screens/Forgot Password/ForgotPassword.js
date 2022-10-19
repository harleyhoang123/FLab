import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import Title from "../../components/Title";

function ForgotPassword({navigation}) {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Image source={require("../../assets/logo.png")} style={styles.logo}/>
            </View>
            <View style={styles.right}>
                <Title title={"Forgot Password"}></Title>
                <Text style = {styles.txt}>Enter your email or user name </Text>
                <TextField text={usernameOrEmail} onChangeText={newText => setUsernameOrEmail(newText)} placeholder={"Email or user name"}
                           secureTextEntry={false}></TextField>
                <Buttons text={"Log in"} onPressTo={() => navigation.push("Login")} style={styles.button}></Buttons>
                <Buttons text={"Cancel"} onPressTo={() => navigation.push("Login")} style={[styles.button,{backgroundColor:'red'}] }></Buttons>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    left: {
        flex: 0.5,
        justifyContent: "center",
        alignItems:"center",
    },
    logo: {
        width: "750px",
        height: "750px"
    },
    right: {
        flex: 0.5,
    },
    button: {
        width: 240,
        marginLeft: 150,
        marginBottom: 20,
    },
    txt: {
        marginTop: 30,
        marginLeft:15,
        fontSize:15,
        fontWeight: "bold",
    },
});
export default ForgotPassword;