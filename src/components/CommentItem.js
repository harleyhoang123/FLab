import React from 'react';
import {View, Text, StyleSheet} from "react-native";

function CommentItem({username, content,time}) {
    return (
        <View style={styles.container}>
            <View style={styles.containerComment}>
                <Text style={styles.textUsername} >{username}</Text>
                <Text>{content}</Text>
            </View>
            <Text>{time}</Text>
        </View>
    );
}
const styles= StyleSheet.create(
    {
        container:{margin:10,
            backgroundColor:'white',
        },
        containerComment:{
            flexDirection:"row",
            alignItems:"center",
        },
        textUsername:{
          fontWeight: "bold",
          marginRight: 20,
        },
    }
);
export default CommentItem;