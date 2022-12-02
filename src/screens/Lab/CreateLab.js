import React from "react";
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
import Buttons from "../../components/Buttons";
import LabNavigator from "../../navigations/LabNavigator";

export default function CreateLab({ navigation }) {
  const [textName, onChangeNameText] = React.useState("");
  const [textDescription, onChangeDescriptionText] = React.useState("");
  const [textMajor, onChangeMajorText] = React.useState("");
  return (
    <View>
      <LabNavigator />
      <View style={styles.container}>
        <Text style={styles.title}>Create a Lab</Text>
        <View>
          <View>
            <Text style={styles.usage}>Enter lab information</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNameText}
              value={textName}
              placeholder={"Enter lab's name"}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeDescriptionText}
              value={textDescription}
              placeholder={"Enter lab's description"}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeMajorText}
              value={textMajor}
              placeholder={"Enter lab's major"}
            />
          </View>

          <View style={styles.btn}>
            <Buttons
              text={"Create"}
              style={styles.button}
              onPressTo={() => {
                navigation.goBack(null);
              }}
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
