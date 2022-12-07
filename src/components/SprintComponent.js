import React, {useState} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Buttons from "./Buttons";
import TaskComponent from "./TaskComponent";
import TextField from "./TextField";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import {getListSprint} from "../screens/Backlog/Backlog";
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@token");
    console.log("token: " + token);
    return token;
  } catch (e) {
    console.log("Can't get avatar: " + e);
  }
};
export const deleteSprint = async (projectId, sprintId) => {
  const token = await getToken();
  try {
    const response = await axios.delete(
        'http://192.168.31.197:8085/flab/workspace/public/api/v1/sprints/:workspace-id/sprints/:sprint-id'.replace(":workspace-id", projectId)
            .replace(":sprint-id",sprintId),
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in deleteSprint: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};

export const createTask = async (sprintId, memberId, taskName) => {
  const token = await getToken();
  try {
    const response = await axios.post(
        'http://192.168.31.197:8085/flab/workspace/public/api/v1/tasks/:sprint-id/task'.replace(":sprint-id", sprintId),
        {
          memberId: memberId,
          taskName: taskName,
        }
        ,
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in createTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};
export const getListTask = async (sprintId) => {
  const token = await getToken();
  try {
    const response = await axios.get(
        'http://192.168.31.197:8085/flab/workspace/public/api/v1/sprints/:sprint-id'.replace(":sprint-id", sprintId),
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in createTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};
function SprintComponent({projectId, sprintId,memberId,  sprintName, goal, startDate, endDate,tasks, totalNotStartedTask, totalInProgressTask, totalDoneTask,callBackGetListSprint,callbackTaskDetail,callbackDeleteTask}) {
  const [isTextField, setIsTextField] = useState(false);
  const [visible, setVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [listTask, setListTask] = useState(tasks);
  const formatDate=(date)=>{
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short'
    });
  }
  const callBackGetListTask=()=>{
    getListTask(sprintId).then(r => setListTask(r.data.tasks))
  }

  const deleteASprint=(projectId,sprintId)=>{
    deleteSprint(projectId,sprintId).then(()=>callBackGetListSprint());
  }
  const changeType = () => {
    setIsTextField(!isTextField);
  };
  const addTask=(sprintId, memberId, taskName)=>{
    createTask(sprintId,memberId,taskName).then(()=>getListTask(sprintId).then(r => setListTask(r.data.tasks)));
    changeType()
    setTaskName('')
  }
  const renderTextField = () => {
    return isTextField ? (
        <View style={[styles.row,{alignItems: "center"}]}>
          <TextField onSubmitEditing={()=>addTask(sprintId,memberId,taskName)} style={{width:"100%",height:40}} text={taskName} onChangeText={taskName=> setTaskName(taskName)}/>
          <Buttons text={"Cancel"} onPressTo={changeType} style={{width: 70, height:40}}/>
        </View>
    ) : (
      <Buttons text={"+ Create issue"} style={{width:"100%", alignItems:"flex-start", backgroundColor:'#F4F5F7'}} onPressTo={changeType}  styleText={{color:"#4C5C76"}}/>
    );
  };
  const renderDropdown = (isTextField) => {
      if( visible) {
        return (
            <View>
              {listTask?.map((item) => (
                  <TaskComponent key={item.taskId} taskId={item.taskId} taskName={item.taskName}
                                 sprintId={sprintId} estimate={item.estimate} status={item.status}
                                 assignee={item.assignee} callBackGetListTask={callBackGetListTask}
                                 callbackTaskDetail={callbackTaskDetail}
                                 callbackDeleteTask={callbackDeleteTask}/>
              ))}
              {renderTextField(isTextField)}
            </View>
        );
      }
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerContent}>
        <View style={styles.sprint}>
          <TouchableOpacity onPress={()=> setVisible(!visible)}>
              <Text style={styles.text}><Text style={styles.textSprint}>{sprintName}
              </Text> {formatDate(startDate)} - {formatDate(endDate)} ({listTask.length} issues)</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view1}>
          <Text style={styles.text1}>{totalNotStartedTask}</Text>
        </View>
        <View style={styles.view2}>
          <Text style={styles.text2}>{totalInProgressTask}</Text>
        </View>
        <View style={styles.view3}>
          <Text style={styles.text3}>{totalDoneTask}</Text>
        </View>
        <Buttons text={"Complete sprint"} style={styles.btn} styleText={{fontSize:14}}/>
        <Buttons text={"Edit"}   style={[styles.button, {width: 35}]} styleText={{fontSize:14}} />
        <Buttons text={"X"}  onPressTo={()=>deleteASprint(projectId,sprintId)} style={styles.button} styleText={{fontSize:14}} />
      </View>
      <Text style={{marginLeft: 20}}>{goal}</Text>
      {renderDropdown()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 8,
    borderRadius: 8,
  },
  containerContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
  },
  sprint: {
    flex: 10,
    justifyContent: "center",
    margin:2
  },
  view1: {
    margin: 5,
    width: 20,
    borderRadius: 5,
    backgroundColor: "#DFE1E6",
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    color: "black",
  },
  view2: {
    margin: 5,
    width: 20,
    borderRadius: 5,
    backgroundColor: "#0052CC",
    justifyContent: "center",
    alignItems: "center",
  },
  view3: {
    margin: 5,
    width: 20,
    borderRadius: 5,
    backgroundColor: "#00875A",
    justifyContent: "center",
    alignItems: "center",
  },

  text2: {
    color: "white",
  },
  text3: {
    color: "white",
  },
  btn: {
    margin: 5,
    width: 135,
    height: 30,
  },
  button: {
    width: 30,
    height: 30,
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  textSprint: {
    marginRight: 20,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    marginRight: 20,
    fontSize: 16,
  },
});
export default SprintComponent;
