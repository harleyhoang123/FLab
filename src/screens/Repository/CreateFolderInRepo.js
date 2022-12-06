import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import { useDispatch } from "react-redux";
import Buttons from "../../components/Buttons";
import LabNavigator from "../../navigations/LabNavigator";
import { createFolderInRepo } from "../../actions/RepositoryAction";
import AsyncStorage from "@react-native-community/async-storage";
const getRepoId = async () => {
  try {
    const repoId = await AsyncStorage.getItem("@currentProjectId");
    console.log("repoId: " + repoId);
    return repoId;
  } catch (e) {
    console.log("Can't get repo id: " + e);
  }
};
export default function CreateFolderInRepo({ navigation }) {
  const [textName, onChangeNameText] = useState("");
  const [textDescription, onChangeDescriptionText] = useState("");
  const [repoId, setRepoId] = useState("");
  getRepoId().then((v) => setRepoId(v));
  const dispatch = useDispatch();

  const createFolderInRepositoryHandle = () => {
    const requestData = {
      folderName: textName,
      description: textDescription,
    };
    console.log(requestData);
    dispatch(createFolderInRepo(repoId, requestData, navigation));
  };
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Create a folder</Text>
        <View>
          <View>
            <Text style={styles.usage}>Enter folder information</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeNameText(text)}
              value={textName}
              placeholder={"Enter folder's name"}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeDescriptionText(text)}
              value={textDescription}
              placeholder={"Enter folder's description"}
            />
          </View>

          <View style={styles.btn}>
            <Buttons
              text={"Create"}
              style={styles.button}
              onPressTo={() => navigation.navigate("CreateFolderInRepo")}
            />
            <Buttons
              text={"Back"}
              style={styles.button}
              onPressTo={() => {
                navigation.goBack(null);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  button: {
    marginTop: 20,
    width: 130,
    marginLeft: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "45%",
    marginLeft: "13%",
  },
  title: {
    fontSize: 30,
    marginLeft: "10%",
    marginTop: "3%",
  },
  usage: {
    fontSize: 20,
    marginLeft: "13%",
    marginTop: 10,
  },
  btn: {
    marginLeft: "13%",
  },
});
