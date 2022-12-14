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

const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@currentLabId");
    console.log("LabId in reate Project: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get LabId id: " + e);
  }
};

export default function ViewAllMemberInProject({ route, navigation }) {
  const listMember = route.params.data;
  const data = listMember.items;
  const [labId, setLabId] = useState("");
  getLabId().then((v) => setLabId(v));

  const dispatch = useDispatch();
  const [projectId, setProjectId] = useState("");
  getProjectId().then((v) => setProjectId(v));
  const removeMember = (memberId) => {
    console.log("data" + projectId + data.memberId);
    dispatch(removeMemberInProjectById(projectId, memberId, navigation));
  };

  const goToMemberDetail = (accountId, memberId) => {
    dispatch(
      getmemberDetailByProfileId(accountId, labId, memberId, navigation)
    );
  };

  const Item = ({ accountId, memberId, memberName, email, roles }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Member name: {memberName}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>Email: {email}</Text>
        <View style={{ marginLeft: "auto", flexDirection: "row" }}>
          <Text
            onPress={() => goToMemberDetail(accountId, memberId)}
            style={styles.action}
          >
            Detail
          </Text>
          <Text onPress={() => removeMember(memberId)} style={styles.action}>
            Remove
          </Text>
          <Text
            onPress={() =>
              navigation.navigate("UpdateMemberRole", { memberid: memberId })
            }
            style={styles.action}
          >
            Update Role
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
        <Buttons
          text={"Back"}
          style={styles.buttonBack}
          onPressTo={() => {
            navigation.goBack(null);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBack: {
    marginTop: 20,
    width: 130,
    marginLeft: 5,
  },
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
    width: "45%",
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
