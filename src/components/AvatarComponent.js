import React, {useState} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from "react-native";

export default function AvatarComponent({avatarURL}) {
    const defaultStyle = StyleSheet.create({
        avatar: {
            borderRadius: 15,
            marginRight: 10,
            width: 30,
            height: 30
        },
    })
    const getImage = (image) => {
        if (image == null) {
            return (
                <Image source={require("../assets/avatarDefault.png")} style={defaultStyle.avatar} />
            )
        } else {
            return (
                <Image style={defaultStyle.avatar}
                       source={{
                           uri: avatarURL,
                       }}/>
            )
        }
    }
    return (
        <View>
            {getImage(avatarURL)}
        </View>
    );
}

