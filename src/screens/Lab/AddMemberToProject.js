import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import { useDispatch } from "react-redux";
import Buttons from "../../components/Buttons";
import LabNavigator from "../../navigations/LabNavigator";
import PaginationBar from "../../components/PaginationBar";
import { getMemberNotInLab } from "../../networking/CustomNetworkService";
import ListUserComponent from "../../components/ListUserComponent";
import ListMemberComponent from "../../components/ListMemberComponent";
import { getMemberInLabNotInProject } from "../../networking/CustomNetworkService";
import ProjectNavigator from "../../navigations/ProjectNavigator";

const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@currentLabId");
    return labId;
  } catch (e) {
    console.log("Can't get LabId id: " + e);
  }
};

export default function AddMemberToProject({ route, navigation }) {
  const projectId = route.params.projectId;
  const [labIdUseState, setLabIdUseState] = useState();
  const [numberOfElement, setNumberOfElement] = useState(0);
  const [size, setSize] = useState(10);
  const [inputSearchData, setInputSearchData] = useState("");
  useEffect(() => {
    getLabId().then((v) => searchMember(v, 0));
  }, []);
  const callBackChangePage = (page) => {
    searchMember(labIdUseState, page - 1);
  };

  const [listMember, setListMember] = useState(searchMember);

  const searchMember = (page) => {
    getMemberInLabNotInProject(projectId, page, size, navigation).then(
      (response) => {
        setNumberOfElement(response.data.totalPage * size);
        setListMember(response.data.items);
      }
    );
  };

  return (
    <View>
      <ProjectNavigator navigation={navigation} />
      <View>
        <View>
          <Text style={styles.title}>Add new member:</Text>
        </View>
        <View style={styles.listMember}>
          <ListMemberComponent
            listMember={listMember}
            navigation={navigation}
          />
          <PaginationBar
            currentSizes={size}
            numberOfElement={numberOfElement}
            callbackSelectedPage={callBackChangePage}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  listMember: {
    alignSelf: "start",
    marginLeft: "13%",
    with: "70%",
  },
  search: {
    flexDirection: "row",
  },
  button: {
    marginTop: 20,
    width: 130,
    marginLeft: 5,
  },
  input: {
    height: 35,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "45%",
    marginLeft: "13%",
  },
  inputInvalid: {
    marginLeft: "13%",
    color: "red",
    fontSize: 12,
  },
  title: {
    fontSize: 30,
    marginLeft: "5%",
    marginTop: "1%",
  },
  btnSearch: {
    height: 35,
    margin: 12,
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
