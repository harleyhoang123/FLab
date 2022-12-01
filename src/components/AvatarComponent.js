import React, {useState} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";


const getAvatar = async () => {
    try {
        const avatar = await AsyncStorage.getItem("@avatar");
        console.log("avatar: " + avatar);
        return avatar;
    } catch (e) {
        console.log("Can't get avatar: " + e);
    }
};

export default function AvatarComponent({height, width}) {
    const [avatar, setAvatar] = useState('');
    getAvatar().then((v) => setAvatar(v));
    console.log("Avatar is: "+  avatar)
    return (
        <View>
            <Image
                style= {[styles.userImage, {height: height, width: width}]}
                source={avatar}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    userImage: {
        borderRadius: 15,
        marginRight: 10,
    },
})

