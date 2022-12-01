import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import SprintComponent from "../../components/SprintComponent";
import TaskDetailComponent from "../../components/TaskDetailComponent";
import ChildIssueComponent from "../../components/ChildIssueComponent";
import PaginationBar from "../../components/PaginationBar";

function Home({ navigation }) {
  const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];
  return (
    <View style={{ backgroundColor: "white" }}>
      <HomeTopNavigator navigation={navigation} />
      <PaginationBar />
      <FlatList
        data={data}
        renderItem={({ item }) => <View>{/* <SprintComponent /> */}</View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efefef",
    height: 50,
    width: "90%",
    paddingHorizontal: 10,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    top: 50,
  },
});

export default Home;
