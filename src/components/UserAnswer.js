import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";

function UserAnswer({info}) {
    const getImage = (image) => {
        if (image == null) {
            return (
                <Image source={require("../assets/avatarDefault.png")} style={styles.userImage} />
            )
        } else {
            return (
                <Image style={styles.userImage}
                       source={{
                           uri: image.avatar,
                       }}/>
            )
        }
    }
    return (
        <View style={styles.container}>
            {getImage(info)}
            <Text style={styles.text}>
                {info.fullName}
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        marginLeft:10
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight:10
    },
    text:{
        fontSize:16,
    },
});
export default UserAnswer;