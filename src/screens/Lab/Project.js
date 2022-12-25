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
import { getProjectById } from "../../actions/LaboratoryAction";
import AsyncStorage from "@react-native-community/async-storage";
import { removeProject } from "../../actions/LaboratoryAction";
import Buttons from "../../components/Buttons";

const getCuurentLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@currentLabId");
    console.log("LabId: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get labId id: " + e);
  }
};

const storeCurrentProjectId = async (projectId) => {
  try {
    await AsyncStorage.setItem("@currentProjectId", projectId);
  } catch (e) {
    console.log(
      "Can't save current project id to async storage: " + JSON.stringify(e)
    );
  }
};

const getCurrentMemberId = async () => {
  try {
    const memberId = await AsyncStorage.getItem("@currentMemberId");
    console.log("memberId in reate Project: " + memberId);
    return memberId;
  } catch (e) {
    console.log("Can't get memberId id: " + e);
  }
};

export default function Project({ route, navigation }) {
  const listProject = route.params.data;
  const data = listProject.items;
  const [labId, setLabId] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  getCuurentLabId().then((v) => setLabId(v));
  const [currentMemberId, setCurrentMemberId] = useState("");
  getCurrentMemberId().then((v) => setCurrentMemberId(v));
  console.log(JSON.stringify(data));

  const dispatch = useDispatch();
  const goToProjectDetailPage = (projectId) => {
    storeCurrentProjectId(projectId).then((r) =>
      console.log("Store current project id success")
    );
    dispatch(getProjectById(projectId, navigation));
  };

  const removeProjectById = (projectId, navigation) => {
    dispatch(removeProject(labId, projectId, currentMemberId, navigation));
  };

  const Item = ({ projectId, projectName, description, members }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Project name: {projectName}</Text>
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
              Do you want to remove this project?
            </Text>
            <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
              <Buttons
                text={"Delete"}
                style={{ marginRight: 40 }}
                onPressTo={() => {
                  removeProjectById(projectId, navigation);
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
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <Text style={styles.title}>Description: {description}</Text>
          <View style={{ flexDirection: "row", marginLeft: "auto" }}>
            <Text
              onPress={() => goToProjectDetailPage(projectId)}
              style={styles.action}
            >
              Detail
            </Text>
            <Text onPress={() => setShowConfirm(true)} style={styles.action}>
              Remove
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.title}>Member: {members}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item
      projectId={item.projectId}
      projectName={item.projectName}
      description={item.description}
      members={item.members}
    />
  );
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>List Project</Text>
          <Buttons
            text={"Create project"}
            style={styles.button}
            onPressTo={() => {
              navigation.navigate("CreateProject");
            }}
          />
        </View>
        <SafeAreaView>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.projectId}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    marginLeft: 30,
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
    alignItems: "flex-start",
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
