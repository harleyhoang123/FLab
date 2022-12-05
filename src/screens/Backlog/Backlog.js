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
import LabNavigator from "../../navigations/LabNavigator";
import SprintComponent from "../../components/SprintComponent";
import TaskDetailComponent from "../../components/TaskDetailComponent";
import { useState } from "react";
import SubTaskDetailComponent from "../../components/SubTaskDetailComponent";

const projectName = {
  name: "FPT Lab Management",
  ava: "https://reactnative.dev/img/tiny_logo.png",
  major: "Software Enginner",
};

export default function Backlog({route, navigation }) {
  const res= route.params.data;
  const projectId = route.params.projectId;
  const [sprintId, setSprintId] = useState(route.params.sprintId);
  console.log("Res in backlog is: "+ JSON.stringify(res))
  const taskDetail = route.params.taskDetail;
  console.log("Task detail in backlog: "+ JSON.stringify(taskDetail));
  console.log("Expression: "+ taskDetail != null);
  const subTaskDetail = route.params.subTaskDetail;
  console.log("Task detail in backlog: "+ JSON.stringify(subTaskDetail));
  console.log("Expression: "+ subTaskDetail != null);
  const [listSPrint, setListSPrint] = useState(res.sprints.items);
  if(sprintId===null){
    setSprintId("check");
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
            {listSPrint?.map((item)=>(
                <View key={item.sprintId}>
                  <SprintComponent navigation={navigation} isVisible={sprintId} projectId={projectId} memberId={res.memberId} sprintId={item.sprintId} sprintName={item.sprintName}
                                   goal={item.goal} startDate={item.startDate} endDate={item.endDate} tasks={item.tasks}
                                   totalNotStartedTask={item.totalNotStartedTask} totalInProgressTask={item.totalInProgressTask} totalDoneTask={item.totalDoneTask}/>
                </View>
            ))}

          </View>
        </View>
        <View style={styles.taskDetail}>
          {taskDetail != null && <TaskDetailComponent taskDetail={taskDetail} sprintId={sprintId} projectId={projectId} navigation={navigation}/> }
          {subTaskDetail != null && <SubTaskDetailComponent subTaskDetail={subTaskDetail}/> }
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
    width: "25%",
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
    width: "53%",
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
