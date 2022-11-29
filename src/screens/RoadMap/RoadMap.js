import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  FlatList,
} from "react-native";
import LabNavigator from "../../navigations/LabNavigator";

const projectName = {
  name: "FPT Lab Management",
  ava: "link",
  major: "Software Enginner",
};

export default function RoadMap({ navigation }) {
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.projectTitle}>
            <Text style={styles.projectName}>{projectName.name}</Text>
            <Text style={styles.major}>{projectName.major}</Text>
            <Image
              style={styles.tinyLogo}
              source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            />
          </View>
        </View>
        <View style={styles.right}>
          <Text style={styles.backlog}>BackLog</Text>
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
    width: "18%",
    height: "100vh",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#DEE2E6",
  },
  right: {
    width: "82%",
    height: "100%",
  },
  major: {
    fontSize: 12,
    paddingBottom: 8,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    paddingBottom: 8,
  },
  backlog: {
    color: "#42526E",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  projectName: {
    color: "#42526E",
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 24,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  projectTitle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
