import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome/Welcome';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import Home from '../screens/Home/Home';
import ForgotPassword from "../screens/Forgot Password/ForgotPassword";
import ListNews from "../screens/News/ListNews";
import NewsDetail from "../screens/News/NewsDetail";
import Notification from "../screens/Notification/Notification";
import Forum from "../screens/Forum/Forum";
import Profile from "../screens/Profile/Profile";
import QuestionDetail from "../screens/Forum/QuestionDetail";
import AddQuestion from "../screens/Forum/AddQuestion";
import AddNews from "../screens/News/AddNews";
import EditProfile from "../screens/Profile/EditProfile";
function RootNavigators() {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName= {"Welcome"}>
                <Stack.Screen name='Welcome' component={Welcome}/>
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Register' component={Register}/>
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
                <Stack.Screen name='ListNews' component={ListNews}/>
                <Stack.Screen name='NewsDetail' component={NewsDetail}/>
                <Stack.Screen name='Notification' component={Notification}/>
                <Stack.Screen name='Forum' component={Forum}/>
                <Stack.Screen name='Profile' component={Profile}/>
                <Stack.Screen name='QuestionDetail' component={QuestionDetail}/>
                <Stack.Screen name='AddNews' component={AddNews}/>
                <Stack.Screen name='AddQuestion' component={AddQuestion}/>
                <Stack.Screen name='EditProfile' component={EditProfile}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigators;