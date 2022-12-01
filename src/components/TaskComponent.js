import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Buttons from "./Buttons";
import TaskDetailComponent from "./TaskDetailComponent";
function TaskComponent({ callbackTaskVisible }) {
  return (
    <View style={styles.wrapper}>
      <View>
        <TouchableOpacity>
          <View style={styles.container}>
            <View style={styles.row}>
              <Text style={styles.text}>abcxyz</Text>
              <Buttons text={"Edit"} style={styles.button}></Buttons>
              <Buttons text={"Define"} style={styles.button}></Buttons>
            </View>
            <View style={styles.row}>
              <Buttons text={"Done"} style={styles.button}></Buttons>
              <TouchableOpacity>
                <Image
                  style={styles.userImage}
                  source={{
                    uri: "https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png",
                  }}
                />
              </TouchableOpacity>
              <Buttons
                text={"..."}
                style={styles.button}
                onPress={() => callbackTaskVisible("true")}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
  },
  wrapper: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    margin: 10,
    width: 60,
    height: 40,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    marginLeft: 20,
  },
});
export default TaskComponent;
