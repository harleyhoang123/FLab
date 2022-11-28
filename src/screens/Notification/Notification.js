import React from 'react';
import {Text, View} from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";

function Notification({navigation}) {
    return (
        <View>
            <HomeTopNavigator navigation={navigation}/>
            <Text>This is notification page</Text>
        </View>
    );
}

export default Notification;