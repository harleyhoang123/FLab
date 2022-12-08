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
import { updateMaterialByMaterialId } from "../../actions/MaterialAction";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-community/async-storage";

const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@currentLabId");
    console.log("LabId in reate Project: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get LabId id: " + e);
  }
};

export default function UpdateMaterial({ route, navigation }) {
  const materialInfo = route.params.materialInfo;
  const [textName, onChangeNameText] = useState(materialInfo.materialName);
  const [textDescription, onChangeDescriptionText] = useState(
    materialInfo.description
  );
  const [selected, setSelected] = React.useState(materialInfo.status);
  const data = [
    { key: "1", value: "IN_USED" },
    { key: "2", value: "FREE" },
  ];
  const [amount, setAmount] = useState(materialInfo.amount);
  const [labId, setLabId] = useState("");

  getLabId().then((v) => setLabId(v));
  const dispatch = useDispatch();

  const updateMaterial = () => {
    const requestData = {
      materialName: textName,
      description: textDescription,
      status: selected,
      amount: amount,
    };
    console.log("Data Mate:" + JSON.stringify(requestData));
    dispatch(
      updateMaterialByMaterialId(
        labId,
        materialInfo.materialId,
        requestData,
        navigation
      )
    );
  };
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Update a Project</Text>
        <View>
          <View>
            <Text style={styles.usage}>Enter project information</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeNameText(text)}
              value={textName}
              placeholder={"Enter material's name"}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeDescriptionText(text)}
              value={textDescription}
              placeholder={"Enter material's description"}
            />
            <SelectList
              setSelected={(val) => setSelected(val)}
              placeholder={"STATUS"}
              data={data}
              save="value"
              boxStyles={{
                height: 40,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                width: "45%",
                marginLeft: "13%",
              }}
              dropdownStyles={{
                width: 130,
                marginLeft: "13%",
              }}
              search={false}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setAmount(text)}
              value={amount}
              placeholder={"Enter amount"}
            />
          </View>

          <View style={styles.btn}>
            <Buttons
              text={"Update"}
              style={styles.button}
              onPressTo={updateMaterial}
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
  titleDate: {
    fontSize: 20,
    marginLeft: "13%",
    marginTop: 10,
  },
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
