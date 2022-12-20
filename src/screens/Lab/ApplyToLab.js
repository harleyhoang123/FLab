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
import axios from "axios";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-community/async-storage";
import { TouchableOpacity } from "react-native-web";
import { getAllCVOfAccount } from "../../networking/CustomNetworkService";
import { applyTolAbByLabId } from "../../actions/LaboratoryAction";

const getAccountId = async () => {
  try {
    const accountId = await AsyncStorage.getItem("@accountId");
    console.log("AccountId: " + accountId);
    return accountId;
  } catch (e) {
    console.log("Can't get account id: " + e);
  }
};

export default function ApplyToALab({ route, navigation }) {
  const labId = route.params.labId;
  console.log("All data:" + JSON.stringify(labId));

  const [accountId, setAccountId] = useState("");
  getAccountId().then((v) => setAccountId(v));
  const [reason, onChangeReasonText] = useState("");
  const [textDescription, onChangeDescriptionText] = useState("");
  const [selected, setSelected] = React.useState("");
  const [key, setKey] = React.useState("");
  const dispatch = useDispatch();

  const [data, setData] = React.useState([]);

  React.useEffect(
    () =>
      //Get Values from database
      getAllCVOfAccount()
        .then((response) => {
          // Store Values in Temporary Array
          let newArray = response.data.items.map((item) => {
            return {
              key: item.cvId,
              value: item.cvName,
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

  const createApplication = () => {
    const requestData = {
      accountId: accountId,
      reason: reason,
      cvKey: key,
    };
    console.log(requestData);
    dispatch(applyTolAbByLabId(labId, requestData, navigation));
  };
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Create your application</Text>
        <View>
          <View>
            <Text style={styles.usage}>Enter application information</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeReasonText(text)}
              value={reason}
              placeholder={"Reason"}
            />
            <SelectList
              setSelected={(val) => setSelected(val)}
              onSelect={() => setKey(selected)}
              placeholder={"List CV"}
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
                width: 130,
                marginLeft: "13%",
              }}
              search={false}
            />
          </View>

          <View style={styles.btn}>
            <Buttons
              text={"Submit"}
              style={styles.button}
              onPressTo={createApplication}
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
