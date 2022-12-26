import React, {useState} from "react";
import {Text, View, StyleSheet, FlatList} from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import {Image} from "react-native";

function Home({navigation}) {
    return (
        <View style={{backgroundColor: "white", flexDirection:"column"}}>
            <HomeTopNavigator navigation={navigation}/>
            <View style={{width: "100vw", height: "100vh"}}>
                <Image
                    style={styles.image}
                    source={require('../../assets/img.png')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    image:{
        height: "100%",
        width: "100%",

    }
});

export default Home;
