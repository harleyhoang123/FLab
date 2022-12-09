import React, { useState } from "react";
import { Text, StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import Buttons from "../../components/Buttons";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { RadioButton } from "react-native-paper";
import TextField from "../../components/TextField";
import { Touchable, TouchableOpacity } from "react-native-web";
import LabNavigator from "../../navigations/LabNavigator";
import ProjectNavigator from "../../navigations/ProjectNavigator";
import { downLoadFileByFileId } from "../../actions/RepositoryAction";
import { useDispatch } from "react-redux";
import {deleteFolderOrFile, getListFolderDetail} from "../../networking/CustomNetworkService";

function RepositoryDetail({ route, navigation }) {
  const data = route.params.data;
  const fileId = "638ee951dcab483f62c0aab3";
  const parentFolderId = route.params.parentFolderId;
  const folderName = route.params.folderName;
  const [itemsFile, setItemsFile] = useState(data.listFile);
  const [itemsFolder, setItemsFolder] = useState(data.listFolder);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const [typeDelete, setTypeDelete] = useState("");
  const [checked, setChecked] = useState("");
  console.log("folderName in Detail" + folderName);
  console.log("parentFolderId in Detail" + parentFolderId);
  const downLoadFileHandler = () => {
    console.log("An");
    dispatch(downLoadFileByFileId(fileId));
  };
  const deleteAFileOrFolder=(id,type,parentFolderId)=>{
    deleteFolderOrFile(id,type).then(v=> getListFolderDetail(parentFolderId).then(r=> {setItemsFile(r.data.listFile); setItemsFolder(r.data.listFolder)}))
  }

  const Item = ({ id, name, type, description, lastEdit, size }) => (
    <View style={styles.table}>
      <View style={styles.columnCheckBox}>
        <RadioButton.Group>
          <RadioButton
            value={id}
            status={checked === id ? "checked" : "unchecked"}
            onPress={() => {setChecked(id); setTypeDelete(type)}}
          />
        </RadioButton.Group>
      </View>
      <View style={styles.column}>
        <Text>{name}</Text>
      </View>
      <View style={styles.column}>
        <Text>{description}</Text>
      </View>
      <View style={styles.column}>
        <Text>{type}</Text>
      </View>
      <View style={styles.column}>
        <Text>{lastEdit}</Text>
      </View>
      <View style={styles.column}>
        <Text>{size}</Text>
      </View>
    </View>
  );

  const ItemFolder = ({
    folderId,
    folderName,
      type,
    description,
    lastModifiedDate,
  }) => (
    <View style={styles.table}>
      <View style={styles.columnCheckBox}>
        <RadioButton.Group>
          <RadioButton
            value={folderId}
            status={checked === folderId ? "checked" : "unchecked"}
            onPress={() => {setChecked(folderId);setTypeDelete(type)}}
          />
        </RadioButton.Group>
      </View>
      <View style={styles.column}>
        <Text>{folderName}</Text>
      </View>
      <View style={styles.column}>
        <Text>{description}</Text>
      </View>
      <View style={styles.column}>
        <Text>{type}</Text>
      </View>
      <View style={styles.column}>
        <Text>{lastModifiedDate}</Text>
      </View>
      <View style={styles.column}>
        <Text>{"--"}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ProjectNavigator navigation={navigation} />
      <View style={styles.containerContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.myCV}> {folderName}/</Text>
          </View>
        </View>
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
        <View >
          <View style={styles.containerButton}>
            <Buttons style={styles.button} text={"Refresh"} />
            <Buttons
              style={styles.button}
              text={"Create Folder"}
              onPressTo={() =>
                navigation.push("CreateSubFolder", {
                  parentFolderId: parentFolderId,
                  folderName: folderName,
                })
              }
            />
            <Buttons
              style={styles.button}
              text={"Delete"}
              onPressTo={()=> deleteAFileOrFolder(checked,typeDelete,parentFolderId)}
            />
            <Buttons
              onPressTo={downLoadFileHandler}
              style={styles.button}
              text={"Download"}
            />
            <Buttons
              style={styles.button}
              text={"Upload"}
              onPressTo={() => navigation.push("Upload",{
                parentFolderId: parentFolderId,
                folderName: folderName,
              })}
            />
          </View>
          <View style={styles.table}>
            <View style={[styles.columnCheckBox, styles.borderbot]}></View>
            <View style={[styles.column, styles.borderbot]}>
              <Text style={{ marginTop: 10, marginBottom: 10 }} >File Name</Text>
            </View>
            <View style={[styles.column, styles.borderbot]}>
              <Text>Description</Text>
            </View>
            <View style={[styles.column, styles.borderbot]}>
              <Text>Type</Text>
            </View>
            <View style={[styles.column, styles.borderbot]}>
              <Text>Last Edit</Text>
            </View>
            <View style={[styles.column, styles.borderbot]}>
              <Text>Size</Text>
            </View>
          </View>
          <SafeAreaView>
            {itemsFile?.map((item) => (
                <Item
                    key={item.fileId}
                    id={item.fileId}
                    name={item.fileName}
                    type={item.type}
                    description={item.description}
                    lastEdit={item.lastModifiedDate}
                    size={item.size}
                />
            ))}
            {itemsFolder?.map((item) => (
                <ItemFolder
                    key={item.folderId}
                    folderId={item.folderId}
                    folderName={item.folderName}
                    type={"Folder"}
                    description={item.description}
                    lastModifiedDate={item.lastModifiedDate}
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
    width: "15%",
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

export default RepositoryDetail;
