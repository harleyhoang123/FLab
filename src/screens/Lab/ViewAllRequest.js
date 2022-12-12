import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  Icon,
  StatusBar,
  Modal,
  Pressable,
  TextField,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import LabNavigator from "../../navigations/LabNavigator";
import { useDispatch } from "react-redux";
import { removeMemberInProjectById } from "../../actions/LaboratoryAction";
import AsyncStorage from "@react-native-community/async-storage";
import ProjectNavigator from "../../navigations/ProjectNavigator";
import Buttons from "../../components/Buttons";
import { getmemberDetailByProfileId } from "../../actions/LaboratoryAction";
import { getRequestDetailByApplicationId } from "../../actions/LaboratoryAction";
import { TouchableOpacity } from "react-native-web";

export default function ViewAllRequest({ route, navigation }) {
  const listRequest = route.params.data;

  const allStatus = [
    { key: "1", value: "APPROVED" },
    { key: "2", value: "REJECTED" },
    { key: "3", value: "WAITING_FOR_APPROVAL" },
  ];

  const [selected, setSelected] = React.useState("");
  let data = listRequest.items;

  function filterStatus(data) {
    const filData = data.filter((item) => {
      return item.status === selected;
    });
    console.log("List all req:" + JSON.stringify(data));
    console.log("Data test:" + JSON.stringify(filData));
    setData(filData);
  }

  const dispatch = useDispatch();

  const goToRequestDetail = (applicationId) => {
    console.log("RqId: " + JSON.stringify(applicationId));
    dispatch(getRequestDetailByApplicationId(applicationId, navigation));
  };

  const Item = ({ applicationId, email, fullName }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{fullName} is waitting your response</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>Email: {email}</Text>
        <View style={{ marginLeft: "60%", flexDirection: "row" }}>
          <Text
            onPress={() => goToRequestDetail(applicationId)}
            style={styles.action}
          >
            Detail
          </Text>
        </View>
      </View>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item
      applicationId={item.applicationId}
      fullName={item.createdBy.userInfo.fullName}
      email={item.createdBy.userInfo.email}
    />
  );
  return (
    <View>
      <ProjectNavigator navigation={navigation} />

      <View style={styles.container}>
        <Text style={{ fontSize: 25 }}>List all request</Text>
        <SelectList
          setSelected={(val) => setSelected(val)}
          placeholder={"APPROVED"}
          data={allStatus}
          save="key"
          boxStyles={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: "15%",
            marginLeft: 30,
          }}
          dropdownStyles={{
            width: 130,
            marginLeft: 30,
          }}
          search={false}
        />
        <TouchableOpacity
          style={styles.buttonFilter}
          onPress={() => filterStatus(data)}
        >
          <Text style={{ color: "white" }}>Search</Text>
        </TouchableOpacity>
        <SafeAreaView>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.applicationId}
          />
        </SafeAreaView>
        <Buttons
          text={"Back"}
          style={styles.buttonBack}
          onPressTo={() => {
            navigation.goBack(null);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonFilter: {
    marginTop: 20,
    width: 130,
    marginLeft: 5,
    backgroundColor: "black",
    borderRadius: 5,
    marginLeft: 30,
    color: "white",
    alignItems: "center",
    marginBottom: 30,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
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
});
