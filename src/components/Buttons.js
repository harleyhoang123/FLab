import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";

function Buttons({text, onPressTo, style}) {
    return (
        <TouchableOpacity style={[styles.button,style] } onPress={onPressTo}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        width: 120,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
export default Buttons;