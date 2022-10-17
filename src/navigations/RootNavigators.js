import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome/Welcome';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import Home from '../screens/Home/Home';
function RootNavigators(props) {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName= {"Welcome"}>
                <Stack.Screen name='Welcome' component={Welcome}/>
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Register' component={Register}/>
                <Stack.Screen name='Home' component={Home}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigators;