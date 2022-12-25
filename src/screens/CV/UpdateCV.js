import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { StyleSheet, Text, View } from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import { updateProfileCv } from "../../networking/CustomNetworkService";

function UpdateCv({ route, navigation }) {
  const cvId = route.params.cvId;
  const [cvName, setCvName] = useState(route.params.cvName);
  const [description, setDescription] = useState(route.params.description);
  const [file, setFile] = useState();
  const updateCv = () => {
    updateProfileCv(
      cvId,
      navigation,
      cvName,
      description,
      file,
      navigation
    ).then();
  };
  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
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
  return (
    <View>
      <HomeTopNavigator navigation={navigation} />
      <View style={styles.containerContent}>
        <Text style={styles.text}>Update Your CV</Text>
        <AddComponent
          title={"CV Name"}
          multiline={false}
          style={{ width: "97%" }}
          text={cvName}
          onChangeText={(cvName) => setCvName(cvName)}
        />
        <AddComponent
          title={"Description"}
          multiline={true}
          style={{ width: "97%", height: 200 }}
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
            onPressTo={() => updateCv()}
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
export default UpdateCv;
