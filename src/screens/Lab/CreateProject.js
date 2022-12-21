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
import { createProjectInLab } from "../../actions/LaboratoryAction";
import { DateTimePicker } from "@hashiprobr/react-native-paper-datetimepicker";
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

export default function CreateProject({ route, navigation }) {
  const regx = new RegExp("^[a-zA-Z0-9 ]{6,30}$");
  let isValid = true;
  let isValidName = true;
  let isDate = true;
  const [textName, onChangeNameText] = useState("");
  const [textDescription, onChangeDescriptionText] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [labId, setLabId] = useState("");
  const [isProjectNameValid, setProjectNameValid] = useState(false);
  const [isValidDate, setValidDate] = useState(false);
  const formatDate = (date) => {
    const d = new Date(date);
    let day = d.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    let month = d.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    return d.getFullYear() + "-" + month + "-" + day;
  };
  getLabId().then((v) => setLabId(v));
  const dispatch = useDispatch();

  const reset = () => {
    onChangeNameText("");
    onChangeDescriptionText("");
    setStartDate(new Date());
    setEndDate(new Date());
    setProjectNameValid(false);
    setValidDate(false);
  };

  function validateData() {
    if (!textName.match(regx)) {
      setProjectNameValid(true);
      isValid = false;
    } else {
      setProjectNameValid(false);
    }
    if (startDate > endDate) {
      setValidDate(true);
      isValid = false;
    } else {
      setValidDate(false);
    }
    if (isValid) {
      createProject();
      reset();
    }
  }

  const createProject = () => {
    const requestData = {
      projectName: textName,
      description: textDescription,
      startDate: formatDate(startDate),
      toDate: formatDate(endDate),
    };
    console.log(requestData);
    dispatch(createProjectInLab(labId, requestData, navigation));
  };
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Create a Project</Text>
        <View>
          <View>
            <Text style={styles.usage}>Enter lab information</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeNameText(text)}
              value={textName}
              placeholder={"Enter project's name"}
            />
            {isProjectNameValid && (
              <Text style={styles.inputInvalid}>
                Invalid lab's name, project name must be contain atleast 6
                character
              </Text>
            )}
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeDescriptionText(text)}
              value={textDescription}
              placeholder={"Enter project's description"}
            />
            <Text style={styles.titleDate}>Start Date</Text>
            <DateTimePicker
              style={{
                height: 40,
                width: "45%",
                marginRight: 30,
                marginLeft: "13%",
              }}
              type="date"
              value={startDate}
              onChangeDate={(startDate) => setStartDate(startDate)}
            />
            {isValidDate && (
              <Text style={styles.inputInvalid}>Invalid start date</Text>
            )}
            <Text style={styles.titleDate}>End Date</Text>
            <DateTimePicker
              style={{
                height: 40,
                width: "45%",
                marginRight: 30,
                marginLeft: "13%",
              }}
              type="date"
              value={endDate}
              onChangeDate={(endDate) => setEndDate(endDate)}
            />
            {isValidDate && (
              <Text style={styles.inputInvalid}>Invalid end date</Text>
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
