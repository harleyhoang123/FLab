import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity,View} from "react-native";
function Buttons({text, onPressTo, style, styleText, disabled}) {
    return (
        <View>
            {disabled?<TouchableOpacity disabled={disabled} style={[styles.button, style,{backgroundColor: "gray"}]}>
                <Text style={[styles.text, styleText]}>{text}</Text>
            </TouchableOpacity>:<TouchableOpacity disabled={disabled} style={[styles.button, style]} onPress={onPressTo}>
                <Text style={[styles.text, styleText]}>{text}</Text>
            </TouchableOpacity>
            }
        </View>


    );
}


const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 4,
        backgroundColor: "#3f444a",
        minWidth: 30,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
});
export default Buttons;
