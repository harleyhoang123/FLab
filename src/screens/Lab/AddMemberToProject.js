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
} from "react-native";
import { useDispatch } from "react-redux";
import Buttons from "../../components/Buttons";
import LabNavigator from "../../navigations/LabNavigator";
import { addMembersToProject } from "../../actions/LaboratoryAction";
import { SelectList } from "react-native-dropdown-select-list";
import {
  getAllMemberInLab,
  getAllMemberInProject,
} from "../../networking/CustomNetworkService";
import ListUserComponent from "../../components/ListUserComponent";
import ListMemberComponent from "../../components/ListMemberComponent";

export default function AddMemberToProject({ route, navigation }) {
  const projectId = route.params.projectId;
  const raw = route.params.allMember.items;
  const [inputSearchData, setInputSearchData] = useState("");
  console.log("All data:" + JSON.stringify(listMember));

  const [listMember, setData] = React.useState([]);
  let isValid = true;
  const [isMember, setIsMember] = useState(false);

  function validateData() {
    if (!selected) {
      setIsMember(true);
      isValid = false;
    }
    if (isValid) {
      addMemberHandle();
    }
  }

  React.useEffect(() => {
    getAllMemberInLab().then((response) => {
      let newArray1 = response.data.items.map((item) => {
        return {
          key: item.memberId,
          value: item.userInfo.userInfo.fullName,
        };
      });
      console.log("DATA1: " + JSON.stringify(newArray1));
      getAllMemberInProject().then((response) => {
        let newArray2 = response.data.items.map((item) => {
          return {
            key: item.memberId,
            value: item.userInfo.userInfo.fullName,
          };
        });
        console.log("DATA2: " + JSON.stringify(newArray2));
        setData(
          newArray1.filter((i) => !newArray2.find(({ key }) => i.key === key))
        );
        console.log(
          "DATA3: " +
            JSON.stringify(
              newArray1.filter(
                (i) => !newArray2.find(({ key }) => i.key === key)
              )
            )
        );
      });
    });
  }, []);

  const [selected, setSelected] = React.useState("");
  const [key, setKey] = React.useState("");
  const dispatch = useDispatch();

  const addMemberHandle = () => {
    const requestData = {
      memberId: key,
    };
    console.log(requestData);
    dispatch(addMembersToProject(projectId, requestData, navigation));
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
            <Button title={"Search"} />
          </View>
        </View>
        <View style={styles.listMember}>
          <ListMemberComponent
            listMember={listMember}
            navigation={navigation}
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
