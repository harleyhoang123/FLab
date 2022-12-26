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
import { getmemberDetailProjectByProfileId } from "../../actions/LaboratoryAction";

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

const getRoleInProject = async () => {
  try {
    const role = await AsyncStorage.getItem("@roleInProject");
    console.log("role: " + role);
    return role;
  } catch (e) {
    console.log("Can't get role: " + e);
  }
};

export default function ViewAllMemberInProject({ route, navigation }) {
  const listMember = route.params.data;
  const data = listMember.items;
  const [labId, setLabId] = useState("");
  getLabId().then((v) => setLabId(v));
  const [role, setRole] = useState("");
  getRoleInProject().then((v) => setRole(v));
  const dispatch = useDispatch();
  const [projectId, setProjectId] = useState("");
  getProjectId().then((v) => setProjectId(v));
  const [mId, setMId] = useState("");
  const removeMember = (projectId, memberId) => {
    dispatch(removeMemberInProjectById(projectId, memberId, navigation));
  };

  const goToMemberDetail = (accountId, memberId) => {
    dispatch(
      getmemberDetailProjectByProfileId(accountId, labId, memberId, navigation)
    );
  };

  const getAccountId = async () => {
    try {
      const accountId = await AsyncStorage.getItem("@accountId");
      console.log("AccountId: " + accountId);
      return accountId;
    } catch (e) {
      console.log("Can't get account id: " + e);
    }
  };

  const [accountIdCurrent, setAccountId] = useState("");
  getAccountId().then((v) => setAccountId(v));

  const callbackSetId = (id) => {
    setMId(id);
  };
  const Item = ({ accountId, id, memberName, email, roles, callbackSetId }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Member name: {memberName}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>Email: {email}</Text>
        <View style={{ marginLeft: "auto", flexDirection: "row" }}>
          <Buttons
            onPressTo={() => goToMemberDetail(accountId, id)}
            style={styles.action}
            text={"Detail"}
          />
          {role == "MANAGER" ||
          (role == "OWNER" && accountId !== accountIdCurrent) ? (
            <View style={{ flexDirection: "row" }}>
              <Buttons
                onPressTo={() => {
                  setShowConfirm(true);
                  callbackSetId(id);
                }}
                style={styles.action}
                text={"Remove"}
              />
              <Buttons
                onPressTo={() => {
                  navigation.navigate("UpdateMemberRoleInProject", {
                    memberid: id,
                  });
                }}
                style={styles.action}
                text={"Update Role"}
              />
            </View>
          ) : null}
        </View>
      </View>
      <Text style={styles.title}>Roles: {roles}</Text>
    </View>
  );
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <View>
      <ProjectNavigator navigation={navigation} />
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showConfirm}
          onRequestClose={() => {
            setShowConfirm(false);
          }}
        >
          <View style={styles.modalDelete}>
            <View style={styles.modalDeleteView}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
              >
                Do you want to remove this member?
              </Text>
              <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
                <Buttons
                  text={"Delete"}
                  style={{ marginRight: 40 }}
                  onPressTo={() => {
                    removeMember(projectId, mId);
                    setShowConfirm(false);
                  }}
                />
                <Buttons
                  text={"Cancel"}
                  style={{ backgroundColor: "#F4F5F7" }}
                  styleText={{ color: "black" }}
                  onPressTo={() => setShowConfirm(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
        <View>
          {role == "MANAGER" || role == "OWNER" ? (
            <Buttons
              style={styles.button}
              onPressTo={() =>
                navigation.push("AddMemberToProject", {
                  allMember: listMember,
                  projectId: projectId,
                })
              }
              text={"Add new member"}
            />
          ) : null}
        </View>
        <SafeAreaView>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Item
                accountId={item.userInfo.accountId}
                id={item.memberId}
                memberName={item.userInfo.userInfo.fullName}
                email={item.userInfo.userInfo.email}
                roles={item.role}
                projectId={projectId}
                callbackSetId={callbackSetId}
              />
            )}
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
  modalDelete: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalDeleteView: {
    width: "30%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 50,
  },
});
