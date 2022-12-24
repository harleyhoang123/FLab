import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import ProjectNavigator from "../../navigations/ProjectNavigator";
import { StyleSheet, Text, View } from "react-native";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import { uploadProfileCv } from "../../networking/CustomNetworkService";
import AsyncStorage from "@react-native-community/async-storage";
const getAccountId = async () => {
  try {
    const accountId = await AsyncStorage.getItem("@accountId");
    console.log("AccountId: " + accountId);
    return accountId;
  } catch (e) {
    console.log("Can't get account id: " + e);
  }
};
function UploadFileCV({ navigation }) {
  const [cvName, setCvName] = useState("");
  const [description, setDescription] = useState("");
  const [profileId, setProfileId] = useState("");
  const [file, setFile] = useState();

  let isValidCV = true;
  const [isCvName, setIsCvName] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [isFile, setIsFile] = useState(false);

  function validateUploadCV() {
    if (!cvName) {
      setIsCvName(true);
      isValidCV = false;
    } else {
      setIsCvName(false);
    }
    if (!description) {
      setIsDescription(true);
      isValidCV = false;
    } else {
      setIsDescription(false);
    }
    if (!file) {
      setIsFile(true);
      isValidCV = false;
    } else {
      setIsFile(false);
    }
    if (isValidCV) {
      uploadFileCV();
    }
  }

  getAccountId().then((v) => setProfileId(v));

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      multiple: false,
    });
    console.log(result);
    if (!result.cancelled) {
      console.log("Picked: " + result);
      console.log("name: " + result.name);
      console.log("uri: " + result.uri);
      console.log("size: " + result.size);
      console.log("mimeType: " + result.mimeType);
      const filePicked = {
        name: result.name,
        base64: result.uri,
        size: result.size,
        mimeType: result.mimeType,
      };
      setFile(filePicked);
    }
  };
  const uploadFileCV = () => {
    uploadProfileCv(profileId, navigation, cvName, description, file).then();
  };
  return (
    <View>
      <HomeTopNavigator navigation={navigation} />
      <View style={styles.containerContent}>
        <Text style={styles.text}>Upload Your CV</Text>
        <AddComponent
          title={"CV Name"}
          style={{ width: "97%" }}
          multiline={false}
          text={cvName}
          onChangeText={(cvName) => setCvName(cvName)}
        />
        {isCvName && <Text style={styles.inputInvalid}>Enter CV name</Text>}
        <AddComponent
          title={"Description"}
          multiline={true}
          style={{ width: "97%", height: 200 }}
          text={description}
          onChangeText={(description) => setDescription(description)}
        />
        {isDescription && (
          <Text style={styles.inputInvalid}>Invalid description</Text>
        )}
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
        {isFile && <Text style={styles.inputInvalid}>Enter CV name</Text>}
        <View style={{ flexDirection: "row" }}>
          <Buttons
            text={"Upload"}
            style={[styles.button, { marginRight: 30 }]}
            onPressTo={validateUploadCV}
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
    marginLeft: 55,
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
export default UploadFileCV;
