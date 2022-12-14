import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
function NotifyComponent({title, time, date, onPress}) {
    return (
            <View style={styles.container}
                              onPress={onPress }>
                <Text style={styles.title} >{title}</Text>
                <Text>{time} on {date}</Text>
            </View>
    );
}
 const styles= StyleSheet.create({
         container:{
             alignItems: 'flex-start',
             justifyContent: 'center',
             paddingVertical: 15,
             paddingHorizontal: 25,
             width: 700,
         },
     title:{
       fontWeight:"bold",
     },
 });
export default NotifyComponent;