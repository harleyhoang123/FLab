import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  FlatList,
} from "react-native";
import {
  useFonts,
  BeVietnamPro_200ExtraLight_Italic,
} from "@expo-google-fonts/dev";
import LabNavigator from "../../navigations/LabNavigator";

const Spaces = () => {
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.leftHeader}>
            <Text style={styles.leftContent}>List WorkSpace</Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.rightContent}>
            <Text style={styles.cotentName}>RIGHT</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

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
  leftContent: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingRight: 8,
    paddingLeft: 8,
    borderWidth: 1,
    borderColor: "#DEE2E6",
    borderRightColor: "white",
    fontFamily: "sans-serif",
    fontSize: 16,
  },
  rightContent: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingRight: 8,
    paddingLeft: 20,
  },
  cotentName: {
    fontSize: 24,
  },
});

export default Spaces;
