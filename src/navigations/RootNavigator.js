import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
function RootNavigator(props) {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Welcome"}>
                <Stack.Screen name={"Welcome"} component ={Welcome} />
                <Stack.Screen name={"Login"} component={Login} />
                <Stack.Screen name={"Home"} component={Home}/>
                <Stack.Screen name={"Register"} component={Register}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;
