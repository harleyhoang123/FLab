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

const getCuurentLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@currentLabId");
    console.log("LabId: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get labId id: " + e);
  }
};

export default function Project({ route, navigation }) {
  const listProject = route.params.data;
  const data = listProject.items;
  const [labId, setLabId] = useState("");
  getCuurentLabId().then((v) => setLabId(v));

  console.log(JSON.stringify(data));

  const dispatch = useDispatch();
  const goToProjectDetailPage = (projectId) => {

    dispatch(getProjectById(projectId, navigation));
  };

  const removeProjectById = (projectId) => {
    dispatch(removeProject(labId, projectId, navigation));
  };

  const Item = ({ projectId, projectName, description, members }) => (
    <View style={styles.item}>
      <Text>{projectId}</Text>
      <Text style={styles.title}>Project name: {projectName}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>Description: {description}</Text>
        <View style={{ marginLeft: "60%", flexDirection: "row" }}>
          <Text
            onPress={() => goToProjectDetailPage(projectId)}
            style={styles.action}
          >
            Detail
          </Text>
          <Text
            onPress={() => removeProjectById(projectId)}
            style={styles.action}
          >
            Remove
          </Text>
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
