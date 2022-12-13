import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeTopNavigator from "../navigations/HomeNavigation";

function ErrorPage({ route, navigation }) {
  const errCode = route.params.status;
  const message = route.params.displayMessage;
  const data = {
    status: {
      status: 500,
      code: "UNAUTHORIZED",
      message: "Password incorrect!",
      responseDate: "2022-12-13 11:05:46 302",
    },
  };
  return (
    <View>
      <HomeTopNavigator navigation={navigation} />
      {errCode !== 200 ? <Text>{message}</Text> : null}
      <View></View>
    </View>
  );
}
const styles = StyleSheet.create({});
export default ErrorPage;
