import React from 'react';
import { ImageBackground, View, StyleSheet} from 'react-native';
import CustomButton from './CustomButton';
function Welcome({navigation}) {
    return (
        
        <ImageBackground style={styles.background} source={require('../../assets/background.jpeg')}>
            <View style={styles.button} >
            <CustomButton text ={"Register"}  ></CustomButton>
            <CustomButton text ={"Login"}> </CustomButton>
            
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
