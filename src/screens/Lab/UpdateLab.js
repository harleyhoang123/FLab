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

export default function UpdateLab({ route, navigation }) {
  const labInfo = route.params.labInfo;
  const [textName, onChangeNameText] = useState("");
  const [textDescription, onChangeDescriptionText] = useState("");
  const [textMajor, onChangeMajorText] = useState("");
  const dispatch = useDispatch();

  const updateLaboratoryHandle = () => {
    const requestData = {
      labName: textName,
      description: textDescription,
      major: textMajor,
    };
    console.log(requestData);
    dispatch(createLaboratory(requestData, navigation));
  };
  return (
    <View>
      <LabNavigator />
      <View style={styles.container}>
        <Text style={styles.title}>Update your's Lab</Text>
        <View>
          <View>
            <Text style={styles.usage}>Update lab information</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeNameText(text)}
              value={labInfo.laboratoryName}
              placeholder={"Enter lab's name"}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeDescriptionText(text)}
              value={labInfo.description}
              placeholder={"Enter lab's description"}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeMajorText(text)}
              value={labInfo.major}
              placeholder={"Enter lab's major"}
            />
          </View>

          <View style={styles.btn}>
            <Buttons
              text={"Create"}
              style={styles.button}
              onPressTo={updateLaboratoryHandle}
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
