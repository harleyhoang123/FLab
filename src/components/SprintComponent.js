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
function SprintComponent({callBackSetIsVisible}) {
  const [visible, setVisible] = useState(false);
  const [isTextField, setIsTextField] = useState(false);
  const toggleDropdown = () => {
    setVisible(!visible);
  };
  const changeType = () => {
    setIsTextField(!isTextField);
  };
  const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];
  const renderTextField = () => {
    return isTextField ? (
      <TextField onSubmitEditing={changeType} style={{margin:0,width:"100%",height:40}}/>
    ) : (
      <Buttons text={"+ Create issue"} style={{width:"100%", alignItems:"flex-start", backgroundColor:'#F4F5F7'}} onPressTo={changeType}  styleText={{color:"#4C5C76"}}/>
    );
  };
  const renderDropdown = (isTextField) => {
    if (visible) {
      return (
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
                <View>
                  <TaskComponent callBackSetIsVisible={callBackSetIsVisible} />
                </View>
            )}
          />
          {renderTextField(isTextField)}
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerContent}>
        <View style={styles.sprint}>
          <TouchableOpacity onPress={toggleDropdown}>
            <View style={styles.row}>
              <Text style={styles.textSprint}>Sprint 1</Text>
              <Text style={styles.text}>time</Text>
              <Text style={styles.text}> (7 issues)</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.view1}>
          <Text style={styles.text1}>0</Text>
        </View>
        <View style={styles.view2}>
          <Text style={styles.text2}>1</Text>
        </View>
        <View style={styles.view3}>
          <Text style={styles.text3}>2</Text>
        </View>
        <Buttons text={"Complete sprint"} style={styles.btn} styleText={{fontSize:14}}/>
        <Buttons text={"..."} style={styles.button} styleText={{fontSize:14}} />
      </View>
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
  text1: {
    color: "black",
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
