import React from 'react';
import {StyleSheet, Text} from "react-native";

function Title({title}) {
    return (
        <Text style={styles.title}>{title}</Text>
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        fontWeight: "bold",
        marginLeft: 15,
        marginTop: 150,
    },
});
export default Title;