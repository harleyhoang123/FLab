import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Buttons from "../../components/Buttons";
import ProjectNavigator from "../../navigations/ProjectNavigator";
import { getActivityStreams } from "../../networking/CustomNetworkService";
import AsyncStorage from "@react-native-community/async-storage";

const getProjectId = async () => {
  try {
    const projectId = await AsyncStorage.getItem("@projectId");
    console.log("projectId: " + projectId);
    return projectId;
  } catch (e) {
    console.log("Can't get projectId: " + e);
  }
};

function ActivityStreams({ navigation }) {
  const [activities, setActivities] = useState();
  useEffect(() => {
    getProjectId().then((v) => {
      getActivityStreams(v, navigation).then((r) => {
        setActivities(r.data.activities);
      }).catch(error => {});
    });
  }, []);
  const formatterDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const d = new Date(date);
    return (
      d.toLocaleDateString("en-US", options) +
      ", " +
      d.toTimeString().split("G")[0]
    );
  };
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
              style={{ height: 40, margin: 30 }}
              onPressTo={() => navigation.push("IssueStatistics")}
            />
            <Buttons
              text={"Assigned to Me"}
              style={{ height: 40, margin: 30 }}
              onPressTo={() => navigation.push("AssignedToMe")}
            />
            <Buttons
              text={"Activity Streams"}
              style={{ height: 40, margin: 30 }}
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
                Activity Stream
              </Text>
              <Buttons text={"Refresh"} style={{ height: 40, margin: 10 }} />
            </View>
            <FlatList
              data={activities}
              renderItem={({ item }) => (
                <View>
                  <Text style={styles.descriptionDetail}>
                    <Text style={styles.childIssues}>
                      {item.userInfo.fullName}
                    </Text>
                    {item.edited} at {formatterDate(item.createdDate)}
                  </Text>
                </View>
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
  descriptionDetail: {
    fontSize: 16,
    alignItems: "center",
    margin: 15,
  },
  childIssues: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
  },
});
export default ActivityStreams;
