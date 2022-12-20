import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import Logo from "../../assets/Logo";
import Title from "../../components/Title";
import {register} from "../../actions/UserAction";
import {useDispatch} from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    return {
        passwordVisibility,
        rightIcon,
        handlePasswordVisibility
    };
};
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
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Logo style={styles.logo}/>
            </View>
            <View style={styles.right}>
                <Title title={"Register"}></Title>
                <TextField text={email} onChangeText={email => setEmail(email)} placeholder={" Enter email"} style={{width:"60%"}}
                           secureTextEntry={false}></TextField>
                <TextField text={fullName} onChangeText={fullName => setFullName(fullName)} placeholder={" Enter full name"} style={{width:"60%"}}
                           secureTextEntry={false}></TextField>
                <TextField text={username} onChangeText={username => setUsername(username)} placeholder={" Enter user name"} style={{width:"60%"}}
                           secureTextEntry={false}></TextField>


                <View style={{flexDirection: "row", alignItems: 'center',}}>
                    <TextField text={password} onChangeText={password => setPassword(password)} placeholder={" Password"} style={{width:"60%"}}
                               secureTextEntry={passwordVisibility}></TextField>
                    <TouchableOpacity onPress={handlePasswordVisibility} style={{right:50}}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: "row", alignItems: 'center',}}>
                    <TextField text={rePassword} onChangeText={rePassword => setRePassword(rePassword)} placeholder={" Re-Password"} style={{width:"60%"}}
                               secureTextEntry={passwordVisibility}></TextField>
                    <TouchableOpacity onPress={handlePasswordVisibility} style={{right:50}}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                    </TouchableOpacity>
                </View>
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
        width: "70%",
        height: "70%",
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
        width: "25%",
        marginLeft: "15%",
        marginBottom: 40,
    },
});
export default Register;