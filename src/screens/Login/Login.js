import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {login} from "../../actions/UserAction";
import TextField from "../../components/TextField";
import Logo from "../../assets/Logo";
import Buttons from "../../components/Buttons";
import Title from "../../components/Title";


export default function Login({navigation}) {
    const dispatch = useDispatch();
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        dispatch(login(usernameOrEmail, password));
    };
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Logo style={styles.logo}/>
            </View>
            <View style={styles.right}>
                <Title title={"Login"}></Title>
                <TextField text={usernameOrEmail} onChangeText={newText => setUsernameOrEmail(newText)}
                           placeholder={" Email or user name"}
                           secureTextEntry={false}
                           multiline={false}></TextField>
                <TextField text={password} onChangeText={newText => setPassword(newText)} placeholder={" Password"}
                           secureTextEntry={true}
                           multiline={false}></TextField>
                <View style={styles.forgotPassword}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.push("ForgotPassword")}>
                            <Text style={styles.txt}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Buttons text={"Log in"} onPressTo={handleSubmit} style={styles.button}></Buttons>
                <View style={styles.register}>
                    <Text>Don't have a account?</Text>
                    <TouchableOpacity onPress={() => navigation.push("Home")}>
                        <Text style={styles.txt}>Register Now</Text>
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
        alignItems: "center",
    },
    logo: {
        width: "750px",
        height: "750px",
    },
    right: {
        flex: 0.5,
    },
    title: {
        fontSize: 50,
        fontWeight: "bold",
        marginTop: 200,
        marginLeft: 15,
    },
    forgotPassword: {
        paddingBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    register: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 10,
    },
    txt: {
        fontWeight: "bold",
        borderBottomWidth: 1,
    },
    button: {
        width: 240,
        marginLeft: 150,
        marginBottom: 40,
    },
});
