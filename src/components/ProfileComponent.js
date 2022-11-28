import React from 'react';
import {View, Text, StyleSheet} from "react-native";

function ProfileComponent({title, information}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.information}>{information}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    title:{
        fontSize:18,
        fontWeight:"bold"
    },
    information:{
        fontSize:16,
        margin:5,
    },
    container:{
      margin:5,
      marginRight:100,
    },

});
export default ProfileComponent;