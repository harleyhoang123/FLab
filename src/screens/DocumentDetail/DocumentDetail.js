import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LabNavigator from "../../navigations/LabNavigator";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

export default function DocumentDetail() {
  const data = {
    data: "<h1 style='color: blue;'> Report 1</h1> <p style='color: red;'> this is report 1</p>",
  };
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.left}>
          <Text>Left</Text>
        </View>
        <View style={styles.right}>{ReactHtmlParser(data.data)}</View>
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
