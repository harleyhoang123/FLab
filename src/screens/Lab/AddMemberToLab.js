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
import { SelectList } from "react-native-dropdown-select-list";
import { getAllMember } from "../../networking/CustomNetworkService";
import { addMembersToLab } from "../../actions/LaboratoryAction";
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

export default function AddMemberTolab({ route, navigation }) {
  const [labId, setLabId] = useState("");
  getLabId().then((v) => setLabId(v));
  const [selected, setSelected] = React.useState("");
  const [key, setKey] = React.useState("");
  const dispatch = useDispatch();

  const [data, setData] = React.useState([]);

  React.useEffect(
    () =>
      //Get Values from database
      getAllMember()
        .then((response) => {
          // Store Values in Temporary Array
          console.log("All member: " + JSON.stringify(response.data.items));
          let newArray = response.data.items.map((item) => {
            return {
              key: item.accountId,
              value: item.fullName,
            };
          });
          //Set Data Variable
          setData(newArray);
        })
        .catch((e) => {
          console.log(e);
        }),
    []
  );

  const addMemberHandle = () => {
    const requestData = {
      accountId: key,
    };
    console.log(requestData);
    dispatch(addMembersToLab(labId, requestData, navigation));
  };
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Add member your's Lab</Text>
        <View>
          <View>
            <Text style={styles.usage}>Select member</Text>
          </View>
          <View>
            <SelectList
              setSelected={(val) => setSelected(val)}
              onSelect={() => setKey(selected)}
              placeholder={"List Member"}
              data={data}
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
                width: 330,
                marginLeft: "13%",
              }}
              search={false}
            />
          </View>

          <View style={styles.btn}>
            <Buttons
              text={"Add"}
              style={styles.button}
              onPressTo={addMemberHandle}
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