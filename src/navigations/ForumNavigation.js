import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

function ForumNavigation({navigation}) {
    return (
        <View  style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.push("Forum")}>
                <Text style={styles.textLogo}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.push("Forum")}>
                <Text style={styles.textLogo}>Recent question</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.push("Forum")}>
                <Text style={styles.textLogo}>My question</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.push("Forum")}>
                <Text style={styles.textLogo}>Questions</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'white'
    },
    button: {
        justifyContent: "center",
        margin: 15,
    },
    textLogo: {
        fontSize:16,
        fontWeight:"bold",
        marginLeft: 5,
    }
});
export default ForumNavigation;