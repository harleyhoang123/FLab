import React from 'react';
import {View, Image, Text, StyleSheet} from "react-native";

function UserInfoComponent({info}) {
    const getImage = (image) => {
        if (image == null) {
            return (
                <Image source={require("../assets/avatarDefault.png")} style={styles.userImage} />
            )
        } else {
            return (
                <Image style={styles.userImage}
                       source={{
                           uri: image.userInfo.avatar,
                       }}/>
            )
        }
    }
    const getName = (name) => {
        if (name == null) {
            return "Unassigned";
        } else {
            return name.userInfo.fullName;
        }
    }
    return (
        <View style={styles.container}>
            {getImage(info)}
            <Text style={styles.text}>
                {getName(info)}
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center"
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
export default UserInfoComponent;