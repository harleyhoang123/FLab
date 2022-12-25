import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
function NotifyComponent({title, date, read}) {
    const formatTime = (date) => {
        const d = new Date(date);
        const month = d.getMonth() + 1;
        return d.getDate() + "/" + month + "/" + d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    };
    const checkRead=(read)=>{
        if (read){
            return(
                <Text >{title} on {formatTime(date)}</Text>
                )

        }else{
            return(
                <Text style={styles.title}>{title} on {formatTime(date)}</Text>
                )

        }
    }
    return (
            <View style={styles.container}>
                {checkRead(read)}
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