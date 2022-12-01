import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Button,
  Text,
  CheckBox,
  FlatList,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import LabNavigator from "../../navigations/LabNavigator";
import { Formik } from "formik";
import SprintComponent from "../../components/SprintComponent";
import TaskDetailComponent from "../../components/TaskDetailComponent";
import { useState } from "react";

const projectName = {
  name: "FPT Lab Management",
  ava: "https://reactnative.dev/img/tiny_logo.png",
  major: "Software Enginner",
};

const data = [
  {
    id: "1",
    sprint: "1",
    task: "develop",
    time: "16 Sep - 23 Sep",
    numberOftask: "7",
    description: "Do somethings right now.",
  },
  {
    id: "2",
    sprint: "2",
    task: "develop",
    time: "16 Sep - 23 Sep",
    numberOftask: "7",
    description: "Do somethings right now.",
  },
];

export default function RoadMap({ navigation }) {
  const [isVisible, setIsVisible] = useState(false);

  const callBackSetIsVisible = (isVisible) => {
    setIsVisible(isVisible);
  }

  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.projectTitle}>
            <Text style={styles.projectName}>{projectName.name}</Text>
            <Text style={styles.major}>{projectName.major}</Text>
            <Image style={styles.tinyLogo} source={{ uri: projectName.ava }} />
          </View>
        </View>
        <View style={styles.right}>
          <Text style={styles.backlog}>BackLog</Text>
          <View style={styles.backlogContent}>
            <SprintComponent callBackSetIsVisible={callBackSetIsVisible} />
          </View>
        </View>
        <View style={styles.taskDetail}>
          <TaskDetailComponent isVisible={isVisible} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    marginLeft: 14,
  },
  taskDetail: {
    width: "20%",
    marginTop: 88,
    marginLeft: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  description: {
    fontSize: 16,
  },
  sprint: {
    width: "100%",
    padding: 5,
    flexDirection: "row",
  },
  taskPosition: {
    width: "100%",
    padding: 5,
    flexDirection: "row",
    paddingLeft: "15%",
  },
  completed: {
    fontSize: 14,
    color: "red",
    width: 50,
  },
  tag: {
    borderRadius: 5,
    backgroundColor: "yellow",
    marginLeft: 10,
  },
  task: {
    fontSize: 14,
  },
  sprintArea: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
    backgroundColor: "green",
  },
  taskArea: {
    width: "80%",
    flexDirection: "row",
    backgroundColor: "#F4F5F7",
  },
  timeTxt: {
    fontSize: 16,
    paddingTop: 4,
  },
  sprTxt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
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
    width: "58%",
    height: "100%",
  },
  listItem: {
    width: "80%",
    flexDirection: "row",
    borderRadius: 7,
    borderWidth: 1,
    marginBottom: 10,
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
    width: "100%",
  },
  backlogContent: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#DEE2E6",
    justifyContent: "flex-start",
    padding: 5,
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
