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
  const [todos, setTodos] = React.useState([
    {
      id: 1,
      sprint: "1",
      task: "develop",
      time: "16 Sep - 23 Sep",
      description: "Do somethings right now.",
      completed: true,
    },
    {
      id: 2,
      sprint: "2",
      task: "develop",
      time: "16 Sep - 23 Sep",
      description: "Do somethings right now.",
      completed: false,
    },
  ]);
  const [textInput, setTextInput] = React.useState({});

  const ListItem = ({ sprint, task, time, description, completed }) => {
    return (
      <View style={styles.listItem}>
        <View style={styles.sprintArea}>
          <View style={styles.sprint}>
            <Text style={styles.sprTxt}>Sprint {sprint}:</Text>
            <Text style={styles.timeTxt}>{time}</Text>
          </View>
        </View>
        <View style={styles.taskArea}>
          <View style={styles.taskPosition}>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.tag}>
              <Text style={styles.task}>{task}</Text>
            </View>
          </View>
          <Text style={styles.completed}>
            {completed ? "Done" : "On Going"}
          </Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <ListItem
      sprint={item?.sprint}
      task={item?.task}
      time={item?.time}
      description={item?.description}
      completed={item?.completed}
    />
  );
  const addTodo = () => {};
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
            <SafeAreaView>
              <FlatList
                contentContainerStyle={{ padding: 20 }}
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
                {/*<View>*/}
                {/*  <Text style={{ fontSize: 22 }}>Add new task</Text>*/}
                {/*  <TextInput*/}
                {/*    onChangeText={handleChange("sprint")}*/}
                {/*    onBlur={handleBlur("sprint")}*/}
                {/*    value={values.sprint}*/}
                {/*    style={styles.input}*/}
                {/*    placeholder="Sprint"*/}
                {/*  />*/}
                {/*  <TextInput*/}
                {/*    onChangeText={handleChange("task")}*/}
                {/*    onBlur={handleBlur("task")}*/}
                {/*    value={values.task}*/}
                {/*    style={styles.input}*/}
                {/*    placeholder="Task"*/}
                {/*  />*/}
                {/*  <TextInput*/}
                {/*    onChangeText={handleChange("time")}*/}
                {/*    onBlur={handleBlur("time")}*/}
                {/*    value={values.time}*/}
                {/*    style={styles.input}*/}
                {/*    placeholder="From-to"*/}
                {/*  />*/}
                {/*  <CheckBox*/}
                {/*    value={values.completed}*/}
                {/*    onValueChange={handleChange("completed")}*/}
                {/*    style={styles.checkbox}*/}
                {/*  />*/}
                {/*  <Text>Did you done this task?</Text>*/}
                {/*  <Button onPress={handleSubmit} title="Submit" />*/}
                {/*</View>*/}
            </SafeAreaView>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    marginLeft: 14,
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
    width: "82%",
    height: "100%",
  },
  listItem: {
    width: "80%",
    flexDirection: "column",
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
  },
  backlogContent: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#DEE2E6",
    justifyContent: "center",
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
