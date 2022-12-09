import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Icon,
  StatusBar,
  Modal,
  Pressable,
  TextField,
} from "react-native";
import LabNavigator from "../../navigations/LabNavigator";
import { useDispatch } from "react-redux";
import { removeMemberInProjectById } from "../../actions/LaboratoryAction";
import AsyncStorage from "@react-native-community/async-storage";
import ProjectNavigator from "../../navigations/ProjectNavigator";
import Buttons from "../../components/Buttons";
import { getAllMemberInLab } from "../../networking/CustomNetworkService";
import { getmemberDetailByProfileId } from "../../actions/LaboratoryAction";

const getProjectId = async () => {
  try {
    const projectId = await AsyncStorage.getItem("@projectId");
    console.log("projectId: " + projectId);
    return projectId;
  } catch (e) {
    console.log("Can't get projectId: " + e);
  }
};

export default function ViewAllMemberInProject({ route, navigation }) {
  const listMember = route.params.data;
  const data = listMember.items;

  const dispatch = useDispatch();
  const [projectId, setProjectId] = useState("");
  getProjectId().then((v) => setProjectId(v));
  const removeMember = (memberId) => {
    console.log("data" + projectId + data.memberId);
    dispatch(removeMemberInProjectById(projectId, memberId, navigation));
  };

  const goToMemberDetail = (accountId) => {
    dispatch(getmemberDetailByProfileId(accountId, navigation));
  };

  const Item = ({ accountId, memberId, memberName, email, roles }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Member name: {memberName}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>Email: {email}</Text>
        <View style={{ marginLeft: "60%", flexDirection: "row" }}>
          <Text
            onPress={() => goToMemberDetail(accountId)}
            style={styles.action}
          >
            Detail
          </Text>
          <Text onPress={() => removeMember(memberId)} style={styles.action}>
            Remove
          </Text>
        </View>
      </View>
      <Text style={styles.title}>Roles: {roles}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item
      memberId={item.memberId}
      memberName={item.userInfo.userInfo.fullName}
      email={item.userInfo.userInfo.email}
      roles={item.role}
      accountId={item.userInfo.accountId}
    />
  );
  return (
    <View>
      <ProjectNavigator navigation={navigation} />
      <View style={styles.container}>
        <View>
          <Buttons
            style={styles.button}
            onPressTo={() =>
              navigation.navigate("AddMemberToProject", {
                allMember: listMember,
                projectId: projectId,
              })
            }
            text={"Add new member"}
          />
        </View>
        <SafeAreaView>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.memberId}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    width: 215,
  },
  action: {
    borderRadius: 5,
    color: "white",
    backgroundColor: "black",
    padding: 5,
    marginRight: 2,
  },
  container: {
    flexDirection: "column",
    marginTop: 30,
    marginLeft: 50,
  },
  item: {
    width: "70%",
    borderRadius: 5,
    margin: 30,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  title: {
    fontSize: 23,
    fontWeight: 400,
  },
  heading: {
    fontSize: 26,
    fontWeight: 700,
  },
});
