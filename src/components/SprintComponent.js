import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Buttons from "./Buttons";
import TaskComponent from "./TaskComponent";
import TextField from "./TextField";
function SprintComponent({navigation, isVisible,projectId, sprintId,memberId,  sprintName, goal, startDate, endDate,tasks, totalNotStartedTask, totalInProgressTask, totalDoneTask, callBackSetIsVisible}) {
  const [isTextField, setIsTextField] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isVi, setIsVi] = useState(isVisible);
  const formatDate=(date)=>{
    const d= new Date(date);
    return d.getDate() +" "+ d.getUTCMonth()
  }
  const changeType = () => {
    setIsTextField(!isTextField);
  };
  const renderTextField = () => {
    return isTextField ? (
      <TextField onSubmitEditing={changeType} style={{margin:0,width:"100%",height:40}}/>
    ) : (
      <Buttons text={"+ Create issue"} style={{width:"100%", alignItems:"flex-start", backgroundColor:'#F4F5F7'}} onPressTo={changeType}  styleText={{color:"#4C5C76"}}/>
    );
  };
  const renderDropdown = (isTextField) => {
      if(sprintId === isVi|| visible) {
        return (
            <View>
              <FlatList
                  data={tasks}
                  renderItem={({item}) => (
                      <View>
                        <TaskComponent navigation={navigation} projectId={projectId} taskId={item.taskId} taskName={item.taskName}
                                       sprintId={sprintId} estimate={item.estimate} status={item.status} assignee={item.assignee}/>
                      </View>
                  )}
              />
              {renderTextField(isTextField)}
            </View>
        );
      }
  };
  const handleClick=()=>{
    if(isVi!=="check"){
      setVisible(false)
      setIsVi("check");
    }else {

      setVisible(!visible);
    }


  }
  return (
    <View style={styles.container}>
      <View style={styles.containerContent}>
        <View style={styles.sprint}>
          <TouchableOpacity onPress={handleClick}>
            <View style={styles.row}>
              <Text style={styles.textSprint}>{sprintName}</Text>
              <Text style={styles.text}>{formatDate(startDate)} - {formatDate(endDate)}</Text>
              <Text style={styles.text}> ({tasks.length} issues)</Text>
            </View>

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
        <Buttons text={"..."} style={styles.button} styleText={{fontSize:14}} />
      </View>
      <Text>{goal} OK luon</Text>
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
    width: 180,
    height: 30,
  },
  button: {
    width: 20,
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
