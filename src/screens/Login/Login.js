import {StyleSheet, View, Text, TouchableOpacity, TouchableOpacityComponent, Image} from "react-native";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../../actions/UserAction";
import TextField from "../../components/TextField";
import Logo from "../../assets/Logo";
import Buttons from "../../components/Buttons";
import Title from "../../components/Title";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import validator from 'validator'
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
export default function Login({navigation}) {
    const dispatch = useDispatch();
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();
    const [isValidUsername, setIsValidUserName]=useState(true);
    const [isValidPassword, setIsValidPassword]=useState(true);
    const handleSubmit = (username,password,navigation) => {
        if(username.length<5){
            setIsValidUserName(false);
            setErrorUsername("Username must equal or longer than 5 characters")
        }else{
            setIsValidUserName(true);
            if (validator.isStrongPassword(password, {
                minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1
            })) {
                setIsValidPassword(true)
                dispatch(login(username, password, navigation));
            } else {
                setIsValidPassword(false)
                setErrorPassword("Password must equal or longer than 8 characters, contain least 1 uppercase character,\n1 lowercase character and 1 number.")
            }
        }

    };
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Logo style={styles.logo}/>
            </View>
            <View style={styles.right}>
                <Title title={"Login"}></Title>
                <TextField
                    text={usernameOrEmail}
                    onChangeText={(newText) => setUsernameOrEmail(newText)}
                    placeholder={"Email or user name"}
                    secureTextEntry={false}
                    onSubmitEditing={()=>handleSubmit(usernameOrEmail,password,navigation)}
                    style={{width:"60%"}}
                ></TextField>
                {isValidUsername===false &&<Text style={{color:'red', marginLeft:20}}>{errorUsername}</Text>}
                <View style={{flexDirection: "row", alignItems: 'center',}}>
                    <TextField
                        text={password}
                        onChangeText={(newText) => setPassword(newText)}
                        placeholder={"Password"}
                        secureTextEntry={passwordVisibility}
                        onSubmitEditing={()=>handleSubmit(usernameOrEmail,password,navigation)}
                        style={{width:"60%"}}
                    ></TextField>
                    <TouchableOpacity onPress={handlePasswordVisibility} style={{right:50}}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                    </TouchableOpacity>
                </View>
                {isValidPassword===false &&<Text style={{color:'red', marginLeft:20}}>{errorPassword}</Text>}
                <View style={styles.forgotPassword}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.push("ForgotPassword")}>
                            <Text style={styles.txt}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Buttons
                    text={"Log in"}
                    onPressTo={()=>handleSubmit(usernameOrEmail,password,navigation)}
                    style={styles.button}
                ></Buttons>
                <View style={styles.register}>
                    <Text>Don't have a account?</Text>
                    <TouchableOpacity onPress={() => navigation.push("Register")}>
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
        flexDirection: "row",
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
    title: {
        fontSize: 50,
        fontWeight: "bold",
        marginTop: 200,
        marginLeft: 15,
    },
    forgotPassword: {
        paddingBottom: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    register: {
        alignItems: "flex-start",
        justifyContent: "center",
        marginLeft: 10,
    },
    txt: {
        fontWeight: "bold",
        borderBottomWidth: 1,
    },
    button: {
        width: "25%",
        marginLeft: "15%",
        marginBottom: 40,
    },
});
