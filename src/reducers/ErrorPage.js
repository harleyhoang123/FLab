import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeTopNavigator from "../navigations/HomeNavigation";
import Buttons from "../components/Buttons";

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
      <View style={styles.errorContainer}>
        {errCode !== 200 && <Text style={styles.errMsg}>{message}</Text>}
        <Buttons
          text={"Go Home"}
          style={styles.button}
          onPressTo={() => navigation.push("Home")}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "15%",
  },
  button: {
    marginTop: 20,
    width: 130,
    marginLeft: 5,
  },
  errMsg: {
    fontSize: 30,
  },
});
export default ErrorPage;
