import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Pressable,
  Modal,
  Image,
  Button,
} from "react-native";
import LabNavigator from "../../navigations/LabNavigator";
import Buttons from "../../components/Buttons";
import { useDispatch } from "react-redux";
import { getmemberDetailByProfileId } from "../../actions/LaboratoryAction";
import { getAllMemberByLabId } from "../../networking/CustomNetworkService";
import {
  updateMemberRoleById,
  removeMemberFromLaboratory,
} from "../../actions/LaboratoryAction";
import AsyncStorage from "@react-native-community/async-storage";
import PaginationBar from "../../components/PaginationBar";

const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@currentLabId");
    console.log("LabId in reate Project: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get LabId id: " + e);
  }
};

const ViewAllMember = ({ route, navigation }) => {
  const [numberOfElement, setNumberOfElement] = useState(0);
  const [labId, setLabId] = useState("");
  const [items, setItem] = useState([]);
  getLabId().then((v) => setLabId(v));
  const dispatch = useDispatch();

  const getAllMemberInLab = (selectedPage) => {
    getAllMemberByLabId(selectedPage - 1, 5).then((v) => {
      setItem(v.data.data.items);
      setNumberOfElement(v.data.data.totalPage * 5);
    });
  };

  useEffect(() => {
    getAllMemberInLab(1);
  }, []);

  const changeSelectedPage = (selectedPageNumber) => {
    getAllMemberInLab(selectedPageNumber);
  };

  const goToMemberDetail = (accountId, code) => {
    dispatch(getmemberDetailByProfileId(accountId, code, labId, navigation));
  };

  const Item = ({ accountId, id, name, role, email, username, code }) => (
    <View style={styles.item}>
      <View style={styles.ava}>
        <Text style={styles.title}>{username}</Text>
      </View>
      <View style={styles.ava}>
        <Text style={styles.title}>{email}</Text>
      </View>
      <View style={styles.name}>
        <Text
          style={[styles.title, styles.blue]}
          onPress={() => {
            goToMemberDetail(accountId, code);
          }}
        >
          {name}
        </Text>
      </View>
      <View style={styles.role}>
        <Text style={styles.title}>{role}</Text>

      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      id={item.memberId}
      accountId={item.userInfo.accountId}
      name={item.userInfo.userInfo.fullName}
      role={item.role}
      code={item.memberId}
      email={item.userInfo.userInfo.email}
      username={item.userInfo.userInfo.username}
    />
  );
  return (
    <View style={styles.comp}>
      <LabNavigator navigation={navigation} />
      <View>
        <Text style={styles.titleContent}>List all member in your lab</Text>
        <Buttons
          text={"Add new member"}
          style={styles.button}
          onPressTo={() => {
            navigation.navigate("AddMemberToLab");
          }}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.tableForm}>
          <View style={[styles.ava]}>
            <Text style={styles.title}>Code</Text>
          </View>
          <View style={[styles.ava]}>
            <Text style={styles.title}>Ava</Text>
          </View>
          <View style={[styles.name]}>
            <Text style={styles.title}>Name</Text>
          </View>
          <View style={[styles.role]}>
            <Text style={styles.title}>Role</Text>
          </View>
        </View>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.memberId}
        />
      </SafeAreaView>

      <PaginationBar
        currentSizes={5}
        numberOfElement={numberOfElement}
        callbackSelectedPage={changeSelectedPage}
      />

      <Buttons
        text={"Back"}
        style={styles.button}
        onPressTo={() => {
          navigation.goBack(null);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonUpdate: {
    width: 130,
    margin: 5,
    fontSize: 11,
  },
  button: {
    marginTop: 20,
    width: 130,
    marginLeft: 5,
  },
  blue: {
    color: "blue",
  },
  modal: {
    backgroundColor: "#f27474",
    width: "50%",
    borderRadius: 15,
    marginTop: "40vh",
    marginLeft: "50vh",
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    width: 215,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "45%",
  },
  popUp: {
    zIndex: 2,
    borderWidth: 1,
    borderRadius: 5,
    position: "absolute",
    marginLeft: 164,
    backgroundColor: "#fc4503",
    color: "white",
    flexDirection: "row",
  },
  comp: {
    backgroundColor: "rgb(255, 255, 255)",
  },
  tableForm: {
    display: "flex",
    flexDirection: "row",
  },
  ava: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
  },
  name: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    color: "blue",
  },
  role: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    flexDirection: "row",
    zIndex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    marginTop: 30,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  item: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontSize: 25,
  },
  titleContent: {
    fontSize: 32,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    color: "#0078D4",
  },
});

export default ViewAllMember;
