import { View, Text, StyleSheet } from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { addFileToFolder } from "../../actions/RepositoryAction";
import { useDispatch } from "react-redux";
import ProjectNavigator from "../../navigations/ProjectNavigator";
import { faL } from "@fortawesome/free-solid-svg-icons";
function Upload({ route, navigation }) {
  const folderName = route.params.folderName;
  const parentFolderId = route.params.parentFolderId;
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();

  const dispatch = useDispatch();

  const uploadFile = (
    parentFolderId,
    folderName,
    fileName,
    description,
    file,
    navigation
  ) => {
    dispatch(
      addFileToFolder(
        parentFolderId,
        folderName,
        fileName,
        description,
        file,
        navigation
      )
    );
  };
  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      multiple: false,
    });
    console.log(result);
    if (!result.cancelled) {
      const filePicked = {
        name: result.name,
        base64: result.uri,
        size: result.size,
        mimeType: result.mimeType,
      };
      setFile(filePicked);
    }
  };
  return (
    <View>
      <ProjectNavigator navigation={navigation} />
      <View style={styles.containerContent}>
        <Text style={styles.text}>Upload A File</Text>
        <AddComponent
          title={"File Name"}
          multiline={false}
          style={{ width: "97%" }}
          text={fileName}
          onChangeText={(fileName) => setFileName(fileName)}
        />
        <AddComponent
          title={"Description"}
          multiline={false}
          style={{ width: "97%" }}
          text={description}
          onChangeText={(description) => setDescription(description)}
        />
        {file && (
          <Text
            style={{ marginLeft: 30, fontSize: 20, backgroundColor: "white" }}
          >
            {file.name}
          </Text>
        )}
        <Buttons
          text={"Choose A File"}
          style={styles.button}
          onPressTo={pickFile}
        />
        <View style={{ flexDirection: "row" }}>
          <Buttons
            text={"Upload"}
            style={[styles.button, { marginRight: 30 }]}
            onPressTo={() => {
              uploadFile(
                parentFolderId,
                folderName,
                fileName,
                description,
                file,
                navigation
              );
              console.log("Click Upload");
            }}
          />
          <Buttons
            text={"Cancel"}
            style={styles.button}
            onPressTo={() => navigation.goBack(null)}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputInvalid: {
    marginLeft: 15,
    color: "red",
  },
  containerContent: {
    alignSelf: "center",
    width: "70%",
    backgroundColor: "white",
    flex: 1,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 30,
  },
  button: {
    margin: 30,
    width: 250,
  },
});
export default Upload;
