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
        value={accountId.includes(item.accountId)}
        onValueChange={() => {
          accountId.includes(item.accountId)
            ? setAccountId(accountId.filter((v) => v !== item.accountId))
            : setAccountId((oldAccountId) => [...oldAccountId, item.accountId]);
        }}
      />
    </View>
    <View style={styles.column}>
      <Text>{item.username}</Text>
    </View>
    <View style={styles.column}>
      <Text>{item.email}</Text>
    </View>
    <View style={styles.column}>
      <Text>{item.fullName}</Text>
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
    const requestData = {
      accountId: accountId,
    };
    console.log(requestData);
    dispatch(addMembersToLab(requestData, navigation));
  };

  const renderItem = ({ item }) => (
    <View>
        <Item item={item} accountId={accountId} setAccountId={setAccountId} />
    </View>
  );
  return (
    <View>
      <Pressable onPress={addMemberHandle}>
        <View style={styles.button}>
          <Text style={styles.txt}>Add</Text>
        </View>
      </Pressable>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={listMember}
          renderItem={renderItem}
          keyExtractor={(item) => item.accountId}
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
    justifyContent: "center",
    borderWidth: 1,
    alignItems: "center",
    width: 50,
    height: 50,
  },
  column: {
    borderColor: "black",
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
