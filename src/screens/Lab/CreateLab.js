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
import { createLaboratory } from "../../actions/LaboratoryAction";

export default function CreateLab({ navigation }) {
  const regx = new RegExp("^[a-zA-Z0-9 ]{6,30}$");
  let isValid = true;
  const [textName, onChangeNameText] = useState("");
  const [textDescription, onChangeDescriptionText] = useState("");
  const [textMajor, onChangeMajorText] = useState("");
  const dispatch = useDispatch();
  const [isLabNameValid, setLabNameValid] = useState(false);
  const [isMajorValid, setMajorValid] = useState(false);

  function validateData() {
    if (!textName.match(regx)) {
      setLabNameValid(true);
      isValid = false;
    }
    if (!textMajor) {
      setMajorValid(true);
      isValid = false;
    }
    if (isValid) {
      createLaboratoryHandle();
      reset();
    }
  }

  const reset = () => {
    onChangeNameText("");
    onChangeDescriptionText("");
    onChangeMajorText("");
    setLabNameValid(false);
    setMajorValid(false);
  };

  const createLaboratoryHandle = () => {
    const requestData = {
      labName: textName,
      description: textDescription,
      major: textMajor,
    };
    console.log(requestData);
    dispatch(createLaboratory(requestData, navigation));
    reset;
  };
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Create a Lab</Text>
        <View>
          <View>
            <Text style={styles.usage}>Enter lab information</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeNameText(text)}
              value={textName}
              placeholder={"Enter lab's name"}
            />
            {isLabNameValid && (
              <Text style={styles.inputInvalid}>Invalid lab's name</Text>
            )}
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeDescriptionText(text)}
              value={textDescription}
              placeholder={"Enter lab's description"}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeMajorText(text)}
              value={textMajor}
              placeholder={"Enter lab's major"}
            />
            {isMajorValid && (
              <Text style={styles.inputInvalid}>Invalid major</Text>
            )}
          </View>

          <View style={styles.btn}>
            <Buttons
              text={"Create"}
              style={styles.button}
              onPressTo={validateData}
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
  inputInvalid: {
    marginLeft: "13%",
    color: "red",
    fontSize: 12,
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
