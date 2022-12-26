import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";
import {
  getAllMemberInProject,
} from "../actions/LaboratoryAction";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from "../assets/Logo";
import { getAllSprint } from "../actions/WorkSpaceAction";
import { getFolderByRepositoryId } from "../actions/RepositoryAction";
import RightNavigation from "./RightNavigation";
import {getOTT} from './../networking/CustomNetworkService'
import {routes} from "../controllers";
const getRepoId = async () => {
  try {
    const repoId = await AsyncStorage.getItem("@currentProjectId");
    console.log("repoId: " + repoId);
    return repoId;
  } catch (e) {
    console.log("Can't get repo id: " + e);
  }
};
const getProjectId = async () => {
  try {
    const projectId = await AsyncStorage.getItem("@projectId");
    console.log("projectId: " + projectId);
    return projectId;
  } catch (e) {
    console.log("Can't get account id: " + e);
  }
};
function ProjectNavigator({ navigation }) {
  const [repoId, setRepoId] = useState("");
  getRepoId().then((v) => setRepoId(v));
  const [projectId, setProject] = useState("");
  getProjectId().then((v) => setProject(v));
  const dispatch = useDispatch();
  const goToRepository = () => {
    dispatch(getFolderByRepositoryId(repoId, navigation));
  };
  console.log("ProjectId in asyncStore: " + repoId);
  const goToListMemberPage = (projectId) => {
    dispatch(getAllMemberInProject(projectId, navigation));
  };
  const goToBacklog = (projectId) => {
    dispatch(getAllSprint(projectId, navigation));
  };

  function goToDocument() {
    getOTT(navigation).then(r => {
      console.log("URL: "+ "http://127.0.0.1:4200/document/spaces?ott="+r.ott)
      Linking.openURL(routes.document.spaces+r.ott).then(r => {});
    }).catch(error => {
      console.log("ERROR:"+ error)
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.topNavigationContent}>
        <View style={styles.topNavigationContentLeft}>
          <TouchableOpacity
            style={styles.btnLogo}
            onPress={() => navigation.navigate("Home")}
          >
            <Logo />
            <Text style={styles.textLogo}>FLAB</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToBacklog(projectId)}
          >
            <Text style={styles.textLogo}>Backlog</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={goToDocument}
          >
            <Text style={styles.textLogo}>Document</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToListMemberPage(projectId)}
          >
            <Text style={styles.textLogo}>Member</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToRepository}>
            <Text style={styles.textLogo}>Repository</Text>
          </TouchableOpacity>
        </View>
        <RightNavigation navigation={navigation}/>
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
export default ProjectNavigator;
