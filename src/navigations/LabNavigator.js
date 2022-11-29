import React from "react";
import { StyleSheet, View, Button } from "react-native";
import Logo from "../assets/Logo";
export default function LabNavigator({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topNavigationContent}>
        <View style={styles.topNavigationContentLeft}>
          <Logo />
          <Button
            title={"Workspace"}
            onPress={() => navigation.push("HomeScreen")}
          />
          <Button
            title={"Document"}
            onPress={() => navigation.push("Document")}
          />
          <Button
            title={"WorkSpace"}
            onPress={() => navigation.push("WorkSpace")}
          />
          <Button title={"Space"} onPress={() => navigation.push("Spaces")} />
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
