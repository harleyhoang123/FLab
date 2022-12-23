import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  CheckBox,
  Pressable,
} from "react-native";
import { addMembersToLab } from "../actions/LaboratoryAction";
import { useDispatch } from "react-redux";
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

const Item = ({ item, accountId, setAccountId }) => (
  <View style={styles.checkboxContainer}>
    <View style={styles.columnCheckBox}>
      <CheckBox
        value={accountId.includes(item.key)}
        onValueChange={() => {
          accountId.includes(item.key)
            ? setAccountId(accountId.filter((v) => v !== item.key))
            : setAccountId((oldAccountId) => [...oldAccountId, item.key]);
        }}
      />
    </View>
    <View style={styles.column}>
      <Text>{item.value}</Text>
    </View>
  </View>
);
const ListUserComponent = ({ listMember, navigation }) => {
  const [accountId, setAccountId] = useState([]);
  const [labId, setLabId] = useState("");
  getLabId().then((v) => setLabId(v));
  console.log(accountId);
  const dispatch = useDispatch();
  const addMemberHandle = () => {
    console.log("ARRAY TEST:" + JSON.stringify(accountId));
    const requestData = {
      accountId: accountId,
    };
    console.log(requestData);
    dispatch(addMembersToLab(requestData, navigation));
  };

  const renderItem = ({ item }) => (
    <View>
      <View></View>
      <View>
        <Item item={item} accountId={accountId} setAccountId={setAccountId} />
      </View>
    </View>
  );
  return (
    <View>
      <Pressable onPress={addMemberHandle}>
        <View style={styles.button}>
          <Text style={styles.txt}>Add</Text>
        </View>
      </Pressable>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.columnCheckBox}></View>
        <View style={styles.column}>
          <Text>Member</Text>
        </View>
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={listMember}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    color: "white",
  },
  button: {
    width: 130,
    height: 45,
    marginBottom: 15,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
  columnCheckBox: {
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    borderWidth: 1,
    alignItems: "center",
    width: 50,
    height: 50,
  },
  column: {
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    borderWidth: 1,
    alignItems: "center",
    width: 220,
    height: 50,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: "row",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default ListUserComponent;
