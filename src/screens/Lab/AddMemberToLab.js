import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import LabNavigator from "../../navigations/LabNavigator";
import { getMemberNotInLab } from "../../networking/CustomNetworkService";
import AsyncStorage from "@react-native-community/async-storage";
import ListUserComponent from "../../components/ListUserComponent";
import PaginationBar from "../../components/PaginationBar";

const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@currentLabId");
    return labId;
  } catch (e) {
    console.log("Can't get LabId id: " + e);
  }
};

export default function AddMemberToLab({ route, navigation }) {
  const [labIdUseState, setLabIdUseState] = useState();
  const [numberOfElement, setNumberOfElement] = useState(0);
  getLabId().then((v) => setLabIdUseState(v));
  const [inputSearchData, setInputSearchData] = useState("");
  const [listMember, setListMember] = useState(searchMember);
  const [size, setSize] = useState(10);
  useEffect(() => {
    getLabId().then((v) => searchMember(v, 0));
  }, []);
  const callBackChangePage = (page) => {
    searchMember(labIdUseState, page - 1);
  };
  const searchMember = (labId, page) => {
    if (labId) {
      getMemberNotInLab(labId, inputSearchData, page, size, navigation).then(
        (response) => {
          setNumberOfElement(response.data.totalPage * size);
          setListMember(response.data.items);
        }
      );
    } else {
      getMemberNotInLab(
        labIdUseState,
        inputSearchData,
        page,
        size,
        navigation
      ).then((response) => {
        setNumberOfElement(response.data.totalPage * size);
        setListMember(response.data.items);
      });
    }
  };
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View>
        <View>
          <Text style={styles.title}>Add new member:</Text>
        </View>
        <View style={styles.search}>
          <TextInput style={styles.input} onChangeText={setInputSearchData} />
          <View style={styles.btnSearch}>
            <Button title={"Search"} onPress={() => searchMember(null, 0)} />
          </View>
        </View>
        <View style={styles.listMember}>
          <ListUserComponent listMember={listMember} navigation={navigation} />
        </View>
        <PaginationBar
          currentSizes={size}
          numberOfElement={numberOfElement}
          callbackSelectedPage={callBackChangePage}
        />
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
