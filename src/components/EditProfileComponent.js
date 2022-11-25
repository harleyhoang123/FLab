import {View, Text, StyleSheet} from "react-native";
import React from "react";
import TextField from "./TextField";
function EditProfileComponent({title,style, text, onTextChange, placeholder, multiline}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TextField text={text} style={style} onChangeText={onTextChange} placeholder={placeholder} multiline={multiline}></TextField>
        </View>
    );
}
const styles = StyleSheet.create({
    title:{
        fontSize:18,
        fontWeight:"bold"
    },
    container:{
        margin:5,
        marginRight:100,
    },

});
export default EditProfileComponent;