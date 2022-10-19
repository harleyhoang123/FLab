import React from 'react';
import {Text, View} from "react-native";
import HomeTopNavigator from '../../navigations/HomeNavigation';

function Home({navigation}) {
    return (
        <View>
            <HomeTopNavigator navigation={navigation}/>
            <Text>This is home page</Text>
        </View>
    );
}

export default Home;