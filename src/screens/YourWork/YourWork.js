import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Icon,
  StatusBar,
} from "react-native";
import {
  useFonts,
  BeVietnamPro_200ExtraLight_Italic,
} from "@expo-google-fonts/dev";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const listProject = [
  {
    id: "1",
    title: "SW Architecture and Design_Kiến trúc và Thiết kế phần mềm",
    host: "SonHH8",
    description: "blablah",
  },
  {
    id: "2",
    title: "SW Architecture and Design_Kiến trúc và Thiết kế phần mềm",
    host: "SonHH8",
    description: "blablah",
  },
];

export const YourWork = ({ navigation }) => {
  const Item = ({ title, host, description }) => (
    <View style={styles.itemContainer}>
      <View style={styles.content}>
        <Text style={styles.name} onPress={() => navigation.push("RoadMap")}>
          {title}
        </Text>
        <Text style={styles.host}>{host}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item title={item.title} host={item.host} description={item.description} />
  );
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Your Work</Text>
        <Text style={styles.recent}>Recent Project</Text>
      </View>
      <View style={styles.allProject}>
        <SafeAreaView>
          <FlatList
            numColumns={5}
            data={listProject}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 20,
  },
  name: {
    fontFamily: "BeVietnamPro_200ExtraLight_Italic, sans-serif",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  host: {
    color: "#666666",
    fontSize: 14,
  },
  description: {
    color: "#666666",
    fontSize: 14,
  },
  itemContainer: {
    width: 350,
    height: 150,
    borderColor: "#DEE2E6",
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
  },
  allProject: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 15,
  },
  recent: {
    marginTop: 50,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#172B4D",
  },
  top: {
    width: "95%",
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 15,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 22,
    color: "#172B4D",
    fontWeight: 500,
  },
});

export default YourWork;
