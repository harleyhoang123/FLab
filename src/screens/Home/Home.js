import React from "react";
import { Text, View } from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import SprintComponent from "../../components/SprintComponent";
import TaskComponent from "../../components/TaskComponent";

function Home({ navigation }) {
  return (
    <View>
      <HomeTopNavigator navigation={navigation} />
      <SprintComponent/>
        <View style={{margin:40}}></View>
        <TaskComponent/>
    </View>
  );
}

export default Home;
