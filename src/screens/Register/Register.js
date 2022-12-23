import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import Logo from "../../assets/Logo";
import Title from "../../components/Title";
import {register} from "../../actions/UserAction";
import {useDispatch} from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ErrorText from "../../components/ErrorText";

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
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidFullName, setIsValidFullName] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidRePassword, setIsValidRePassword] = useState(true);
    const regexPassword= "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&.,]{8,}$";
    const regexEmail= "^[a-zA-Z][a-zA-Z0-9_\\.]{3,100}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,}$";
    const dispatch= useDispatch();
    const handleRegister=()=> {
        if(!email.trim().match(regexEmail)){
            setIsValidEmail(false);
        }else{
            setIsValidEmail(true);
            if (fullName.trim().length===0) {
                setIsValidFullName(false);
            } else {
                setIsValidFullName(true);
                if (username.trim().length<5) {
                    setIsValidUsername(false);
                } else {
                    setIsValidUsername(true);
                    if (!password.match(regexPassword)) {
                        setIsValidPassword(false);
                    } else {
                        setIsValidPassword(true);
                        if (password!==rePassword) {
                            setIsValidRePassword(false);
                        } else {
                            setIsValidRePassword(true);
                            dispatch(register(email,username,fullName,password,navigation));
                        }
                    }
                }
            }
        }

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
                {isValidEmail===false &&<ErrorText message={"Email is invalid."}/>}
                <TextField text={fullName} onChangeText={fullName => setFullName(fullName)} placeholder={" Enter full name"} style={{width:"60%"}}
                           secureTextEntry={false}></TextField>
                {isValidFullName===false &&<ErrorText message={"Full name is invalid."}/>}
                <TextField text={username} onChangeText={username => setUsername(username)} placeholder={" Enter user name"} style={{width:"60%"}}
                           secureTextEntry={false}></TextField>
                {isValidUsername===false &&<ErrorText message={"Username must equal or longer than 5 character"}/>}
                <View style={{flexDirection: "row", alignItems: 'center',}}>
                    <TextField text={password} onChangeText={password => setPassword(password)} placeholder={" Password"} style={{width:"60%"}}
                               secureTextEntry={passwordVisibility}></TextField>
                    <TouchableOpacity onPress={handlePasswordVisibility} style={{right:50}}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                    </TouchableOpacity>
                </View>
                {isValidPassword===false &&<ErrorText message={"Minimum eight characters, at least 1 uppercase letter, 1 lowercase letter and 1 number"}/>}
                <View style={{flexDirection: "row", alignItems: 'center',}}>
                    <TextField text={rePassword} onChangeText={rePassword => setRePassword(rePassword)} placeholder={" Re-Password"} style={{width:"60%"}}
                               secureTextEntry={passwordVisibility}></TextField>
                    <TouchableOpacity onPress={handlePasswordVisibility} style={{right:50}}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                    </TouchableOpacity>
                </View>
                {isValidRePassword===false &&<ErrorText message={"Re-Password not match with password"}/>}
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