import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LabNavigator from "../../navigations/LabNavigator";
import HTMLReactParser from "html-react-parser";
import ProjectNavigator from "../../navigations/ProjectNavigator";

export default function DocumentDetail({ navigation }) {
  const data = {
    data: "<h1 style='color: blue;'> Report 1</h1> <p style='color: red;'> this is report 1</p>",
  };
  const source = {
    uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
    cache: true,
  };
  return (
    <View>
      <ProjectNavigator navigation={navigation} />
      <View style={styles.container}>
        {/* <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        /> */}
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
