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
import { updateMemberRoleById } from "../../actions/LaboratoryAction";

export default function UpdateMemberRole({ route, navigation }) {
  const memberId = route.params.memberid;
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  const allRole = [
    { key: "1", value: "OWNER" },
    { key: "2", value: "MANAGER" },
    { key: "3", value: "MEMBER" },
  ];

  const updateRoleHandler = () => {
    const requestData = {
      role: selected,
    };
    dispatch(updateMemberRoleById(memberId, requestData, navigation));
  };
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Update member's role</Text>
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
          </View>

          <View style={styles.btn}>
            <Buttons
              text={"Update"}
              style={styles.button}
              onPressTo={updateRoleHandler}
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