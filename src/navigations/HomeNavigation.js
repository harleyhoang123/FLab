import React from "react";
import { StyleSheet, View, Button } from "react-native";
import Logo from "../assets/Logo";

export default function HomeTopNavigator({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topNavigationContent}>
        <View style={styles.topNavigationContentLeft}>
          <Logo />
          <Button title={"Home"} onPress={() => navigation.push("Home")} />
          <Button title={"Lab"} onPress={() => navigation.push("Lab")} />
        </View>
        <View style={styles.topNavigationContentRight}>
          <Button title={"Home"} onPress={() => navigation.push("Home")} />
          <Button title={"Lab"} onPress={() => navigation.push("Home")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  topNavigationContent: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  content: {
    backgroundColor: "gray",
  },
  topNavigationContentLeft: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  topNavigationContentRight: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    justifyContent: "center",
  },
});
