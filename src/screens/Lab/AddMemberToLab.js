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
import {
  getAllMember,
  getAllMemberInLab,
} from "../../networking/CustomNetworkService";
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
  let isValid = true;
  const [labId, setLabId] = useState("");
  getLabId().then((v) => setLabId(v));
  const [selected, setSelected] = React.useState("");
  const [key, setKey] = React.useState("");
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [isMember, setIsMember] = useState(false);

  function validateData() {
    if (!selected) {
      setIsMember(true);
      isValid = false;
    }
    if (isValid) {
      addMemberHandle();
    }
  }

  React.useEffect(() => {
    getAllMember().then((response) => {
      console.log("All member: " + JSON.stringify(response.data.items));
      let newArray1 = response.data.items.map((item) => {
        return {
          key: item.accountId,
          value: item.fullName,
        };
      });
      getAllMemberInLab().then((response) => {
        console.log(
          "All member in Lab: " + JSON.stringify(response.data.items)
        );
        let newArray2 = response.data.items.map((item) => {
          return {
            key: item.userInfo.accountId,
            value: item.userInfo.userInfo.fullName,
          };
        });
        setData(
          newArray1.filter((i) => !newArray2.find(({ key }) => i.key === key))
        );
      });
    });
  }, []);
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
            {isMember && (
              <Text style={styles.inputInvalid}>Please choose a member</Text>
            )}
          </View>

          <View style={styles.btn}>
            <Buttons
              text={"Add"}
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
