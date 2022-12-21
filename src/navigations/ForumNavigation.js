import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {useDispatch} from "react-redux";
import {getListQuestion} from "../actions/ForumAction";

function ForumNavigation({ navigation }) {
    const dispatch = useDispatch();
    const goToForum = () => {
        dispatch(getListQuestion(navigation));
    };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => goToForum()}
      >
        <Text style={styles.textLogo}>Home</Text>
      </TouchableOpacity>
      {/*<TouchableOpacity*/}
      {/*  style={styles.button}*/}
      {/*  onPress={() => navigation.push("Forum")}*/}
      {/*>*/}
      {/*  <Text style={styles.textLogo}>Recent question</Text>*/}
      {/*</TouchableOpacity>*/}
      <TouchableOpacity
        style={styles.button}
        onPress={() => goToForum()}
      >
        <Text style={styles.textLogo}>My question</Text>
      </TouchableOpacity>
      {/*<TouchableOpacity*/}
      {/*  style={styles.button}*/}
      {/*  onPress={() => navigation.push("Forum")}*/}
      {/*>*/}
      {/*  <Text style={styles.textLogo}>Questions</Text>*/}
      {/*</TouchableOpacity>*/}
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push("ListTag")}
        >
            <Text style={styles.textLogo}>Setting</Text>
        </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  button: {
    justifyContent: "center",
    margin: 15,
  },
  textLogo: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
export default ForumNavigation;
