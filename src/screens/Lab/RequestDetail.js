import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Text,
  StatusBar,
  Linking,
} from "react-native";
import { useDispatch } from "react-redux";
import Buttons from "../../components/Buttons";
import LabNavigator from "../../navigations/LabNavigator";
import AsyncStorage from "@react-native-community/async-storage";
import { reviewRequest } from "../../networking/CustomNetworkService";

const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@currentLabId");
    console.log("LabId in reate Project: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get LabId id: " + e);
  }
};

export default function RequestDetail({ route, navigation }) {
  const data = route.params.data;
  console.log("DATA DETAIL:" + JSON.stringify(data));
  const approval = "APPROVED";
  const reject = "REJECTED";
  const [labId, setLabId] = useState("");
  getLabId().then((v) => setLabId(v));
  console.log("LabId in request:" + labId);
  const [textComment, onChangeTextComment] = useState("");
  const dispatch = useDispatch();

  const reviewRequestHandler = (response) => {
    const requestData = {
      status: response,
      comment: textComment,
    };
    console.log(requestData);
    reviewRequest(
      labId,
      data.applicationId,
      requestData,
      navigation,
      dispatch,
      navigation
    ).then(v=>{}).catch(error => {});
  };

  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Application Detail</Text>
        <View>
          <Text style={styles.input}>
            Name: {data.createdBy.userInfo.fullName}
          </Text>
          <Text style={styles.input}>
            Email: {data.createdBy.userInfo.email}
          </Text>

          <Text style={styles.input}>Reason: {data.reason}</Text>
          {data.status ? (
            <Text style={styles.input}>Status: {data.status}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            onChangeText={(text) => onChangeTextComment(text)}
            value={textComment}
            placeholder={"Enter your's comment"}
          />

          <View style={styles.btn}>
            <Buttons
              text={"View CV"}
              style={styles.button}
              onPressTo={() => {
                Linking.openURL(data.cvKey).then((r) => {});
              }}
            />
            <Buttons
              text={"Accept"}
              style={styles.button}
              onPressTo={() => reviewRequestHandler(approval)}
            />
            <Buttons
              text={"Reject"}
              style={styles.button}
              onPressTo={() => reviewRequestHandler(reject)}
            />
            <Buttons
              text={"Back"}
              style={styles.button}
              onPressTo={() => {
                navigation.goBack(null);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  button: {
    marginTop: 20,
    width: 130,
    marginLeft: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "45%",
    marginLeft: "13%",
  },
  title: {
    fontSize: 30,
    marginLeft: "10%",
    marginTop: "3%",
  },
  usage: {
    fontSize: 20,
    marginLeft: "13%",
    marginTop: 10,
  },
  btn: {
    marginLeft: "13%",
  },
});
