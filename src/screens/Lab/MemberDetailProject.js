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
import { SelectList } from "react-native-dropdown-select-list";
import LabNavigator from "../../navigations/LabNavigator";
import {
  updateMemberRoleById,
  removeMemberFromLaboratory,
  removeMemberInProjectById,
} from "../../actions/LaboratoryAction";
import Buttons from "../../components/Buttons";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";

const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@currentLabId");
    console.log("LabId in reate Project: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get LabId id: " + e);
  }
};

const getProjectId = async () => {
  try {
    const projectId = await AsyncStorage.getItem("@projectId");
    console.log("projectId: " + projectId);
    return projectId;
  } catch (e) {
    console.log("Can't get projectId: " + e);
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

export default function MemberDetailProject({ route, navigation }) {
  const data = route.params.data;
  const memberId = route.params.memberId;
  const labId = route.params.labId;
  const dispatch = useDispatch();
  console.log("data memberId: " + JSON.stringify(memberId));
  const [projectId, setProjectId] = useState("");
  getProjectId().then((v) => setProjectId(v));
  const [role, setRole] = useState("");
  getRoleInProject().then((v) => setRole(v));

  const removeMemberhandler = () => {
    dispatch(removeMemberInProjectById(projectId, memberId, navigation));
  };
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.ava}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: "https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
              }}
            />
          </View>
          <View style={styles.infoLeft}>
            <Text style={styles.txtLeft}>FPT University</Text>
            <Text style={styles.txtLeft}>Major: {data.major}</Text>
            <Text style={styles.txtLeft}>Age: 28</Text>
            <Text style={styles.txtLeft}>Sex: {data.gender}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.content}>
            <View style={styles.contact}>
              <Text style={styles.memberName}>{data.username}</Text>
              <Text style={styles.address}>
                {data.address} - {data.email}
              </Text>
              <Text style={[styles.description]}>{data.description}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.subTitle}>Interests</Text>
              <Text style={styles.description}>{data.interest}</Text>
              <Text style={styles.subTitle}>Certification & Awards</Text>
              <Text style={styles.description}>{data.award}</Text>
            </View>
            <View style={{ flexDirection: "row", marginLeft: 60 }}>
              <Buttons
                text={"Back"}
                style={styles.button}
                onPressTo={() => {
                  navigation.goBack(null);
                }}
              />
              {role == "MANAGER" || role == "OWNER" ? (
                <Buttons
                  text={"Remove"}
                  style={styles.button}
                  onPressTo={removeMemberhandler}
                />
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    width: 130,
    marginLeft: 10,
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
    width: "20%",
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
