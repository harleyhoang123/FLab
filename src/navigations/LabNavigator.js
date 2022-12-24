import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Logo from "../assets/Logo";
import { useDispatch } from "react-redux";
import {
  getAllMemberInLaboratoryById,
  getAllProjectByLabId,
  getListMaterialByLabId,
} from "../actions/LaboratoryAction";
import AsyncStorage from "@react-native-community/async-storage";
import RightNavigation from "./RightNavigation";
const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@labId");
    console.log("labId: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get labId: " + e);
  }
};
const getMemberId = async () => {
  try {
    const memberId = await AsyncStorage.getItem("@currentMemeberId");
    console.log("memberId in reate Project: " + memberId);
    return memberId;
  } catch (e) {
    console.log("Can't get memberId id: " + e);
  }
};
export default function LabNavigator({ route, navigation, isJoined }) {
  const [labId, setLabId] = useState("");
  getLabId().then((v) => setLabId(v));
  getMemberId().then((v) => setMemberId(v));
  const [memberId, setMemberId] = useState("");
  const dispatch = useDispatch();

  const goToViewAllMemberPage = (labId) => {
    if (isJoined == false) {
      return;
    }
    dispatch(getAllMemberInLaboratoryById(labId, navigation));
  };
  const goToListMaterial = () => {
    if (isJoined == false) {
      return;
    }
    dispatch(getListMaterialByLabId(labId, navigation));
  };
  const goToViewAllProjectPage = (labId) => {
    if (isJoined == false) {
      return;
    }
    dispatch(getAllProjectByLabId(labId, memberId, navigation));
  };
  return (
    <View style={styles.container}>
      <View style={styles.topNavigationContent}>
        <View style={styles.topNavigationContentLeft}>
          <TouchableOpacity
            style={styles.btnLogo}
            onPress={() => navigation.push("Home")}
          >
            <Logo />
            <Text style={styles.textLogo}>FLAB</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToViewAllProjectPage(labId)}
          >
            <Text style={styles.textLogo}>Project</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToViewAllMemberPage(labId)}
          >
            <Text style={styles.textLogo}>Member</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToListMaterial()}
          >
            <Text style={styles.textLogo}>Material</Text>
          </TouchableOpacity>
        </View>
        <RightNavigation navigation={navigation} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  topNavigationContent: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  topNavigationContentLeft: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  btnLogo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  textLogo: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
