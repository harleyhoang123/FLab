import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Buttons from "../../components/Buttons";
import ProjectNavigator from "../../navigations/ProjectNavigator";
import AsyncStorage from "@react-native-community/async-storage";
import { getAssignedToMe } from "../../networking/CustomNetworkService";
import UserInfoComponent from "../../components/UserInfoComponent";

const getProjectId = async () => {
  try {
    const projectId = await AsyncStorage.getItem("@projectId");
    console.log("projectId: " + projectId);
    return projectId;
  } catch (e) {
    console.log("Can't get projectId: " + e);
  }
};
const getMemberId = async () => {
  try {
    return await AsyncStorage.getItem("@memberIdProject");
  } catch (e) {
    console.log("Can't get memberIdProject: " + e);
  }
};

function AssignedToMe({ navigation }) {
  const [listAssign, setListAssign] = useState();
  useEffect(() => {
    getProjectId().then((v) => {
      getMemberId().then((r) => {
        getAssignedToMe(v, r, navigation).then((l) => {
          setListAssign(l.data);
        });
      });
    });
  }, []);
  const Item = ({ summary, estimate, reporter }) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ width: "50%", margin: 10 }}>
        <Text>{summary}</Text>
      </View>
      <View style={{ width: "10%", margin: 10 }}>
        <Text>{estimate}</Text>
      </View>
      <View style={{ width: "40%", margin: 10 }}>
        <UserInfoComponent info={reporter} />
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <ProjectNavigator navigation={navigation} />
      <View style={styles.containerContent}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", margin: 30 }}>
            {" "}
            Project Dashboards
          </Text>
          <View style={{ flexDirection: "row", marginRight: 30 }}>
            <Buttons
              text={"Issue Statistics"}
              style={{ width: "25%", height: 40, margin: 30 }}
              onPressTo={() => navigation.push("IssueStatistics")}
            />
            <Buttons
              text={"Assigned to Me"}
              style={{ width: "25%", height: 40, margin: 30 }}
              onPressTo={() => navigation.push("AssignedToMe")}
            />
            <Buttons
              text={"Activity Streams"}
              style={{ width: "25%", height: 40, margin: 30 }}
              onPressTo={() => navigation.push("ActivityStreams")}
            />
          </View>
        </View>

        <View style={styles.content}>
          <View style={{ margin: 20 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold", margin: 10 }}>
                Assigned to Me
              </Text>
              <Buttons text={"Refresh"} style={{ height: 40, margin: 10 }} />
            </View>
            <View style={{ flexDirection: "row", borderBottomWidth: 2 }}>
              <View style={{ width: "50%", margin: 10 }}>
                <Text>Task</Text>
              </View>
              <View style={{ width: "10%", margin: 10 }}>
                <Text>Estimate</Text>
              </View>
              <View style={{ width: "40%", margin: 10 }}>
                <Text>Reporter</Text>
              </View>
            </View>
            <FlatList
              data={listAssign}
              renderItem={({ item }) => (
                <Item
                  summary={item.issueName}
                  estimate={item.estimate}
                  reporter={item.reporter}
                />
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    flex: 1,
  },
  containerContent: {
    flex: 1,
    alignSelf: "center",
    width: "80%",
    backgroundColor: "white",
  },
  content: {
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 30,
    marginRight: 30,
  },
});
export default AssignedToMe;
