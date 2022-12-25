import React from 'react';
import {StyleSheet, TextInput} from "react-native";

function TextField({placeholder, text,onChangeText, secureTextEntry, style,multiline, onSubmitEditing}) {
    return (
        <TextInput style={[styles.textInput,style]} placeholder={placeholder}
                   onChangeText={onChangeText}
                   value={text}
                   secureTextEntry ={secureTextEntry}
                   multiline={multiline}
                   onSubmitEditing={onSubmitEditing}
        />
    );
}
const styles = StyleSheet.create({
    textInput: {
        height: 40,
        width: "99%",
        backgroundColor: 'white',
        borderWidth: 1,
        margin: 15,
        borderRadius:5,
        padding:5
    },
});

export default TextField;