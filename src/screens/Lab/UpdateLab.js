import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import Buttons from "../../components/Buttons";
import LabNavigator from "../../navigations/LabNavigator";
import axios from "axios";
import { updateLaboratoryByLabId } from "../../actions/LaboratoryAction";
import { SelectList } from "react-native-dropdown-select-list";

export default function UpdateLab({ route, navigation }) {
  const labInfo = route.params.labInfo;
  const data = route.params.listMember;
  console.log("All data:" + JSON.stringify(data));

  const regx = new RegExp("^[a-zA-Z0-9 ]{6,30}$");
  let isValid = true;

  const allMember = data.map((item) => {
    return {
      key: item.memberId,
      value: item.userInfo.userInfo.username,
    };
  });

  console.log("ALL member" + JSON.stringify(allMember));

  const [textName, onChangeNameText] = useState(labInfo.laboratoryName);
  const [textDescription, onChangeDescriptionText] = useState(
    labInfo.description
  );
  const [textMajor, onChangeMajorText] = useState(labInfo.major);
  const [selected, setSelected] = React.useState("");
  const [key, setKey] = React.useState("");
  const dispatch = useDispatch();
  const [isLabNameValid, setLabNameValid] = useState(false);
  const [isMajorValid, setMajorValid] = useState(false);
  const [isOwner, setOwner] = useState(false);

  function validateData() {
    if (!textName.match(regx)) {
      setLabNameValid(true);
      isValid = false;
    } else {
      setLabNameValid(false);
    }
    if (!textMajor) {
      setMajorValid(true);
      isValid = false;
    } else {
      setMajorValid(false);
    }
    if (!selected) {
      setOwner(true);
    } else {
      setOwner(false);
    }
    if (isValid) {
      updateLaboratoryHandle();
    }
  }

  const updateLaboratoryHandle = () => {
    const requestData = {
      labName: textName,
      description: textDescription,
      major: textMajor,
      ownerBy: key,
    };
    console.log(requestData);
    dispatch(
      updateLaboratoryByLabId(labInfo.laboratoryId, requestData, navigation)
    );
  };
  return (
    <View>
      <LabNavigator navigation={navigation} />
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
            <SelectList
              setSelected={(val) => setSelected(val)}
              onSelect={() => setKey(selected)}
              placeholder={"OwnerBy"}
              data={allMember}
              save="key"
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
            {isOwner && <Text style={styles.inputInvalid}>Invalid major</Text>}
          </View>

          <View style={styles.btn}>
            <Buttons
              text={"Update"}
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
