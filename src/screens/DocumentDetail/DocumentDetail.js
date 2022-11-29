import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LabNavigator from "../../navigations/LabNavigator";
import HTMLReactParser from "html-react-parser";

export default function DocumentDetail({ navigation }) {
  const data = {
    data: "<h1 style='color: blue;'> Report 1</h1> <p style='color: red;'> this is report 1</p>",
  };
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.left}></View>
        <View style={styles.right}>
          <Text> {HTMLReactParser(data.data)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  left: {
    width: "20%",
    height: "auto",
  },
  right: {
    width: "80%",
    height: "auto",
  },
});
