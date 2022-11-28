import React from 'react';
import {StyleSheet, TextInput} from "react-native";

function TextField({placeholder, text,onChangeText, secureTextEntry, style,multiline}) {
    return (
        <TextInput style={[styles.textInput,style]} placeholder={placeholder}
                   onChangeText={onChangeText}
                   defaultValue={text}
                   secureTextEntry ={secureTextEntry}
                   multiline={multiline}
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