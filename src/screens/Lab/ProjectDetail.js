import React from "react";
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
import {getAllSprint} from "../../actions/WorkSpaceAction";
import ProjectNavigator from "../../navigations/ProjectNavigator";

export default function ProjectDetail({ route, navigation }) {
  const data = route.params.data;
  const dispatch = useDispatch();
  const goToListMemberPage = (projectId) => {
    dispatch(getAllMemberInProject(projectId, navigation));
  };
  const goToBacklog = (projectId) => {
    dispatch(getAllSprint(projectId, null, null, null, navigation));
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
                uri: "https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/300232743_3408205352835523_154913047176684005_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=jWga5X8GYPwAX8ojEHl&tn=4MAFI0onnZhJkevD&_nc_ht=scontent.fhan5-2.fna&oh=00_AfBvsivw4ziopD4xonbas0bH24jsgRHNN7J2BRIDbmzk6A&oe=638FEC75",
              }}
            />
          </View>
          <View style={styles.infoLeft}>
            <Text style={styles.txtLeft}>FPT University</Text>
            <Text style={styles.txtLeft}>
              Host: {data.lastModifiedBy.userInfo.fullName}
            </Text>
            <Text style={styles.txtLeft}>
              Email: {data.lastModifiedBy.userInfo.email}
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
