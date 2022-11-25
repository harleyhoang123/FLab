import React from 'react';
import TextField from "./TextField";
import {StyleSheet, Text, View} from "react-native";

function AddComponent({title,suggest, multiline,style}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.suggest}>{suggest}</Text>
            <TextField multiline={multiline} style={style}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        margin:20,
        backgroundColor:'white',
        borderRadius:10,
        padding:20,
    },
    title:{
        fontSize:18,
        fontWeight:"bold"
    },
    suggest:{
        fontSize:16,
        margin:5,
    },

});
export default AddComponent;