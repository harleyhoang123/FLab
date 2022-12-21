import { View, Text, StyleSheet, Image } from "react-native";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import React, { useState } from "react";
import LabNavigator from "../../navigations/LabNavigator";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch } from "react-redux";

import AsyncStorage from "@react-native-community/async-storage";
import { addMaterial } from "../../actions/LaboratoryAction";
import { faL } from "@fortawesome/free-solid-svg-icons";

const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@labId");
    console.log("labId: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get labId: " + e);
  }
};

function AddMaterial({ navigation }) {
  const regx = new RegExp("^[a-zA-Z0-9 ]{3,30}$");
  const isNumber = new RegExp("^\\d+$");
  let isValid = true;
  const [materialName, setMaterialName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const [labId, setLabId] = useState();
  getLabId().then((v) => setLabId(v));
  console.log("lab ID in AddMaterial" + labId);
  const pickImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      multiple: true,
    });
    console.log(result);
    if (!result.cancelled) {
      console.log("Picked: " + result);
      console.log("name: " + result.name);
      console.log("uri: " + result.uri);
      console.log("size: " + result.size);
      console.log("mimeType: " + result.mimeType);
      const imagePicked = {
        name: result.name,
        base64: result.uri,
        size: result.size,
        mimeType: result.mimeType,
      };
      setThumbnail(imagePicked);
    }
  };
  const dispatch = useDispatch();

  const [isMaterialName, setIsMaterialName] = useState(false);
  const [isAmount, setIsAmount] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [isImage, setIsImage] = useState(false);

  function validateData() {
    if (!materialName.match(regx)) {
      setIsMaterialName(true);
      isValid = false;
    } else {
      setIsMaterialName(false);
    }
    if (!amount.match(isNumber)) {
      setIsAmount(true);
      isValid = false;
    } else {
      setIsAmount(false);
    }
    if (!description) {
      setIsDescription(true);
      isValid = false;
    } else {
      setIsDescription(false);
    }
    if (!thumbnail) {
      setIsImage(true);
      isValid = false;
    } else {
      setIsImage(false);
    }
    if (isValid) {
      createMaterial();
      reset();
    }
  }

  const reset = () => {
    setMaterialName("");
    setAmount("");
    setDescription("");
    setNote("");
    setThumbnail();
  };

  const createMaterial = () => {
    dispatch(
      addMaterial(
        labId,
        materialName,
        description,
        amount,
        note,
        thumbnail,
        navigation
      )
    );
  };
  return (
    <View style={styles.container}>
      <LabNavigator navigation={navigation} />
      <View style={styles.containerContent}>
        <Text style={styles.text}>Add a Material</Text>
        <AddComponent
          title={"Material Name"}
          multiline={false}
          style={{ width: "97%" }}
          text={materialName}
          onChangeText={(materialName) => setMaterialName(materialName)}
        />
        {isMaterialName && (
          <Text style={styles.inputInvalid}>Invalid material name</Text>
        )}
        <AddComponent
          title={"Amount"}
          multiline={false}
          style={{ width: "30%" }}
          text={amount}
          onChangeText={(amount) => setAmount(amount)}
        />
        {isAmount && <Text style={styles.inputInvalid}>Invalid amount</Text>}
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
        <AddComponent
          title={"Note"}
          multiline={true}
          style={{ width: "97%", height: 200 }}
          text={note}
          onChangeText={(note) => setNote(note)}
        />
        <View style={styles.row}>
          <View>
            <Buttons
              text={"Add Image"}
              onPressTo={pickImage}
              style={styles.button}
            />
            {isImage && (
              <Text style={styles.inputInvalid}>
                Please choose a image of material
              </Text>
            )}
          </View>
          <View>
            {thumbnail && (
              <Image
                source={{ uri: thumbnail.base64 }}
                style={{ width: 200, height: 200, marginLeft: 50 }}
              />
            )}
          </View>
        </View>
        <View style={styles.row}>
          <Buttons
            text={"Add Material"}
            style={styles.button}
            onPressTo={validateData}
          />

          <Buttons
            text={"Cancel"}
            style={styles.button}
            onPressTo={() => {
              navigation.goBack(navigation);
            }}
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
    flex: 0.65,
    paddingLeft: 300,
    marginRight: 300,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 30,
  },
  inputInvalid: {
    marginLeft: 55,
    color: "red",
  },
  button: {
    margin: 30,
    width: 250,
  },
  row: {
    flexDirection: "row",
  },
});
export default AddMaterial;
