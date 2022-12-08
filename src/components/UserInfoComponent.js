import React from 'react';
import {View, Image, Text, StyleSheet} from "react-native";
function UserInfoComponent({info}) {
    const getImage = (image) => {
        if (image == null) {
            return "https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png";
        } else {
            return image.userInfo.avatar;
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
            <Image style={styles.userImage}
                   source={{
                uri: getImage(info),
            }}/>
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