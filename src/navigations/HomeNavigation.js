import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import { NAVIGATION } from '../constants';
import Home from '../screens/Home/Home';
import Forum from "../screens/Forum/Forum";
import Lab from "../screens/Lab/Lab";
import Notification from "../screens/Notification/Notification";
import Ticket from "../screens/Ticket/Ticket";
import Profile from "../screens/Profile/Profile";

const Tab = createMaterialTopTabNavigator();

export function HomeNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName={NAVIGATION.home}>
                <Tab.Screen name={NAVIGATION.home} component={Home} />
                <Tab.Screen name={NAVIGATION.lab} component={Lab} />
                <Tab.Screen name={NAVIGATION.forum} component={Forum} />
                <Tab.Screen name={NAVIGATION.notification} component={Notification} />
                <Tab.Screen name={NAVIGATION.ticket} component={Ticket} />
                <Tab.Screen name={NAVIGATION.profile} component={Profile} />
        </Tab.Navigator>
        </NavigationContainer>
    );
}
