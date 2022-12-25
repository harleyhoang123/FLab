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
import { SelectList } from "react-native-dropdown-select-list";
import Buttons from "../../components/Buttons";
import LabNavigator from "../../navigations/LabNavigator";
import { createLaboratory } from "../../actions/LaboratoryAction";
import { updateMemberRoleinProjectById } from "../../actions/LaboratoryAction";

export default function UpdateMemberRoleInProject({ route, navigation }) {
  let isValid = true;
  const memberId = route.params.memberid;
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  const allRole = [
    { key: "1", value: "MANAGER" },
    { key: "2", value: "MEMBER" },
  ];

  const [isMember, setIsMember] = useState(false);

  function validateData() {
    if (!selected) {
      setIsMember(true);
      isValid = false;
    }
    if (isValid) {
      updateRoleHandler();
    }
  }

  const updateRoleHandler = () => {
    const requestData = {
      role: selected,
    };
    dispatch(updateMemberRoleinProjectById(memberId, requestData, navigation));
  };
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Update member's role in project</Text>
        <View>
          <View>
            <Text style={styles.usage}>Select new role</Text>
          </View>
          <View>
            <SelectList
              setSelected={(val) => setSelected(val)}
              placeholder={"Choose member's role"}
              data={allRole}
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
            {isMember && (
              <Text style={styles.inputInvalid}>
                Please choose a member's role
              </Text>
            )}
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
