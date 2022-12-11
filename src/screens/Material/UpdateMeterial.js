import {View, Text, StyleSheet, Image} from "react-native";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import React, {useState} from "react";
import LabNavigator from "../../navigations/LabNavigator";
import * as DocumentPicker from "expo-document-picker";
import {useDispatch} from "react-redux";
import {addMaterial, updateMaterialByMaterialId} from "../../actions/MaterialAction";
import AsyncStorage from "@react-native-community/async-storage";
import {Dropdown} from "react-native-element-dropdown";

const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@labId");
    console.log("labId: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get labId: " + e);
  }
};

export default function UpdateMaterial({ route, navigation }) {
  const materialInfo = route.params.materialInfo;
  const [materialName, setMaterialName] = useState(materialInfo.materialName);
  const [amount, setAmount] = useState(materialInfo.amount);
  const [description, setDescription] = useState(materialInfo.description);
  const [note, setNote] = useState(materialInfo.note);
  const [status, setStatus] = useState(materialInfo.status);
  const [image, setImage] = useState();
  const [labId, setLabId] = useState();
  getLabId().then(v => setLabId(v))
  console.log("lab ID in UpdateMaterial" + labId)
  const data=[
    {label: 'Free', value: 'FREE'},
    {label: 'In used', value: 'IN_USED'},
  ]
  const pickImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({type: 'image/*', multiple: false});
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
        mimeType: result.mimeType
      };
      setImage(imagePicked);
    }
  };
  const dispatch = useDispatch();
const updateMaterial=(labId,materialId,materialName,status,amount, description,note,image,navigation )=>{
  dispatch(updateMaterialByMaterialId(labId,materialId,materialName,status,amount, description,note,image,navigation ))
}
  return (
      <View style={styles.container}>
        <LabNavigator navigation={navigation}/>
        <View style={styles.containerContent}>
          <Text style={styles.text}>Add a Material</Text>
          <AddComponent
              title={"Material Name"}
              multiline={false}
              style={{width: "97%"}}
              text={materialName}
              onChangeText={(materialName) => setMaterialName(materialName)}
          />
          <Dropdown
              style={styles.dropdown}
              value={status}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              onChange={item => {
                setStatus(item.value)
              }}
          />
          <AddComponent
              title={"Amount"}
              multiline={false}
              style={{width: "30%"}}
              text={amount}
              onChangeText={(amount) => setAmount(amount)}
          />
          <AddComponent
              title={"Description"}
              multiline={true}
              style={{width: "97%", height: 200}}
              text={description}
              onChangeText={(description) => setDescription(description)}
          />
          <AddComponent
              title={"Note"}
              multiline={true}
              style={{width: "97%", height: 200}}
              text={note}
              onChangeText={(note) => setNote(note)}
          />
          <View style={styles.row}>
            <View>
              <Buttons text={"Add Image"} onPressTo={pickImage} style={styles.button}/>
            </View>
            <View>{image &&
                <Image source={{uri: image.base64}}
                       style={{width: 200, height: 200, marginLeft: 50,}}/>}</View>
          </View>
          <View style={styles.row}>
            <Buttons
                text={"Update"}
                style={styles.button}
                onPressTo={()=>updateMaterial(labId,materialInfo.materialId,materialName,status,amount,description,note,image,navigation)}
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
  button: {
    margin: 30,
    width: 250,
  },
  row: {
    flexDirection: "row",
  },
  dropdown: {
    width:"30%",
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft:20
  },
});
