import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import Title from "../../components/Title";
import {useDispatch} from "react-redux";
import {forgot} from "../../actions/UserAction";
function ForgotPassword({navigation}) {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const dispatch = useDispatch();
    const handleForgot = () => {
        console.log("Inform:" + emailOrUsername)
        dispatch(forgot(emailOrUsername, navigation));
    }
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Image source={require("../../assets/logo.png")} style={styles.logo}/>
            </View>
            <View style={styles.right}>
                <Title title={"Forgot Password"}></Title>
                <Text style={styles.txt}>Enter your email or user name </Text>
                <TextField text={emailOrUsername}
                           onChangeText={(newText) => setEmailOrUsername(newText)}
                           placeholder={" Email or user name"}
                           style={{width:"60%"}}
                           secureTextEntry={false}></TextField>
                <Buttons text={"Forgot"} onPressTo={handleForgot} style={styles.button}></Buttons>
                <Buttons text={"Cancel"} onPressTo={() => navigation.push("Login")}
                         style={[styles.button, {backgroundColor: 'red'}]}></Buttons>
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
        alignItems: "center",
    },
    logo: {
        width: "70%",
        height: "70%",
    },
    right: {
        flex: 0.5,
    },
    button: {
        width: "25%",
        marginLeft: "15%",
        marginBottom: 20,
    },
    txt: {
        marginTop: 30,
        marginLeft: 15,
        fontSize: 15,
        fontWeight: "bold",
    },
});
export default ForgotPassword;