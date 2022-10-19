import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import Logo from "../../assets/Logo";
import Title from "../../components/Title";

function Register({navigation}) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Logo style={styles.logo}/>
            </View>
            <View style={styles.right}>
                <Title title={"Register"}></Title>
                <TextField text={email} onChangeText={newText => setEmail(newText)} placeholder={"Enter email"}
                           secureTextEntry={false}></TextField>
                <TextField text={username} onChangeText={newText => setUsername(newText)} placeholder={"Create user name"}
                           secureTextEntry={false}></TextField>
                <TextField text={password} onChangeText={newText => setPassword(newText)} placeholder={"Password"}
                           secureTextEntry={true}></TextField>
                <TextField text={rePassword} onChangeText={newText => setRePassword(newText)} placeholder={"Re-Password"}
                           secureTextEntry={true}></TextField>
                <Buttons text={"Register"} onPressTo={()=>navigation.push("Login")} style={styles.button}/>
                <View style={styles.login}>
                    <Text>Already have a account?</Text>
                    <TouchableOpacity onPress={() => navigation.push("Login")}>
                        <Text style={styles.txt}>Log in</Text>
                    </TouchableOpacity>
                </View>
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
        height: "750px",
    },
    right: {
        flex: 0.5,
    },
    login: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 10,
    },
    txt: {
        fontWeight: "bold",
        borderBottomWidth: 1,
    },
    button:{
        width: 240,
        marginLeft: 150,
        marginBottom: 40,
    },
});
export default Register;