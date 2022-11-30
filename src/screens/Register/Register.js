import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import Logo from "../../assets/Logo";
import Title from "../../components/Title";
import {register} from "../../actions/UserAction";
import {useDispatch} from "react-redux";

function Register({navigation}) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const dispatch= useDispatch();
    const handleRegister=()=> {
        dispatch(register(email,username,fullName,password,navigation));
    }
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Logo style={styles.logo}/>
            </View>
            <View style={styles.right}>
                <Title title={"Register"}></Title>
                <TextField text={email} onChangeText={email => setEmail(email)} placeholder={" Enter email"}
                           secureTextEntry={false}></TextField>
                <TextField text={username} onChangeText={username => setUsername(username)} placeholder={" Enter user name"}
                           secureTextEntry={false}></TextField>
                <TextField text={username} onChangeText={fullName => setFullName(fullName)} placeholder={" Enter full name"}
                           secureTextEntry={false}></TextField>
                <TextField text={password} onChangeText={password => setPassword(password)} placeholder={" Password"}
                           secureTextEntry={true}></TextField>
                <TextField text={rePassword} onChangeText={rePassword => setRePassword(rePassword)} placeholder={" Re-Password"}
                           secureTextEntry={true}></TextField>
                <Buttons text={"Register"} onPressTo={handleRegister} style={styles.button}/>
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