import React from 'react';
import {StyleSheet, TextInput} from "react-native";

function TextField({placeholder, text,onChangeText, secureTextEntry}) {
    return (
        <TextInput style={styles.textInput} placeholder={placeholder}
                   onChangeText={onChangeText}
                   defaultValue={text}
                   secureTextEntry ={secureTextEntry}
        />
    );
}
const styles = StyleSheet.create({
    textInput: {
        height: 50,
        width: 500,
        backgroundColor: 'white',
        borderWidth: 1,
        margin: 15,
        borderRadius:5,
    },
});

export default TextField;