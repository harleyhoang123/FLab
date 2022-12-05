import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Buttons from "./Buttons";
function TaskComponent({callBackSetIsVisible}) {
  return (
      <View style={styles.containerContent}>
        <View style={styles.sprint}>
          <TouchableOpacity onPress={() => callBackSetIsVisible(true)} >
            <View style={styles.container}>
              <View style={styles.row}>
                <Text style={styles.text}>abcxyz</Text>
                <Buttons text={"Edit"} style={styles.btn}></Buttons>
              </View>
              <View style={styles.row}>
                <Buttons text={"Done"} style={styles.btn}></Buttons>
                <TouchableOpacity>
                  <Image
                      style={styles.userImage}
                      source={{
                        uri: "https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png",
                      }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
  );
}
const styles = StyleSheet.create({
  container: {

    justifyContent:"space-between",
    flexDirection:"row",
  },
  containerContent: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor:'white',
    alignItems: "center",
    borderWidth: 1,
  },
  row: {
    alignItems:"center",
    flexDirection: "row",
  },
  sprint: {
    flex: 10,
    justifyContent: "center",
    margin:2
  },
  btn: {
    margin: 5,
    width: 60,
    height: 30,
  },
  text: {
    marginRight: 20,
    fontSize: 16,
  },
  userImage:{
    width:30,
    height:30,
    borderRadius:15,
    marginRight:50,
    marginLeft:30
  },
});
export default TaskComponent;
