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
      getmemberDetailProjectByProfileId(accountId, labId, memberId, navigation)
    );
  };

  const Item = ({ accountId, memberId, memberName, email, roles }) => (
    <View style={styles.item}>
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
                  removeMember(memberId);
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
          <Text onPress={() => setShowConfirm(true)} style={styles.action}>
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
      accountId={item.userInfo.accountId}
      memberId={item.memberId}
      memberName={item.userInfo.userInfo.fullName}
      email={item.userInfo.userInfo.email}
      roles={item.role}
    />
  );
  const [showConfirm, setShowConfirm] = useState(false);
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
