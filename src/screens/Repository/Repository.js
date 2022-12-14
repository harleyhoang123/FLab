import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  CheckBox,
  SafeAreaView,
  Button,
} from "react-native";
import Buttons from "../../components/Buttons";
import { RadioButton } from "react-native-paper";
import TextField from "../../components/TextField";
import LabNavigator from "../../navigations/LabNavigator";
import { useDispatch } from "react-redux";
import { getFolderDetailId } from "../../actions/RepositoryAction";
import ProjectNavigator from "../../navigations/ProjectNavigator";
import {deleteFolderInRepository, getListFolder} from "../../networking/CustomNetworkService";
import AsyncStorage from "@react-native-community/async-storage";

const getRepoId = async () => {
  try {
    const repoId = await AsyncStorage.getItem("@currentProjectId");
    console.log("repoId: " + repoId);
    return repoId;
  } catch (e) {
    console.log("Can't get repo id: " + e);
  }
};

function Repository({ route, navigation }) {
  const data = route.params.data;
  const [items, setItems] = useState(data.items);
  console.log("Data in repository: "+ JSON.stringify(items))
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const [repoId, setRepoId] = useState("");
  getRepoId().then((v) => setRepoId(v));
  const getFolderDetailIdHandler = (id, name) => {
    dispatch(getFolderDetailId(id, name, navigation));
  };

  const formatterDate=(date)=>{
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const d= new Date(date);
    return d.toLocaleDateString("en-US", options) +", "+ d.toTimeString().split("G")[0];
  }
  const deleteAFolder = (folderId) => {
    deleteFolderInRepository(repoId,folderId).then(r => {getListFolder(repoId).then(v => setItems(v.data.items))})
  };
  const [checked, setChecked] = useState("");
  const [folderName, setFolderName] = useState("");
  const [description, setDescription] = useState("");
  const Item = ({ id, name, description, lastEdit }) => (
    <View style={styles.table}>
      <View style={styles.columnCheckBox}>
        <RadioButton.Group>
          <RadioButton
            value={id}
            status={checked === id ? "checked" : "unchecked"}
            onPress={() => {setChecked(id);setFolderName(name); setDescription(description)}}
          />

        </RadioButton.Group>
      </View>
      <View style={styles.column}>
        <Text
          onPress={() => getFolderDetailIdHandler(id, name)}
          style={{ color: "blue" }}
        >
          {name}
        </Text>
      </View>
      <View style={styles.column}>
        <Text>{description}</Text>
      </View>
      <View style={styles.column}>
        <Text>{formatterDate(lastEdit)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ProjectNavigator navigation={navigation} />
      <View style={styles.containerContent}>
        <Text style={styles.myCV}> Repository</Text>
        <View style={styles.row}>
          <View style={styles.containerSearch}>
            <TextField
              text={text}
              onChangeText={(newText) => setText(newText)}
              placeholder={" Search"}
              secureTextEntry={false}
              multiline={false}
              style={{ width: 400 }}
            />
            <Buttons text={"Search"} />
          </View>
          <View style={{ marginRight: 30 }}>
            <Buttons text={"Back"} onPressTo={() => navigation.goBack()} />
          </View>
        </View>

        <View>
          <View style={styles.containerButton}>
            <Buttons style={styles.button} text={"Refresh"} />
            <Buttons
              style={styles.button}
              onPressTo={() => navigation.push("CreateFolderInRepo")}
              text={"Create Folder"}
            />
            <Buttons
                style={styles.button}
                text={"Update"}
                onPressTo={()=> navigation.push("UpdateFolderInRepo", {repoId: repoId, folderId: checked, folderName: folderName, description: description} )}
            />
            <Buttons
              style={styles.button}
              text={"Delete"}

              onPressTo={() => deleteAFolder(checked)}
            />
          </View>
          <View style={styles.table}>
            <View style={[styles.columnCheckBox, styles.borderbot]}></View>
            <View style={[styles.column, styles.borderbot]}>
              <Text style={{ marginTop: 10, marginBottom: 10 }}>Name</Text>
            </View>
            <View style={[styles.column, styles.borderbot]}>
              <Text>Description</Text>
            </View>
            <View style={[styles.column, styles.borderbot]}>
              <Text>Last Edit</Text>
            </View>
          </View>
          <SafeAreaView style={styles.flatlist}>
            {items?.map((item) => (
                <Item
                    key ={item.folderId}
                    id={item.folderId}
                    name={item.folderName}
                    description={item.description}
                    lastEdit={item.lastModifiedDate}
                />
            ))}
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: "center",
  },
  borderbot: {
    borderColor: "black",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  container: {
    alignContent: "center",
  },
  table: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  columnCheckBox: {
    width: "5%",
    borderColor: "black",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  column: {
    width: "22%",
    borderColor: "black",
    borderRightWidth: 1,
    justifyContent: "center",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  containerContent: {
    width: "100%",
    backgroundColor: "white",
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
  },
  containerButton: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "flex-end",
    marginRight: 30,
  },
  myCV: {
    fontWeight: "bold",
    fontSize: 35,
    marginLeft: 30,
    marginTop: 30,
  },
  button: {
    width: 150,
    marginRight: 30,
  },
  content: {
    marginTop: 50,
  },
  containerSearch: {
    marginLeft: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Repository;
