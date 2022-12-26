import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
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
import Buttons from "../../components/Buttons";
import { getAllMemberInProject } from "../../actions/LaboratoryAction";
import { getAllSprint } from "../../actions/WorkSpaceAction";
import ProjectNavigator from "../../navigations/ProjectNavigator";
import AsyncStorage from "@react-native-community/async-storage";

const getRoleInProject = async () => {
  try {
    const role = await AsyncStorage.getItem("@roleInProject");
    console.log("role: " + role);
    return role;
  } catch (e) {
    console.log("Can't get role: " + e);
  }
};

export default function ProjectDetail({ route, navigation }) {
  const data = route.params.data;
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  getRoleInProject().then((v) => setRole(v));

  console.log("roleAsyn: " + role);

  const goToListMemberPage = (projectId) => {
    dispatch(getAllMemberInProject(projectId, navigation));
  };
  const goToBacklog = (projectId) => {
    dispatch(getAllSprint(projectId, navigation));
  };
  return (
    <View>
      <ProjectNavigator navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.ava}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: data.createdBy.userInfo.avatar,
              }}
            />
          </View>
          <View style={styles.infoLeft}>
            <Text style={styles.txtLeft}>FPT University</Text>
            <Text style={styles.txtLeft}>
              Host: {data.createdBy.userInfo.fullName}
            </Text>
            <Text style={styles.txtLeft}>
              Email: {data.createdBy.userInfo.email}
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.content}>
            <View style={styles.contact}>
              <Text style={styles.memberName}>{data.projectName}</Text>
              <Text style={styles.address}>
                Last Modified Date: {data.lastModifiedDate}
              </Text>
              <Text style={[styles.description]}>{data.description}</Text>
            </View>
            <Buttons
              style={styles.button}
              text={"View All Member"}
              onPressTo={() => goToListMemberPage(data.projectId)}
            />
            {role == "MANAGER" || role == "OWNER" ? (
              <Buttons
                style={styles.button}
                text={"Update"}
                onPressTo={() =>
                  navigation.navigate("UpdateProject", {
                    projectInfo: data,
                  })
                }
              />
            ) : null}

            <Buttons
              style={styles.button}
              text={"BackLog"}
              onPressTo={() => goToBacklog(data.projectId)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    marginLeft: 60,
    padding: 10,
    elevation: 2,
    marginRight: 10,
    width: 200,
    marginTop: 10,
  },
  infoLeft: {
    alignItems: "center",
  },
  subTitle: {
    fontSize: 40,
    fontWeight: 400,
  },
  detail: {
    marginTop: 10,
    marginLeft: 60,
  },
  strenght: {
    fontSize: 24,
  },
  container: {
    flexDirection: "row",
  },
  left: {
    width: "30%",
    height: "100vh",
    backgroundColor: "#bd5d38",
    justifyContent: "center",
    alignItems: "center",
  },
  memberName: {
    fontSize: 96,
    fontWeight: 700,
    color: "#bd5d38",
  },
  address: {
    fontWeight: 24,
    fontSize: 24,
    marginBottom: 48,
  },
  txtLeft: {
    fontSize: 25,
    color: "white",
    marginBottom: 10,
    fontWeight: 600,
  },
  ava: {
    marginBottom: 20,
  },
  content: {
    width: "90%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  contact: {
    margin: 60,
  },
  right: {
    width: "80%",
    height: "100vh",
  },
  tinyLogo: {
    width: 160,
    height: 160,
    borderRadius: "50%",
    borderWidth: "0.5rem",
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  description: {
    color: "#343a40",
    fontWeight: 24,
    fontSize: 18.4,
    marginBottom: 48,
    fontWeight: 400,
    marginBottom: 30,
  },
});
