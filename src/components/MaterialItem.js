import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from "react-native";
import Separator from "./Separator";

function MaterialItem({materialId, title,status,image,style,booked, navigation}) {
    return (
        <View style={[styles.container,style]}>
            <TouchableOpacity onPress={() => navigation.push("MaterialDetail",{booked:booked})}>
                <View style={styles.containerContent}>
                    <View style={styles.containerLogo}>
                        <Image
                            style={styles.tinyLogo}
                            source={{
                                uri: 'https://media.istockphoto.com/id/1023428598/photo/3d-illustration-laptop-isolated-on-white-background-laptop-with-empty-space-screen-laptop-at.jpg?s=612x612&w=0&k=20&c=ssK6er5v1fGpSghGiqySwoD8tn5blC7xgefQJI2xU38=',
                            }}
                        />
                    </View>
                    <View  style={styles.containerTitle}>
                            <Text style={styles.title}>
                                {title}
                            </Text>
                        <Text style={styles.textInfo}>
                            Status: {status}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Separator/>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginLeft: 100,
        marginRight: 100,
        flex:1,
    },
    containerContent: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 5,
        flex:1,
    },
    containerLogo: {
        flex:0.1,
        justifyContent:"center",
        alignItems:"center",
    },
    containerTitle: {
        flex:0.9,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
    },
    textInfo: {
        fontSize: 16,
    },
    tinyLogo: {
        width: 100,
        height: 100,
    },
});
export default MaterialItem;
