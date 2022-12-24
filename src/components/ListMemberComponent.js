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
import { addMembersToProject } from "../actions/LaboratoryAction";

const getProjectId = async () => {
  try {
    const projectId = await AsyncStorage.getItem("@projectId");
    console.log("projectId: " + projectId);
    return projectId;
  } catch (e) {
    console.log("Can't get projectId: " + e);
  }
};

const Item = ({ item, memberId, setMemberId }) => (
  <View style={styles.checkboxContainer}>
    <View style={styles.columnCheckBox}>
      <CheckBox
        value={memberId.includes(item.memberId)}
        onValueChange={() => {
          memberId.includes(item.key)
            ? setMemberId(memberId.filter((v) => v !== item.memberId))
            : setMemberId((oldMemberId) => [...oldMemberId, item.memberId]);
        }}
      />
    </View>
    <View style={styles.column}>
      <Text>{item.fullName}</Text>
    </View>
    <View style={styles.column}>
      <Text>{item.email}</Text>
    </View>
    <View style={styles.column}>
      <Text>{item.fullName}</Text>
    </View>
  </View>
);
const ListMemberComponent = ({ listMember, navigation }) => {
  const [memberId, setMemberId] = useState([]);
  const [projectId, setProjectId] = useState("");
  getProjectId().then((v) => setProjectId(v));
  console.log(memberId);
  const dispatch = useDispatch();
  const addMemberHandle = () => {
    const requestData = {
      memberId: memberId,
    };
    console.log(requestData);
    dispatch(addMembersToProject(projectId, requestData, navigation));
  };

  const renderItem = ({ item }) => (
    <View>
      <View></View>
      <View>
        <Item item={item} memberId={memberId} setMemberId={setMemberId} />
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
        <View style={styles.column}>
          <Text>Email</Text>
        </View>
        <View style={styles.column}>
          <Text>Fullname</Text>
        </View>
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={listMember}
          renderItem={renderItem}
          keyExtractor={(item) => item.memberId}
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
    marginBottom: 10,
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

export default ListMemberComponent;
