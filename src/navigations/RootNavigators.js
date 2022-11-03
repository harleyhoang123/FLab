import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome/Welcome";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import Home from "../screens/Home/Home";
import ForgotPassword from "../screens/Forgot Password/ForgotPassword";
import Lab from "../screens/Lab/Lab";
import Doucument from "../screens/Documents/document";
import DocumentDetail from "../screens/DocumentDetail/DocumentDetail";
import WorkSpace from "../screens/WorkSpace/WorkSpace";
import Spaces from "../screens/Spaces/Spaces";

function RootNavigators(props) {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"Welcome"}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Lab" component={Lab} />
        <Stack.Screen name="Document" component={Doucument} />
        <Stack.Screen name="DocumentDetail" component={DocumentDetail} />
        <Stack.Screen name="WorkSpace" component={WorkSpace} />
        <Stack.Screen name="Spaces" component={Spaces} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigators;
