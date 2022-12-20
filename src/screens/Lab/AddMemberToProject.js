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
import { addMembersToProject } from "../../actions/LaboratoryAction";
import { SelectList } from "react-native-dropdown-select-list";
import {
  getAllMemberInLab,
  getAllMemberInProject,
} from "../../networking/CustomNetworkService";

export default function AddMemberToProject({ route, navigation }) {
  const projectId = route.params.projectId;
  const raw = route.params.allMember.items;
  console.log("All data:" + JSON.stringify(data));

  const [data, setData] = React.useState([]);
  let isValid = true;
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
    getAllMemberInLab().then((response) => {
      let newArray1 = response.data.items.map((item) => {
        return {
          key: item.memberId,
          value: item.userInfo.userInfo.fullName,
        };
      });
      console.log("DATA1: " + JSON.stringify(newArray1));
      getAllMemberInProject().then((response) => {
        let newArray2 = response.data.items.map((item) => {
          return {
            key: item.memberId,
            value: item.userInfo.userInfo.fullName,
          };
        });
        console.log("DATA2: " + JSON.stringify(newArray2));
        setData(
          newArray1.filter((i) => !newArray2.find(({ key }) => i.key === key))
        );
        console.log(
          "DATA3: " +
            JSON.stringify(
              newArray1.filter(
                (i) => !newArray2.find(({ key }) => i.key === key)
              )
            )
        );
      });
    });
  }, []);

  const [selected, setSelected] = React.useState("");
  const [key, setKey] = React.useState("");
  const dispatch = useDispatch();

  const addMemberHandle = () => {
    const requestData = {
      memberId: key,
    };
    console.log(requestData);
    dispatch(addMembersToProject(projectId, requestData, navigation));
  };
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Add member your's project</Text>

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
                width: 130,
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
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    width: 215,
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
