import React from 'react';
import { ImageBackground, View, StyleSheet} from 'react-native';
import Buttons from "../../components/Buttons";
function Welcome({navigation}) {
    return (
        
        <ImageBackground style={styles.background} source={require('../../assets/background.jpeg')}>
            <View style={styles.button} >
            <Buttons text ={"Register"} onPressTo={() => navigation.push("Register")} style={{margin:20}} ></Buttons>
            <Buttons text ={"Login"} onPressTo={() => navigation.push("Login")} style={{margin:20}}> </Buttons>
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    container: {
        flex: 1,
        width: "500px",
        height: "500px",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        flexDirection: 'row-reverse'
    },
}
);
export default Welcome;
