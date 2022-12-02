import React from 'react';
import {StyleSheet, TextInput} from "react-native";

function TextField({placeholder, text,onChangeText, secureTextEntry, style,multiline, onSubmitEditing}) {
    return (
        <TextInput style={[styles.textInput,style]} placeholder={placeholder}
                   onChangeText={onChangeText}
                   defaultValue={text}
                   secureTextEntry ={secureTextEntry}
                   multiline={multiline}
                   onSubmitEditing={onSubmitEditing}
        />
    );
}
const styles = StyleSheet.create({
    textInput: {
        height: 50,
        width: "99%",
        backgroundColor: 'white',
        borderWidth: 1,
        margin: 15,
        borderRadius:5,
    },
});

export default TextField;