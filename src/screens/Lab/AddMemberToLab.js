import React, { useEffect, useState } from "react";
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
import { SelectList } from "react-native-dropdown-select-list";
import {
  getAllMember,
  getAllMemberInLab,
} from "../../networking/CustomNetworkService";
import { getMembersToLab } from "../../actions/LaboratoryAction";
import { getAllUser } from "../../networking/CustomNetworkService";
import AsyncStorage from "@react-native-community/async-storage";
import ListUserComponent from "../../components/ListUserComponent";

const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@currentLabId");
    console.log("LabId in reate Project: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get LabId id: " + e);
  }
};

export default function AddMemberTolab({ route, navigation }) {
  let isValid = true;
  const [labId, setLabId] = useState("");
  getLabId().then((v) => setLabId(v));
  const [selected, setSelected] = React.useState("");
  const [key, setKey] = React.useState("");
  const [inputSearchData, setInputSearchData] = useState("");
  const [listMember, setListMember] = useState(data);

  const [data, setData] = React.useState([]);
  const [isMember, setIsMember] = useState(false);

  React.useEffect(() => {
    getAllMember().then((response) => {
      let newArray1 = response.data.items.map((item) => {
        return {
          key: item.accountId,
          value: item.fullName,
        };
      });
      getAllMemberInLab().then((response) => {
        console.log(
          "All member in Lab: " + JSON.stringify(response.data.items)
        );
        let newArray2 = response.data.items.map((item) => {
          return {
            key: item.userInfo.accountId,
            value: item.userInfo.userInfo.fullName,
          };
        });
        setListMember(
          newArray1.filter((i) => !newArray2.find(({ key }) => i.key === key))
        );
      });
    });
  }, []);

  console.log("List member:" + JSON.stringify(data));

  const searchMember = useEffect(() => {
    getAllUser(inputSearchData).then((v) => {
      let newList = v.data.items.map((item) => {
        return {
          key: item.accountId,
          value: item.fullName,
        };
      });
      setListMember(newList);
    });
  });

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
            <Button title={"Search"} onPress={searchMember} />
          </View>
        </View>
        <View style={styles.listMember}>
          <ListUserComponent listMember={listMember} navigation={navigation} />
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
